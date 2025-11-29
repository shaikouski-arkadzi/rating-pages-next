import { JSX } from "react";
import { CourseInfoProps } from "./CourseInfo.props";
import { Htag, Tag, HhData } from "../../components";
import { Category } from "../../interfaces/page.interface";
import styles from "./CourseInfo.module.css";

export const CourseInfo = ({
  page,
  products,
  firstCategory,
}: CourseInfoProps): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <Htag tag="h1">{page.title}</Htag>
        {products && (
          <Tag color="grey" size="m">
            {products.length}
          </Tag>
        )}
        <span>Сортировка</span>
      </div>
      <div>
        {products && products.map((p) => <div key={p._id}>{p.title}</div>)}
      </div>
      <div className={styles.hhTitle}>
        <Htag tag="h2">Вакансии - {page.category}</Htag>
        <Tag color="red" size="m">
          hh.ru
        </Tag>
      </div>
      {firstCategory == Category.Courses && <HhData {...page.hh} />}
    </div>
  );
};
