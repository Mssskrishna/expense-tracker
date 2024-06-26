"use client"
import React, { useEffect, useState } from "react";
import ExpenseList from "./_components/ExpenseList";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { db } from "../../../../utils/dbConfig";
import { useUser } from "@clerk/nextjs";
import { Budgets, Expenses } from "../../../../utils/schema";

function page() {
  const { user } = useUser();

  const [budgetList, setBudgetLit] = useState([]);

  const [expensesList, setexpensesList] = useState([]);
  useEffect(() => {
    getBudgetList();
    getAllExpenses();
  }, [user]);

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

    getAllExpenses();
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
    <div className="p-10">
      <ExpenseList
        expensesInfo={expensesList}
        refreshData={() => {
          getBudgetList();
        }}
      />
    </div>
  );
}

export default page;
