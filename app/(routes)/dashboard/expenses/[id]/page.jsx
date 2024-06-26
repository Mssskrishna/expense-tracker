"use client";
import { useUser } from "@clerk/nextjs";

import { db } from "../../../../../utils/dbConfig";
import { getTableColumns, sql, eq, desc } from "drizzle-orm";
import { Budgets, Expenses } from "../../../../../utils/schema";
import React, { useEffect, useState } from "react";
import BudgetItem from "../../budgets/_components/BudgetItem";
import AddExpenses from "../_components/AddExpenses";
import ExpenseList from "../_components/ExpenseList";
import { Button } from "../../../../../components/ui/button";
import EditBudget from "../_components/EditBudget";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../../../components/ui/alert-dialog";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function ExpensesScreen({ params }) {
  const { user } = useUser();
  const [budgetInfo, setBudgetInfo] = useState(null);
  const [expensesInfo, setExpensesInfo] = useState(null);
  const route = useRouter();

  useEffect(() => {
    user && getBudgetInfo();

    // console.log(params)
  }, [user]);

  const getBudgetInfo = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItems: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .where(eq(Budgets.id, params.id))
      .groupBy(Budgets.id);

    // console.log(result);

    setBudgetInfo(result[0]);
    getExpenses();
    // return result;
  };

  /**Getting alatest Expense */
  const getExpenses = async () => {
    const result = await db
      .select()
      .from(Expenses)
      // .where(eq(Budgets.id, params.id))
      .orderBy(desc(Expenses.id));

    console.log(result);
    setExpensesInfo(result);
  };

  /**Delete current budget */
  const deleteBudget = async () => {
    const deleteExpense = await db
      .delete(Expenses)
      .where(eq(Expenses.budgetId, params.id))
      .returning();

    if (deleteExpense) {
      const result = await db
        .delete(Budgets)
        .where(eq(Budgets.id, params.id))
        .returning();
    }
    toast("Budget Deleted successfully");
    route.replace("/dashboard/budgets");
  };

  return (
    <div className="p-10">
      <div className="flex justify-between ">
        <h2 className="text-2xl font-bold">My Expenses</h2>
        <div className="flex gap-2">
          <EditBudget
            budgetInfo={budgetInfo}
            refreshData={() => {
              getBudgetInfo();
            }}
          />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="flex gap-2" variant="destructive">
                <Trash /> Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your current budget and along with expenses
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    deleteBudget();
                  }}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-2">
        {budgetInfo ? (
          <BudgetItem budget={budgetInfo} />
        ) : (
          <div className="h-[250px] w-full animate-pulse bg-slate-200 rounded-lg"></div>
        )}
        <AddExpenses
          budgetId={params.id}
          user={user}
          refreshData={() => {
            getBudgetInfo();
          }}
        />
      </div>
      <div>
        <h2 className="font-bold text-2xl">Latest Expenses</h2>
        <ExpenseList
          expensesInfo={expensesInfo}
          refreshData={() => {
            getBudgetInfo();
          }}
        />
      </div>
    </div>
  );
}

export default ExpensesScreen;
