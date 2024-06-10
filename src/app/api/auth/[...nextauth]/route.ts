import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const options = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        try {
          const response = await axios.post(`${process.env.NEST_API_URL}/auth/login`, {
            email: credentials?.email,
            password: credentials?.password,
          });

          if (response.data) {
            return { id: response.data.userId, email: response.data.email };
          } else {
            return null;
          }
        } catch (error) {
          throw new Error("Invalid credentials");
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.id as string,
      };
      return session;
    }
  },
  pages: {
    signIn: "/signin",
    signOut: "localhost:3001/",
    error: "/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// Export named handler for the POST method
export const POST = async (req, res) => {
  return await NextAuth(req, res, options);
};

// Export named handler for the GET method if needed
export const GET = async (req, res) => {
  return await NextAuth(req, res, options);
};
