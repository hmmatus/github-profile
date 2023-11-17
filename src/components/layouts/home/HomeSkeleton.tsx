import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import styles from './HomeLayout.module.scss';
export default function HomeSkeleton() {
  return (
    <SkeletonTheme highlightColor="#f2f2f2">
    <div className={styles.container}>
      <div className={styles.header}>
        <Skeleton height={40} width={200} />
      </div>
      <div className={styles.profileHeader}>
        <div className={styles.imageContainer}>
          <Skeleton circle height={100} width={100} />
        </div>
        <div className={styles.tagsContainer}>
          <div className={styles.tags}>
            <Skeleton height={20} width={80} />
            <Skeleton height={20} width={80} />
            <Skeleton height={20} width={80} />
          </div>
        </div>
      </div>
      <div className={styles.bioContainer}>
        <Skeleton height={30} width={200} />
        <Skeleton height={60} width={300} />
      </div>
      <div className={styles.repoContainer}>
        <Skeleton height={100} width={300} count={3} />
      </div>
      <section>
        <Skeleton height={20} width={200} />
      </section>
    </div>
  </SkeletonTheme>
  )
}