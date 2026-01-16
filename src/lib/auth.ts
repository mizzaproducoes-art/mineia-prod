import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./db";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          throw new Error("Invalid credentials");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;

        // Check for workspace on sign in
        const membership = await prisma.membership.findFirst({
          where: { userId: user.id },
          include: { workspace: true },
        });

        if (!membership) {
          // Create default workspace for new user
          const newWorkspace = await prisma.workspace.create({
            data: {
              name: "Meu Workspace",
              memberships: {
                create: {
                  userId: user.id,
                  role: "OWNER",
                },
              },
              settings: {
                create: {
                  dryRun: true,
                },
              },
            },
          });
          token.workspaceId = newWorkspace.id;
        } else {
          token.workspaceId = membership.workspaceId;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.id;
        (session.user as any).workspaceId = token.workspaceId;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
