import { ChangeEvent } from "react";
import "./styles.scss";
import { InputProps } from "./types";
import InputLabel from "../InputLabel/InputLabel";

const Input = ({ onChange, value, type = "number", label }: InputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };
  return (
    <div className="input-container">
      {label && <InputLabel value={label} />}
      <input
        className="input-field"
        type={type}
        onChange={handleChange}
        value={value}
      />
    </div>
  );
};

export default Input;
