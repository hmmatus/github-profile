"use client";
import { useState } from "react";
import CustomInput from "@/components/elements/inputs/CustomInput/CustomInput";
import styles from "./HomeLayout.module.scss";

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
    </div>
  );
};

export default HomeLayout;
