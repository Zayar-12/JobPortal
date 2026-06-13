import { redirect, type LoaderFunctionArgs } from "react-router";
import { getAllCompanies } from "../utils/company";

 
 export const loadAllCompany= async({params}:LoaderFunctionArgs)=>{
    

    const allCompaines= await getAllCompanies();

    if(!allCompaines){

        console.log("no companies");

        return redirect("/");
    }

    console.log("all companies",allCompaines);

    return allCompaines;
 }


 