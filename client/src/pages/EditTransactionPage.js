import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TransactionForm from "../components/TransactionForm";
import "../css/EditTransaction.css";

function EditTransactionPage() {
  const [serverError, setServerError] = useState("");
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();
  const { id } = useParams();

  const API_URL = "http://localhost:5000/transactions";

  useEffect(() => {
    
    const fetchTransaction = async () => {
      try {
        const response = await fetch(`${API_URL}/all`);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        const transaction = data.find(t => t._id === id);
        if (transaction) {
          setEditingTransaction(transaction);
        } else {
          setServerError("Transaction not found.");
        }
      } catch (error) {
        setServerError("Could not connect to server.");
      } finally {
        setLoading(false);
      }
    };
    fetchTransaction();
  }, [id]);

  const updateTransaction = async (data) => {
    setServerError("");
    try {
      const response = await fetch(`${API_URL}/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error("Failed to update");
      navigate("/history");
    } catch (error) {
      setServerError("Failed to update transaction.");
    }
  };

  const cancelEdit = () => {
    navigate("/history");
  };

  if (loading) return <div className="loading">Loading transaction...</div>;

  return (
    <div className="edit-transaction-page">
      <h2>Edit Transaction</h2>
      {serverError && <div className="server-error">{serverError}</div>}
      {editingTransaction && (
        <TransactionForm 
          onSubmit={updateTransaction} 
          editingTransaction={editingTransaction}
          onCancelEdit={cancelEdit}
        />
      )}
    </div>
  );
}

export default EditTransactionPage;
