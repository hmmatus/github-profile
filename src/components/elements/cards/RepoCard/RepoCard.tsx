import { RepoI } from "@/models/repo.model";
import Image from "next/image";
import styles from "./RepoCard.module.scss";
import { formatRelativeDate } from "@/utils/formatRelativeDate";
type Props = {
  repo: RepoI;
  onClick(): void;
}
const RepoCard = ({
  repo,
  onClick
}: Props) => {
  const {  name,
    description,
    forks,
    watchers,
    license,
    updated_at} = repo;
  const formattedDate = formatRelativeDate(updated_at);
  return (
    <div className={styles.container} onClick={onClick}>
      <h4 className={styles['name-text']}>{name}</h4>
      <p className={styles['description-text']}>{description}</p>
      <div className={`${styles.flex} ${styles.row}`}>
        {license && (
          <div className={`${styles.flex} ${styles.ai} ${styles.jc}`}>
            <Image width={30} height={30} alt="License" src={"/images/svg/license.svg"} />
            <p className={styles['description-text']}>{license.key.toLocaleUpperCase()}</p>
          </div>
        )}
        <div className={`${styles.flex} ${styles.ai} ${styles.jc} ${styles['mh-10']}`}>
          <Image width={30} height={30} alt="Forks" src={"/images/svg/forks.svg"} />
          <p className={`${styles['text-align-center']} ${styles['description-text']}`}>{forks}</p>
        </div>
        <div className={`${styles.flex} ${styles.ai} ${styles.jc}`}>
          <Image width={30} height={30} alt="Star" src={"/images/svg/star.svg"} />
          <p className={styles['description-text']}>{watchers}</p>
        </div>
        <p className={styles['description-text']}>{formattedDate}</p>
      </div>
    </div>
  );
};

export default RepoCard;
