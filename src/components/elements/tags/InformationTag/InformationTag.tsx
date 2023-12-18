import styles from './InformationTag.module.scss';
type Props = {
  label: string;
  value: string | number;
}
const InformationTag = ({label, value}: Props) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.label}>{label}</h3>
      <div className={styles.separator}></div>
      <p className={styles.value}>{value}</p>
    </div>
  )
}

export default InformationTag;