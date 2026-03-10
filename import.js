/*
  Task: Import and analyze overdue invoices from an Excel file.

  File: report.xlsx — Sheet "Overdue payments"

  1. Calculate the total overdue amount across all invoices and print to console.

  2. Find the top 3 invoices with the most overdue days
     and print client name, invoice number and overdue days to console.
*/

const XLSX = require("xlsx");

const workbook = XLSX.readFile("./report.xlsx");

const sheet = workbook.Sheets["Overdue payments"];

const data = XLSX.utils.sheet_to_json(sheet);

// 1.
const totalAmount = data.reduce((acc, curr) => (acc += curr.Amount), 0);
console.log("Total overdue amount: ", totalAmount);

// 2.
const sortedDataByOverdueDate = [...data]
  .sort(function (a, b) {
    return b["Overdue days"] - a["Overdue days"];
  })
  .slice(0, 3);
console.log("Top 3 invoices with the most overdue days: ");
sortedDataByOverdueDate.forEach((invoice, index) => {
  console.log(
    `${index + 1}: ${invoice.Client.padEnd(20)}: ${String(invoice["Overdue days"]).padEnd(5)} ${String(invoice.Amount).padStart(5)} €`,
  );
});
