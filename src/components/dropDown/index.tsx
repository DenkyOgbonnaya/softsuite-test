import React, { ReactNode, useState } from "react";
import styles from "./dropDown.module.scss";

export interface DropdownProps {
  render?: (expanded: boolean) => React.JSX.Element;
  children: ReactNode;
}
enum DropdownDisplay {
  hidden = "none",
  visible = "flex",
}
export default function Dropdown({ children, render }: DropdownProps) {
  const [display, setDisplay] = useState<DropdownDisplay>(
    DropdownDisplay.hidden
  );

  const toggleDisplay = () => {
    const newDisplay =
      display === DropdownDisplay.hidden
        ? DropdownDisplay.visible
        : DropdownDisplay.hidden;

    setDisplay(() => newDisplay);
  };

  const childrenNodes = React.Children.map(children, (child, index) => {
    if (index === 0) {
      if (React.isValidElement(child))
        return React.cloneElement(child, {
          ...child.props,
          onClick: toggleDisplay,
        });
    }
    return child;
  });

  const toggleButton = childrenNodes?.length ? childrenNodes[0] : null;

  const content = childrenNodes?.length ? childrenNodes.slice(1) : null;

  return (
    <>
      <div role="button">
        {" "}
       
         {toggleButton}
      </div>

      <div
        className={styles.dropdownContent}
        style={{ display }}
        aria-expanded={display === DropdownDisplay.visible ? true : false}
      >
        {content?.map((content, index) => (
          <div key={index}>{content}</div>
        ))}
      </div>
    </>
  );
}
