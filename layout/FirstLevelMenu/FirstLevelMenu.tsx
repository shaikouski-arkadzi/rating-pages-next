import { JSX, useContext } from "react";
import cn from "classnames";
import { FirstLevelMenuItem } from "../../interfaces/menu.interface";
import { AppContext } from "../../context/app.context";
import { SecondLevelMenu } from "../SecondLevelMenu/SecondLevelMenu";
import styles from "./FirstLevelMenu.module.css";

export function FirstLevelMenu({
  firstLevelMenu,
}: {
  firstLevelMenu: FirstLevelMenuItem[];
}): JSX.Element {
  const { firstCategory } = useContext(AppContext);

  return (
    <>
      {firstLevelMenu.map((m) => (
        <div key={m.route}>
          <a href={`/${m.route}`}>
            <div
              className={cn(styles.firstLevel, {
                [styles.firstLevelActive]: m.id == firstCategory,
              })}
            >
              {m.icon}
              <span>{m.name}</span>
            </div>
          </a>
          {m.id == firstCategory && <SecondLevelMenu menuItem={m} />}
        </div>
      ))}
    </>
  );
}
