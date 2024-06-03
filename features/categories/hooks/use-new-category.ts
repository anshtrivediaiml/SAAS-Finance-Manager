import {create} from "zustand"; //Zustand is a state management library for React that allows you to manage state in a simple and intuitive way. It is built on top of the Context API and uses the concept of stores to manage state.
//A store is a container for a specific piece of state and any functions that modify that state. You can create as many stores as you need, and they can be used throughout your application.

type NewCategoryState={
    isOpen:boolean;
    onOpen: ()=>void;
    onClose:()=>void;
}

export const useNewCategory= create<NewCategoryState>((set)=>(
    {
        isOpen:false,
        onOpen:()=>set({isOpen:true}),
        onClose:()=>set({isOpen:false})
    }
))