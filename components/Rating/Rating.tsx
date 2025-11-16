import { JSX, KeyboardEvent, useEffect, useState } from "react";
import { RatingProps } from "./Rating.props";
import StarIcon from "./star.svg";
import cn from "classnames";
import styles from "./Rating.module.css";

export const Rating = ({
  isEditable = false,
  rating,
  setRating,
  ...props
}: RatingProps): JSX.Element => {
  const [ratingArray, setRatingArray] = useState<JSX.Element[]>(
    new Array(5).fill(<></>),
  );

  useEffect(() => {
    constructRating(rating);
  }, [rating]);

  const constructRating = (currentRating: number) => {
    const updatedArray = ratingArray.map(
      (ratingElement: JSX.Element, ind: number) => {
        return (
          <span
            className={cn(styles.star, {
              [styles.filled]: ind < currentRating,
              [styles.editable]: isEditable,
            })}
            onMouseEnter={() => changeDisplay(ind + 1)}
            onMouseLeave={() => changeDisplay(rating)}
            onClick={() => onClick(ind + 1)}
          >
            <StarIcon
              tabIndex={isEditable ? 0 : -1}
              onKeyDown={(e: KeyboardEvent<SVGElement>) =>
                isEditable && handleSpace(ind + 1, e)
              }
            />
          </span>
        );
      },
    );
    setRatingArray(updatedArray);
  };

  const changeDisplay = (index: number) => {
    if (!isEditable) {
      return;
    }
    constructRating(index);
  };

  const onClick = (index: number) => {
    if (!isEditable || !setRating) {
      return;
    }
    setRating(index);
  };

  const handleSpace = (index: number, e: KeyboardEvent<SVGElement>) => {
    if (e.code != "Space" || !setRating) {
      return;
    }
    setRating(index);
  };

  return (
    <div {...props}>
      {ratingArray.map((ratingElement, ind) => (
        <span key={ind}>{ratingElement}</span>
      ))}
    </div>
  );
};
