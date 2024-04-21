import "../../css/MainPage.css";
import { useLoaderData, Await, useAsyncValue } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Suspense } from "react";
import Loader from "../components/Loader";
import Card from "../components/Card";
import { setCategory } from "../redux-toolkit/categorySlice";
import { cardInterface } from "../interface/interface";
import { categoryInterface } from "../interface/interface";

async function getTopSales() {
  const response = await fetch("http://localhost:7070/api/top-sales");
  return response.json();
}

async function getItems() {
  const response = await fetch("http://localhost:7070/api/items");
  return response.json();
}

async function getCategoryItems() {
  const response = await fetch("http://localhost:7070/api/categories");
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

const ItemsConstructor = () => {
  const items = useAsyncValue();
  return (
    <>
      <div className="catalog-items">
        {items.map((el: cardInterface) => {
          return (
            <Card
              key={el.id}
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

const CategoryConstructor = () => {
  const dispatch = useDispatch();
  const category = useSelector((state: unknown) => state.category.currCategory);
  const categoryItems = useAsyncValue();

  const setCategoryCB = (settingCategory: string) => {
    dispatch(setCategory({ settingCategory }));
  };

  return (
    <ul className="catalog-params-list">
      <li
        className={
          category === "Все"
            ? "catalog-param catalog-param-active"
            : "catalog-param"
        }
        onClick={() => {
          setCategoryCB("Все");
        }}
      >
        Все
      </li>
      {categoryItems.map((el: categoryInterface) => {
        return (
          <li
            className={
              category === el.title
                ? "catalog-param catalog-param-active"
                : "catalog-param"
            }
            onClick={() => {
              setCategoryCB(el.title);
            }}
            key={el.id}
          >
            {el.title}
          </li>
        );
      })}
    </ul>
  );
};

export const postLoader = async () => {
  let sales = getTopSales();
  let catalog = getItems();
  let category = getCategoryItems();
  return { sales, catalog, category };
};

export default function MainPage() {
  const { sales, catalog, category } = useLoaderData();

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
                  <ItemsConstructor />
                </Await>
              </Suspense>
              <div className="btn-loadMore btn-template">Загрузить ещё</div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}





{
  /* <script>
// TODO: replace it with React!
const searchEl = document.querySelector('[data-id=search-expander]');
const searchFormEl = document.querySelector('[data-id=search-form]');
searchEl.addEventListener('click', () => {
    searchFormEl.classNameList.toggle('invisible');
    searchFormEl.querySelector('input').focus();
});
</script> */
}
