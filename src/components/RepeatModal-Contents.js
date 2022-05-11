import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import Box from "./Box";
import "./RepeatModal-Contents.css";
import { CompactPicker } from "react-color";

function RepeatModalContents({ setSelectedOptions }) {
  const [warpThreading, setWarpThreading] = useState(true);
  const [warpColor, setWarpColor] = useState(true);
  const [warpStartPosition, setWarpStartPosition] = useState(1);
  const [warpEndPosition, setWarpEndPosition] = useState(1);
  const [weftThreading, setWeftThreading] = useState(true);
  const [weftColor, setWeftColor] = useState(true);
  const [weftStartPosition, setWeftStartPosition] = useState(1);
  const [weftEndPosition, setWeftEndPosition] = useState(1);
  useEffect(() => {
    setSelectedOptions({
      warpThreading,
      warpColor,
      warpStartPosition,
      warpEndPosition,
      weftThreading,
      weftColor,
      weftStartPosition,
      weftEndPosition,
    });
  }, [
    warpThreading,
    warpColor,
    warpStartPosition,
    warpEndPosition,
    weftThreading,
    weftColor,
    weftStartPosition,
    weftEndPosition,
  ]);
  return (
    <div className="repeatModal">
      <div>
        <div className="repeatModalRow">
          <input
            type="checkbox"
            id="warp-threading"
            checked={warpThreading}
            onChange={(e) => setWarpThreading(e.target.checked)}
          />
          <label htmlFor="warp-threading">Threading</label>
          <input
            type="checkbox"
            id="warp-color"
            checked={warpColor}
            onChange={(e) => setWarpColor(e.target.checked)}
          />
          <label htmlFor="warp-color">Warp Color</label>
        </div>
        <div className="repeatSource">
          <div className="repeatPositionWrapper">
            <label htmlFor="warp-startPosition">Start Position</label>
            <input
              className="repeatPosition"
              type="number"
              id="warp-startPosition"
              value={warpStartPosition}
              onChange={(e) => setWarpStartPosition(e.target.valueAsNumber)}
            />
          </div>
          <div className="repeatPositionWrapper">
            <label htmlFor="warp-endPosition">End Position</label>
            <input
              className="repeatPosition"
              type="number"
              id="warp-endPosition"
              value={warpEndPosition}
              onChange={(e) => setWarpEndPosition(e.target.valueAsNumber)}
            />
          </div>
        </div>
      </div>
      <div>
        <div className="repeatModalRow">
          <input
            type="checkbox"
            id="weft-threading"
            value={weftThreading}
            onChange={(e) => setWeftThreading(e.target.checked)}
          />
          <label htmlFor="weft-threading">Threading</label>
          <input
            type="checkbox"
            id="weft-color"
            value={weftColor}
            onChange={(e) => setWeftColor(e.target.checked)}
          />
          <label htmlFor="weft-color">Weft Color</label>
        </div>
        <div className="repeatSource">
          <div className="repeatPositionWrapper">
            <label htmlFor="weft-startPosition">Start Position</label>
            <input
              className="repeatPosition"
              type="number"
              id="weft-startPosition"
              checked={weftStartPosition}
              onChange={(e) => setWeftStartPosition(e.target.valueAsNumber)}
            />
          </div>
          <div className="repeatPositionWrapper">
            <label htmlFor="weft-endPosition">End Position</label>
            <input
              className="repeatPosition"
              type="number"
              id="weft-endPosition"
              checked={weftEndPosition}
              onChange={(e) => setWeftEndPosition(e.target.valueAsNumber)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default RepeatModalContents;
