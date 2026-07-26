
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
import { companyRegisterAction, createJobAction } from './Actions/company'

import UploadJob from './Pages/Company/UploadJob'
import Dashboard from './Pages/Company/Dashboard'
import CompanyJob from './Pages/Company/CompanyJob'
import { loadCompanyJobs } from './Loaders/companyJobs'
import SearchResults from './Pages/SearchResults'
import { searchJobsLoader } from './Loaders/searchJobs'
import Profile from './Pages/Profile/Profile'
import { jobApplicationsLoader, profileLoader } from './Loaders/profilePage'
import ProLayout from './Pages/Profile/ProLayout'
import JobApplications from './Pages/Profile/JobApplications'
import AdminHomeAdminDashboard from './Pages/Admin/AdminDashboard'
import AdminHome from './Pages/Admin/AdminHome'
import AdminManage from './Pages/Admin/AdminManage'
import AdminSpecificCompany from './Pages/Admin/AdminSpecificCompany'
import AdminSpecificJob from './Pages/Admin/AdminSpecificJob'
import PendingCompanies from './Pages/Admin/PendingCompanies'
import PendingJobs from './Pages/Admin/PendingJobs'


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
      {
  path: "/search-results",
  element: <SearchResults />,
  loader: searchJobsLoader, 
}, 


    ]
   },
   {
                
        path:"/companies",
        element:<CompanyLayout/>,
        children:[
          {
            index:true,
            element:<CompanyHome/>,

          },
         {

          path:"companylogin",
          element:<CompanyLogin/>
         },
         {
          path:"companyregister",
          element:<CompanyRegister/>,
          action:companyRegisterAction
         },
         {
          path:"dashboard",
          element:<Dashboard/>,
          // loader:loadCompanyWithJob

          
         },
         {
          path:"uploadJob",
          element:<UploadJob/>,
          loader:loadAllCategories,
          action:createJobAction
         },
          {
          path:"companyJobs/:id",
          element:<CompanyJob/>,
          loader:loadCompanyJobs

          
         },
        
        ]
   },{
    path:"/profile",
    element:<ProLayout/>,
    children:[
       {
            index:true,
            element:<Profile/>,
            loader:profileLoader

          },
          {
            path:"jobApplications",
            element:<JobApplications/>,
            loader:jobApplicationsLoader
          }
    ]

   },{
    path:"/admin",
    element:<AdminHomeAdminDashboard/>,
    children:[
      {
        index:true,
        element:<AdminHome/>
      },
      { path: "manage", element: <AdminManage /> },
     { path: "adminspecificCompany/:id", element: <AdminSpecificCompany /> , loader:loadCompanyWithJob},
    { path: "adminspecificJob/:id", element: <AdminSpecificJob />, loader:loadSpecificJob, },
     { path: "pendingcompanies", element: <PendingCompanies />,  },
      { path: "pendingjobs", element: <PendingJobs />, },

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