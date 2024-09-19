import { Await, useLoaderData, useAsyncValue } from "react-router-dom";
import { FormEvent, Suspense } from "react";
import Loader from "../components/Loader";
import { singleCardInterface, loaderDataInterface } from "../interface/interface";
import "../../css/SingleCard.css";
import { useState } from "react";
import { addToCart } from "../redux-toolkit/cartSlice";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

async function getSingleCard(id: number) {
  try {
    const response = await fetch(`https://shoes-app-back.onrender.com/api/items/${id}`);
    return response.json();
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Не удалось загрузить карточку товара",
      footer: "Попробуйте перезагрузить страницу",
    });
    throw new Error(`Ошибка ${error}`);
  }
}

export const oneCardLoader = async ({ params }: any) => {
  const id = params.id;
  const oneCard = await getSingleCard(id);
  return { oneCard };
};

const OneCardConstructor = () => {
  const dispatch = useDispatch();
  const oneCard = useAsyncValue() as singleCardInterface;

  const filteredSizes = oneCard.sizes
    .filter((item) => item.available)
    .map((size) => size.size);
  const [size, setSize] = useState("");
  const [count, setCount] = useState(1);

  const onAddToCart = (ev: FormEvent) => {
    ev.preventDefault();
    const price = oneCard.price;
    const name = oneCard.title;
    const id = oneCard.id;
    dispatch(addToCart({ name, price, count, size, id }));
  };

  return (
    <>
      <div className="single-card" key={oneCard.id}>
        <h1 className="single-card-title">{oneCard.title}</h1>
        <div className="single-card-main">
          <div className="single-card-img-container">
            <img
              className="single-card-img"
              src={oneCard.images[0]}
              alt={oneCard.title}
            />
          </div>

          <div className="single-card-info">
            <div className="single-card-info-wrapper">
              <ul className="info-wrapper info-left">
                <li className="info">Артикул</li>
                <li className="info">Производитель</li>
                <li className="info">Цвет</li>
                <li className="info">Материалы</li>
                <li className="info">Сезон</li>
                <li className="info">Повод</li>
              </ul>
              <ul className="info-wrapper info-right">
                <li className="info">{oneCard.sku}</li>
                <li className="info">{oneCard.manufacturer}</li>
                <li className="info">{oneCard.color}</li>
                <li className="info">{oneCard.material}</li>
                <li className="info">{oneCard.season}</li>
                <li className="info">{oneCard.reason}</li>
              </ul>
            </div>

            <form
              className="add-to-cart-form"
              style={{ width: "100%" }}
              onSubmit={onAddToCart}
            >
              <div className="single-card-sizes">
                Размеры в наличии:
                {filteredSizes.map((el: string) => {
                  return (
                    <label
                      className={el === size ? "size current-size" : "size"}
                      key={oneCard.id}
                    >
                      <input
                        type="checkbox"
                        className={"cart-checkbox"}
                        key={oneCard.id}
                        onClick={() => setSize(el === size ? "" : el)}
                        required
                      />
                      <span className="checkbox-custom"></span>
                      {el}
                    </label>
                  );
                })}
              </div>
              <div className="single-card-counter">
                Количество:
                {
                  <div className="counter">
                    <div
                      className="counter-operation counter-subtract"
                      onClick={() => setCount(count - (count === 1 ? 0 : 1))}
                    >
                      -
                    </div>
                    <div className="counter-number">{count}</div>
                    <div
                      className="counter-operation counter-add"
                      onClick={() => setCount(count + 1)}
                    >
                      +
                    </div>
                  </div>
                }
              </div>
              <input
                type="submit"
                className="add-to-cart"
                value={"В корзину"}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};



export default function SingleCard() {
  const loaderData = useLoaderData();
  const { oneCard } = loaderData as loaderDataInterface
  

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
              <Suspense fallback={<Loader />}>
                <Await resolve={oneCard}>
                  <OneCardConstructor />
                </Await>
              </Suspense>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
