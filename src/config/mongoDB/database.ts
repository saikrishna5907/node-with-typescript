import mongoose, { Mongoose } from 'mongoose';

class MongoDbConnect {
  private static dbInstance: Mongoose | undefined;

  private static dbConnect = async (): Promise<Mongoose> => {
    try {
      return mongoose.connect
        ('mongodb+srv://saikrishna5907:Saikrish@007@nodetypescript.shmuu.mongodb.net/NodeTypescript?retryWrites=true&w=majority',
          {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            poolSize: 10,
            useFindAndModify: true
          }
        );

    } catch (error) {
      console.log(error);
      throw new Error('DB connection failed...!');
    }
  }
  public static async getDbInstance(): Promise<Mongoose> {
    if (this.dbInstance) {
      return this.dbInstance;
    }
    return this.dbConnect();
  }

  public static disconnect = () => {
    console.log(process.env.NODE_ENV)
    if (process.env.NODE_ENV?.toString() === "test") {
      return mongoose.connection.db.dropDatabase().then(() => {
        return mongoose.disconnect();
      })
    }
    else {
      return mongoose.disconnect()
    }
  }
}
export default MongoDbConnect;

