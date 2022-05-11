import { useContext, useState, memo } from "react";
import { MouseContext } from "../App";
import Box from "./Box";
import "./PatternBox.css";

function PatternBox({
  row,
  column,
  colorList,
  disableCilck = false,
  setList,
  whoAmI,
  currentCol,
  boxSize,
  mousePressed,
  setMousePressed,
}) {
  return (
    <div
      onMouseLeave={() => {
        setMousePressed?.(false);
      }}
      className={`pattern-box ${
        whoAmI === "treadles" || whoAmI === "main" || whoAmI === "treadlesColor"
          ? "direction-column"
          : ""
      }`}
    >
      {colorList.map((list, rowIdx) => {
        return (
          <div
            className={`pattern-row ${
              whoAmI === "shafts" ||
              whoAmI === "main" ||
              whoAmI === "shaftsColor"
                ? "direction-row"
                : ""
            }`}
            key={rowIdx}
          >
            {list.map((boxInfo, columnIdx) => {
              return (
                <Box
                  idx={columnIdx + rowIdx * column}
                  key={columnIdx}
                  boxInfo={boxInfo}
                  boxSize={boxSize}
                  disableClick={disableCilck}
                  mousePressed={
                    whoAmI === "shaftsColor" || whoAmI === "treadlesColor"
                      ? mousePressed
                      : undefined
                  }
                  setMousePressed={
                    whoAmI === "shaftsColor" || whoAmI === "treadlesColor"
                      ? setMousePressed
                      : undefined
                  }
                  onClick={() => {
                    setList?.((s) => {
                      const newS = [];
                      let row = -1;
                      let col = -1;
                      for (let i = 0; i < s.length; i++) {
                        const newArr = [];
                        for (let j = 0; j < s[0].length; j++) {
                          if (i === rowIdx && j === columnIdx) {
                            row = i;
                            col = j;
                          }
                          newArr.push({
                            ...s[i][j],
                          });
                        }
                        newS.push(newArr);
                      }
                      const isSelected = newS[row][col].isSelected;
                      if (whoAmI === "treadles") {
                        for (
                          let treadlesCol = 0;
                          treadlesCol < s[0].length;
                          treadlesCol++
                        ) {
                          newS[row][treadlesCol].isSelected = false;
                        }
                      }
                      if (whoAmI === "shafts") {
                        for (
                          let shaftsRow = 0;
                          shaftsRow < s.length;
                          shaftsRow++
                        ) {
                          newS[shaftsRow][col].isSelected = false;
                        }
                      }
                      if (["treadles", "shafts", "last"].includes(whoAmI)) {
                        newS[row][col].isSelected = !isSelected;
                      } else {
                        newS[row][col].isSelected = true;
                      }
                      if (currentCol) {
                        newS[row][col].color = currentCol;
                      }
                      return newS;
                    });
                  }}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
export default memo(PatternBox);
