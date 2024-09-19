import { useDispatch, useSelector,  } from "react-redux";
import { useAsyncValue } from "react-router-dom";
import { categoryInterface } from "../interface/interface";
import { initialMainSliceInterface, setCategory } from "../redux-toolkit/mainSlice";
import Swal from "sweetalert2";

export async function getCategoryItems() {
  try {
    const response = await fetch("https://shoes-app-back.onrender.com/api/categories");
    return response.json();
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Не удалось загрузить категории товаров",
    });
  }
}

export const CategoryConstructor = () => {
  const dispatch = useDispatch();
  const currCategoryId = useSelector((state: {main: initialMainSliceInterface}) => state.main.currCategory.id);
  const categoryItems = useAsyncValue() as categoryInterface[];
  
  const setCategoryCB = (settingCategory: number) => {
    dispatch(setCategory({ settingCategory }));
  };

  return (
    <ul className="catalog-params-list">
      <li
        className={
          currCategoryId === 10
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
              currCategoryId === el.id
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