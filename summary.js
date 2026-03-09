/*
  Task: Generate an overdue invoices report with two separate Excel files.

  File 1 - Overdue_total_amount.xlsx:
    Sheet "Overdue Total Amount":
      - Client name
      - Total overdue amount (summed per client, sorted highest to lowest)

  File 2 - Overdue_summary.xlsx:
    Sheet "Overdue Summary":
      - All overdue invoices (status: unpaid, due date in the past)
      - Columns: client name, client ID, invoice ID, invoice number, amount, due date, status
*/

const ExcelJS = require("exceljs");
const data = require("./data.json");

const today = new Date();

const overdueSummary = data.invoices
  .filter((invoice) => {
    const dueDate = new Date(invoice.due_date);
    return invoice.status === "unpaid" && dueDate < today;
  })
  .map((invoice) => {
    const client = data.clients.find((c) => c.id === invoice.client_id);
    return {
      client_name: client.name,
      ...invoice,
    };
  });

const totalOverdueAmount = overdueSummary.map((invoice) => {
  const client = data.clients.find((c) => c.id === invoice.client_id);
  return {
    client_name: client.name,
    amount: invoice.amount,
  };
});

const totals = {};

totalOverdueAmount.forEach((invoice) => {
  totals[invoice.client_name] =
    (totals[invoice.client_name] || 0) + invoice.amount;
});

const sortedTotals = Object.entries(totals).sort(function (a, b) {
  return b[1] - a[1];
});

async function generateOverdueTotalAmount() {
  const workbook1 = new ExcelJS.Workbook();
  const workbook2 = new ExcelJS.Workbook();
  const sheet1 = workbook1.addWorksheet("Overdue Total Amount");
  const sheet2 = workbook2.addWorksheet("Overdue Summary");

  sheet1.columns = [
    { header: "Client name", key: "client_name", width: 30 },
    { header: "Total amount", key: "amount", width: 15 },
  ];

  sortedTotals.forEach((row) => sheet1.addRow(row));

  sheet2.columns = [
    { header: "Client name", key: "client_name", width: 30 },
    { header: "Client ID", key: "client_id", width: 10 },
    { header: "Invoice ID", key: "id", width: 10 },
    { header: "Invoice number", key: "number", width: 20 },
    { header: "Amount", key: "amount", width: 15 },
    { header: "Due date", key: "due_date", width: 20 },
    { header: "Status", key: "status", width: 15 },
  ];

  overdueSummary.forEach((row) => sheet2.addRow(row));

  await workbook1.xlsx.writeFile("Overdue_total_amount.xlsx");
  console.log("File created: Overdue_total_amount.xlsx");

  await workbook2.xlsx.writeFile("Overdue_summary.xlsx");
  console.log("File created: Overdue_summary.xlsx");
}

generateOverdueTotalAmount();
