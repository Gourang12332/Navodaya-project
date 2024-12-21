import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import dbconnect from "@/app/lib/dbconnect";
import UserModel from "@/app/models/User";
import { SignInSchema } from "@/app/Schemas/SignInSchema";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "username", type: "text" },
        email: { label: "email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        await dbconnect();
        try {
          const result = SignInSchema.safeParse(credentials);
          if (!result.success) {
            throw new Error(result.error.errors[0].message);
          }
          const user = await UserModel.findOne({
            $or: [
              { email: credentials.email },
              { username: credentials.username },
            ],
          });
          if (!user) {
            throw new Error("No user exist with this email or username");
          } else {
            //  const ispasscorrect = await bcrypt.compare(credentials.password,user.password)
            if (credentials.password == user.password) {
              return user;
            } else {
              throw new Error("Incorrect password");
            }
          }
        } catch (error: any) {
          throw new Error(error);
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        (session.user._id = token._id),
          (session.user.username = token.username);
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.username = user.username;
      }
      return token;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
