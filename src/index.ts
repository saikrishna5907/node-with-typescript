import express, { NextFunction, Request, Response } from 'express';
// import bodyParser from 'body-parser';
import adminRoutes from './routes/admin';
import shopRoutes from './routes/shop';
import sequelize from './utilities/database';
import Product from './products/product';
import User, { UserModel } from './user/user';
import * as dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";

const bodyParser = require('body-parser');
const app = express();

if (!process.env.PORT) {
	process.exit(1);
}
const PORT: number = parseInt(process.env.PORT as string, 10);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());

app.use(async (req: Request, res: Response, next: NextFunction) => {

	try {

		const user = await User.findByPk(1);

		console.log(typeof user);
		next();
		if (user) {
			const transfermedUser = {
				email: user.getDataValue('dataValue').email,
				id: user.getDataValue('dataValue').id,
				createdAt: user.getDataValue('dataValue').createdAt,
				updatedAt: user.getDataValue('dataValue').updatedAt,
				name: user.getDataValue('dataValue').name
			} as UserModel;
			console.log();

			req.currentUser = transfermedUser;
		}
	} catch (err) {
		console.error(err);
	}

});

app.get('/', (req: Request, res: Response, next: NextFunction) => {
	User.findByPk(1).then(rs => res.send(rs)).catch(err => res.send(err));
});

app.use(adminRoutes);

app.use(shopRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
	res.status(404).send('<b>Page not found...!</b>')
});
//  CASCADE  means when a user is deleted all the products created by that user will be deleted as well.
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });

User.hasMany(Product);
sequelize.sync().then(result => {
	return User.findByPk(1);
	// console.log(result);

})
	.then(user => {
		if (!user) {
			return User.create({
				name: 'Sai',
				email: 'sai@g.com'
			})
		}
		return Promise.resolve(user);
	})
	.then(user => {
		console.log(user);
		app.listen(PORT, () => {
			console.log('Listening on :' + PORT)
		})
	})
	.catch(err => {
		console.error(err);
	});