import { useState } from "react";
import DropDownItem from "./DropDownItem";

function DropDown({ data }) {
  const [curOpen, setCurOpen] = useState();
  return (
    <div>
      <DropDownItem></DropDownItem>
    </div>
  );
}

export default DropDown;
