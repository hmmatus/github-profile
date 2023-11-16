import Image from "next/image";
import styles from './CustomInput.module.scss';
type Props = {
  value: string;
  onChange(value: string): void;
  placeholder: string;
};
const CustomInput = ({ value, onChange, placeholder }: Props) => {
  const handleOnChange = (e) => {
    onChange(e.target.value);
  };
  return (
    <span className={styles.container}>
      <Image alt="Search" width={20} height={20} src={"./svg/Search.svg"} />
      <input
        type="input"
        placeholder={placeholder || "username"}
        value={value}
        onChange={handleOnChange}
      />
    </span>
  );
};

export default CustomInput;
