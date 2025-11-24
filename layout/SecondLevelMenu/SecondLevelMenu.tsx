import { JSX, useContext } from "react";
import cn from "classnames";
import { useRouter } from "next/router";
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

  console.log(router);

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
            <div
              className={styles.secondLevel}
              onClick={() => openSecondLevel(m._id.secondCategory)}
            >
              {m._id.secondCategory}
            </div>
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
