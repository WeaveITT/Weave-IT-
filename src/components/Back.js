const record = [];
let lastIdx = 0;
export const addRecord = (
  treadles,
  shafts,
  treadlesColor,
  shaftsColor,
  last
) => {
  if (record.length === 3) {
    record.splice(0, 1);
  }
  record.push({
    treadles,
    shafts,
    treadlesColor,
    shaftsColor,
    last,
  });
};

export const getRecord = (
  setTreadles,
  setShafts,
  setTreadlesColor,
  setShaftsColor,
  setLast
) => {
  if (record.length === 0) {
    return;
  }
  const currentData = record[record.length - 1];
  setTreadles(currentData.treadles);
  setShafts(currentData.shafts);
  setTreadlesColor(currentData.treadlesColor);
  setShaftsColor(currentData.shaftsColor);
  setLast(currentData.last);
  record.splice(record.length - 1, 1);
};
