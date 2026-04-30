import React, { useState, useEffect } from "react";
import "../css/TransactionForm.css";

function TransactionForm({ onSubmit, editingTransaction, onCancelEdit }) {
  
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingTransaction) {
      setTitle(editingTransaction.title);
      setAmount(editingTransaction.amount);
      setType(editingTransaction.type);
      setErrors({}); 
    } else {
      setTitle("");
      setAmount("");
      setType("income");
      setErrors({});
    }
  }, [editingTransaction]); 

  const validate = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!amount) {
      newErrors.amount = "Amount is required";
    } else if (isNaN(amount) || Number(amount) <= 0) {
      newErrors.amount = "Amount must be a positive number";
    }

    if (!type) {
      newErrors.type = "Please select a type";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 

    if (!validate()) return; 

    const transactionData = {
      title: title.trim(),
      amount: Number(amount),
      type,
    };

    onSubmit(transactionData);

    if (!editingTransaction) {
      setTitle("");
      setAmount("");
      setType("income");
      setErrors({});
    }
  };

  return (
    <div className="form-section">
      <h2>{editingTransaction ? " Edit Transaction" : " Add Transaction"}</h2>

      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            placeholder="e.g. Salary, Groceries..."
            value={title}
            onChange={(e) => setTitle(e.target.value)} 
          />
          {errors.title && <p className="error-msg">{errors.title}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount (₹)</label>
          <input
            id="amount"
            type="number"
            placeholder="e.g. 5000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0"
          />
          {errors.amount && <p className="error-msg">{errors.amount}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="type">Type</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          {errors.type && <p className="error-msg">{errors.type}</p>}
        </div>

        <button type="submit" className="btn btn-primary">
          {editingTransaction ? "Update" : "Add Transaction"}
        </button>

        {editingTransaction && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancelEdit}
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}

export default TransactionForm;
