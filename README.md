# ERP Report Scripts

Calculate overdue payments and return results saved in xlsx file.

## Scripts

### report.js

Task: Generate an overdue invoices Excel report.

- Sheet "Overdue payments":
- All unpaid invoices where due date is in the past
- Columns: client name, invoice number, amount, due date, overdue days
- Rows overdue by more than 30 days are highlighted in red

### summary.js

Task: Generate an overdue invoices report with two separate Excel files.

- Sheet1 - Overdue_total_amount.xlsx:
  - Sheet "Overdue Total Amount":
  - Client name
  - Total overdue amount (summed per client, sorted highest to lowest)

- Sheet 2 - Overdue_summary.xlsx:
  - Sheet "Overdue Summary":
  - All overdue invoices (status: unpaid, due date in the past)
  - Columns: client name, client ID, invoice ID, invoice number, amount, due date, status

### import.js

Task: Import and analyze overdue invoices from an Excel file.

1. Calculate the total overdue amount across all invoices and print to console.

2. Find the top 3 invoices with the most overdue days
   and print client name, invoice number and overdue days to console.

## How to run

Install dependencies:
\```
npm install
\```

Run scripts:
\```
node report.js
node summary.js
node import.js
\```

## Output

- `report.xlsx` — overdue invoices with red highlighting for 30+ days overdue
- `Overdue_total_amount.xlsx` — total overdue amount per client
- `Overdue_summary.xlsx` — detailed list of all overdue invoices
