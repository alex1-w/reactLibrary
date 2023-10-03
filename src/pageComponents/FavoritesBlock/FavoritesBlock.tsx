import styles from "./FavoritesBlock.module.scss";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../providers/UserProvider";
import { Container } from "../../components/Container/Container";
import { CartBookItem } from "../../components/elements/CartBookItem/CartBookItem";
import { Pagination } from "../../components/elements/Pagination/Pagination";
import { IBook } from "../../types/IBookItem";

export const FavoritesBlock = () => {
  const { user } = useContext(UserContext);
  const [page, setPage] = useState<IBook[]>([]);

  console.log(user.favorites, page);

  useEffect(() => {
    setPage(user.favorites.slice(0, 5));
  }, []);

  return (
    <Container>
      <section className={styles.main}>
        <div className={styles.booksBlock}>
          {page ? (
            <div className={styles.favoriteBlock}>
              {page.map((book) => (
                <CartBookItem book={book} />
              ))}
            </div>
          ) : (
            <div className={styles.empty}>
              <h2>пусто...</h2>
            </div>
          )}
        </div>

        <Pagination books={user.favorites} setPage={setPage} bookInPage={5} />
      </section>
    </Container>
  );
};
