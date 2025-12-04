import { DetailedHTMLProps, HTMLAttributes, JSX } from "react";

export interface RatingProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isEditable?: boolean;
  rating?: number;
  setRating?: (rating: number) => void;
}

export interface RatingItem {
  key: number;
  element: JSX.Element;
}
