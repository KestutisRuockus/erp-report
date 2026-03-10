/*
  Task: Automatically generate overdue invoices report every minute.
  Run generateReport() from report.js on a scheduled interval.
  In production: change '* * * * *' to a real schedule e.g. '0 8 * * 1' (every Monday 8:00)
*/

const cron = require("node-cron");
const { generateReport } = require("./report");

cron.schedule("* * * * *", () => {
  // "min hour day month weekday"
  generateReport();
  console.log("report.xlsx generated");
});

console.log("Cron started...");
