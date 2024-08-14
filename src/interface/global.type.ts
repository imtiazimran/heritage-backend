import { TUser } from "../modules/user/user.validation";


declare global {
    namespace Express {
        interface Request {
            user?: TUser;
        }
    }
}
