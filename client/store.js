import { create } from "zustand";
import axios from "axios";
import {persist, devtools} from "zustand/middleware";

const workfastStore=(set)=>({
   peoples:[],
   invites:[],

   fetchPeoples: async()=>{
    try{
     const response=await axios.get("http://localhost:8080/api/people")
     set({peoples:response.data});

    }catch(err){
        console.log(err);
        throw err;
    }
   },


   fetchInvites: async()=>{
    try{
     const response=await axios.get("http://localhost:8080/api/invite")
     set({invites:response.data});

    }catch(err){
        console.log(err);
        throw err;
    }
   }


})

const useWorkfastStore=create(
    devtools(
        persist(workfastStore, {
        name:"workfast",
        })
    )
)
export default useWorkfastStore;