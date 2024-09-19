import { useLoaderData, Await } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Suspense, FormEvent, useRef } from "react";
import Loader from "../components/Loader";
import { CategoryConstructor } from "../loaders/categoryLoader";
import { ItemsConstructor } from "../loaders/itemsLoader";
import {
  initialMainSliceInterface,
  setCategory,
} from "../redux-toolkit/mainSlice";
import LoadMore from "../components/LoadMore";
import { loaderDataInterface } from "../interface/interface";
import "../../css/MainPage.css";



export default function Catalog() {
  const dispatch = useDispatch();
  const loaderData = useLoaderData()
  const { catalog, category } = loaderData as loaderDataInterface;


  const currCategory = useSelector(
    (state: { main: initialMainSliceInterface }) => state.main.currCategory
  );
  const inputRef = useRef<HTMLInputElement | null>(null);

  if (inputRef.current && typeof currCategory.id === "string") {
    inputRef.current.value = String(currCategory.id);
  }

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault();

    const form = ev.target as HTMLFormElement;
    const settingCategory = (
      form.elements.namedItem("mainForm") as HTMLInputElement
    ).value;
    dispatch(setCategory({ settingCategory }));
  };

  return (
    <>
      <main className="container">
        <div className="row">
          <div className="col">
            <div className="banner">
              <img
                src="../shoes-app/img/banner.jpg"
                className="img-fluid"
                alt="К весне готовы!"
              />
              <h2 className="banner-header">К весне готовы!</h2>
            </div>
            <section className="catalog">
              <h2 className="text-center">Каталог</h2>
              <form
                className="catalog-search-form form-inline"
                onSubmit={onSubmit}
              >
                <input
                  className="form-control"
                  name="mainForm"
                  placeholder="Поиск"
                  ref={inputRef}
                />
              </form>
              <ul className="catalog-categories nav justify-content-center">
                <Suspense fallback={<Loader />}>
                  <Await resolve={category}>
                    <CategoryConstructor />
                  </Await>
                </Suspense>
              </ul>
              <div className="row">
                <Suspense fallback={<Loader />}>
                  <Await resolve={catalog}>
                    <ItemsConstructor path={currCategory} />
                  </Await>
                </Suspense>
                <LoadMore currCategory={currCategory} />
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
