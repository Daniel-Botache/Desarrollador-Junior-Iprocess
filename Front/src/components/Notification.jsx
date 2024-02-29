import React from "react";

const Notification = ({ mensaje, tipo }) => {
  return <div className={`notification ${tipo}`}>{mensaje}</div>;
};

export default Notification;
