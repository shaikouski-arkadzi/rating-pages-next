import { JSX, useState } from "react";
import { FirstLevelMenu } from "../FirstLevelMenu/FirstLevelMenu";
import { StatusList } from "../../interfaces/menu.interface";

export const Menu = (): JSX.Element => {
  const [announce, setAnnounce] = useState<StatusList>();

  return (
    <nav role="navigation">
      {announce && (
        <span role="log" className="visualyHidden">
          {announce == "opened" ? "развернуто" : "свернуто"}
        </span>
      )}
      <FirstLevelMenu setAnnounce={setAnnounce} />
    </nav>
  );
};
