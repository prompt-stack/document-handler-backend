import { BaseClient, Issuer } from 'openid-client';

export async function initializeClient(): Promise<BaseClient | null> {
    if(!process.env.COGNITO_ISSUER) {
        throw new Error('COGNITO_ISSUER is not defined in .env');
    }
    if (!process.env.COGNITO_CLIENT_ID) {
        throw new Error('COGNITO_CLIENT_ID is not defined in .env');
    }
    if (!process.env.COGNITO_SECRET) {
        throw new Error('COGNITO_SECRET is not defined in .env');
    }
    if (!process.env.COGNITO_REDIRECT_URI) {
        throw new Error('COGNITO_REDIRECT_URI is not defined in .env');
    }

    try {
        const issuer = await Issuer.discover(process.env.COGNITO_ISSUER);
        return new issuer.Client({
            client_id: process.env.COGNITO_CLIENT_ID,
            client_secret: process.env.COGNITO_SECRET,
            redirect_uris: [process.env.COGNITO_REDIRECT_URI],
            response_types: ['code']
        });
    }catch(e) {
        console.error('Error initializing OpenID client:', e);
        return null
    }
};