import { JSX } from "react";
import cn from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { PageItem } from "../../interfaces/menu.interface";
import styles from "./ThirdLevelMenu.module.css";

export function ThirdLevelMenu({
  pages,
  route,
}: {
  pages: PageItem[];
  route: string;
}): JSX.Element {
  const router = useRouter();

  return (
    <>
      {pages.map((p) => (
        <Link
          href={`/${route}/${p.alias}`}
          className={cn(styles.thirdLevel, {
            [styles.thirdLevelActive]: `/${route}/${p.alias}` == router.asPath,
          })}
          key={p.category}
        >
          {p.category}
        </Link>
      ))}
    </>
  );
}
