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
}: {
  pages: PageItem[];
  route: string;
}): JSX.Element {
  const router = useRouter();

  const variantsChildren = {
    visible: {
      opacity: 1,
      height: 29,
    },
    hidden: { opacity: 0, height: 0 },
  };

  return (
    <>
      {pages.map((p) => (
        <motion.div key={p._id} variants={variantsChildren}>
          <Link
            href={`/${route}/${p.alias}`}
            className={cn(styles.thirdLevel, {
              [styles.thirdLevelActive]:
                `/${route}/${p.alias}` == router.asPath,
            })}
            key={p.category}
          >
            {p.category}
          </Link>
        </motion.div>
      ))}
    </>
  );
}
