import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import Box from "./Box";
import "./OptionModal-Contents.css";
import { CompactPicker } from "react-color";

function OptionModalContents({ setSelectedOptions }) {
  const [warpColor, setWarpColor] = useState("#000000");
  const [weftColor, setWeftColor] = useState("#ffffff");
  const [shafts, setShafts] = useState(4);
  const [treadles, setTreadles] = useState(8);
  const [ends, setEnds] = useState(150);
  const [picks, setPicks] = useState(170);
  useEffect(() => {
    setSelectedOptions({ warpColor, weftColor, shafts, treadles, ends, picks });
  }, [warpColor, weftColor, shafts, treadles, ends, picks]);
  return (
    <div>
      <div className="OptionModalRow">
        <div>
          <span className="OptionalMargin">Shafts</span>
          <input
            type="number"
            max="20"
            min="2"
            value={shafts}
            onChange={(e) => {
              setShafts(e.target.valueAsNumber);
            }}
          />
        </div>
        <div>
          <span className="OptionalMargin">Treadles</span>
          <input
            type="number"
            max="20"
            min="2"
            value={treadles}
            onChange={(e) => {
              setTreadles(e.target.valueAsNumber);
            }}
          />
        </div>
      </div>
      <div className="OptionModalRow">
        <div>
          <span className="OptionalMargin">Ends</span>
          <input
            type="number"
            max="500"
            min="2"
            value={ends}
            onChange={(e) => {
              setEnds(e.target.valueAsNumber);
            }}
          />
        </div>
        <div>
          <span className="OptionalMargin">Picks</span>
          <input
            type="number"
            max="500"
            min="2"
            value={picks}
            onChange={(e) => {
              setPicks(e.target.valueAsNumber);
            }}
          />
        </div>
      </div>
      <div className="OptionModalRow">
        <CompactPicker
          color={warpColor}
          onChange={(color) => {
            setWarpColor(color.hex);
          }}
        />
      </div>
      <div className="OptionModalRow">
        <CompactPicker
          color={weftColor}
          onChange={(color) => {
            setWeftColor(color.hex);
          }}
        />
      </div>
    </div>
  );
}
export default OptionModalContents;
