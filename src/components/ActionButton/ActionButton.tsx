import type { FC, ButtonHTMLAttributes  } from "react";
import "./ActionButton.css";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

const ActionButton: FC<Props> = ({ children, ...rest }) => {
  return (
    <button className="action-button" {...rest}>
      {children}
    </button>
  );
};

export default ActionButton;