import { HTMLInputTypeAttribute } from "react";

export type InputProps = {
  onChange: (value: number | string | undefined) => void | undefined;
  value: number | undefined;
  type?: HTMLInputTypeAttribute;
  label?: string;
};
