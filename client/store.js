import { create } from "zustand";
import axios from "axios";
import {persist, devtools} from "zustand/middleware";

const workfastStore=(set)=>({
   peoples:[],
   invites:[],
   isInviteOpen: false,

   setIsInviteOpen: (value) => set({ isInviteOpen: value }),

   fetchPeoples: async(str)=>{
    try{
     const response=await axios.get(`http://localhost:8080/api/v1/people?${str}`)
     set({peoples:response.data});

    }catch(err){
        console.log(err);
        throw err;
    }
   },


   fetchInvites: async()=>{
    try{
     const response=await axios.get("http://localhost:8080/api/v1/invite")
     set({invites:response.data});

    }catch(err){
        console.log(err);
        throw err;
    }
   },

   addInvites:async(invite)=>{
    try{
        const response=await axios.post("http://localhost:8080/api/v1/invite", invite);
        set((state) => ({ invite: [...state.invites, response.data] }));

    }catch(err){
        console.log(err);
        throw err;
    }
   },
   deleteInvite:async(id)=>{
    try{
        const response=await axios.post(`http://localhost:8080/api/v1/invite/delete?id=${id}`);
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