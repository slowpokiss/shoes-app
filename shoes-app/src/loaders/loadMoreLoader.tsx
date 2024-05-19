import { useEffect, useState } from "react";
import { cardInterface } from "../interface/interface";
import { setOffset } from "../redux-toolkit/mainSlice";
import Card from "../components/Card";
import { useDispatch } from "react-redux";

// http://localhost:7070/api/items?categoryId=X&offset=6
// http://localhost:7070/api/items?offset=6

interface pathInterface {
  path: {
    offset: number;
    id: number | string
  };
};

export async function getMoreItems(id: number | string, offset: number) {
  //console.log(id, offset);
  
  let path = `http://localhost:7070/api/items`;
  if (id !== 10) {
    if (offset <= 6) {
      path = `http://localhost:7070/api/items?categoryId=${id}`;
    } else {
      path = `http://localhost:7070/api/items?categoryId=${id}&offset=6`
    }
  }
  if (typeof id === "string") {
    path = `http://localhost:7070/api/items?q=${id}`;
  }

  const data = await fetch(path);

  const response = await data.json();
  return response;
}

export const LoadMoreConstructor = ({path}: pathInterface) => {
  const [items, setItems] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      console.log(path.offset);
      
      const data = await getMoreItems(path.id, path.offset);
      //console.log(data.length);
      
      const settingOffset = data.length
      dispatch(setOffset({ settingOffset }))
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
