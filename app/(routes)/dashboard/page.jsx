// import { User } from 'lucide-react'
"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import { db } from "../../../utils/dbConfig";
import CardInfo from "./_components/CardInfo";
import React, { useEffect, useState } from "react";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { Budgets, Expenses } from "../../../utils/schema";
import BarChar from "./_components/BarChar";
import BudgetItem from "./budgets/_components/BudgetItem";
// import Expens from "./_components/ExpensesTable"
import ExpenseList from "./expenses/_components/ExpenseList";

function page() {
  const { user } = useUser();

  const [budgetList, setBudgetLit] = useState([]);
  const [expensesList, setexpensesList] = useState([]);
  useEffect(() => {
    getBudgetList();
    getAllExpenses();
  }, [user]);
  /**
   * used to get Budget List
   */
  const getBudgetList = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        // amount : sql`amount($)`
        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItems: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.id));
    
    getAllExpenses()
    setBudgetLit(result);
  };

  const getAllExpenses = async () => {
    const result = await db
      .select({
        id: Expenses.id,
        name: Expenses.name,
        amount: Expenses.amount,
        createdAt: Expenses.createdAt,
      })
      .from(Budgets)
      .rightJoin(Expenses, eq(Expenses.budgetId, Budgets.id))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(Expenses.id));

    // console.log(result);
    setexpensesList(result);
  };
  return (
    // <div>Dashboard of ....</div>
    <div>
      <div className="p-8">
        {/* <UserButton /> */}
        <h2 className="font-bold text-3xl">
          Hi,{user ? user.fullName : ""} 👋
        </h2>
        <p className="text-gray-500">
          Here, what's happening with your money, Let's Manage your Expenses
        </p>
        <CardInfo budgetInfo={budgetList} />
        <div className="grid grid-cols-1 md:grid-cols-3 mt-7 gap-4">
          <div className="md:col-span-2">
            <BarChar budgetList={budgetList} />
            <ExpenseList
              expensesInfo={expensesList}
              refreshData={() => {
                getBudgetList();
              }}
            />
          </div>

          <div className="grid gap-2">
            <h2 className="font-bold text-2xl">My Budgets</h2>
            {budgetList.map((budget, index) => (
              <BudgetItem budget={budget} className="mt-2" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
