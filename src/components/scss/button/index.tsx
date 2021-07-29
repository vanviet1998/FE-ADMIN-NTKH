import React from "react";
import { Button, ButtonProps } from "antd";
import { TYPE_BTN } from "common/enum";
import "./btn.styles.scss"

type ICusTomProps = {
  typebtn?: TYPE_BTN
}
type IProps = ButtonProps & ICusTomProps

export const UIButton: React.FC<IProps> = ({ children, ...props }) => {
  const type = props.typebtn ? props.typebtn : TYPE_BTN.success
  return (
    <Button {...props} className={`custom-btn ${props.className} ${type} `}>{children}</Button>
  );
};
