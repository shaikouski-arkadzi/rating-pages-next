import {
  JSX,
  KeyboardEvent,
  useEffect,
  useState,
  forwardRef,
  ForwardedRef,
} from "react";
import { RatingProps, RatingItem } from "./Rating.props";
import StarIcon from "../../icons/star.svg";
import cn from "classnames";
import styles from "./Rating.module.css";

export const Rating = forwardRef(
  (
    { isEditable = false, rating, setRating, error, ...props }: RatingProps,
    ref: ForwardedRef<HTMLDivElement>,
  ): JSX.Element => {
    const INITIAL_ARRAY = new Array(5).fill(null).map((_, ind) => ({
      key: ind,
      element: <span key={ind}></span>,
    }));

    const [ratingArray, setRatingArray] = useState<RatingItem[]>(INITIAL_ARRAY);

    useEffect(() => {
      constructRating(rating);
    }, [rating]);

    const constructRating = (currentRating: number) => {
      const updatedArray = ratingArray.map((item) => ({
        key: item.key,
        element: (
          <span
            key={item.key}
            className={cn(styles.star, {
              [styles.filled]: item.key < currentRating,
              [styles.editable]: isEditable,
            })}
            onMouseEnter={() => changeDisplay(item.key + 1)}
            onMouseLeave={() => changeDisplay(rating)}
            onClick={() => onClick(item.key + 1)}
          >
            <StarIcon
              tabIndex={isEditable ? 0 : -1}
              onKeyDown={(e: KeyboardEvent<SVGElement>) =>
                isEditable && handleSpace(item.key + 1, e)
              }
            />
          </span>
        ),
      }));

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
      <div
        {...props}
        ref={ref}
        className={cn(styles.ratingWrapper, {
          [styles.error]: error,
        })}
      >
        {ratingArray.map((item) => (
          <span key={item.key}>{item.element}</span>
        ))}
        {error && <span className={styles.errorMessage}>{error.message}</span>}
      </div>
    );
  },
);
