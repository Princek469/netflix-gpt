import Login from "./Login";
import Browse from "./Browse";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";




function Body(){
    const appRouter = createBrowserRouter([
        {
            path : "/",
            element : <Login/>
        },
        {
            path: "/browse",
            element : <Browse />
        }
    ])

            
    return (
        <div>
            {/* router functionality is avilable inside my react application */}
           <RouterProvider router={appRouter}></RouterProvider>
        </div>
    )
}

export default Body;