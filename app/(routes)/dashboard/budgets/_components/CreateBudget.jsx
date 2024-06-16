"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "../../../../../components/ui/dialog";
import EmojiPicker from "emoji-picker-react";
import { Button } from "../../../../../components/ui/button";
import { Input } from "../../../../../components/ui/input";
import { useUser } from "@clerk/nextjs";
import { db } from "../../../../../utils/dbConfig";
import { Budgets } from "../../../../../utils/schema";
import { toast } from "sonner";

function CreateBudget({refreshData}) {
  const [emojiIcon, setemojiIcon] = useState("😀");
  const [openEmojjPicker, setopenEmojiPicker] = useState(false);

  const [name, setName] = useState();
  const [amount, setAmount] = useState();
  const { user } = useUser();

  const createBudget = async () => {
    const result = await db.insert(Budgets).values({
      name: name,
      amount: amount,
      icon: emojiIcon,
      createdBy: user.primaryEmailAddress.emailAddress,
    });
    if(result){
      refreshData();
      toast("New Budget Created")
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div
            className="flex flex-col cursor-pointer items-center 
    border-dashed bg-slate-100 p-10 rounded-md hover:shadow-md "
          >
            <h2 className="text-2xl">+</h2>
            <h2>Create Budget</h2>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create new Budget</DialogTitle>
            <DialogDescription>
              <div className="mt-5">
                <Button
                  onClick={() => setopenEmojiPicker(!openEmojjPicker)}
                  variant="outline"
                  className="text-lg"
                >
                  {emojiIcon}
                </Button>
              </div>
              <div className="absolute z-20">
                <EmojiPicker
                  open={openEmojjPicker}
                  onEmojiClick={(e) => {
                    // console.log(e);
                    setemojiIcon(e.emoji);
                    setopenEmojiPicker(false);
                  }}
                />
              </div>

              <div className="mt-2">
                <h2 className="text-black font-medium my-1">Budget Name</h2>
                <Input
                  placeholder="e.g. Car Petrol"
                  className="text-black"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="mt-2">
                <h2 className="text-black font-medium my-1">Budget Amount</h2>
                <Input
                  placeholder="e.g. 5000 Rs"
                  className="text-black"
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                />
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                className="mt-2 w-full"
                disabled={!(name && amount)}
                onClick={() => {
                  createBudget();
                }}
              >
                Create Budget
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateBudget;
