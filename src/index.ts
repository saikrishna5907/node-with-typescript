import 'reflect-metadata';
import MongoDbConnect from './config/mongoDB/database';
import { getRouteInfo, InversifyExpressServer } from 'inversify-express-utils';
import { DIContainer } from './config/inversify-di/di-container';
import morgan from 'morgan';
import './api/index.controller'
import { Application } from 'express';
import bodyParser from 'body-parser';
import { render } from "prettyjson";

/**
 * dependency injection setup start
 */
const diContainer = new DIContainer().diContainer;
const server = new InversifyExpressServer(diContainer, null, { rootPath: '/api/' });
/**
 * dependency injection setup end
 */
// csrf start

server.setConfig((application: Application) => {
	const logger = morgan('combined')
	application.use(bodyParser.urlencoded({ extended: true }));
	application.use(bodyParser.json());
	application.use(logger);
});

const app = server.build();


MongoDbConnect.getDbInstance().then((client) => {
	app.listen(3000, () => {
		console.log('Listening on Port 3000...!');
		console.log(render(getRouteInfo(diContainer)));

	});
});