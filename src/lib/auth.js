import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from "./utlis";
import { User } from "./models";
import bcrypt from "bcryptjs";

const login = async (credentials) => {
  try{
    connectToDB()
    const user = await User.findOne({username: credentials.username})
    if(!user){
      throw new Error("Invalid User!")
    }
    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
    if(!isPasswordCorrect){
      throw new Error ("Invalid password!")
    }

    return user;
  }catch(err){
    console.log(err)
    throw new Error("Failed to Login!")
  }
}
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHU_SECRET,
    }),
    CredentialsProvider({
      async authorize(credentials){
        try{
          const user = await login(credentials)
          return user;
        }catch(err){
          return null;
        }
      }
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // console.log("user",user, "account",account,"profile", profile);
      if (account.provider == "github") {
        connectToDB();
        try {
          const user = await User.findOne({ email: profile.email });
          if (!user) {
            const newUser = new User({
              username: profile.login,
              email: profile.email,
              img: profile.avatar_url,
            });

            await newUser.save();
          }
        } catch (err) {
          console.log(err);
          return false;
        }
      }
      return true;
    },
  },
});
