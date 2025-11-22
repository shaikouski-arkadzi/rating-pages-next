import { JSX } from "react";
import cn from "classnames";
import { PageItem } from "../../interfaces/menu.interface";
import styles from "./ThirdLevelMenu.module.css";

export function ThirdLevelMenu({
  pages,
  route,
}: {
  pages: PageItem[];
  route: string;
}): JSX.Element {
  return (
    <>
      {pages.map((p) => (
        <a
          href={`/${route}/${p.alias}`}
          className={cn(styles.thirdLevel, {
            [styles.thirdLevelActive]: false,
          })}
          key={p.category}
        >
          {p.category}
        </a>
      ))}
    </>
  );
}
