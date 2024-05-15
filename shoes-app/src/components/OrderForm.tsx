import { Form, useActionData } from "react-router-dom";
import { useDispatch } from "react-redux";
import CartPopup from "./CartPopup";
import Loader from "./Loader";
import { clearCart } from "../redux-toolkit/cartSlice";
import { useEffect, useRef, FormEvent } from "react";

interface props {
  submitting: boolean;
}

export default function OrderForm({submitting}: props) {
  const act = useActionData()
  const dispatch = useDispatch()

  useEffect(() => {
    if (act) {
      dispatch(clearCart());
    }
  }, [act, dispatch]);

  return (
    <>
    {submitting ? <Loader /> : null }
    <CartPopup formStatus={act} />
    <Form action='/cart' method="POST" className="order-form">
      <div className="form-group">
        <label htmlFor="phone">Телефон</label>
        <input
          className="form-input form-control" 
          id="phone"
          name="phone"
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
          name="address"
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
      <input className="btn-template" type="submit" value={"Оформить"} id="" />
    </Form>
    </>
  );
}

const apiOrder = async (data: any) => {
  try {
    const req = await fetch('http://localhost:7070/api/order', {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    });

    if (req.ok || req.status === 204) {
      return true
    } else {
      throw new Error('Что-то пошло не так');
    }
  } catch (error) {
    throw error;
  }
}


export const getFormData = async ({request}: any) => {
  if (!JSON.parse(localStorage.getItem("cart"))) {
    return null
  }

  const formData = await request.formData()
  const data = {
    owner: {
      phone: formData.get('phone'),
      address: formData.get('address'),
    },
    items: JSON.parse(localStorage.getItem("cart"))
  }

  const response = await apiOrder(data)
  return true
}