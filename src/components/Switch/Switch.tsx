import { useMemo, useRef } from "react";
import "./styles.scss";
import { SwitchProps } from "./types";

const Switch = ({ value, onChange }: SwitchProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const switchClassNames = `switch ${value ? "switch-toggled" : ""}`;

  const stringValue = useMemo(() => {
    return value ? "on" : "off";
  }, [value]);

  const handleClick = () => {
    onChange(!value);
    if (!inputRef.current) return;
    inputRef.current.focus();
  };

  return (
    <>
      <div className={switchClassNames} onClick={handleClick}>
        <input
          className="switch-input"
          value={stringValue}
          ref={inputRef}
          type="checkbox"
          onChange={handleClick}
        />
        <div className="switch-ball"></div>
      </div>
    </>
  );
};

export default Switch;
