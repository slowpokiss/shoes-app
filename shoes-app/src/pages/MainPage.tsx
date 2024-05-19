import "../../css/MainPage.css";
import { useLoaderData, Await, useAsyncValue } from "react-router-dom";
import { useSelector } from "react-redux";
import { Suspense } from "react";
import Loader from "../components/Loader";
import Card from "../components/Card";
import { cardInterface } from "../interface/interface";
import { getCategoryItems, CategoryConstructor } from "../loaders/categoryLoader";
import { ItemsConstructor, getItems } from "../loaders/itemsLoader";

async function getTopSales() {
  const response = await fetch("http://localhost:7070/api/top-sales");
  return response.json();
}

const SalesConstructor = () => {
  const topSales = useAsyncValue();

  return (
    <>
      <div className="top-sales-cards">
        {topSales.map((el: cardInterface) => {
          return (
            <Card
              key={el.id}
              id={el.id}
              images={el.images}
              title={el.title}
              price={el.price}
            />
          );
        })}
      </div>
    </>
  );
};


export const postLoader = async () => {
  let sales = getTopSales();
  let catalog = getItems(10, 6);
  let category = getCategoryItems();
  return { sales, catalog, category };
};


export default function MainPage() {
  //const [loading, setLoading] = useState()
  
  const { sales, catalog, category } = useLoaderData();
  const currCategory = useSelector(
    (state: unknown) => state.main.currCategory
  );

  return (
    <>
      <main className="container">
        <div className="row">
          <div className="col">
            <div className="banner">
              <img
                src="../img/banner.jpg"
                className="img-fluid"
                alt="К весне готовы!"
              />
              <h2 className="banner-header">К весне готовы!</h2>
            </div>
            <section className="top-sales">
              <h2 className="text-center">Хиты продаж!</h2>
              <Suspense fallback={<Loader />}>
                <Await resolve={sales}>
                  <SalesConstructor />
                </Await>
              </Suspense>
            </section>
            <section className="catalog">
              <h2 className="text-center">Каталог</h2>
              <div className="catalog-params">
                <Suspense fallback={<Loader />}>
                  <Await resolve={category}>
                    <CategoryConstructor />
                  </Await>
                </Suspense>
              </div>
              <Suspense fallback={<Loader />}>
                <Await resolve={catalog}>
                  <ItemsConstructor path={currCategory} />
                </Await>
              </Suspense>
              <div className="btn-loadMore btn-template"> Загрузить ещё</div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
