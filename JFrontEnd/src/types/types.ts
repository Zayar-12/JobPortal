
export interface Category{
    id:string,
    name:string,
    slug:string,
    icon:string,

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
    deadline:Date
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