
import { createBrowserRouter, RouterProvider } from 'react-router'
import Layout from './Layout/Layout'
import Home from './Pages/Home'
import { ContextProvider } from './Context/context'
import Login from './Pages/Auth/Login'
import Register from './Pages/Auth/Register'
import AllCompanies from './Pages/AllCompanies'
import JobByCategory from './Pages/JobByCategory'
import CompanyHome from './Pages/Company/CompanyHome'
import CompanyLayout from './Pages/Company/CompanyLayout'
import CompanyLogin from './Pages/Company/CompanyLogin'
import CompanyRegister from './Pages/Company/CompanyRegister'
import { loadAllCategories, loadHomepageData } from './Loaders/homepage'
import SelectedCategory from './Pages/SelectedCategory'
import { loadSelectedCategoryJob } from './Loaders/selectedCategoryPage'
import SpecificJob from './Pages/SpecificJob'
import { loadSpecificJob } from './Loaders/specificJobPage'
import { loadAllCompany } from './Loaders/allCompanyPage'
import SpecificCompany from './Pages/SpecificCompany'
import { loadCompanyWithJob } from './Loaders/specificCompanyPage'
import { ApplyJobAction } from './Actions/applyJob'

const App = () => {


  const router=createBrowserRouter([

   {
    path:"/",
    element:<Layout/>,
    children:[
      {
        index:true,
        element:<Home/>,
        loader:loadHomepageData,
      },
      {
        path:"/login",
        element:<Login/>,
      },
      {
        path:"/register",
        element:<Register/>
      },
      {
        path:"/allcompanies",
        element:<AllCompanies/>,
        loader:loadAllCompany
      },
       {
        path:"/allcompanies/:id",
        element:<SpecificCompany/>,
        loader:loadCompanyWithJob
        
      },
      {
        path:"/jobbycategory",
        element:<JobByCategory/>,
        loader:loadAllCategories
      },
      {
        path:"/category/:categoryId",
        element:<SelectedCategory/>,
        loader:loadSelectedCategoryJob,
      },
      {
          path:"/userJobs/:id",
        element:<SpecificJob/>,
        loader:loadSpecificJob,
        action:ApplyJobAction
      },
    ]
   },
   {
                
        path:"/compaines",
        element:<CompanyLayout/>,
        children:[
          {
            index:true,
            element:<CompanyHome/>
          },
         {

          path:"companylogin",
          element:<CompanyLogin/>
         },
         {
          path:"companyregister",
          element:<CompanyRegister/>
         }
        
        ]
   }

  ])
  return (
   <ContextProvider >
     <RouterProvider router={router}/>
    </ContextProvider>
  )
}

export default App