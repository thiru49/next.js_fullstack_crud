import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";


// GET (read)
export const GET = async (request, { params }) => {
     try {
       await connectToDB();
   
       const prompts = await Prompt.findById(params.id).populate('creator');
       if (!prompts) {
         return new Response("prompt not found", { status: 404 });
       }
       console.log(prompts);
       return new Response(JSON.stringify(prompts), { status: 200 });
     } catch (error) {
       return new Response("Failed to fetch all prompts", { status: 500 });
     }
};
   

//PATCH (update)
export const PATCH = async (request,{params}) => {
     const {prompt,tag} = await request.json();
     
     try {
          await connectToDB();
          
          const existingprompts = await Prompt.findById(params.id);

          if(!existingprompts) return new Response("prompt not found",{status:404})
          
          existingprompts.prompt = prompt;
          existingprompts.tag = tag;

          await existingprompts.save();
          
          return new Response(JSON.stringify(existingprompts),{status:200})

     } catch (error) {
          return new Response('failed to edit file',{status:500})
     }
}

//DELETE 
export const DELETE = async (request,{params}) => {  
     try {
          await connectToDB();
          
          await Prompt.findByIdAndDelete(params.id);
          
          return new Response('prompts deleted sucessfully',{status:200})

     } catch (error) {
          return new Response('failed to edit file',{status:500})
     }
}