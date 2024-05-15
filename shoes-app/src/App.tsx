import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import '../../html/css/style.css'
import MainPage from "./pages/MainPage";
import Catalog from "./pages/Catalog";
import Navigation from "./pages/Navigation"; 
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import ErrorPage from "./pages/ErrorPage";
import SingleCard from "./pages/SingleCard";
import Cart from "./pages/Cart";
import { postLoader } from "./pages/MainPage";
import { oneCardLoader } from "./pages/SingleCard";
import { getFormData } from "./components/OrderForm";

const routerProv = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Navigation />}> 
          <Route path="/" loader={postLoader} element={<MainPage />}></Route>
          <Route path="/catalog" loader={postLoader} element={<Catalog />}></Route>
          <Route path="/catalog/:id" loader={oneCardLoader} element={<SingleCard />}></Route>
          <Route path="*" element={<ErrorPage />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/contacts" element={<Contacts />}></Route>
          <Route path="/cart" action={getFormData} element={<Cart />}></Route>
      </Route>
    </>
  )
);

function App() {
  return <RouterProvider router={routerProv}></RouterProvider>;
}

export default App
