import { JSX, useContext } from "react";
import cn from "classnames";
import { FirstLevelMenuItem } from "../../interfaces/menu.interface";
import { AppContext } from "../../context/app.context";
import { ThirdLevelMenu } from "../ThirdLevelMenu/ThirdLevelMenu";
import styles from "./SecondLevelMenu.module.css";

export function SecondLevelMenu({
  menuItem,
}: {
  menuItem: FirstLevelMenuItem;
}): JSX.Element {
  const { menu } = useContext(AppContext);

  return (
    <div className={styles.secondBlock}>
      {menu.map((m) => (
        <div key={m._id.secondCategory}>
          <div className={styles.secondLevel}>{m._id.secondCategory}</div>
          <div
            className={cn(styles.secondLevelBlock, {
              [styles.secondLevelBlockOpened]: m.isOpened,
            })}
          >
            <ThirdLevelMenu pages={m.pages} route={menuItem.route} />
          </div>
        </div>
      ))}
    </div>
  );
}
