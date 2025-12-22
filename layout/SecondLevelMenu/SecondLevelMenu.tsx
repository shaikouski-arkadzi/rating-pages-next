import { JSX, useContext, KeyboardEvent } from "react";
import cn from "classnames";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { AppContext } from "../../context/app.context";
import { ThirdLevelMenu } from "../ThirdLevelMenu/ThirdLevelMenu";
import { SecondLevelMenuProps } from "./SecondLevelMenu.props";
import styles from "./SecondLevelMenu.module.css";

export function SecondLevelMenu({
  setAnnounce,
  menuItem,
}: SecondLevelMenuProps): JSX.Element {
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
            setAnnounce(m.isOpened ? "closed" : "opened");
            m.isOpened = !m.isOpened;
          }
          return m;
        }),
      );
  };

  const openSecondLevelKey = (key: KeyboardEvent, secondCategory: string) => {
    if (key.code == "Space" || key.code == "Enter") {
      key.preventDefault();
      openSecondLevel(secondCategory);
    }
  };

  return (
    <ul className={styles.secondBlock}>
      {menu.map((m) => {
        if (m.pages.map((p) => p.alias).includes(router.asPath.split("/")[2])) {
          m.isOpened = true;
        }
        return (
          <li key={m._id.secondCategory}>
            <div
              className={styles.secondLevel}
              onClick={() => openSecondLevel(m._id.secondCategory)}
              tabIndex={0}
              onKeyDown={(key: KeyboardEvent) =>
                openSecondLevelKey(key, m._id.secondCategory)
              }
              aria-expanded={m.isOpened}
            >
              {m._id.secondCategory}
            </div>
            <motion.ul
              layout
              variants={variants}
              initial={m.isOpened ? "visible" : "hidden"}
              animate={m.isOpened ? "visible" : "hidden"}
              className={cn(styles.secondLevelBlock, {
                [styles.secondLevelBlockOpened]: m.isOpened,
              })}
            >
              <ThirdLevelMenu
                pages={m.pages}
                route={menuItem.route}
                isOpened={m.isOpened ?? false}
              />
            </motion.ul>
          </li>
        );
      })}
    </ul>
  );
}
