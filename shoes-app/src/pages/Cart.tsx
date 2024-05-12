import "./../../css/Cart.css";
import { Link } from "react-router-dom";
import { deleteItem, updateState } from "../redux-toolkit/cartSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

// http://localhost:7070/api/order.

interface cartItem {
  name: string;
  size: number;
  count: number;
  price: string;
  id: number;
}

export default function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state: unknown) => state.cartSlice.cart);
  let totalCount = useSelector((state: unknown) => state.cartSlice.totalPrice);

  totalCount = String(totalCount).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
  function ActualCart() {
    if (cart.length > 0) {
      return (
        <table className="table table-bordered">
          <thead>
            <tr className="cart-item">
              <th scope="col">#</th>
              <th scope="col">Название</th>
              <th scope="col">Размер</th>
              <th scope="col">Кол-во</th>
              <th scope="col">Стоимость</th>
              <th scope="col">Итого</th>
              <th scope="col">Действия</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((el: cartItem, ind: number) => {
              const divPrice = String(el.price).replace(
                /(\d)(?=(\d{3})+(?!\d))/g,
                "$1 "
              );
              const divSumPrice = String(Number(el.price) * el.count).replace(
                /(\d)(?=(\d{3})+(?!\d))/g,
                "$1 "
              );

              return (
                <tr key={el.id}>
                  <td scope="row">{ind + 1}</td>
                  <td>
                    <Link to={`/catalog/${el.id}`}>{el.name}</Link>
                  </td>
                  <td>{el.size}</td>
                  <td>{el.count}</td>
                  <td>{divPrice} руб.</td>
                  <td>{divSumPrice} руб.</td>
                  <td>
                    <button
                      onClick={() => {
                        const id = el.id;
                        dispatch(deleteItem({ id }));
                      }}
                      className="btn-template btn-template-red"
                    >
                      Удалить
                    </button>
                  </td>
                </tr>
              );
            })}
            <tr>
              <td colSpan={5} className="text-right">
                Общая стоимость
              </td>
              <td>{totalCount} руб.</td>
            </tr>
          </tbody>
        </table>
      );
    }

    return "Корзина пуста";
  }

  return (
    <main className="container">
      <div className="row">
        <div className="col">
          <div className="banner">
            <img
              src="./img/banner.jpg"
              className="img-fluid"
              alt="К весне готовы!"
            />
            <h2 className="banner-header">К весне готовы!</h2>
          </div>
          <section className="cart">
            <h2 className="text-center">Корзина</h2>
            <ActualCart />
          </section>
          <section className="order">
            <h2 className="text-center">Оформить заказ</h2>
            <div className="order-body">
              <form className="order-form">
                <div className="form-group">
                  <label htmlFor="phone">Телефон</label>
                  <input
                    className="form-input form-control"
                    id="phone"
                    placeholder="Ваш телефон"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Адрес доставки</label>
                  <input
                    className="form-input form-control"
                    id="address"
                    placeholder="Адрес доставки"
                    required
                  />
                </div>
                <div className="form-group form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="agreement"
                    required
                  />
                  <label className="form-check-label" htmlFor="agreement">
                    Согласен с правилами доставки
                  </label>
                </div>
                <input
                  className="btn-template"
                  type="submit"
                  value={"Оформить"}
                  id=""
                />
              </form>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
