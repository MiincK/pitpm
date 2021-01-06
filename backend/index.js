const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mariadb = require('mariadb');

const log = function() { console.log.apply(undefined, arguments); };

var sql = {};

let SQLINIT = () => mariadb.createConnection({
		host: 'localhost',
		port: 38643,
		user:'pitpm',
		password: 'pitpm_password',
		database: 'pitpm',
		collation: 'UTF8MB4_UNICODE_CI',
		timezone: 'utc'
	}).then(conn => {
		log("[SQL] Connected to DB!");
		sql.connection = conn;
		var resc = () => {
			setTimeout(() => resc(), 5 * 60 * 1000);
			conn.query("SELECT 1;");
		};
		resc();
	}).catch(err => {
		log("[SQL] Failed to connect to DB! 30s reconnect");
		log("[SQL] " + err);
		setTimeout(() => SQLINIT(), 30 * 1000);
	});
SQLINIT();

let s204 = (res) => res.status(204).end();
let ERROR = (res, code) => res.status(code).send(ERRORS[code]);

const ERRORS = {
	[404]: {"status": 404, "message": "Not found"},
}

const port = 8087;
const API = () => {
	var router = express.Router();

	router.get('/items', async (req, res) => {
        return res.send(await sql.connection.query('SELECT * FROM item'));
	});

	router.get('/items/multiple', async (req, res) => {
		let q = req.query.items.split(',');
        return res.send((await sql.connection.query('SELECT * FROM item')).filter(x => q.indexOf(x.id.toString()) !== -1));
	});

	router.get('/items/popular', async (req, res) => {
		let row = await sql.connection.query('SELECT * FROM item LIMIT 4'); // TODO: Return popular instead of first 4
        return res.send(row);
	});

	router.get('/items/:id', async (req, res) => {
		let row = await sql.connection.query('SELECT * FROM item WHERE id=?', [req.params.id]);
		if (!row.length) return ERROR(res, 404);
        return res.send(row[0]);
	});

	router.post('/cart', async(req, res) => {
		let data = req.body;

		await sql.connection.query('INSERT INTO orders (fio, email, phone, address, what, total, comment) VALUES (?, ?, ?, ?, ?)',
			[data.fio, data.email, data.phone, data.self ? null : data.address, JSON.stringify(data.cart), data.total, data.comment]);

		res.status(204).end();
	});

	router.get('/orders', async (req, res) => {
		res.send((await sql.connection.query('SELECT * FROM orders')));
	});

	router.get('/orders/:id', async (req, res) => {
		let order = (await sql.connection.query('SELECT * FROM orders WHERE id=?', [req.params.id]))[0];
		if (!order) return ERROR(res, 404);
		res.send(order);
	});

	router.put('/orders/:id', async (req, res) => {
		let order = (await sql.connection.query('SELECT 1 FROM orders WHERE id=?', [req.params.id]))[0];
		if (!order) return ERROR(res, 404);
		if (typeof req.body.status !== 'undefined')
		{
			await sql.connection.query('UPDATE orders SET status=? WHERE id=?', [req.body.status, req.params.id]);
			return s204(res);
		}
		if (typeof req.body.track !== 'undefined')
		{
			await sql.connection.query('UPDATE orders SET tracking=? WHERE id=?', [req.body.track, req.params.id]);
			return s204(res);
		}
		return ERROR(res, 404);
	});

    return router;
};

const app = express();
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));
app.use('/api/1/', API());
app.use(function(err, req, res, next)
{
    res.status(400).send({error:{message:err.message}});
});
app.listen(port, function(){
    console.log("Listening on port " + port);
});
