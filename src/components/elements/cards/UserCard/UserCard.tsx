import Image from "next/image";
import React from "react";
import styles from "./UserCard.module.scss";
import { UserI } from "@/models/user.model";

type Props = {
  user: UserI | null;
  loading: boolean;
  onPress(user: UserI): void;
};

const UserCard = ({ user, loading, onPress }: Props) => {
  if (loading) {
    return (
      <div className={styles["search-card"]}>
      <h3>Loading</h3>
    </div>
    )
  }

  if (!user) {
    return (
      <div className={styles["search-card"]}>
        <h2>No results</h2>
      </div>
    );
  }
  return (
    <div className={styles["search-card"]} onClick={() => onPress(user)}>
      <Image src={user.avatar_url || ''} alt="logo" width={80} height={80} />
      <div className={styles["search-card-info"]}>
        <h2>{user.name}</h2>
        <p>{user.bio}</p>
      </div>
    </div>
  );
};

export default UserCard;
