import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TransactionList from "../components/TransactionList";
import "../css/HistoryPage.css";

function HistoryPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState("");

  const navigate = useNavigate();
  const API_URL = "http://localhost:5000/transactions";

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    setLoading(true);
    setServerError("");
    try {
      const response = await fetch(`${API_URL}/all`);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      setServerError("Could not connect to server.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (transaction) => {
    navigate(`/edit/${transaction._id}`);
  };

  const deleteTransaction = async (id) => {
    try {
      const response = await fetch(`${API_URL}/delete/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete");
      setTransactions(transactions.filter((t) => t._id !== id));
    } catch (error) {
      alert("Failed to delete transaction.");
    }
  };

  return (
    <div className="history-page">
      <h2>Transaction History :</h2>
      <br></br>
      {serverError && <div className="server-error">{serverError}</div>}
      <TransactionList 
        transactions={transactions} 
        loading={loading} 
        onEdit={handleEdit}
        onDelete={deleteTransaction}
      />
    </div>
  );
}

export default HistoryPage;
