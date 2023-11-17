import Image from "next/image";
import styles from './CustomInput.module.scss';
type Props = {
  value: string;
  onChange(value: string): void;
  placeholder?: string;
  onBlur(): void;
};
const CustomInput = ({ value, onChange, placeholder, onBlur }: Props) => {
  const handleOnChange = (e) => {
    onChange(e.target.value);
  };
  return (
    <span className={styles.container}>
      <Image alt="Search" width={20} height={20} src={"./images/svg/Search.svg"} />
      <input
        className={styles.input}
        type="input"
        placeholder={placeholder || "username"}
        value={value}
        onChange={handleOnChange}
        onBlur={onBlur}
      />
    </span>
  );
};

export default CustomInput;
