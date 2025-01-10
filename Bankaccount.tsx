import React, { useState } from "react";

const BankingAccount: React.FC = () => {
  // State variables to store account details
  const [accountNumber] = useState<string>("123456789");
  const [ownerName] = useState<string>("Alice Johnson");
  const [balance, setBalance] = useState<number>(1000);
  const [message, setMessage] = useState<string>("");

  // handle deposits
  const deposit = (amount: number) => {
    if (amount <= 0) {
      setMessage("Deposit amount must be greater than zero.");
      return;
    }
    setBalance((prevBalance) => prevBalance + amount);
    setMessage(`Deposited $${amount}. New balance: $${balance + amount}`);
  };

  // handle withdrawals
  const withdraw = (amount: number) => {
    if (amount <= 0) {
      setMessage("Withdrawal amount must be greater than zero.");
      return;
    }
    if (amount > balance) {
      setMessage("Insufficient balance.");
      return;
    }
    setBalance((prevBalance) => prevBalance - amount);
    setMessage(`Withdrew $${amount}. Remaining balance: $${balance - amount}`);
  };

  return (
    <div style={{ fontFamily: "Arial", margin: "20px" }}>
      <h1>Banking System</h1>
      <div style={{ marginBottom: "20px" }}>
        <h2>Account Details</h2>
        <p><strong>Account Number:</strong> {accountNumber}</p>
        <p><strong>Owner Name:</strong> {ownerName}</p>
        <p><strong>Balance:</strong> ${balance}</p>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <h2>Actions</h2>
        <button onClick={() => deposit(500)}>Deposit $500</button>
        <button onClick={() => withdraw(200)} style={{ marginLeft: "10px" }}>
          Withdraw $200
        </button>
        <button onClick={() => withdraw(2000)} style={{ marginLeft: "10px" }}>
          Withdraw $2000
        </button>
      </div>
      {message && (
        <div style={{ marginTop: "20px", color: "blue" }}>
          <strong>Message:</strong> {message}
        </div>
      )}
    </div>
  );
};

export default BankingAccount;
