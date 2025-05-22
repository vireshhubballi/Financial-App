// src/pages/dashboard/Reports.jsx
import React, { useEffect, useState } from "react";
import { financialService } from "../utils/financialService";

const Reports = () => {
  const [report, setReport] = useState(null);

  useEffect(() => {
    financialService.getReport().then((res) => setReport(res.data));
  }, []);

  return (
    <div>
      <h2>Reports</h2>
      {report ? (
        <div>
          <p>Total Income: ₹{report.totalIncome}</p>
          <p>Total Expenses: ₹{report.totalExpenses}</p>
          <p>Net Savings: ₹{report.netSavings}</p>
        </div>
      ) : (
        <p>Loading report...</p>
      )}
    </div>
  );
};

export default Reports;
