import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
    },
    secret: process.env.NEXTAUTH_SECRET,
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
    // }
};

