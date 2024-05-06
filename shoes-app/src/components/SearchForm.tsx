import { FormEvent } from "react";
import { useSelector } from "react-redux";
import "./../../css/SearchForm.css";

const onSubmit = () => {};

export default function SearchForm() {
  const searchState = useSelector((state: unknown) => state.main.searchState);

  return (
    <>
      <form
        data-id="search-form"
        className={`header-controls-search-form form-inline ${
          searchState ? "invisible" : ""
        }`}
        onSubmit={(ev: FormEvent) => {}}
      >
        <input className="form-control" placeholder="Поиск" />
      </form>
    </>
  );
}
