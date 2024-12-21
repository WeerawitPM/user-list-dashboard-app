import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            // authorization: {
            //     params: {
            //         prompt: "consent",
            //         access_type: "offline",
            //         response_type: "code",
            //         scope: 'https://www.googleapis.com/auth/spreadsheets',
            //     }
            // }
        }),
    ],
    // callbacks: {
    //     async session({ session, token }) {
    //         session.user.id = token.id;
    //         session.accessToken = token.accessToken;
    //         return session;
    //     },
    //     async jwt({ token, user, account }) {
    //         if (user) {
    //             token.id = user.id;
    //         }
    //         if (account) {
    //             token.accessToken = account.access_token;
    //         }
    //         return token;
    //     },
    // },
};

