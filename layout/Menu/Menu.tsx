import { JSX } from "react";
import { FirstLevelMenu } from "../FirstLevelMenu/FirstLevelMenu";

export const Menu = (): JSX.Element => {
  return (
    <nav role="navigation">
      <FirstLevelMenu />
    </nav>
  );
};
