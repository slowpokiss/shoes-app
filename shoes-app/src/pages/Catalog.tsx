import "../../css/MainPage.css";
import { useLoaderData, Await, useAsyncValue } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Suspense, useEffect, useState } from "react";
import Loader from "../components/Loader";
import { getCategoryItems, CategoryConstructor } from "../loaders/categoryLoader";
import { ItemsConstructor, getItems } from "../loaders/itemsLoader";



export default function Catalog() {
  const { catalog, category } = useLoaderData();
  const currCategory = useSelector(
    (state: unknown) => state.category.currCategory
  );


  return (<>
    <main className="container">
      <div className="row">
        <div className="col">
          <div className="banner">
            <img src="./img/banner.jpg" className="img-fluid" alt="К весне готовы!" />
            <h2 className="banner-header">К весне готовы!</h2>
          </div>
          <section className="catalog">
            <h2 className="text-center">Каталог</h2>
            <form className="catalog-search-form form-inline">
              <input className="form-control" placeholder="Поиск" />
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
            </div>

            <div className="btn-loadMore btn-template">
              Загрузить ещё
            </div>
          </section>
        </div>
      </div>
    </main>
    
    {/* <script>
      // TODO: replace it with React!
      const searchEl = document.querySelector('[data-id=search-expander]');
      const searchFormEl = document.querySelector('[data-id=search-form]');
      searchEl.addEventListener('click', () => {
          searchFormEl.classNameList.toggle('invisible');
          searchFormEl.querySelector('input').focus();
      });
    </script> */}
    </>
  )
}