import { useDispatch, useSelector,  } from "react-redux";
import { useAsyncValue } from "react-router-dom";
import { categoryInterface } from "../interface/interface";
import { setCategory } from "../redux-toolkit/mainSlice";

export async function getCategoryItems() {
  const response = await fetch("http://localhost:7070/api/categories");
  return response.json();
}

export const CategoryConstructor = () => {
  const dispatch = useDispatch();
  const category = useSelector((state: unknown) => state.main.currCategory);
  const categoryItems = useAsyncValue();

  const setCategoryCB = (settingCategory: number) => {
    dispatch(setCategory({ settingCategory }));
  };

  return (
    <ul className="catalog-params-list">
      <li
        className={
          category === 10
            ? "catalog-param catalog-param-active"
            : "catalog-param"
        }
        onClick={() => {
          setCategoryCB(10);
        }}
      >
        Все
      </li>
      {categoryItems.map((el: categoryInterface) => {
        return (
          <li
            className={
              category === el.id
                ? "catalog-param catalog-param-active"
                : "catalog-param"
            }
            onClick={() => {
              setCategoryCB(el.id);
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