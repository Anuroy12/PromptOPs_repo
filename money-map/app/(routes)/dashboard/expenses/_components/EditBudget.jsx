"use client"
import { Button } from '@/components/ui/button'
import { PenBox } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog"
import EmojiPicker from 'emoji-picker-react'
import { Input } from '@/components/ui/input'
import { useUser } from '@clerk/nextjs'
import db from '@/utils/dbConfig'
import { Budgets } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { toast } from 'sonner'


function EditBudget({budgetInfo,refreshData}) {
    const [emojiIcon,setEmojiIcon]=useState(budgetInfo?.icon);
    const [openEmojiPicker,setOpenEmojiPicker]=useState(false);

    const [name,setName]=useState();
    const [amount,setAmount]=useState();

    const {user}=useUser();
    useEffect(()=>{
        if(budgetInfo){
            setEmojiIcon(budgetInfo?.icon)
            setName(budgetInfo?.name)
            setAmount(budgetInfo?.amount)

        }
       

    },[budgetInfo])
    const onUpdateBudget=async()=>{
        const result=await db.update(Budgets).set({
            name:name,
            amount:amount,
            icon:emojiIcon,
        }).where(eq(Budgets.id,budgetInfo.id))
        .returning();

        if(result){
            refreshData();
            toast('Budget Updated!');
        }
        
    }

  return (
    <div>
       
          <Dialog>
                        <DialogTrigger asChild>
                        <Button className="flex gap-2"><PenBox/>Edit</Button>
                            
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Update Budget</DialogTitle>
                                <DialogDescription>
                            
                                </DialogDescription>
                            </DialogHeader>
                            <div className='mt-5'>
                                    <Button variant="outline"
                                    className='text-lg'
                                    onClick={()=>setOpenEmojiPicker(!openEmojiPicker)}
                                    >{emojiIcon}</Button>
                                    <div className='absolute z-10'>
                                    <EmojiPicker
                                    open={openEmojiPicker}
                                    onEmojiClick={(e)=>{
                                        setEmojiIcon(e.emoji)
                                        setOpenEmojiPicker(false)
                                    }}
                                    />
                                    </div>
                                    <div className='mt-2'>
                                        <h2 className='text-black font-medium my-1'>Budget Name</h2>
                                        <Input placeholder="e.g. Home Decor"
                                        defaultValue={budgetInfo?.name}
                                        onChange={(e)=>setName(e.target.value)}/>
                                    </div>
                                    <div className='mt-2'>
                                        <h2 className='text-black font-medium my-1'>Budget Amount</h2>
                                        <Input 
                                        type="number"
                                        defaultValue={budgetInfo?.amount}
                                        placeholder="e.g. 500Rs."
                                        onChange={(e)=>setAmount(e.target.value)}/>
                                    </div>
        
                                    
                                    </div> 
                            <DialogFooter className="sm:justify-start">
                  <DialogClose asChild>
                  <Button 
                                    disabled={!(name&&amount)}
                                    onClick={()=>onUpdateBudget()
                                        
                                    }
                                    className='mt-5 w-full'>Update Budget</Button>
                  </DialogClose>
                </DialogFooter>
                        </DialogContent>
                    </Dialog>
   
    </div>
  )
}

export default EditBudget