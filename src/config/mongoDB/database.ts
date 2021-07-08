import mongodb, { Db } from 'mongodb';

const mongoClient = mongodb.MongoClient;

class MongoDbConnect {
  private static dbInstance: Db | undefined;

  private static dbConnect = async (): Promise<Db> => {
    try {
      const client = await mongoClient.connect
        ('mongodb+srv://saikrishna5907:Saikrish@007@nodetypescript.shmuu.mongodb.net/NodeTypescript?retryWrites=true&w=majority', { useUnifiedTopology: true });
      return MongoDbConnect.dbInstance = client.db();

    } catch (error) {
      console.log(error);
      throw new Error('DB connection failed...!');
    }
  }
  public static async getDbInstance(): Promise<Db> {
    if (this.dbInstance) {
      return this.dbInstance;
    }
    return this.dbConnect();
  }
}
export default MongoDbConnect;
