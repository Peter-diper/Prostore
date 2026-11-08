import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/db/prisma";
import type { NextAuthConfig } from "next-auth";
import { compareSync } from "bcrypt-ts-edge";
import { NextResponse } from "next/server";

export const config = {
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: { email: { type: "email" }, password: { type: "password" } },
      async authorize(credentials) {
        const user = await prisma.user.findFirst({
          where: { email: credentials.email as string },
        });

        if (user && user.password) {
          const isMatch = compareSync(
            credentials.password as string,
            user.password,
          );

          if (isMatch) {
            return {
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role,
            };
          }
        }

        return null;
      },
    }),
  ],
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async jwt({ token, user }: any) {
      if (user) {
        token.role = user.role;

        if (user.name === "NO_NAME") {
          token.name = user.email.split("@")[0];

          await prisma.user.update({
            where: { id: user.id },
            data: token.name,
          });
        }
      }
      return token;
    },
    async session({ session, user, trigger, token }) {
      session.user.id = token.sub!;
      session.user.name = token.name;
      session.user.email = token.email!;

      if (trigger === "update") {
        session.user.name = user.name;
      }
      return session;
    },
    authorized({ request, auth }) {
      // array of our path that we dont want a unuthnticatd user to use it
      const protectedPath = [
        /\/shipping-address/,
        /\/payment-method/,
        /\/place-order/,
        /\/profile/,
        /\/user\/(.*)/,
        /\/order\/(.*)/,
        /\/admin/,
      ];

      // get pathname
      const { pathname } = request.nextUrl;

      // check if user is not authenticatd and accessing a protected path
      if (!auth && protectedPath.some((p) => p.test(pathname))) return false;

      // check if we have an session card if not generate cookie
      if (!request.cookies.get("sessionCartId")) {
        // Get path name from the req url object

        const sessionCartId = crypto.randomUUID();
        const newHeaders = new Headers(request.headers);

        const response = NextResponse.next({
          headers: newHeaders,
        });

        response.cookies.set("sessionCartId", sessionCartId);
        return response;
      } else {
        return true;
      }
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
