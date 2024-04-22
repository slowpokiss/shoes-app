import { useDispatch, useSelector } from "react-redux";
import { Suspense, useEffect, useState } from "react";
import { cardInterface } from "../interface/interface";
import Card from "../components/Card";

export async function getItems(id: number) {
  let path;
  id === 10
  ? (path = `http://localhost:7070/api/items`)
  : (path = `http://localhost:7070/api/items?categoryId=${id}`);

  const response = await fetch(path);
  return await response.json();
}

export const ItemsConstructor = ({ path }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getItems(path);
      setItems(data);
    }
    fetchData();
  }, [path]);

  return (
    <>
      <div className="catalog-items">
        {items.map((el: cardInterface) => {
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