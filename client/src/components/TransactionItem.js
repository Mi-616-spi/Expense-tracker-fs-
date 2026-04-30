import React from "react";
import "../css/TransactionItem.css";

function TransactionItem({ transaction, onEdit, onDelete }) {
  const isIncome = transaction.type === "income";

  return (
    <div className="transaction-item">

      <div className="transaction-info">
        <span className="transaction-title">{transaction.title}</span>
        <span className={`badge ${transaction.type}`}>
          {transaction.type}
        </span>
      </div>

      <div className="transaction-right">
        <span className={`transaction-amount ${transaction.type}`}>
          {isIncome ? "+" : "-"} ₹{transaction.amount.toLocaleString()}
        </span>

        <button
          className="btn-edit"
          onClick={() => onEdit(transaction)} 
        >
          Edit
        </button>

        <button
          className="btn-delete"
          onClick={() => {
            if (window.confirm(`Delete "${transaction.title}"?`)) {
              onDelete(transaction._id);
            }
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TransactionItem;
