
import { createBrowserRouter, RouterProvider } from 'react-router'
import Layout from './Layout/Layout'
import Home from './Pages/Home'
import { ContextProvider } from './Context/context'

const App = () => {


  const router=createBrowserRouter([

   {
    path:"/",
    element:<Layout/>,
    children:[
      {
        index:true,
        element:<Home/>,
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