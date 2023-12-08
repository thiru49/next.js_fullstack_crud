import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const POST = async (req) =>{
     const {userId,prompt,tag} = await req.json();

     try {
          await connectToDB();
          const NewPrompt = new Prompt({
               creater:userId,
               prompt,
               tag
          })

          await NewPrompt.save();

          return new Response(JSON.stringify(NewPrompt),{status:201})
     } catch (error) {
          return new Response('Failed to create a new prompt',{status:500})
     }
}