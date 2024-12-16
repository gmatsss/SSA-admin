import React, { useEffect } from "react";
import "./panel.css";
import FirstCol from "./component/FirstCol";
import SecondCol from "./component/SecondCol";

const Panel = () => {
  return (
    <div className="onerow">
      <FirstCol />
      <SecondCol />
    </div>
  );
};

export default Panel;
