import { createContext, JSX, ReactNode, useState } from "react";
import { MenuItem } from "../interfaces/menu.interfaces";
import { Category } from "../interfaces/page.interface";

export interface IAppContext {
  menu: MenuItem[];
  firstCategory: Category;
  setMenu?: (newMenu: MenuItem[]) => void;
}

export const AppContext = createContext<IAppContext>({
  menu: [],
  firstCategory: Category.Courses,
});

export const AppContextProvider = ({
  menu,
  firstCategory,
  children,
}: IAppContext & {
  children: ReactNode;
}): JSX.Element => {
  const [menuState, setMenuState] = useState<MenuItem[]>(menu);
  const setMenu = (newMenu: MenuItem[]) => {
    setMenuState(newMenu);
  };

  return (
    <AppContext.Provider value={{ menu: menuState, firstCategory, setMenu }}>
      {children}
    </AppContext.Provider>
  );
};
