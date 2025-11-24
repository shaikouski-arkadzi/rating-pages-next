import { JSX, useContext } from "react";
import cn from "classnames";
import Link from "next/link";
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
          <Link href={`/${m.route}`}>
            <div
              className={cn(styles.firstLevel, {
                [styles.firstLevelActive]: m.id == firstCategory,
              })}
            >
              {m.icon}
              <span>{m.name}</span>
            </div>
          </Link>
          {m.id == firstCategory && <SecondLevelMenu menuItem={m} />}
        </div>
      ))}
    </>
  );
}
