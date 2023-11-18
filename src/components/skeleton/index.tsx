import styles from "./skeleton.module.scss";
export function Skeleton() {
  return (
    <>
      <div className={styles.skeleton} />
    </>
  );
}

export function SkeletonCircle() {
    return (
      <>
        <div className={styles.circle} />
      </>
    );
  }

  export function SkeletonText() {
    return (
      <>
        <div className={styles.text} />
      </>
    );
  }
