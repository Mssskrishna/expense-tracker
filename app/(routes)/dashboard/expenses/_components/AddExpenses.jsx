import React, { useState } from "react";
import { Input } from "../../../../../components/ui/input";
import { Button } from "../../../../../components/ui/button";
import { db } from "../../../../../utils/dbConfig";
import { Budgets, Expenses } from "../../../../../utils/schema";
import { toast } from "sonner";
import moment from "moment";
// import Budget from "../../budgets/page";

function AddExpenses({ budgetId, user,refreshData }) {
  const [name, setName] = useState();
  const [amount, setAmount] = useState();

  /*
  Setting new Expense
  */
  const addnewExpense = async () => {
    const result = await db.insert(Expenses).values({
      name: name,
      amount: amount,
      budgetId: budgetId,
      createdAt: moment().format("DD/MM/yyyy"),
    }).returning({insertedId: Budgets.id});

    console.log(result);
    if(result){

        toast('New Expense Added successfully')
        refreshData();
    }
  };

  
  return (
    <div className="border p-5 rounded-lg">
      <h2 className="font-bold text-2xl">Add Expenses</h2>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Expense Name</h2>
        <Input
          placeholder="e.g. Bedroom Decoration"
          className="text-black"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Expense Amount</h2>
        <Input
          placeholder="e.g. 1000 Rs"
          className="text-black"
          onChange={(e) => {
            setAmount(e.target.value);
          }}
        />
      </div>
      <Button
        disabled={!(name && amount)}
        className="mt-3 w-full"
        onClick={() => {addnewExpense()}}
      >
        Add New Expenses
      </Button>
    </div>
  );
}

export default AddExpenses;
