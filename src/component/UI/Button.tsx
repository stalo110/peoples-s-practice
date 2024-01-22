import React, { FC } from "react";
import { Link } from "react-router-dom";

type Props = {
  type?: "button" | "submit" | "reset" | undefined;
  classes: string;
  content: string;
  onClick?: unknown;
  loading?: boolean;
  btnDisabled?: boolean;
  icon?: string;
  title?: string;
  url?: string;
  route?: string;
  style?: any;
};

const Button: FC<Props> = (props) => {
  const {
    classes,
    onClick,
    loading,
    content,
    btnDisabled,
    icon,
    title,
    url,
    route,
    type,
    style,
    ...otherProps
  } = props;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function createRipple(event: any) {
    const button = event.target;

    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${
      button.clientX - event.target.offsetLeft - radius
    }px`;
    circle.style.top = `${button.clientY - event.target.offsetTop - radius}px`;
    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];

    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);
  }

  return (
    <button
      type={type}
      title={title ? title : ""}
      className={"btn" + (classes ? " " + classes : "")}
      onClick={
        typeof onClick == "function"
          ? (e) => {
              onClick?.();
              createRipple(e);
            }
          : (e) => createRipple(e)
      }
      disabled={loading || btnDisabled}
      {...otherProps}
      style={style}
    >
      <>
        {icon ? <span className={icon}></span> : null}
        {route ? <Link to={route}>{content}</Link> : null}
        {url ? <a href={url}>{content}</a> : null}
        {!route && !url && content}
        {loading ? (
          <span className="fas fa-spinner fa-pulse text-white"></span>
        ) : null}
      </>
    </button>
  );
};

export default Button;
