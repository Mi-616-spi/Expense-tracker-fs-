import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TransactionForm from "../components/TransactionForm";
import "../css/AddTransaction.css";

function AddTransactionPage() {
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const API_URL = "http://localhost:5000/transactions";

  const addTransaction = async (data) => {
    setServerError("");
    try {
      const response = await fetch(`${API_URL}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error("Failed to add");
      navigate("/history"); 
    } catch (error) {
      setServerError("Failed to add transaction.");
    }
  };

  return (
    <div className="add-transaction-page">
      <h2>Add New Transaction :</h2>
      {serverError && <div className="server-error">{serverError}</div>}
      <TransactionForm onSubmit={addTransaction} />
    </div>
  );
}

export default AddTransactionPage;
