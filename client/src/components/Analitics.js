import { Progress } from "antd";
import React from "react";
import "../assets/Analitics.css";

function Analitics({ transactions }) {
  const totalTransactions = transactions.length;
  const totalIncomeTransactions = transactions.filter(
    (transaction) => transaction.type === "income"
  );
  const totalExpenceTransactions = transactions.filter(
    (transaction) => transaction.type === "expence"
  );
  //   console.log((totalExpenceTransactions.length / totalTransactions) * 100);
  const totalIncomeTransactionsPercentage =
    (totalIncomeTransactions.length / totalTransactions) * 100;
  const totalExpenceTransactionsPercentage =
    (totalExpenceTransactions.length / totalTransactions) * 100;

  const totalTurnOver = transactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const totalIncomeTurnOver = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalExpenceTurnOver = transactions
    .filter((transaction) => transaction.type === "expence")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const savingAmount = totalIncomeTurnOver - totalExpenceTurnOver;
  const totalIncomeTurnOverPercentage =
    (totalIncomeTurnOver / totalTurnOver) * 100;
  const totalExpenceTurnOverPercentage =
    (totalExpenceTurnOver / totalTurnOver) * 100;

  // const IncomeCategories = ["salary", "investment", "others"]
  const categories = [
    "food",
    "salary",
    "entertainment",
    "travel",
    "emi",
    "education",
    "recharge",
    "medical",
    "investment",
    "others",
  ];

  return (
    <div className="analitics">
      <div className="row">
        <div className="col-md-4 mt-3">
          <div className="transactions-count">
            <h4>Total Transactions : {totalTransactions}</h4>
            <hr />
            <h5>Income : {totalIncomeTransactions.length}</h5>
            <h5> Expence : {totalExpenceTransactions.length}</h5>
            <div className="progress-bars d-flex align-items-center justify-content-around mt-4">
              <Progress
                strokeColor="#5dd64f"
                type="circle"
                percent={totalIncomeTransactionsPercentage.toFixed(0)}
              />
              <Progress
                strokeColor="#e5572f"
                type="circle"
                percent={totalExpenceTransactionsPercentage.toFixed(0)}
              />
            </div>
          </div>
        </div>
        <div className="col-md-4 mt-3">
          <div className="transactions-count">
            {/* <h4>Total Turnover : {totalTurnOver}</h4> */}
            <h4>Total Savings : {savingAmount}</h4>
            <hr />
            <h5>Income : {totalIncomeTurnOver}</h5>
            <h5> Expence : {totalExpenceTurnOver}</h5>
            <div className="progress-bars d-flex align-items-center justify-content-around mt-4">
              <Progress
                strokeColor="#5dd64f"
                type="circle"
                percent={totalIncomeTurnOverPercentage.toFixed(0)}
              />
              <Progress
                strokeColor="#e5572f"
                type="circle"
                percent={totalExpenceTurnOverPercentage.toFixed(0)}
              />
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-md-6">
          <div className="income-category">
            <h4>Income - Category Wise</h4>
            {categories.map((category) => {
              const amount = transactions
                .filter((t) => t.type === "income" && t.category === category)
                .reduce((acc, t) => acc + t.amount, 0);
              return (
                amount > 0 && (
                  <div className="category-card">
                    <h5>{category}</h5>
                    <Progress
                      strokeColor="#0b5ad9"
                      percent={((amount / totalIncomeTurnOver) * 100).toFixed(
                        0
                      )}
                    />
                  </div>
                )
              );
            })}
          </div>
        </div>
        <div className="col-md-6">
          <div className="income-category">
            <h4>Expence - Category Wise</h4>
            {categories.map((category) => {
              const amount = transactions
                .filter((t) => t.type === "expence" && t.category === category)
                .reduce((acc, t) => acc + t.amount, 0);
              return (
                amount > 0 && (
                  <div className="category-card">
                    <h5>{category}</h5>
                    <Progress
                      strokeColor="#0b5ad9"
                      percent={((amount / totalExpenceTurnOver) * 100).toFixed(
                        0
                      )}
                    />
                  </div>
                )
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analitics;
