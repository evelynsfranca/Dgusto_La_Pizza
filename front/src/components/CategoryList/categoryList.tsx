import { groupBy } from 'lodash';
import Link from 'next/link';
import styles from './CategoriesList.module.css';

export function CategoriesList({ data }): any {
  const list =
    data
      .filter(it => it.productCategory != null)
      .map(category => category.productCategory)

  return (
    Object
      .keys(groupBy(list, 'name'))
      .map((item, index) => {
        return (
          <li
            key={index}
            className={[styles.listItem, "flex-sm-fill text-sm-center nav-link "].join(' ')}
          >
            <Link
              className={styles.itemLink}
              href={"/menu/" + item.toLowerCase()}
            >
              {item}
            </Link>
          </li>
        )
      })
  )
}

export default CategoriesList;