// src/components/BudgetSummary.jsx

// This is a functional component that receives props from its parent (App.jsx).
// Props are read-only data passed from a parent component to a child component.
function BudgetSummary({
                           totalBudgetAmount, // The total budget set by the user.
                           totalIncomeAmount, // The sum of all income transactions.
                           totalExpenseAmount, // The sum of all expense transactions (absolute value).
                           totalRemainingAmount, // The calculated remaining balance.
                       }) {
    return (
        // Section container for the summary.
        // `grid gap-4 md:grid-cols-4` creates a responsive grid:
        // - `gap-4` adds space between grid items.
        // - `md:grid-cols-4` makes it a 4-column grid on medium screens and larger.
        <section className="grid gap-4 md:grid-cols-4">
            {/* Individual summary card for Budget */}
            <div className="rounded-xl bg-slate-900 p-4 border border-slate-800">
                <p className="text-sm text-slate-400">Budget</p>
                {/* Displays the budget amount, formatted to two decimal places. */}
                {/* `text-2xl font-semibold text-emerald-400` styles the amount. */}
                <p className="text-2xl font-semibold text-emerald-400">
                    €{totalBudgetAmount.toFixed(2)}
                </p>
            </div>

            {/* Individual summary card for Incomes */}
            <div className="rounded-xl bg-slate-900 p-4 border border-slate-800">
                <p className="text-sm text-slate-400">Incomes</p>
                {/* Displays the total income amount. */}
                <p className="text-2xl font-semibold text-sky-400">
                    €{totalIncomeAmount.toFixed(2)}
                </p>
            </div>

            {/* Individual summary card for Spent */}
            <div className="rounded-xl bg-slate-900 p-4 border border-slate-800">
                <p className="text-sm text-slate-400">Spent</p>
                {/* Displays the total expense amount. */}
                <p className="text-2xl font-semibold text-rose-400">
                    €{totalExpenseAmount.toFixed(2)}
                </p>
            </div>

            {/* Individual summary card for Remaining */}
            <div className="rounded-xl bg-slate-900 p-4 border border-slate-800">
                <p className="text-sm text-slate-400">Remaining</p>
                {/* Displays the remaining amount. */}
                {/* The text color changes based on whether the amount is positive (emerald) or negative (rose). */}
                <p
                    className={`text-2xl font-semibold ${
                        totalRemainingAmount >= 0 ? "text-emerald-400" : "text-rose-500"
                    }`}
                >
                    €{totalRemainingAmount.toFixed(2)}
                </p>
            </div>
        </section>
    );
}

// Export the component so it can be imported and used by other components (like App.jsx).
export default BudgetSummary;