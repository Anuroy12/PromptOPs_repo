"use client"
import React, { useEffect, useState } from 'react'
import { UserButton, useUser } from '@clerk/nextjs';
import CardInfo from './_components/CardInfo';
import db from '@/utils/dbConfig';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import { Budgets, Expenses } from '@/utils/schema';
import BarChartDashboard from './_components/BarChartDashboard';
import BudgetItem from './budget/_components/BudgetItem';
import ExpenseListTable from './expenses/_components/ExpenseListTable';

function Dashboard() {
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
    <div className='p-5'> 
         <h2 className='font-bold text-3xl'>Hi,{user?.fullName}✌🏼</h2>
         <p className='text-gray-500'>Lets Manage Your Expenses</p>
         <CardInfo BudgetList={BudgetList}/>
         <div className='grid grid-cols-1 md:grid-cols-3 mt-6 gap-5'>
          <div className='md:col-span-2'>
            <BarChartDashboard
            BudgetList={BudgetList}/>

            
            <ExpenseListTable
            expensesList={expensesList}
            refreshData={()=>getBudgetList()}
            />

          </div>
          <div className='grid gap-5'>
            <h2 className='font-bold text-lg'>Latest Budgets</h2>
              {BudgetList.map((budget,index)=>(
                <BudgetItem budget={budget} key={index}/>
              ))}
          </div>

         </div>
        
    </div>
  )
}

export default Dashboard