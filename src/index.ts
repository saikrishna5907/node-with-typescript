import 'reflect-metadata';
import MongoDbConnect from './config/database';
import { InversifyExpressServer } from 'inversify-express-utils';
import { DIContainer } from './config/inversify-di/di-container';
import './api/index.controller';
const bodyParser = require('body-parser');

const diContainer = new DIContainer().diContainer;
const app = new InversifyExpressServer(diContainer, undefined, { rootPath: '/api' }).build();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


MongoDbConnect.getDbInstance().then((client) => {
	console.log(client.databaseName);
	app.listen(3000, () => {
		console.log('Listening on Port 3000...!');
	});
});