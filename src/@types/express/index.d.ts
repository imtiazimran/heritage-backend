// src/@types/express/index.d.ts
import { IUser } from '../../modules/user/user.model';

declare global {
    namespace Express {
        interface Request {
            user?: IUser;
        }
    }
}
