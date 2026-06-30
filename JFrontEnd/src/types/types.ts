
export interface Category{
    id:string,
    name:string,
    slug:string,
    icon:string,

}
 
export interface JobApplicationType{
    job_id:string,
    cv_path:File,
}

export interface ContextType{
    token:string,
    setToken:(token:string)=>void,
    search:string,
    setSearch:(value:string)=>void,
    company_id:string ,
    setCompanyId:(value:string)=>void,
}

export interface Auth{
    name?:string,
     email:string,
     password:string,
     password_confirmation?:string,
}

export interface Job{
    id:string,
    name:string,
    category_id:string,
    company_id:string,
    title:string,
    description:string,
    requirements:string,
    salary:string,
    location:string,
    deadline:Date,
    company:Company
}

export interface Company{
    id:string,
    name:string,
    description:string,
    location:string,
    logo:string,
    website:string,
    employer_id?:string,
    uploaded_jobs?:Job[]
}