import { useState } from "react";
import "./styles.scss";
import { SidepanelProps } from "./types";

const Sidepanel = ({ children }: SidepanelProps) => {
  const [open, setOpen] = useState(false);

  const toggleOpenState = () => {
    setOpen((e) => !e);
  };

  return (
    <div className={`sidepanel ${open ? "open" : ""}`}>
      <div className="sidepanel-toggle" onClick={toggleOpenState}>
        {open ? ">" : "<"}
      </div>
      <h3 className="sidepanel-title">Sidepanel</h3>
      {children}
    </div>
  );
};

export default Sidepanel;
