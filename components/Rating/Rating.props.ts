import { DetailedHTMLProps, HTMLAttributes, JSX } from "react";
import { FieldError } from "react-hook-form";

export interface RatingProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isEditable?: boolean;
  rating: number;
  setRating?: (rating: number) => void;
  error?: FieldError;
}

export interface RatingItem {
  key: number;
  element: JSX.Element;
}
