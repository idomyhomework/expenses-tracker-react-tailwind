// src/App.jsx

// Import necessary React hooks for managing state and side effects.
import { useState, useEffect } from "react";

// Import all the child components that make up our application's UI.
import BudgetChart from "./components/BudgetChart.jsx";
import BudgetSpending from "./components/BudgetSpending.jsx";
import BudgetSummary from "./components/BudgetSummary.jsx";
import TransactionForm from "./components/TransactionForm.jsx";
import TransactionList from "./components/TransactionList.jsx";
import ExpenseCategories from "./components/ExpenseCategory.jsx";

// Define constants for localStorage keys. This makes it easier to manage
// and prevents typos when accessing data in local storage.
const STORAGE_KEY_TRANSACTIONS = "incomes_expenses_transactions";
const STORAGE_KEY_BUDGET = "incomes_expenses_budget";
const STORAGE_KEY_CATEGORIES = "incomes_expenses_categories";

// Define default expense categories. These will be used if no categories
// are found in localStorage when the app first loads.
const DEFAULT_CATEGORIES = [
    { id: "cat_1", name: "Food", color: "#f59e0b" }, // Example: id, name, and a color for visual representation
    { id: "cat_2", name: "Transport", color: "#3b82f6" },
    { id: "cat_3", name: "Entertainment", color: "#ec4899" },
    { id: "cat_4", name: "Bills", color: "#ef4444" },
    { id: "cat_5", name: "Other", color: "#6b7280" },
];

// The main App component. This is a functional component.
function App() {
    // --- State Management ---
    // useState is a React Hook that lets you add React state to functional components.
    // It returns a pair: the current state value and a function that lets you update it.

    // State for all transactions (incomes and expenses).
    // The initial state is a function that tries to load transactions from localStorage.
    // If found, it parses the JSON string; otherwise, it defaults to an empty array.
    const [transactionList, setTransactionList] = useState(() => {
        const savedTransactions = localStorage.getItem(STORAGE_KEY_TRANSACTIONS);
        return savedTransactions ? JSON.parse(savedTransactions) : [];
    });

    // State for the total budget amount set by the user.
    // Initial state loads from localStorage or defaults to 0.
    const [totalBudgetAmount, setTotalBudgetAmount] = useState(() => {
        const savedBudget = localStorage.getItem(STORAGE_KEY_BUDGET);
        return savedBudget ? Number(savedBudget) : 0; // Convert string from localStorage to a number
    });

    // State for managing expense categories.
    // Initial state loads from localStorage or defaults to our predefined categories.
    const [expenseCategories, setExpenseCategories] = useState(() => {
        const savedCategories = localStorage.getItem(STORAGE_KEY_CATEGORIES);
        return savedCategories ? JSON.parse(savedCategories) : DEFAULT_CATEGORIES;
    });

    // --- useEffect Hooks for LocalStorage Synchronization ---
    // useEffect is a React Hook that lets you synchronize a component with an external system.
    // Here, the external system is localStorage.

    // Effect to save transactionList to localStorage whenever it changes.
    // The dependency array `[transactionList]` ensures this effect runs only when `transactionList` changes.
    useEffect(() => {
        localStorage.setItem(
            STORAGE_KEY_TRANSACTIONS,
            JSON.stringify(transactionList) // Convert array to JSON string before saving
        );
    }, [transactionList]);

    // Effect to save totalBudgetAmount to localStorage whenever it changes.
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY_BUDGET, totalBudgetAmount.toString()); // Convert number to string before saving
    }, [totalBudgetAmount]);

    // Effect to save expenseCategories to localStorage whenever it changes.
    useEffect(() => {
        localStorage.setItem(
            STORAGE_KEY_CATEGORIES,
            JSON.stringify(expenseCategories)
        );
    }, [expenseCategories]);

    // --- Derived State / Calculations ---
    // These values are calculated based on the current state (transactionList, totalBudgetAmount).
    // They are not stored in state themselves because they can be re-derived.

    // Calculate total income from the transaction list.
    // Filters for transactions of type "income" and sums their amounts.
    const totalIncomeAmount = transactionList
        .filter((singleTransaction) => singleTransaction.type === "income")
        .reduce(
            (currentTotal, incomeTransaction) =>
                currentTotal + incomeTransaction.amount,
            0
        );

    // Calculate total expenses from the transaction list.
    // Filters for transactions of type "expense" and sums the absolute values of their amounts.
    // We use Math.abs because expense amounts are stored as negative numbers.
    const totalExpenseAmount = transactionList
        .filter((singleTransaction) => singleTransaction.type === "expense")
        .reduce(
            (currentTotal, expenseTransaction) =>
                currentTotal + Math.abs(expenseTransaction.amount),
            0
        );

    // Calculate the remaining amount.
    // This is the initial budget plus total income, minus total expenses.
    const totalRemainingAmount =
        totalBudgetAmount + totalIncomeAmount - totalExpenseAmount;

    // --- Event Handlers / Callbacks ---
    // These functions are passed down to child components to allow them to update the parent's state.

    // Handler for adding a new transaction.
    // It receives a `newTransaction` object and updates the `transactionList` state.
    function handleAddTransaction(newTransaction) {
        setTransactionList((previousTransactions) => [
            ...previousTransactions, // Keep all existing transactions
            newTransaction, // Add the new one
        ]);
    }

    // Handler for removing a transaction.
    // It filters out the transaction with the matching `transactionIdToRemove`.
    function handleRemoveTransaction(transactionIdToRemove) {
        setTransactionList((previousTransactions) =>
            previousTransactions.filter(
                (singleTransaction) => singleTransaction.id !== transactionIdToRemove
            )
        );
    }

    // Handler for changing the total budget amount.
    function handleBudgetChange(newBudgetAmount) {
        setTotalBudgetAmount(newBudgetAmount);
    }

    // Handler for adding a new expense category.
    function handleAddCategory(newCategory) {
        setExpenseCategories((previousCategories) => [
            ...previousCategories,
            newCategory,
        ]);
    }

    // Handler for removing an expense category.
    function handleRemoveCategory(categoryIdToRemove) {
        setExpenseCategories((previousCategories) =>
            previousCategories.filter(
                (singleCategory) => singleCategory.id !== categoryIdToRemove
            )
        );
    }

    // --- Component Rendering ---
    // The `return` statement defines the JSX (JavaScript XML) that will be rendered to the DOM.
    // Tailwind CSS classes are used extensively for styling.

    return (
        // Main container for the entire application.
        // `min-h-screen` ensures it takes at least the full height of the viewport.
        // `bg-slate-950` sets a dark background color.
        // `text-slate-100` sets a light text color for contrast.
        // `flex justify-center p-4` centers the content horizontally and adds padding.
        <div className="min-h-screen bg-slate-950 text-slate-100 flex justify-center p-4">
            {/* Inner container to limit content width and add vertical spacing. */}
            {/* `w-full max-w-4xl` makes it full width up to a maximum of 4xl (around 896px). */}
            {/* `space-y-6` adds vertical spacing between direct child elements. */}
            <div className="w-full max-w-4xl space-y-6">
                {/* Header section of the application. */}
                <header className="flex flex-col gap-1">
                    <h1 className="text-3xl font-bold">Incomes & Expenses Tracker</h1>
                    <p className="text-slate-400 text-sm">
                        Track your budget, spending and remaining balance.
                    </p>
                </header>

                {/* Budget Summary component: displays budget, income, spent, and remaining amounts. */}
                {/* Props are passed down from the App component's state and calculated values. */}
                <BudgetSummary
                    totalBudgetAmount={totalBudgetAmount}
                    totalIncomeAmount={totalIncomeAmount}
                    totalExpenseAmount={totalExpenseAmount}
                    totalRemainingAmount={totalRemainingAmount}
                />

                {/* Grid layout for BudgetChart and BudgetSpending components. */}
                {/* `grid gap-6 md:grid-cols-2` creates a 2-column grid on medium screens and above. */}
                {/*<div className="grid gap-6 md:grid-cols-2">*/}
                {/*    /!* Budget Chart component: visualizes budget vs. spending. *!/*/}
                {/*    <BudgetChart*/}
                {/*        totalBudgetAmount={totalBudgetAmount}*/}
                {/*        totalIncomeAmount={totalIncomeAmount}*/}
                {/*        totalExpenseAmount={totalExpenseAmount}*/}
                {/*    />*/}
                {/*    /!* Budget Spending component: likely shows a breakdown of expenses. *!/*/}
                {/*    <BudgetSpending*/}
                {/*        transactionList={transactionList}*/}
                {/*        onRemoveTransaction={handleRemoveTransaction}*/}
                {/*    />*/}
                {/*</div>*/}

                {/* Expense Categories component: allows users to manage their expense categories. */}
                {/* It receives the current list of categories and functions to add/remove them. */}
                <ExpenseCategories
                    expenseCategories={expenseCategories}
                    onAddCategory={handleAddCategory}
                    onRemoveCategory={handleRemoveCategory}
                />

                {/* Transaction Form component: allows users to add new incomes or expenses. */}
                {/* It receives handlers for adding transactions and changing the budget,
            and also the list of expense categories for its dropdown. */}
                <TransactionForm
                    onAddTransaction={handleAddTransaction}
                    onBudgetChange={handleBudgetChange}
                    expenseCategories={expenseCategories} // Pass categories to the form
                />

                {/* Transaction List component: displays all recorded transactions. */}
                <TransactionList
                    transactionList={transactionList}
                    onRemoveTransaction={handleRemoveTransaction}
                    expenseCategories={expenseCategories}
                />
            </div>
        </div>
    );
}

// Export the App component so it can be used in `main.jsx` to render the application.
export default App;