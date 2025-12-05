import { JSX, useContext } from "react";
import cn from "classnames";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { FirstLevelMenuItem } from "../../interfaces/menu.interface";
import { AppContext } from "../../context/app.context";
import { ThirdLevelMenu } from "../ThirdLevelMenu/ThirdLevelMenu";
import styles from "./SecondLevelMenu.module.css";

export function SecondLevelMenu({
  menuItem,
}: {
  menuItem: FirstLevelMenuItem;
}): JSX.Element {
  const { menu, setMenu } = useContext(AppContext);
  const router = useRouter();

  const variants = {
    visible: {
      marginBottom: 12,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    hidden: { marginBottom: 7 },
  };

  const openSecondLevel = (secondCategory: string) => {
    setMenu &&
      setMenu(
        menu.map((m) => {
          if (m._id.secondCategory == secondCategory) {
            m.isOpened = !m.isOpened;
          }
          return m;
        }),
      );
  };

  return (
    <div className={styles.secondBlock}>
      {menu.map((m) => {
        if (m.pages.map((p) => p.alias).includes(router.asPath.split("/")[2])) {
          m.isOpened = true;
        }
        return (
          <div key={m._id.secondCategory}>
            <motion.div
              layout
              variants={variants}
              initial={m.isOpened ? "visible" : "hidden"}
              animate={m.isOpened ? "visible" : "hidden"}
              className={styles.secondLevel}
              onClick={() => openSecondLevel(m._id.secondCategory)}
            >
              {m._id.secondCategory}
            </motion.div>
            <div
              className={cn(styles.secondLevelBlock, {
                [styles.secondLevelBlockOpened]: m.isOpened,
              })}
            >
              <ThirdLevelMenu pages={m.pages} route={menuItem.route} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
