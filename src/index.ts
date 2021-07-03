import express, { NextFunction, Request, Response } from 'express';
// import bodyParser from 'body-parser';
import adminRoutes from './routes/admin';
import shopRoutes from './routes/shop';
import sequelize from './utilities/database';
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/', (req: Request, res: Response, next: NextFunction) => {
	res.send
})
app.use(adminRoutes);

app.use(shopRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
	res.status(404).send('<b>Page not found...!</b>')
})
sequelize.sync().then(result => {
	// console.log(result);
	app.listen(5000, () => {
		console.log('Listening on :' + 5000)
	})
}).catch(err => {
	console.error(err)
});