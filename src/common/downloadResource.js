const { Parser } = require('json2csv');
const ExcelJs = require('exceljs');

module.exports.dowanloadCsv = (res, fileName, fields, data) => {
  const json2csv = new Parser({ fields });
  const csv = json2csv.parse(data);
  res.header('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
  res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');
  res.attachment(fileName);
  return res.send(csv);
};

module.exports.downloadXLSX = (res, fileName, fields, data) => {
  const workbook = new ExcelJs.Workbook();
  const sheet = workbook.addWorksheet('feedback');
  const headers = [];
  fields.forEach((field) => {
    headers.push({
      header: field.label,
      key: field.value,
      width: 40,
    });
  });
  res.setHeader(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  );
  res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
  res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');
  sheet.columns = headers;
  data.forEach((row) => {
    sheet.addRow(row);
  });
  workbook.xlsx.writeBuffer().then((buffer) => {
    res.send(buffer);
  });
};
