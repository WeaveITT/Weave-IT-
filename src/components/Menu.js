import "./Menu.css";
import { PhotoshopPicker } from "react-color";
import { useState } from "react";
import { getRoles } from "@testing-library/react";
import { getRecord } from "./Back";
import backimage from "./images/back.png";
import colorsetimage from "./images/colorset.png";
import JPGdownimage from "./images/JPGdown.png";
import newimage from "./images/new.png";
import PNGdownimage from "./images/PNGdown.png";
import repeatimage from "./images/repeat.png";
import setimage from "./images/set.png";
import zoominimage from "./images/zoomin.png";
import zoomoutimage from "./images/zoomout.png";

function Menu({
  setShow,
  currentCol,
  setcurrentCol,
  setRepeatModalShow,
  onCapturePNG,
  onCaptureJPG,
  clearListRef,
  setBoxSize,
  datasRef,
}) {
  const [isColorPickerOpen, setisColorPickerOpen] = useState(false);
  const [color, setColor] = useState(currentCol);
  return (
    <div className="menu">
      <div className="menu-row">
        <div onClick={() => clearListRef.current()}>
          <img className="icon" src={newimage}></img>
        </div>
        <div
          onClick={() => {
            const {
              setTreadlesColList,
              setShaftsColList,
              setTreadlesList,
              setShaftsList,
              setLastList,
            } = datasRef.current;
            getRecord(
              setTreadlesList,
              setShaftsList,
              setTreadlesColList,
              setShaftsColList,
              setLastList
            );
          }}
        >
          <img className="icon" src={backimage}></img>
        </div>
      </div>
      <div className="menu-row">
        <div onClick={() => onCapturePNG()}>
          <img className="icon" src={PNGdownimage}></img>
        </div>
        <div onClick={() => setRepeatModalShow(true)}>
          <img className="icon" src={repeatimage}></img>
        </div>
      </div>
      <div className="menu-row">
        <div onClick={() => onCaptureJPG()}>
          <img className="icon" src={JPGdownimage}></img>
        </div>
        <div onClick={() => setBoxSize((s) => s + 1)}>
          <img className="icon" src={zoominimage}></img>
        </div>
      </div>
      <div className="menu-row">
        <div onClick={() => setShow(true)}>
          <img className="icon" src={setimage}></img>
        </div>
        <div onClick={() => setBoxSize((s) => s - 1)}>
          <img className="icon" src={zoomoutimage}></img>
        </div>
      </div>
      <div className="menu-row">
        <div></div>
        <div onClick={() => setisColorPickerOpen(true)}>
          <img className="icon" src={colorsetimage}></img>
        </div>
      </div>
      <PhotoshopPicker
        className={`photoshop-colPick ${isColorPickerOpen ? "open" : ""}`}
        color={color}
        onChangeComplete={(color) => setColor(color.hex)}
        onAccept={() => {
          setisColorPickerOpen(false);
          setcurrentCol(color);
        }}
        onCancel={() => setisColorPickerOpen(false)}
      />
    </div>
  );
}
export default Menu;
