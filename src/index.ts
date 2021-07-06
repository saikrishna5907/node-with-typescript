import 'reflect-metadata';
import express from 'express';
import MongoDbConnect from './config/database';
import indexRouter from './routes/index.route';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';

const bodyParser = require('body-parser');
const container = new Container();
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('api/', indexRouter);


MongoDbConnect.getDbInstance().then((client) => {
	console.log(client.databaseName);
	app.listen(3000, () => {
		console.log('Listening on Port 3000...!');
	});
});