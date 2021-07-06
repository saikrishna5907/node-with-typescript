import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import adminRoutes from './routes/admin';
import MongoDbConnect from './utilities/database';
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(adminRoutes);

// app.use(shopRoutes);
app.use('/', (req: Request, res: Response, next: NextFunction) => {
	console.log('empty');
	res.send('empty')
})
MongoDbConnect.getDbInstance().then((client) => {
	console.log(client.databaseName);
	app.listen(3000, () => {
		console.log('Listening on Port 3000...!');
	});
});