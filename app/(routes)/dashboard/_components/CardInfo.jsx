import { PiggyBank } from "lucide-react";
import React, { useEffect, useState } from "react";

function CardInfo({ budgetInfo }) {
  const [totalBudget, setTotalBudget] = useState(null);
  const [totalSpend, setTotalSpend] = useState(null);

  useEffect(() => {
    budgetInfo && calculateCardInfo();
  }, [budgetInfo]);

  const calculateCardInfo = () => {
    let totalBudget_ = 0;
    let totalSpent_ = 0;
    budgetInfo.forEach((budget) => {
      totalBudget_ += Number(budget.amount);
      totalSpent_ += budget.totalSpend;
    });
    console.log(totalBudget_, totalSpent_);
    setTotalBudget(totalBudget_);
    setTotalSpend(totalSpent_);
  };

  return (
    <div>
      {budgetInfo.length > 0 ? (
        <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="flex justify-between p-5 rounded-lg shadow-sm border">
            <div>
              <h2 className="text-sm">Total Budget</h2>
              <h2 className="text-2xl font-bold">$ {totalBudget}</h2>
            </div>
            <PiggyBank className="bg-primary h-12 w-12 text-white p-3 rounded-md" />
          </div>
          <div className="flex justify-between p-5 rounded-lg shadow-sm border">
            <div>
              <h2 className="text-sm">Total Spent</h2>
              <h2 className="text-2xl font-bold">$ {totalSpend}</h2>
            </div>
            <PiggyBank className="bg-primary h-12 w-12 text-white p-3 rounded-md" />
          </div>
          <div className="flex justify-between p-5 rounded-lg shadow-sm border">
            <div>
              <h2 className="text-sm">No. of Budgets</h2>
              <h2 className="text-2xl font-bold">{budgetInfo.length}</h2>
            </div>
            <PiggyBank className="bg-primary h-12 w-12 text-white p-3 rounded-md" />
          </div>
        </div>
      ) : (
        <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map((item, index) => (
            <div className="h-[120px] w-full bg-slate-200 animate-pulse rounded-lg">
              {" "}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CardInfo;
