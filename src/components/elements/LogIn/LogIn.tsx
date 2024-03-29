import styles from "./LogIn.module.scss";
import { ChangeEvent, FC, useState, useContext } from "react";
import { useSnackbar } from "notistack";
import { TfiClose } from "react-icons/tfi";
import { SignIn } from "../SignIn/SignIn";
import { IFormState } from "../../../types/IFormState";
import { IUser } from "../../../types/IBookItem";
import { UserContext } from "../../../providers/UserProvider";

export const LogIn: FC<{ closeBtn: () => void }> = ({ closeBtn }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { setIsLogin, setUser } = useContext(UserContext);

  const [pageVariant, setPageVariant] = useState<"login" | "signin">("login");
  const changePageVariantsHandler = (variants: "login" | "signin") =>
    setPageVariant(variants);
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setFormState({ ...formState, [e.target.name]: e.target.value });

  const [formState, setFormState] = useState<IFormState>({
    name: "",
    password: "",
  });

  function logIn() {
    if (!formState.name.length)
      return enqueueSnackbar("заполните пустое поле", { variant: "error" });
    if (formState.name.length < 4)
      return enqueueSnackbar("никнейм не может быть меньше 4-х символов", {
        variant: "error",
      });
    if (formState.password.length < 6)
      return enqueueSnackbar("пароль не может быть меньше 6-ти символов", {
        variant: "error",
      });

    const users = JSON.parse(localStorage.getItem("users") ?? "[]");
    const userInUsersLS = users.find(
      (item: IUser) => item.name === formState.name
    );
    if (!userInUsersLS)
      return enqueueSnackbar("пользователь не найден", { variant: "error" });

    if (
      formState.name === userInUsersLS.name &&
      formState.password === userInUsersLS.password
    ) {
      enqueueSnackbar("Вход выполнен", { variant: "success" });
      localStorage.setItem("user", JSON.stringify(userInUsersLS));
      setUser(userInUsersLS);

      return setIsLogin(true);
    }
  }

  return (
    <div className={styles.main}>
      <button className={styles.closeBtn} onClick={closeBtn}>
        <TfiClose size={20} />
      </button>

      <div className={styles.loginAndSignin}>
        <button onClick={() => changePageVariantsHandler("login")}>
          <p>Log in</p>
        </button>

        <button onClick={() => changePageVariantsHandler("signin")}>
          <p>Sign in</p>
        </button>
      </div>

      {pageVariant === "login" && (
        <div className={styles.inputBlock}>
          <input
            type="email"
            onChange={changeHandler}
            value={formState.name}
            name="name"
            placeholder="name"
          />
          <input
            type="password"
            onChange={changeHandler}
            value={formState.password}
            name="password"
            placeholder="password"
          />

          <button className={styles.enterBtn} onClick={logIn}>
            ENTER
          </button>
        </div>
      )}

      {pageVariant === "signin" && <SignIn />}
    </div>
  );
};
