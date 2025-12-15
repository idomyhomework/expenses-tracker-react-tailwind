import { useState, useEffect } from "react";
import BudgetChart from "./components/BudgetChart.jsx";
import BudgetSpending from "./components/BudgetSpending.jsx";
import BudgetSummary from "./components/BudgetSummary.jsx";
import TransactionForm from "./components/TransactionForm.jsx";
import TransactionList from "./components/TransactionList.jsx";
import ExpenseCategories from "./components/ExpenseCategory.jsx";

const STORAGE_KEY_TRANSACTIONS = "incomes_expenses_transactions";
const STORAGE_KEY_BUDGET = "incomes_expenses_budget";
const STORAGE_KEY_CATEGORIES = "incomes_expenses_categories";

// Default categories
const DEFAULT_CATEGORIES = [
    { id: "cat_1", name: "Food", color: "#f59e0b" },
    { id: "cat_2", name: "Transport", color: "#3b82f6" },
    { id: "cat_3", name: "Entertainment", color: "#ec4899" },
    { id: "cat_4", name: "Bills", color: "#ef4444" },
    { id: "cat_5", name: "Other", color: "#6b7280" },
];

function App() {
    const [transactionList, setTransactionList] = useState(() => {
        const savedTransactions = localStorage.getItem(STORAGE_KEY_TRANSACTIONS);
        return savedTransactions ? JSON.parse(savedTransactions) : [];
    });

    const [totalBudgetAmount, setTotalBudgetAmount] = useState(() => {
        const savedBudget = localStorage.getItem(STORAGE_KEY_BUDGET);
        return savedBudget ? Number(savedBudget) : 0;
    });

    const [expenseCategories, setExpenseCategories] = useState(() => {
        const savedCategories = localStorage.getItem(STORAGE_KEY_CATEGORIES);
        return savedCategories ? JSON.parse(savedCategories) : DEFAULT_CATEGORIES;
    });

    useEffect(() => {
        localStorage.setItem(
            STORAGE_KEY_TRANSACTIONS,
            JSON.stringify(transactionList)
        );
    }, [transactionList]);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY_BUDGET, totalBudgetAmount.toString());
    }, [totalBudgetAmount]);

    useEffect(() => {
        localStorage.setItem(
            STORAGE_KEY_CATEGORIES,
            JSON.stringify(expenseCategories)
        );
    }, [expenseCategories]);

    const totalIncomeAmount = transactionList
        .filter((singleTransaction) => singleTransaction.type === "income")
        .reduce(
            (currentTotal, incomeTransaction) =>
                currentTotal + incomeTransaction.amount,
            0
        );

    const totalExpenseAmount = transactionList
        .filter((singleTransaction) => singleTransaction.type === "expense")
        .reduce(
            (currentTotal, expenseTransaction) =>
                currentTotal + Math.abs(expenseTransaction.amount),
            0
        );

    const totalRemainingAmount =
        totalBudgetAmount + totalIncomeAmount - totalExpenseAmount;

    function handleAddTransaction(newTransaction) {
        setTransactionList((previousTransactions) => [
            ...previousTransactions,
            newTransaction,
        ]);
    }

    function handleRemoveTransaction(transactionIdToRemove) {
        setTransactionList((previousTransactions) =>
            previousTransactions.filter(
                (singleTransaction) => singleTransaction.id !== transactionIdToRemove
            )
        );
    }

    function handleBudgetChange(newBudgetAmount) {
        setTotalBudgetAmount(newBudgetAmount);
    }

    function handleAddCategory(newCategory) {
        setExpenseCategories((previousCategories) => [
            ...previousCategories,
            newCategory,
        ]);
    }

    function handleRemoveCategory(categoryIdToRemove) {
        setExpenseCategories((previousCategories) =>
            previousCategories.filter(
                (singleCategory) => singleCategory.id !== categoryIdToRemove
            )
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex justify-center p-4">
            <div className="w-full max-w-4xl space-y-6">
                <header className="flex flex-col gap-1">
                    <h1 className="text-3xl font-bold">Incomes & Expenses Tracker</h1>
                    <p className="text-slate-400 text-sm">
                        Track your budget, spending and remaining balance.
                    </p>
                </header>

                <BudgetSummary
                    totalBudgetAmount={totalBudgetAmount}
                    totalIncomeAmount={totalIncomeAmount}
                    totalExpenseAmount={totalExpenseAmount}
                    totalRemainingAmount={totalRemainingAmount}
                />

                {/*<div className="grid gap-6 md:grid-cols-2">*/}
                {/*    <BudgetChart*/}
                {/*        totalBudgetAmount={totalBudgetAmount}*/}
                {/*        totalIncomeAmount={totalIncomeAmount}*/}
                {/*        totalExpenseAmount={totalExpenseAmount}*/}
                {/*    />*/}
                {/*    <BudgetSpending*/}
                {/*        transactionList={transactionList}*/}
                {/*        onRemoveTransaction={handleRemoveTransaction}*/}
                {/*    />*/}
                {/*</div>*/}

                <ExpenseCategories
                    expenseCategories={expenseCategories}
                    onAddCategory={handleAddCategory}
                    onRemoveCategory={handleRemoveCategory}
                />

                <TransactionForm
                    onAddTransaction={handleAddTransaction}
                    onBudgetChange={handleBudgetChange}
                    expenseCategories={expenseCategories}
                />

                <TransactionList
                    transactionList={transactionList}
                    onRemoveTransaction={handleRemoveTransaction}
                />
            </div>
        </div>
    );
}

export default App;