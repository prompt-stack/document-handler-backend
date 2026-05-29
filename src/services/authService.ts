import { Request, Response } from "express";
import { BaseClient, generators } from "openid-client";
import { initializeClient } from "../config/cognitoConfig";
import redis from "../config/redisConfig";
import { CognitoAuthCredentials } from "../types/cognito";

export const authService = {
    async loginService(req: Request, res: Response) {
        const client: BaseClient | null = await initializeClient()
        if(!client) {
            return res.status(500).json({ message: "Failed to initialize authentication client" });
        }

        const nonce = generators.nonce();
        const state = generators.state();

        await redis.set(
            `auth:${state}`,
            JSON.stringify({ nonce, state } as CognitoAuthCredentials)
        );

        const authUrl = client.authorizationUrl({
            scope: 'email openid phone',
            state: state,
            nonce: nonce,
        });

        res.json({ loginUrl: authUrl });
    },
    async callback(req: Request, res: Response) {
        const code = req.body.code as string;
        const state = req.body.state as string;
        
        if (!code || !state) {
            return res.status(400).json({ message: "Missing code or state" });
        }
        
        try {

            const client = await initializeClient();
            if (!client) {
                return res.status(500).json({ message: "Failed to initialize client" });
            }

            const authCredentials = await redis.get(`auth:${state}`) as CognitoAuthCredentials | null;

            if (!authCredentials) {
                return res.status(400).json({ message: "Invalid or expired state" });
            }

            await redis.del(`auth:${state}`);

            req.query = { code, state };

            const params = client.callbackParams(req);

            const tokenSet = await client.callback(
                'http://localhost:5173/callback',
                params,
                { state, nonce: authCredentials.nonce }
            );

            const userInfo = await client.userinfo(tokenSet.access_token!);

            res.cookie('access_token', tokenSet.access_token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 1000, // 1 hour
            });

            return res.json({
                token: tokenSet.access_token,
                idToken: tokenSet.id_token,
                user: userInfo,
            });

        } catch (error) {
            console.error('Token exchange error:', error);
            return res.status(400).json({ message: 'Authentication failed' });
        }
    },
    async logout(res: Response) {
        try {
            res.clearCookie('access_token', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
            });
            const logoutUrl = `${process.env.COGNITO_LOGOUT_URI}?client_id=${process.env.COGNITO_CLIENT_ID}&logout_uri=${process.env.COGNITO_LOGOUT_REDIRECT_URI}`;
            return res.json({ logoutUrl });
        }catch (error) {
            console.error('Logout error:', error);
            return res.status(500).json({ message: 'Logout failed' });
        }
    },

}