import { FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../redux-toolkit/mainSlice";
import "./../../css/SearchForm.css";


export default function SearchForm() {
  const searchState = useSelector((state: unknown) => state.main.searchState);
  const dispatch = useDispatch()

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault()
    const settingCategory = ev.target.search.value
    dispatch(setCategory({ settingCategory }));
    ev.target.search.value = ''
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
        <input name="search" className="form-control" placeholder="Поиск"  />
      </form>
    </>
  );
}
