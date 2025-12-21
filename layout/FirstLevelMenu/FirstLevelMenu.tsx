import { JSX, useContext } from "react";
import cn from "classnames";
import Link from "next/link";
import { AppContext } from "../../context/app.context";
import { SecondLevelMenu } from "../SecondLevelMenu/SecondLevelMenu";
import { firstLevelMenu } from "../../helpers/helpers";
import styles from "./FirstLevelMenu.module.css";

export function FirstLevelMenu(): JSX.Element {
  const { firstCategory } = useContext(AppContext);

  return (
    <ul className={styles.firstLevelList}>
      {firstLevelMenu.map((m) => (
        <li key={m.route} aria-expanded={m.id == firstCategory}>
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
        </li>
      ))}
    </ul>
  );
}
