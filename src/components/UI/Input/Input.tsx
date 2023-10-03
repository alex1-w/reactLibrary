import styles from "./Input.module.scss";
import { BsSearch } from "react-icons/bs";
import { useEffect, useState, ChangeEvent, useRef, useContext } from "react";
import { booksData } from "../../../data/MainPage.data";
import { motion } from "framer-motion";
import { IBook } from "../../../types/IBookItem";
import { InputDropdown } from "./InputDropdown/InputDropdown";
import { UserContext } from "../../../providers/UserProvider";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";

export const Input = () => {
  const { openDropdownName, setOpenDropdownName } = useContext(UserContext);
  const inputBlockRef = useRef<HTMLDivElement>(null);

  const [searchValue, setSearchValue] = useState<string>("");
  const [searchBooks, setSearchFilms] = useState<IBook[]>([]);
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setSearchValue(e.target.value);

  const getSearchBooks = () => {
    setSearchFilms(
      booksData.filter(
        (elements) => elements.title.toLowerCase().indexOf(searchValue) !== -1
      )
    );
    if (searchBooks.length) setOpenDropdownName("searchDropdown");
  };

  useEffect(() => {
    if (searchValue.length >= 2) getSearchBooks();
    if (searchValue === "") setOpenDropdownName(null);
  }, [searchValue]);

  const closeDropDown = () => setSearchValue("");
  const escapeEvent = (e: any) => {
    if (e.key === "Escape") setOpenDropdownName(null);
  };
  useOnClickOutside(inputBlockRef, closeDropDown);

  return (
    <div className={styles.main}>
      <div className={styles.inputBlock} onKeyDown={escapeEvent}>
        <BsSearch />
        <input
          type="text"
          placeholder="Поиск"
          value={searchValue}
          onChange={changeHandler}
        />
      </div>

      {openDropdownName === "searchDropdown" && (
        <motion.div className={styles.inputDropdown}>
          <InputDropdown searchBooks={searchBooks} />
        </motion.div>
      )}
    </div>
  );
};
