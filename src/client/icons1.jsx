import IcomoonReact from "icomoon-react";
import React from "react";
import iconSet from "../client/_helpers/selection.json";

export default function IconSet({ color, size, icon, className, onClick }) {
  return (
    <IcomoonReact iconSet={iconSet} color={color} size={size} icon={icon} className={className} onClick={onClick} />
  );
}
