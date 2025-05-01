import NextAuth from "next-auth"
import github from "next-auth/providers/github"
import credentials from "next-auth/providers/credentials"
import dbConnect from "./lib/dbConnect"
import UserModel from "./models/User"
import bcrypt from "bcryptjs"
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers:[
    credentials({
      credentials:{
        identifier:{label:"username",type:"text",placeholder:"Enter your username"},
        password:{label:"password",type:"password",placeholder:"Enter your password"},
      },
      authorize: async (credentials:any):Promise<any>=>{
        await dbConnect();
        try {
          const user = await UserModel.findOne({
            $or:[
              {email:credentials.identifier},
              {username:credentials.identifier}
            ]
          })
          if(!user){
            console.log("User not found")
            throw new Error("User not found")
          }
          if(!user.isVerified){
            throw new Error("User not verified , please verify user before login")
          }
          const isPasswordCorrect = await bcrypt.compare(credentials.password,user.password)
                  if(isPasswordCorrect){
                    return user
                  }else{
                    throw new Error("Invalid password")
                  }
        } catch (error:any) {
          throw new Error(error)
        }
      }
    })
  ],
  pages:{
    signIn:"/sign-in"
  },
  session:{
    strategy:"jwt"
  },
  callbacks:{
    async jwt({token,user}){
        if(user){
            token._id = user._id?.toString();
            token.isVerified = user.isVerified;
            token.isAcceptingMessages = user.isAcceptingMessages;
            token.username = user.username;

        }
        return token
    
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user = {
          ...session.user,
          _id: token._id as string,
          isAcceptingMessages: token.isAcceptingMessages as boolean,
          isVerified: token.isVerified as boolean,
          username: token.username as string,
        };
      }
      return session;
    }
    
},
secret:process.env.AUTH_SECRET
})







// Github

// import NextAuth from "next-auth"
// // import GitHub from "next-auth/providers/github"
// import github from "next-auth/providers/github"
 
// export const { handlers, signIn, signOut, auth } = NextAuth({
//   providers: [github],
// })