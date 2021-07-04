
import { UserModel } from '../../user/user';

declare global {
  namespace Express {
    interface Request {
      currentUser: UserModel
    }
  }
}