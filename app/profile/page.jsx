'use client';


import Profile from '@components/Profile';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState,useEffect } from 'react';

const Profiler = () => {
     
     const {data:session} = useSession();
     const router = useRouter();
     const [posts,setPosts] = useState([]);
     
     useEffect(()=>{
          const fetchPosts = async ()=>{
            const response = await fetch(`/api/users/${session?.user.id}/posts`);
            const data = await response.json()
      
            setPosts(data);
          }
          if(session?.user.id) fetchPosts();
        },[])

        const handleEdit = (post) => {
          console.log(post)
          router.push(`/update-prompt?id=${post._id}`)
        };

        const handleDelete = async (post) => {
          const hasConfirmed = confirm("Are you sure you want to delete this prompt?")
         
          if(hasConfirmed){
            try{
              await fetch(`api/prompt/${post._id.toString()}`,{
                method:'DELETE'
              })
              const FilterPosts = posts.filter((p)=>p._id!== post._id)
              setPosts(FilterPosts)
            }catch(err){
              console.log(err)
            }
          }
         
        }
        
          
   
  return (
     <Profile name='my'
     desc='welcome to page'
     data={posts}
     handleEdit={handleEdit}
     handleDelete={handleDelete}/>
  )
}

export default Profiler