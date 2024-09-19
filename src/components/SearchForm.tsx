import { FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initialMainSliceInterface, setCategory } from "../redux-toolkit/mainSlice";
import "./../../css/SearchForm.css";
import { redirect } from "react-router-dom";

export default function SearchForm() {
  const searchState = useSelector((state: {main: initialMainSliceInterface}) => state.main.searchState);
  const dispatch = useDispatch();

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault();

    const form = ev.target as HTMLFormElement;
    const searchElement = form.elements.namedItem("search") as HTMLInputElement | null;

    if (searchElement) {
      const settingCategory = searchElement.value;
      dispatch(setCategory({ settingCategory }));
      searchElement.value = "";
      return redirect("/shoes-app/catalog");
    }
  };

  return (
    <>
      <form
        data-id="search-form"
        className={`header-controls-search-form form-inline ${
          searchState ? "invisible" : ""
        }`}
        onSubmit={onSubmit}
      >
        <input name="search" className="form-control" placeholder="Поиск" />
      </form>
    </>
  );
}
