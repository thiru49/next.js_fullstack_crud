import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github'
import User from '@models/user';
import { connectToDB } from '@utils/database';

const handler = NextAuth({  
  providers: [
   GitHubProvider({
    clientId: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET
   })
  ],
  callbacks:{
    async session({ session }) {
      try {
        await connectToDB();

        // Fetch additional user data from the database
        const sessionUser = await User.findOne({ email: session.user.email });

        if (sessionUser) {
          session.user.id = sessionUser._id.toString();
        }

        return session;
      } catch (error) {
        console.error('Error fetching user data:', error.message);
        return session;
      }
  
    },
    async signIn({ profile}) {
  
      try {
        await connectToDB();
  
  
        //check if a user already exists
        const userExists = await User.findOne({
          email:profile.email
        
        })
        //if not, create new user
        if (!userExists) {
          await User.create({
            email:profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture
          })
        }
        return true
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false
      }
       
  
  
    },
  }
 
});

export { handler as GET, handler as POST };
