import styles from "./Button.module.scss";
import { FC } from "react";
import cn from "classnames";

export interface IBtnProps {
  name: string;
  link?: string;
  variant?: "bookSliderItemBtn" | "btnLink";
  className?: string;
}

export const Button: FC<IBtnProps> = ({
  name,
  link,
  className,
  variant,
}: IBtnProps) => {
  return (
    <a
      href={link}
      className={cn(className, styles.main, {
        [styles.btnLink]: variant === "btnLink",
        [styles.bookSliderItemBtn]: variant === "bookSliderItemBtn",
      })}
    >
      <p>{name}</p>
    </a>
  );
};
