import { JSX } from "react";
import { CourseComponentProps } from "./CourseComponent.props";

export const CourseComponent = ({
  page,
  products,
  firstCategory,
}: CourseComponentProps): JSX.Element => {
  return <>{products && products.length}</>;
};
