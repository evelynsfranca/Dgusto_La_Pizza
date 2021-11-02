import { groupBy } from 'lodash';
import styles from './CategoriesList.module.css';

export function CategoriesList({ data }) {
  const list = data.content.filter(it => it.productCategory != null).map(category => category.productCategory)

  const handlerClick = () => {
    console.log('handlerClick')
  }

  return (Object.keys(groupBy(list, 'name')).map((item, index) => {
    return (<li key={index} className={[styles.listItem, "flex-sm-fill text-sm-center nav-link "].join(' ')}>
      <a className={styles.itemLink} href={"/menu/" + item.toLowerCase()}>
        {item}
      </a>
    </li>)
  }))
}

export default CategoriesList;