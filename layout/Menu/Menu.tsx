import { JSX } from "react";
import { FirstLevelMenuItem } from "../../interfaces/menu.interface";
import { Category } from "../../interfaces/page.interface";
import CoursesIcon from "../../icons/courses.svg";
import ServicesIcon from "../../icons/services.svg";
import BooksIcon from "../../icons/books.svg";
import ProductsIcon from "../../icons/products.svg";
import { FirstLevelMenu } from "../FirstLevelMenu/FirstLevelMenu";

const firstLevelMenu: FirstLevelMenuItem[] = [
  {
    route: "courses",
    name: "Курсы",
    icon: <CoursesIcon />,
    id: Category.Courses,
  },
  {
    route: "services",
    name: "Сервисы",
    icon: <ServicesIcon />,
    id: Category.Services,
  },
  {
    route: "books",
    name: "Книги",
    icon: <BooksIcon />,
    id: Category.Books,
  },
  {
    route: "products",
    name: "Продукты",
    icon: <ProductsIcon />,
    id: Category.Products,
  },
];

export const Menu = (): JSX.Element => {
  return <FirstLevelMenu firstLevelMenu={firstLevelMenu} />;
};
