import "../../css/MainPage.css";
import { useLoaderData, Await, useAsyncValue } from "react-router-dom";
import { useSelector } from "react-redux";
import { Suspense } from "react";
import Loader from "../components/Loader";
import Card from "../components/Card";
import { cardInterface, loaderDataInterface} from "../interface/interface";
import {
  getCategoryItems,
  CategoryConstructor,
} from "../loaders/categoryLoader";
import { ItemsConstructor, getItems } from "../loaders/itemsLoader";
import LoadMore from "../components/LoadMore";
import Swal from "sweetalert2";
import { initialMainSliceInterface } from "../redux-toolkit/mainSlice";


async function getTopSales() {
  try {
    const response = await fetch("https://shoes-app-back.onrender.com/api/top-sales");
    return response.json();
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Не удалось загрузить хиты продаж",
    });
    console.log('error')
  }
}

const SalesConstructor = () => {
  const topSales = useAsyncValue() as cardInterface[];

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
  const sales = getTopSales();
  const catalog = getItems(10);
  const category = getCategoryItems();
  return { sales, catalog, category };
};

export default function MainPage() {
  const loaderData = useLoaderData()
  const { sales, catalog, category } = loaderData as loaderDataInterface;

  const currCategory = useSelector((state: {main: initialMainSliceInterface}) => state.main.currCategory);

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
              <LoadMore currCategory={currCategory} />
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
