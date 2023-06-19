import writeXlsxFile from "write-excel-file";
export const GenerateExcelSheet = async (data) => {
  await writeXlsxFile(data, {
    fileName: "file.xlsx",
  });
};
export const convertExceltoJosn = (csv) => {
  var lines = csv.split("\n");
  var result = [];

  var headers = lines[0].split(",");

  for (var i = 1; i < lines.length; i++) {
    var obj = {};
    var currentline = lines[i].split(",");

    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }

    result.push(obj);
  }
  return result;
};
export  const applayRandoms=()=>{
  
}
