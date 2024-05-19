import { useEffect, useState } from "react";
import { cardInterface } from "../interface/interface";
import Card from "../components/Card";
import { setOffset, updateCurrOffset } from "../redux-toolkit/mainSlice";
import { useDispatch } from "react-redux";

interface pathInterface {
  path: {
    id: number | string;
  };
}

export async function getItems(id: number | string) {
  let path = `http://localhost:7070/api/items`;
  if (id !== 10) {
    path = `http://localhost:7070/api/items?categoryId=${id}`;
  }
  if (typeof id === "string") {
    path = `http://localhost:7070/api/items?q=${id}`;
  }
  const data = await fetch(path);
  const response = await data.json();
  return response;
}

export const ItemsConstructor = ({ path }: pathInterface) => {
  const [items, setItems] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      const data = await getItems(path.id);
      const settingOffset = data.length;
      const offset = data.length;
      dispatch(setOffset({ settingOffset }));
      dispatch(updateCurrOffset({ offset }));
      setItems(data);
    }
    fetchData();
  }, [path.id]);

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
