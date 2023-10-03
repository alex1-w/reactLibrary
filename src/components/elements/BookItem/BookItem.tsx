import styles from "./BookItem.module.scss";
import { FC, useContext, useState } from "react";
import { UserContext } from "../../../providers/UserProvider";
import { IBook } from "../../../types/IBookItem";
import { Button } from "../../UI/Button/Button";
import { enqueueSnackbar } from "notistack";

export const BookItem = ({ book }: { book: IBook }) => {
  const { user, setUser } = useContext(UserContext);
  const [isLike, setIsLike] = useState<boolean>(
    Boolean(user.favorites?.find((item) => item.id === book.id))
  );

  const putInPlace = (book: IBook, place: "favorites" | "cart") => {
    const isUserInLS = localStorage.getItem("user");
    const usersLS = JSON.parse(localStorage.getItem("users") ?? "[]");

    if (isUserInLS) {
      const userLS = JSON.parse(isUserInLS);
      const isBookInPlace = user[place].find(
        (item: any) => item.id === book.id
      );
      const userInUsersLS = usersLS.find(
        (item: any) => item.name === user.name
      );

      if (!isBookInPlace) {
        userLS[place].unshift(book);
        userInUsersLS[place].unshift(book);

        const newUsersLS = usersLS.filter(
          (item: any) => item.name !== userInUsersLS.name
        );
        newUsersLS.push(userInUsersLS);
        localStorage.setItem("users", JSON.stringify(newUsersLS));

        if (place === "favorites") setIsLike(true);
        localStorage.setItem("user", JSON.stringify(userLS));

        setUser({
          ...user,
          [place]: [...user[place], book],
        });
        return enqueueSnackbar(
          `Добавлена в ${place === "cart" ? "корзину" : "избранное"}`,
          { variant: "info" }
        );
      }

      if (place === "favorites") setIsLike(false);
      setUser({
        ...user,
        [place]: user[place].filter((item: IBook) => item.id !== book.id),
      });

      userLS[place] = userLS[place].filter(
        (item: IBook) => item.id !== book.id
      );
      localStorage.setItem("user", JSON.stringify(userLS));

      const newUsersLs = usersLS.filter(
        (item: any) => item.name !== userInUsersLS.name
      );
      newUsersLs.push(userLS);
      localStorage.setItem("users", JSON.stringify(newUsersLs));
      console.log(newUsersLs);

      return enqueueSnackbar("Удалена из избранного", { variant: "info" });
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.wrapper}>
        <img src={book.image} alt="" />

        <div className={styles.aboutBook}>
          <h3>{book.title}</h3>
          <h4>{book.author}</h4>
          <h5>{book.categoryId}</h5>
        </div>

        <div className={styles.interractBook}>
          <div>
            <p>Цена:</p> {book.price}
          </div>
          <div onClick={() => putInPlace(book, "cart")}>
            <Button name="Удалить из корзины" />
          </div>
        </div>
      </div>
    </div>
  );
};
