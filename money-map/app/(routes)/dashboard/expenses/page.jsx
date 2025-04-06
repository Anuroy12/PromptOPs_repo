"use client"
import React, { useEffect, useState } from 'react'
import ExpenseListTable from './_components/ExpenseListTable'
import { useUser } from '@clerk/nextjs';
import db from '@/utils/dbConfig';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import { Budgets, Expenses } from '@/utils/schema';

function page() {
  const {user}=useUser();
  const [BudgetList,setBudgetList]=useState([]);
  const [expensesList,setExpensesList]=useState([]);
  useEffect(()=>{
    user&&getBudgetList();
  },[user])

  //used to get budget list
  const getBudgetList=async()=>{

    const result=await db.select({
      ...getTableColumns(Budgets),
      totalSpend:sql `sum(${Expenses.amount})`.mapWith(Number),
      totalItem:sql `count(${Expenses.id})`.mapWith(Number)
    }).from(Budgets)
    .leftJoin(Expenses,eq(Budgets.id,Expenses.budgetId))
    .where(eq(Budgets.createdBy,user?.primaryEmailAddress?.emailAddress))
    .groupBy(Budgets.id)
    .orderBy(Budgets.id, desc)
    // .orderBy(desc(Budgets.id))
    ;
    

    setBudgetList(result);
    getAllExpenses();
    
  }

  //used to get all expenses

  const getAllExpenses=async()=>{
    const result=await db.select({
      id:Expenses.id,
      name:Expenses.name,
      amount:Expenses.amount,
      createdAt:Expenses.createdAt
    }).from(Budgets)
    .rightJoin(Expenses,eq(Budgets.id,Expenses.budgetId))
    .where(eq(Budgets.createdBy,user?.primaryEmailAddress.emailAddress))
    .orderBy(Budgets.id,desc);

    setExpensesList(result);
    
  }
  return (
    <div className=' p-5 mt-5'>
      <h2 className='font-bold text-3xl mt-5'>My Expenses</h2>
      <div className=' border rounded-lg p-5 mt-5'>
      <ExpenseListTable 
      expensesList={expensesList}
      refreshData={()=>getBudgetList()}
      />
      </div>
    </div>
  )
}

export default page