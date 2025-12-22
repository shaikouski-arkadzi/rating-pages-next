import {
  DetailedHTMLProps,
  Dispatch,
  HTMLAttributes,
  SetStateAction,
} from "react";
import { StatusList } from "../../interfaces/menu.interface";

export interface FirstLevelMenuProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLUListElement>,
    HTMLUListElement
  > {
  setAnnounce: Dispatch<SetStateAction<StatusList>>;
}
