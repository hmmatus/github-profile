"use client";
import { useState } from "react";
import CustomInput from "@/components/elements/inputs/CustomInput/CustomInput";
import styles from "./HomeLayout.module.scss";
import InformationTag from "@/components/elements/tags/InformationTag/InformationTag";

const HomeLayout = () => {
  const [searchValue, setSearchValue] = useState("");
  const onChangeSearchValue = (value: string) => {
    setSearchValue(value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <CustomInput value={searchValue} onChange={onChangeSearchValue} />
      </div>
      <div className={styles["profile-header"]}>
        <div className={styles["image-container"]}>
          <img
            src={"https://avatars.githubusercontent.com/u/9919?v=4"}
            className={styles["profile-img"]}
            alt="Profile Image"
          />
        </div>
        <div className={styles["tags-container"]}>
          <div className={styles.tags}>
            <InformationTag label="Followers" value="123" />
            <InformationTag label="Following" value="0" />
            <InformationTag label="Location" value="San Francisto, CA" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeLayout;
