import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("transactions");
    if (saved) {
      setTransactions(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = () => {
    if (!text || !amount) return;

    const newTransaction = {
      id: Date.now(),
      text,
      amount: Number(amount),
    };

    setTransactions([...transactions, newTransaction]);
    setText("");
    setAmount("");
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((item) => item.id !== id));
  };

  const income = transactions
    .filter((item) => item.amount > 0)
    .reduce((acc, item) => acc + item.amount, 0);

  const expense = transactions
    .filter((item) => item.amount < 0)
    .reduce((acc, item) => acc + item.amount, 0);

  const balance = income + expense;

  return (
    <div className="container">
      <h1>💰 Smart Expense Tracker</h1>

      <div className="summary">
        <div>
          <h3>Balance</h3>
          <p>₹{balance}</p>
        </div>

        <div>
          <h3>Income</h3>
          <p className="income">₹{income}</p>
        </div>

        <div>
          <h3>Expense</h3>
          <p className="expense">₹{Math.abs(expense)}</p>
        </div>
      </div>

      <div className="form">
        <input
          type="text"
          placeholder="Description"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount (+Income / -Expense)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button onClick={addTransaction}>Add Transaction</button>
      </div>

      <h2>Transaction History</h2>

      <ul>
        {transactions.map((item) => (
          <li key={item.id}>
            <span>{item.text}</span>
            <span>₹{item.amount}</span>

            <button
              className="delete-btn"
              onClick={() => deleteTransaction(item.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;