import { Trash } from "lucide-react";
import React from "react";
import { db } from "../../../../../utils/dbConfig";
import { Expenses } from "../../../../../utils/schema";
import { toast } from "sonner";
import { eq } from "drizzle-orm";

function ExpenseList({ expensesInfo,refreshData }) {
  const deleteExpense = async (expense) => {
    const result = await db
      .delete(Expenses)
      .where(eq(Expenses.id, expense.id))
      .returning();
    
      if(result){
        refreshData()
        toast('Expense Deleted!')
      }
  };
  return (
    <div className="mt-3">
      <div className="grid grid-cols-4 bg-slate-200 p-2 text-xs sm:text-base">
        <h2 className="font-bold">Name</h2>
        <h2 className="font-bold">Amount</h2>
        <h2 className="font-bold">Date</h2>
        <h2 className="font-bold">Action</h2>
      </div>
      {expensesInfo && expensesInfo.length > 0 ? (
        expensesInfo.map((expense, index) => (
          <div key={index} className="grid grid-cols-4 bg-slate-40 p-2 text-xs sm:text-base">
            <h2>{expense.name}</h2>
            <h2>{expense.amount}</h2>
            <h2>{expense.createdAt}</h2>
            <h2>
              <Trash
                className="text-red-600"
                onClick={() => {
                  deleteExpense(expense);
                }}
              />
            </h2>
          </div>
        ))
      ) : (
        <div className="h-[200] animate-pulse bg-slate-100"></div>
      )}
    </div>
  );
}

export default ExpenseList;
