import { JSX } from "react";
import cn from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { PageItem } from "../../interfaces/menu.interface";
import styles from "./ThirdLevelMenu.module.css";

export function ThirdLevelMenu({
  pages,
  route,
  isOpened,
}: {
  pages: PageItem[];
  route: string;
  isOpened: boolean;
}): JSX.Element {
  const router = useRouter();

  const variantsChildren = {
    visible: {
      opacity: 1,
      height: "auto",
    },
    hidden: { opacity: 0, height: 0 },
  };

  return (
    <>
      {pages.map((p) => (
        <motion.li key={p._id} variants={variantsChildren}>
          <Link
            tabIndex={isOpened ? 0 : -1}
            href={`/${route}/${p.alias}`}
            className={cn(styles.thirdLevel, {
              [styles.thirdLevelActive]:
                `/${route}/${p.alias}` == router.asPath,
            })}
            key={p.category}
            aria-current={
              `/${route}/${p.alias}` == router.asPath ? "page" : false
            }
          >
            {p.category}
          </Link>
        </motion.li>
      ))}
    </>
  );
}
