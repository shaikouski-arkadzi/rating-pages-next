import {
  JSX,
  KeyboardEvent,
  useEffect,
  useState,
  forwardRef,
  ForwardedRef,
  useRef,
} from "react";
import { RatingProps, RatingItem } from "./Rating.props";
import StarIcon from "../../icons/star.svg";
import cn from "classnames";
import styles from "./Rating.module.css";

export const Rating = forwardRef(
  (
    {
      isEditable = false,
      rating,
      setRating,
      error,
      tabIndex,
      ...props
    }: RatingProps,
    ref: ForwardedRef<HTMLDivElement>,
  ): JSX.Element => {
    const INITIAL_ARRAY = new Array(5).fill(null).map((_, ind) => ({
      key: ind,
      element: <span key={ind}></span>,
    }));

    const [ratingArray, setRatingArray] = useState<RatingItem[]>(INITIAL_ARRAY);

    const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([]);

    useEffect(() => {
      constructRating(rating);
    }, [rating, tabIndex]);

    const computeFocus = (r: number, i: number): number => {
      if (!isEditable) {
        return -1;
      }
      if (!rating && i == 0) {
        return tabIndex ?? 0;
      }
      if (r == i + 1) {
        return tabIndex ?? 0;
      }
      return -1;
    };

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
            tabIndex={computeFocus(rating, item.key)}
            onKeyDown={handleKey}
            ref={(el) => {
              ratingArrayRef.current[item.key] = el;
            }}
            aria-label={isEditable ? "Укажите рейтинг" : "рейтинг" + rating}
            role={isEditable ? "slider" : ""}
            aria-valuenow={rating}
            aria-valuemin={1}
            aria-valuemax={5}
          >
            <StarIcon />
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

    const handleKey = (e: KeyboardEvent) => {
      if (!isEditable || !setRating) {
        return;
      }
      if (e.code == "ArrowRight" || e.code == "ArrowUp") {
        if (!rating) {
          setRating(1);
        } else {
          e.preventDefault();
          setRating(rating < 5 ? rating + 1 : 5);
        }
        ratingArrayRef.current[rating]?.focus();
      }
      if (e.code == "ArrowLeft" || e.code == "ArrowDown") {
        e.preventDefault();
        setRating(rating > 1 ? rating - 1 : 1);
        ratingArrayRef.current[rating - 2]?.focus();
      }
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
