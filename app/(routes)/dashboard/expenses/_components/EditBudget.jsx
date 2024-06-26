"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../../../../../components/ui/button";
import { Edit } from "lucide-react";
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
import { useUser } from "@clerk/nextjs";
import { Input } from "../../../../../components/ui/input";
import { db } from "../../../../../utils/dbConfig";
import { Budgets } from "../../../../../utils/schema";
import { toast } from "sonner";
import { eq } from "drizzle-orm";
function EditBudget({ budgetInfo,refreshData }) {
  const [emojiIcon, setemojiIcon] = useState("😀");
  const [openEmojjPicker, setopenEmojiPicker] = useState(false);

  const [name, setName] = useState();
  const [amount, setAmount] = useState();
  const { user } = useUser();

  useEffect(() => {
    if (budgetInfo) {
      setName(budgetInfo.name || "");
      setAmount(budgetInfo.amount || "");
      setemojiIcon(budgetInfo.icon || "😀");
    }
  }, [budgetInfo]);

  const updateBudget = async () => {
    const result = await db
      .update(Budgets)
      .set({ name: name, amount, amount, icon: emojiIcon })
      .where(eq(Budgets.id, budgetInfo.id))
      .returning();
    if(result){
      toast("Budget is Updated")
      refreshData()
    }
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex gap-2">
            <Edit /> Edit
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Budget</DialogTitle>
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
                  placeholder="Budget Name"
                  defaultValue={name}
                  className="text-black"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="mt-2">
                <h2 className="text-black font-medium my-1">Budget Amount</h2>
                <Input
                  placeholder="Budget Amount"
                  defaultValue={amount}
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
                  updateBudget();
                }}
              >
                Update Budget
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditBudget;
