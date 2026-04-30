import React from "react";
import "../css/Balance.css";



function Balance({ transactions }) {
  const totalIncome = transactions
    .filter((t) => t.type === "income")         
    .reduce((sum, t) => sum + t.amount, 0);     
  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <div>
      <div className="balance-box">
        <h2>Total Balance</h2>
        
        <p className="amount">
          ₹{balance.toLocaleString()}
        </p>
      </div>
      
      <div className="summary">
        <div className="summary-card income">
          <p>Total Income</p>
          <p className="amount">₹{totalIncome.toLocaleString()}</p>
        </div>
        <div className="summary-card expense">
          <p>Total Expense</p>
          <p className="amount">₹{totalExpense.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}

export default Balance;
