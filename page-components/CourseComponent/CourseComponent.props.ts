import { Category, PageModel } from "../../interfaces/page.interface";
import { ProductModel } from "../../interfaces/product.interface";

export interface CourseComponentProps {
  firstCategory: Category;
  page: PageModel;
  products: ProductModel[];
}
