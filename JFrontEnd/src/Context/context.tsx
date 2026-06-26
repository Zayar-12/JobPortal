import { createContext, useContext, useState, } from "react";
import type { ContextType } from "../types/types";

 

 const context=createContext<ContextType | undefined>(undefined);


 export const ContextProvider=({children}:{children:React.ReactNode})=>{
     const[token,setToken]=useState<string>(localStorage.getItem('token') || "");
     const [search,setSearch]=useState<string>("");
     const [company_id,setCompanyId]=useState<string>("");

return (
    <context.Provider value={{ token, setToken,search ,setSearch,company_id,setCompanyId }}>
     {children}
    </context.Provider>
)

 }


 export const  useContextHook=()=>{
    const ctx=useContext(context);

    if(ctx === undefined){
         throw new Error("useAuth must be used within an AuthProvider");
    }

    return ctx;
 }