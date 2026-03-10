/*
  Task: Generate an overdue invoices Excel report.

  File - report.xlsx:
    Sheet "Overdue payments":
      - All unpaid invoices where due date is in the past
      - Columns: client name, invoice number, amount, due date, overdue days
      - Rows overdue by more than 30 days are highlighted in red
*/

const data = require("./data.json");
const ExcelJS = require("exceljs");

const today = new Date();

const overdueInvoices = data.invoices
  .filter((invoice) => {
    const dueDate = new Date(invoice.due_date);
    return invoice.status === "unpaid" && dueDate < today;
  })
  .map((invoice) => {
    const client = data.clients.find((c) => c.id === invoice.client_id);
    return {
      client: client.name,
      number: invoice.number,
      amount: invoice.amount,
      due_date: invoice.due_date,
      days_overdue: Math.floor(
        (today - new Date(invoice.due_date)) / (1000 * 60 * 60 * 24),
      ),
    };
  });

async function generateReport() {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Overdue payments");

  sheet.columns = [
    { header: "Client", key: "client", width: 30 },
    { header: "Invoice number", key: "number", width: 15 },
    { header: "Amount", key: "amount", width: 12 },
    { header: "Due date", key: "due_date", width: 15 },
    { header: "Overdue days", key: "days_overdue", width: 14 },
  ];

  overdueInvoices.forEach((row) => {
    const excelRow = sheet.addRow(row);

    if (row.days_overdue > 30) {
      excelRow.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFF9999" },
      };
    }
  });

  await workbook.xlsx.writeFile("report.xlsx");
  console.log("File created: report.xlsx");
}

generateReport();

module.exports = { generateReport };
