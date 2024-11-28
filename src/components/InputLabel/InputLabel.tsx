import { InputLabelProps } from "./types";
import "./styles.scss";

const InputLabel = ({ value }: InputLabelProps) => {
  return <label className="input-label">{value}</label>;
};

export default InputLabel;
