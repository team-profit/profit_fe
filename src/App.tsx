import { RouterProvider } from "react-router-dom"
import { router } from "./router"
import { GlobalStyle } from "./design-token"

export const App = () => {
  return (
    <div>
      <RouterProvider router={router}/>
      <GlobalStyle/>
    </div>
  )
}