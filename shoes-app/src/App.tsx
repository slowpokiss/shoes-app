import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  LoaderFunction,
  LoaderFunctionArgs,
  Routes
} from "react-router-dom";
import '../../html/css/style.css'
import MainPage from "./pages/MainPage";
import Catalog from "./pages/Catalog";
import Navigation from "./pages/Navigation"; 
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import ErrorPage from "./pages/ErrorPage";
import { postLoader } from "./pages/MainPage";



const routerProv = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Navigation />}> 
          <Route path="/" loader={postLoader} element={<MainPage />}></Route>
          <Route path="/catalog" element={<Catalog />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/contacts" element={<Contacts />}></Route>
          <Route path="*" element={<ErrorPage />}></Route>
      </Route>
    </>
  )
);

function App() {
  return <RouterProvider router={routerProv}></RouterProvider>;
}

export default App
