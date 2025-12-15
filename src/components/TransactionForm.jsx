// src/components/TransactionForm.jsx
import { useState } from "react";

function TransactionForm({ onAddTransaction, onBudgetChange, expenseCategories }) {
    const [inputDescription, setInputDescription] = useState("");
    const [inputAmount, setInputAmount] = useState("");
    const [inputType, setInputType] = useState("expense");
    const [inputCategory, setInputCategory] = useState("");
    const [inputBudget, setInputBudget] = useState("");

    function handleSubmit(event) {
        event.preventDefault();

        const parsedAmount = Number(inputAmount);
        if (!inputDescription || Number.isNaN(parsedAmount)) return;

        // For expenses, require a category
        if (inputType === "expense" && !inputCategory) {
            alert("Please select a category for expenses.");
            return;
        }

        const normalizedAmount =
            inputType === "expense"
                ? -Math.abs(parsedAmount) // expenses are negative
                : Math.abs(parsedAmount); // incomes are positive

        const newTransaction = {
            id: crypto.randomUUID(),
            description: inputDescription,
            amount: normalizedAmount,
            type: inputType, // "income" or "expense"
            category: inputType === "expense" ? inputCategory : null,
            createdAt: new Date().toISOString(),
        };

        onAddTransaction(newTransaction);

        setInputDescription("");
        setInputAmount("");
        setInputCategory("");
    }

    function handleBudgetSubmit(event) {
        event.preventDefault();

        const parsedBudget = Number(inputBudget);
        if (Number.isNaN(parsedBudget)) return;

        onBudgetChange(parsedBudget);
        setInputBudget("");
    }

    return (
        <section className="grid gap-6 md:grid-cols-[2fr,1fr]">
            <form
                onSubmit={handleSubmit}
                className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col gap-3"
            >
                <h2 className="text-lg font-semibold">Add transaction</h2>

                <input
                    type="text"
                    placeholder="Description"
                    value={inputDescription}
                    onChange={(event) => setInputDescription(event.target.value)}
                    className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                />

                <input
                    type="number"
                    step="0.01"
                    placeholder="Amount"
                    value={inputAmount}
                    onChange={(event) => setInputAmount(event.target.value)}
                    className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                />

                <select
                    value={inputType}
                    onChange={(event) => setInputType(event.target.value)}
                    className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                </select>

                {inputType === "expense" && (
                    <select
                        value={inputCategory}
                        onChange={(event) => setInputCategory(event.target.value)}
                        className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                        <option value="">Select category</option>
                        {expenseCategories.map((singleCategory) => (
                            <option key={singleCategory.id} value={singleCategory.id}>
                                {singleCategory.name}
                            </option>
                        ))}
                    </select>
                )}

                <button
                    type="submit"
                    className="mt-1 inline-flex items-center justify-center rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium hover:bg-sky-500 transition-colors"
                >
                    Add transaction
                </button>
            </form>

            <form
                onSubmit={handleBudgetSubmit}
                className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col gap-3"
            >
                <h2 className="text-lg font-semibold">Set budget</h2>

                <input
                    type="number"
                    step="0.01"
                    placeholder="Total budget"
                    value={inputBudget}
                    onChange={(event) => setInputBudget(event.target.value)}
                    className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                />

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

export default TransactionForm;