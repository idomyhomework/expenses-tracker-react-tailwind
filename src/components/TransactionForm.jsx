// src/components/TransactionForm.jsx

// Import useState hook for managing component-specific state (form inputs).
import { useState } from "react";

// Functional component that receives callback functions and data as props.
function TransactionForm({
                             onAddTransaction, // Callback to add a new transaction to App.jsx's state.
                             onBudgetChange, // Callback to update the total budget in App.jsx's state.
                             expenseCategories, // List of available expense categories from App.jsx.
                         }) {
    // --- Form Input States ---
    // Each input field in the form has its own state to control its value.
    const [inputDescription, setInputDescription] = useState(""); // State for transaction description.
    const [inputAmount, setInputAmount] = useState(""); // State for transaction amount.
    const [inputType, setInputType] = useState("expense"); // State for transaction type (income/expense). Default to 'expense'.
    const [inputCategory, setInputCategory] = useState(""); // State for selected expense category ID.
    const [inputBudget, setInputBudget] = useState(""); // State for the budget input field.

    // --- Event Handlers ---

    // Handles the submission of the "Add transaction" form.
    function handleSubmit(event) {
        event.preventDefault(); // Prevent default form submission behavior (page reload).

        const parsedAmount = Number(inputAmount); // Convert input amount string to a number.

        // Basic validation: ensure description is not empty and amount is a valid number.
        if (!inputDescription || Number.isNaN(parsedAmount)) {
            alert("Please enter a valid description and amount."); // User feedback
            return; // Stop function execution if validation fails.
        }

        // If it's an expense, ensure a category is selected.
        if (inputType === "expense" && !inputCategory) {
            alert("Please select a category for expenses.");
            return;
        }

        // Determine the actual amount to store:
        // - Expenses are stored as negative numbers (e.g., -50).
        // - Incomes are stored as positive numbers (e.g., 100).
        // Math.abs ensures we're working with the positive value of the input,
        // then we apply the sign based on type.
        const normalizedAmount =
            inputType === "expense"
                ? -Math.abs(parsedAmount) // For expenses, make it negative.
                : Math.abs(parsedAmount); // For incomes, keep it positive.

        // Create a new transaction object.
        const newTransaction = {
            id: crypto.randomUUID(), // Generate a unique ID for the transaction.
            description: inputDescription,
            amount: normalizedAmount,
            type: inputType,
            // Assign category ID only if it's an expense; otherwise, it's null.
            category: inputType === "expense" ? inputCategory : null,
            createdAt: new Date().toISOString(), // Timestamp for when the transaction was added.
        };

        // Call the `onAddTransaction` prop (from App.jsx) to update the global transaction list.
        onAddTransaction(newTransaction);

        // Reset form fields after submission for a clean slate.
        setInputDescription("");
        setInputAmount("");
        setInputCategory(""); // Reset category selection
    }

    // Handles the submission of the "Set budget" form.
    function handleBudgetSubmit(event) {
        event.preventDefault(); // Prevent default form submission.

        const parsedBudget = Number(inputBudget); // Convert budget input to a number.

        // Basic validation: ensure budget is a valid number.
        if (Number.isNaN(parsedBudget)) {
            alert("Please enter a valid budget amount."); // User feedback
            return;
        }

        // Call the `onBudgetChange` prop (from App.jsx) to update the global budget amount.
        onBudgetChange(parsedBudget);

        // Reset budget input field.
        setInputBudget("");
    }

    // --- Component Rendering ---
    return (
        // Section container for both forms, arranged in a grid.
        // `grid gap-6 md:grid-cols-[2fr,1fr]` creates a responsive grid:
        // - `gap-6` adds space between grid items.
        // - `md:grid-cols-[2fr,1fr]` on medium screens and up, the first column
        //   (transaction form) takes 2/3 of the width, and the second (budget form) takes 1/3.
        <section className="grid gap-6 md:grid-cols-[2fr,1fr]">
            {/* Form for adding new transactions */}
            <form
                onSubmit={handleSubmit} // Attach the submit handler.
                className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col gap-3"
            >
                <h2 className="text-lg font-semibold">Add transaction</h2>

                {/* Description Input */}
                <input
                    type="text"
                    placeholder="Description"
                    value={inputDescription} // Controlled component: value is tied to state.
                    onChange={(event) => setInputDescription(event.target.value)} // Update state on change.
                    className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                />

                {/* Amount Input */}
                <input
                    type="number"
                    step="0.01" // Allows decimal values.
                    placeholder="Amount"
                    value={inputAmount}
                    onChange={(event) => setInputAmount(event.target.value)}
                    className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                />

                {/* Transaction Type Selector (Income/Expense) */}
                <select
                    value={inputType}
                    onChange={(event) => setInputType(event.target.value)}
                    className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                </select>

                {/* Conditional Category Selector: Only shows if inputType is "expense" */}
                {inputType === "expense" && (
                    <select
                        value={inputCategory}
                        onChange={(event) => setInputCategory(event.target.value)}
                        className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                        <option value="">Select category</option>{" "}
                        {/* Default option */}
                        {/* Map through expenseCategories prop to create options */}
                        {expenseCategories.map((singleCategory) => (
                            <option key={singleCategory.id} value={singleCategory.id}>
                                {singleCategory.name}
                            </option>
                        ))}
                    </select>
                )}

                {/* Add Transaction Button */}
                <button
                    type="submit"
                    className="mt-1 inline-flex items-center justify-center rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium hover:bg-sky-500 transition-colors"
                >
                    Add transaction
                </button>
            </form>

            {/* Form for setting/updating the budget */}
            <form
                onSubmit={handleBudgetSubmit} // Attach the submit handler.
                className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col gap-3"
            >
                <h2 className="text-lg font-semibold">Set budget</h2>

                {/* Budget Amount Input */}
                <input
                    type="number"
                    step="0.01"
                    placeholder="Total budget"
                    value={inputBudget}
                    onChange={(event) => setInputBudget(event.target.value)}
                    className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                />

                {/* Update Budget Button */}
                <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium hover:bg-emerald-500 transition-colors"
                >
                    Update budget
                </button>
            </form>
        </section>
    );
}

// Export the component.
export default TransactionForm;