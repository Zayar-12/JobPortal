import axios from "axios"


import type { Auth } from "../types/types";


export const login= async({email,password}:Auth):Promise<boolean>=>{
  

  try {

  
      const res= await axios.post('http://127.0.0.1:8000/api/login',{
        email:email,
        password:password
    },{
        headers:{ 'Accept': 'application/json',
                 'Content-Type':'application/json'
        }

    })

    if(res){
 const token=res.data.token;
         const user=res.data.user;
         localStorage.setItem('token',token);
        // localStorage.setItem('userId',user.id);
        
  console.log(user);
         return true;
    }
        return false;
    
  } catch (error) {
      console.log('login fail');

      return false;
  }


}


export const logout= async (token:string):Promise<boolean>=>{

    try {
        const res=await axios.post('http://127.0.0.1:8000/api/logout',{},{
                headers:{ 'Accept': 'application/json',
                 'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`,
                 
        }
        })
          
        if(res){
           return true;
        }
        return false;
    } catch (error) {
        return false;
    }
}


export const registerApi= async ({name,email,password,password_confirmation}:Auth):Promise<boolean>=>{

    try {
        const res= await axios.post('http://127.0.0.1:8000/api/register',{
            name:name,
            email:email,
            password:password,
            password_confirmation:password_confirmation
        },{
             headers:{ 'Accept': 'application/json',
                 'Content-Type':'application/json',
             }
        })

        if(res){

             const token=res.data.token;
         const user=res.data.user;
         localStorage.setItem('token',token);
          console.log("resgister successful")
            return true;
           
        }

        return false
        console.log("resgister res is not ok")
        
    } catch (error) {
        return false
        console.log("register fail")
    }

}