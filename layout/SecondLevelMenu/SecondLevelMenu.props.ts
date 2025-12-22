import {
  DetailedHTMLProps,
  Dispatch,
  HTMLAttributes,
  SetStateAction,
} from "react";
import {
  FirstLevelMenuItem,
  StatusList,
} from "../../interfaces/menu.interface";

export interface SecondLevelMenuProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLUListElement>,
    HTMLUListElement
  > {
  setAnnounce: Dispatch<SetStateAction<StatusList>>;
  menuItem: FirstLevelMenuItem;
}
