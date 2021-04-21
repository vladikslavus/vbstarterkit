/********************************************************
*                   sortchart.js                        *
*               For chart.js plugin                     *
*        Sorts chart by data and returns Array          *
*           Maybe add some new functions later          *
********************************************************/

export default function charSortBytData(arrayLabels, arrayData, ...args) {
  // console.log(`number of argents: ${args.length}`);

  const arrayOfObj = [];
  arrayLabels.map((label, i) => {
    const el = { labels: label, data: arrayData[i] || 0 };
    const arrayArgs = [];
    args.map((arg, a) => {
      arrayArgs.push(arg[i] || 0);
    });
    el.args = arrayArgs;
    arrayOfObj.push(el);
  });
  const arrayOfObjSorted = arrayOfObj.sort((a, b) => parseInt(b.data) > parseInt(a.data));

  const arrayLabelsSorted = [];
  const arrayDataSorted = [];      
  arrayOfObjSorted.forEach((d, i) => {
    arrayLabelsSorted.push(d.labels);
    arrayDataSorted.push(d.data);
  });

  const maxLength = Math.max(...arrayOfObjSorted.map(obj => obj.args.length));
  const arrayArgsSorted = [];
  for(let i=0; i < maxLength; i++) {
    arrayArgsSorted[i] = arrayOfObjSorted.map(obj => obj.args[i] || 0);
  }

  return [arrayLabelsSorted, arrayDataSorted, arrayArgsSorted];
}

// export { charSortBytData };