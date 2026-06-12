import { createContext, useContext } from "react";

 

 const context=createContext<any>(null);


 export const ContextProvider=({children}:{children:React.ReactNode})=>{

return (
    <context.Provider value={""}>
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