import Image from "next/image";
import styles from "./CustomInput.module.scss";
import { getProfile } from "@/api/profile";
import { useEffect, useState } from "react";
import UserCard from "../../cards/UserCard/UserCard";
import { UserI } from "@/models/user.model";
type Props = {
  placeholder?: string;
  
};
const SearchUserInput = ({ placeholder }: Props) => {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [showCard, setShowCard] = useState(false);
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  async function onBlur() {
    setLoading(true);
    try {
      const res = await getProfile(value);
      setUser(res);
    } catch (error) {
      console.log("🚀 ~ file: SearchUserInput.tsx:18 ~ onBlur ~ error:", error)
    } finally {
      setLoading(false);
      setShowCard(true);
    }
  }
  function onPressCard (user: UserI) {
    console.log(user)
  }
  return (
    <section className={styles.container}>
      <span className={styles['input-container']}>
        <Image
          alt="Search"
          width={20}
          height={20}
          src={"./images/svg/Search.svg"}
        />
        <input
          className={styles.input}
          type="input"
          placeholder={placeholder || "username"}
          value={value}
          onChange={handleOnChange}
          onBlur={onBlur}
        />
      </span>
      {showCard && <UserCard loading={loading} user={user} onPress={onPressCard}/>}
    </section>
  );
};

export default SearchUserInput;
