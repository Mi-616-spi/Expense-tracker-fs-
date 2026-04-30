import React from "react";
import TransactionItem from "./TransactionItem";
import "../css/TransactionList.css";

function TransactionList({ transactions, loading, onEdit, onDelete }) {

  if (loading) {
    return <p className="loading">Loading transactions...</p>;
  }

  return (
    <div>
      <h2> Transactions</h2>

      {transactions.length === 0 ? (
        <div className="transaction-list">
          <p className="no-transactions">No transactions yet. Add one above!</p>
        </div>
      ) : (
        <div className="transaction-list">

          {transactions.map((transaction) => (
            <TransactionItem
              key={transaction._id}         
              transaction={transaction}     
              onEdit={onEdit}               
              onDelete={onDelete}          
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TransactionList;
