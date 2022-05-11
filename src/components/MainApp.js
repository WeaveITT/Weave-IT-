import { MouseContext } from "../App";
import { useEffect, useState, useContext, useMemo } from "react";
import "./MainApp.css";
import PatternBox from "./PatternBox";
import { addRecord } from "./Back";
import Header from "./Header";
import { useLocation } from "react-router-dom";

function MainApp({
  options,
  currentCol,
  repeatModaloptions,
  clearListRef,
  boxSize,
}) {
  const shafts = options.shafts;
  const treadles = options.treadles;
  const ends = options.ends;
  const picks = options.picks;
  const { mousePressed, setMousePressed } = useContext(MouseContext);
  const [treadlesColList, setTreadlesColList] = useState(
    Array(picks).fill([{ isSelected: true, color: options.weftColor }])
  );
  const [shaftsColList, setShaftsColList] = useState(
    Array(1).fill(
      Array(ends).fill({ isSelected: true, color: options.warpColor })
    )
  );
  const [treadlesList, setTreadlesList] = useState(
    Array(picks).fill(
      Array(treadles).fill({ isSelected: false, color: "black" })
    )
  );
  const [shaftsList, setShaftsList] = useState(
    Array(shafts).fill(Array(ends).fill({ isSelected: false, color: "black" }))
  );
  const [lastList, setLastList] = useState(
    Array(shafts).fill(
      Array(treadles).fill({ isSelected: false, color: "black" })
    )
  );
  datasRef.current = {
    setTreadlesColList,
    setShaftsColList,
    setTreadlesList,
    setShaftsList,
    setLastList,
  };
  function clearList() {
    setTreadlesList(
      Array(picks).fill(
        Array(treadles).fill({ isSelected: false, color: "black" })
      )
    );
    setShaftsList(
      Array(shafts).fill(
        Array(ends).fill({ isSelected: false, color: "black" })
      )
    );
    setLastList(
      Array(shafts).fill(
        Array(treadles).fill({ isSelected: false, color: "black" })
      )
    );
  }
  useEffect(() => {
    clearListRef.current = clearList;
  }, [shafts, ends, treadles, picks]);
  useEffect(() => {
    setTreadlesColList(
      Array(picks).fill([{ isSelected: true, color: options.weftColor }])
    );
  }, [picks, options.weftColor]);
  useEffect(() => {
    setShaftsColList(
      Array(1).fill(
        Array(ends).fill({ isSelected: true, color: options.warpColor })
      )
    );
  }, [ends, options.warpColor]);
  useEffect(() => {
    setTreadlesList(
      Array(picks).fill(
        Array(treadles).fill({ isSelected: false, color: "black" })
      )
    );
  }, [picks, treadles]);
  useEffect(() => {
    setShaftsList(
      Array(shafts).fill(
        Array(ends).fill({ isSelected: false, color: "black" })
      )
    );
  }, [ends, shafts]);
  useEffect(() => {
    setLastList(
      Array(shafts).fill(
        Array(treadles).fill({ isSelected: false, color: "black" })
      )
    );
  }, [shafts, treadles]);
  const {
    warpThreading,
    warpStartPosition,
    warpEndPosition,
    warpColor,
    weftThreading,
    weftStartPosition,
    weftEndPosition,
    weftColor,
  } = repeatModaloptions;

  useEffect(() => {
    if (warpThreading) {
      let repeatList = [];
      for (let col = warpStartPosition - 1; col <= warpEndPosition - 1; col++) {
        let founded = false;
        for (let row = 0; row < shaftsList.length; row++) {
          if (shaftsList[row][col].isSelected) {
            founded = true;
            repeatList.push({ ...shaftsList[row][col], row });
            break;
          }
        }
        if (!founded) {
          repeatList.push({
            ...shaftsList[0][col],
            row: -1,
          });
        }
      }
      let repeatIdx = 0;
      for (let col = warpStartPosition - 1; col < shaftsList[0].length; col++) {
        let nowRepeat = repeatList[repeatIdx];
        for (let row = 0; row < shaftsList.length; row++) {
          if (nowRepeat.row === row) {
            shaftsList[row][col] = { ...nowRepeat, row: undefined };
            repeatIdx++;
            repeatIdx %= repeatList.length;
          } else {
            shaftsList[row][col] = {
              ...nowRepeat,
              row: undefined,
              isSelected: false,
            };
          }
        }
        if (nowRepeat.row === -1) {
          repeatIdx++;
          repeatIdx %= repeatList.length;
        }
      }
      setShaftsList(JSON.parse(JSON.stringify(shaftsList)));
    }
  }, [repeatModaloptions]);

  useEffect(() => {
    if (warpColor) {
      let repeatList = [];
      for (let col = warpStartPosition - 1; col <= warpEndPosition - 1; col++) {
        let row = 0;
        repeatList.push({ ...shaftsColList[row][col], row });
      }
      let repeatIdx = 0;
      for (
        let col = warpStartPosition - 1;
        col < shaftsColList[0].length;
        col++
      ) {
        let nowRepeat = repeatList[repeatIdx];
        let row = 0;
        if (nowRepeat.row === row) {
          shaftsColList[row][col] = { ...nowRepeat, row: undefined };
          repeatIdx++;
          repeatIdx %= repeatList.length;
        } else {
          shaftsColList[row][col] = {
            ...nowRepeat,
            row: undefined,
            isSelected: false,
          };
        }
        setShaftsColList(JSON.parse(JSON.stringify(shaftsColList)));
      }
    }
  }, [repeatModaloptions]);

  useEffect(() => {
    if (weftThreading) {
      let repeatList = [];
      for (let row = weftStartPosition - 1; row <= weftEndPosition - 1; row++) {
        let founded = false;
        for (let col = 0; col < treadlesList[0]; col++) {
          if (treadlesList[row][col].isSelected) {
            founded = true;
            repeatList.push({ ...treadlesList[row][col], col });
            break;
          }
        }
        if (!founded) {
          repeatList.push({
            ...treadlesList[row][0],
            col: -1,
          });
        }
      }
      let repeatIdx = 0;
      for (let row = weftStartPosition - 1; row < treadlesList.length; row++) {
        let nowRepeat = repeatList[repeatIdx];
        for (let col = 0; col < treadlesList[0].length; col++) {
          if (nowRepeat.col === col) {
            treadlesList[row][col] = { ...nowRepeat, col: undefined };
            repeatIdx++;
            repeatIdx %= repeatList.length;
          } else {
            treadlesList[row][col] = {
              ...nowRepeat,
              row: undefined,
              isSelected: false,
            };
          }
        }
        if (nowRepeat.col === -1) {
          repeatIdx++;
          repeatIdx %= repeatList.length;
        }
      }
      setTreadlesList(JSON.parse(JSON.stringify(treadlesList)));
    }
  }, [repeatModaloptions]);

  useEffect(() => {
    if (weftColor) {
      let repeatList = [];
      for (let row = weftStartPosition - 1; row <= weftEndPosition - 1; row++) {
        let col = 0;
        repeatList.push({ ...treadlesColList[row][col], col });
      }
      let repeatIdx = 0;
      for (
        let row = weftStartPosition - 1;
        row < treadlesColList.length;
        row++
      ) {
        let nowRepeat = repeatList[repeatIdx];
        let col = 0;
        if (nowRepeat.col === col) {
          treadlesColList[row][col] = { ...nowRepeat, col: undefined };
          repeatIdx++;
          repeatIdx %= repeatList.length;
        } else {
          treadlesColList[row][col] = {
            ...nowRepeat,
            row: undefined,
            isSelected: false,
          };
        }
        setTreadlesColList(JSON.parse(JSON.stringify(treadlesColList)));
      }
    }
  }, [repeatModaloptions]);

  const mainList = useMemo(() => {
    if (treadlesList.length !== picks || shaftsList.length !== shafts) {
      return [];
    }
    let mainList = [];
    for (let row = 0; row < picks; row++) {
      const newArr = [];
      for (let col = 0; col < ends; col++) {
        let shaftsIdx = -1;
        let treadlesIdx = -1;
        for (let shaftsRow = 0; shaftsRow < shafts; shaftsRow++) {
          if (shaftsList[shaftsRow][col].isSelected) {
            shaftsIdx = shaftsRow;
            break;
          }
        }
        for (let treadlesCol = 0; treadlesCol < treadles; treadlesCol++) {
          if (treadlesList[row][treadlesCol].isSelected) {
            treadlesIdx = treadlesCol;
            break;
          }
        }
        if (shaftsIdx === -1 || treadlesIdx === -1) {
          newArr.push({
            isSelected: false,
            color: "#ffffff",
          });
          continue;
        }
        if (lastList[shaftsIdx][treadlesIdx].isSelected) {
          newArr.push({
            isSelected: true,
            color: treadlesColList[row][0].color,
          });
        } else {
          newArr.push({
            isSelected: true,
            color: shaftsColList[0][col].color,
          });
        }
      }

      mainList.push(newArr);
    }
    return mainList;
  }, [treadlesList, shaftsList, lastList]);

  if (treadlesList.length !== picks || shaftsList.length !== shafts) {
    return <></>;
  }

  const deepCopy = (data) => {
    return JSON.parse(JSON.stringify(data));
  };
  return (
    <div>
      <div
        className="main-app"
        id="main-app"
        onClick={() => {
          addRecord(
            deepCopy(treadlesList),
            deepCopy(shaftsList),
            deepCopy(treadlesColList),
            deepCopy(shaftsColList),
            deepCopy(lastList)
          );
        }}
      >
        <div className="mainApp-row">
          <div className="main">
            <PatternBox
              row={picks}
              disableCilck={true}
              column={ends}
              colorList={mainList}
              whoAmI="main"
              boxSize={boxSize}
            />
          </div>
          <div className="treadles">
            <PatternBox
              row={picks}
              column={treadles}
              colorList={treadlesList}
              setList={setTreadlesList}
              whoAmI="treadles"
              boxSize={boxSize}
            />
          </div>
          <div>
            <PatternBox
              row={picks}
              column={1}
              colorList={treadlesColList}
              currentCol={currentCol}
              setList={setTreadlesColList}
              whoAmI="treadlesColor"
              boxSize={boxSize}
              mousePressed={mousePressed}
              setMousePressed={setMousePressed}
            />
          </div>
        </div>
        <div className="mainApp-row">
          <div className="shafts">
            <PatternBox
              row={shafts}
              column={ends}
              colorList={shaftsList}
              setList={setShaftsList}
              whoAmI="shafts"
              boxSize={boxSize}
            />
          </div>
          <div className="last">
            <PatternBox
              row={shafts}
              column={treadles}
              colorList={lastList}
              setList={setLastList}
              whoAmI="last"
              boxSize={boxSize}
            />
          </div>
        </div>
        <div className="mainApp-row">
          <div>
            <PatternBox
              row={1}
              column={ends}
              colorList={shaftsColList}
              currentCol={currentCol}
              setList={setShaftsColList}
              whoAmI="shaftsColor"
              boxSize={boxSize}
              mousePressed={mousePressed}
              setMousePressed={setMousePressed}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default MainApp;
