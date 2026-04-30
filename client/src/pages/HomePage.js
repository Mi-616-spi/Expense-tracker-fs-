
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Balance from "../components/Balance";
import TransactionList from "../components/TransactionList";
import "../css/HomePage.css"; 

function HomePage() {
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

  const deleteTransaction = async (id) => {
    try {
      const response = await fetch(`${API_URL}/delete/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete");
      setTransactions(transactions.filter((t) => t._id !== id));
    } catch (error) {
      alert("Failed to delete transaction.");
    }
  };

  const handleEdit = (transaction) => {
    navigate(`/edit/${transaction._id}`);
  };

  return (
    <div className="home-page">
      <h2>Dashboard :</h2>
      {serverError && <div className="server-error">{serverError}</div>}
      <Balance transactions={transactions} />
      
      <h3>Recent Transactions :</h3>
      <br></br>
      
      <TransactionList 
        transactions={transactions.slice(0, 5)} 
        loading={loading} 
        onDelete={deleteTransaction}
        onEdit={handleEdit}
      />
    </div>
  );
}

export default HomePage;
