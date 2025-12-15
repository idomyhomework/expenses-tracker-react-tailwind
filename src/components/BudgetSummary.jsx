// src/components/BudgetSummary.jsx
function BudgetSummary({
                           totalBudgetAmount,
                           totalIncomeAmount,
                           totalExpenseAmount,
                           totalRemainingAmount,
                       }) {
    return (
        <section className="grid gap-4 md:grid-cols-4">
            <div className="rounded-xl bg-slate-900 p-4 border border-slate-800">
                <p className="text-sm text-slate-400">Budget</p>
                <p className="text-2xl font-semibold text-emerald-400">
                    €{totalBudgetAmount.toFixed(2)}
                </p>
            </div>

            <div className="rounded-xl bg-slate-900 p-4 border border-slate-800">
                <p className="text-sm text-slate-400">Incomes</p>
                <p className="text-2xl font-semibold text-sky-400">
                    €{totalIncomeAmount.toFixed(2)}
                </p>
            </div>

            <div className="rounded-xl bg-slate-900 p-4 border border-slate-800">
                <p className="text-sm text-slate-400">Spent</p>
                <p className="text-2xl font-semibold text-rose-400">
                    €{totalExpenseAmount.toFixed(2)}
                </p>
            </div>

            <div className="rounded-xl bg-slate-900 p-4 border border-slate-800">
                <p className="text-sm text-slate-400">Remaining</p>
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

export default BudgetSummary;