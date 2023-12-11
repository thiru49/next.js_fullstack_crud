import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import mongoose from 'mongoose';

export const POST = async (request) =>{
     const {userID,prompt,tag} = await request.json();
      
     try {
          await connectToDB();
          const NewPrompt = new Prompt({
               creator: userID,
               prompt,
               tag
          })

          await NewPrompt.save();

          return new Response(JSON.stringify(NewPrompt),{status:201})
     } catch (error) {
          return new Response('Failed to create a new prompt',{status:500})
     }
}