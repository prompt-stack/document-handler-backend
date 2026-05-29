import { UserinfoResponse } from 'openid-client';

declare global {
    namespace Express {
        interface Request {
            user?: UserinfoResponse;
        }
    }
}