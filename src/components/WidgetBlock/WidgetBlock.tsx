import "./styles.scss";
import { WidgetBlockProps } from "./types";

const WidgetBlock = ({ children, title }: WidgetBlockProps) => {
  return (
    <div className="widget-block">
      <div className="widget-block-title">{title}</div>
      <div className="widget-block-content">{children}</div>
    </div>
  );
};

export default WidgetBlock;
