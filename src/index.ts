import 'reflect-metadata';
import MongoDbConnect from './config/mongoDB/database';
import { InversifyExpressServer } from 'inversify-express-utils';
import { DIContainer } from './config/inversify-di/di-container';
import morgan from 'morgan';
import './api/index.controller'
import { Application } from 'express';
import bodyParser from 'body-parser';

const diContainer = new DIContainer().diContainer;
const server = new InversifyExpressServer(diContainer);



server.setConfig((application: Application) => {
	const logger = morgan('combined')
	// add body parser
	application.use(bodyParser.urlencoded({ extended: true }));
	application.use(bodyParser.json());
	application.use(logger);
});
// server.setErrorConfig((application: Application) => {
// 	application.use((err: Error, request: Request, response: Response, next: NextFunction) => {
// 		console.error(err.stack);
// 		response.status(500).send("Something broke!");
// 	});
// });

const app = server.build();


MongoDbConnect.getDbInstance().then((client) => {
	console.log(client);
	app.listen(3000, () => {
		console.log('Listening on Port 3000...!');
	});
});