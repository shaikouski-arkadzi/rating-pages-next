import { Category, PageModel } from "../../interfaces/page.interface";
import { ProductModel } from "../../interfaces/product.interface";

export interface CourseInfoProps {
  firstCategory: Category;
  page: PageModel;
  products: ProductModel[];
}
