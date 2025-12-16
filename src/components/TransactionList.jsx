// src/components/TransactionList.jsx

// TransactionList is a presentational component.
// It receives:
// - transactionList: array of transaction objects to render
// - onRemoveTransaction: callback to delete a transaction by id
// - expenseCategories: array of category objects so we can show category name + color
function TransactionList({
                             transactionList,
                             onRemoveTransaction,
                             expenseCategories, // list of all categories defined in the app
                         }) {
    // If there are no transactions yet, we return early with an "empty state" UI.
    // This avoids rendering an empty list and gives feedback to the user.
    if (transactionList.length === 0) {
        return (
            <section className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                <h2 className="text-lg font-semibold mb-2">Transactions</h2>
                <p className="text-sm text-slate-500">
                    No transactions yet. Start by adding one above.
                </p>
            </section>
        );
    }

    // If we *do* have transactions, render the list with details.
    return (
        <section className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <h2 className="text-lg font-semibold mb-3">Transactions</h2>

            {/*
        <ul> holds all transaction items.
        space-y-2 adds vertical space between each <li>.
      */}
            <ul className="space-y-2">
                {transactionList.map((singleTransaction) => {
                    // For each transaction, we try to find its full category object
                    // using the saved category id: singleTransaction.category.
                    //
                    // - If transaction.category is null/undefined (e.g. income), matchedCategory will be falsy.
                    // - If it has an id, we search in expenseCategories for a matching id.
                    const matchedCategory =
                        singleTransaction.category &&
                        expenseCategories.find(
                            (singleCategory) =>
                                singleCategory.id === singleTransaction.category
                        );

                    return (
                        <li
                            key={singleTransaction.id} // key helps React efficiently update lists
                            className="flex items-center justify-between rounded-lg bg-slate-950/60 px-3 py-2 text-sm"
                        >
                            {/* LEFT SIDE: description + type + category badge */}
                            <div className="flex items-center gap-3">
                                <div>
                                    {/* Transaction description (e.g. "Groceries", "Salary") */}
                                    <p className="font-medium">
                                        {singleTransaction.description}
                                    </p>

                                    {/*
                    Row with type (INCOME/EXPENSE) and optional category badge.
                    flex + gap-2 keeps items aligned and spaced.
                  */}
                                    <p className="text-xs text-slate-500 flex items-center gap-2">
                                        {/* Type label in uppercase so it's visually distinct */}
                                        <span>{singleTransaction.type.toUpperCase()}</span>

                                        {/*
                      Category badge: only rendered if we successfully found a category.
                      Shows:
                      - a small colored dot (category.color)
                      - the category name
                    */}
                                        {matchedCategory && (
                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-800 text-[11px]">
                        {/* Small circle filled with the category color */}
                                                <span
                                                    className="w-2 h-2 rounded-full"
                                                    style={{ backgroundColor: matchedCategory.color }}
                                                ></span>

                                                {/* Category name text (e.g. "Food", "Transport") */}
                                                <span>{matchedCategory.name}</span>
                      </span>
                                        )}
                                    </p>
                                </div>
                            </div>

                            {/* RIGHT SIDE: amount + remove button */}
                            <div className="flex items-center gap-3">
                                {/*
                  Amount is colored depending on type:
                  - negative (expense) => red
                  - positive (income)  => green
                */}
                                <span
                                    className={`font-semibold ${
                                        singleTransaction.amount < 0
                                            ? "text-rose-400"
                                            : "text-emerald-400"
                                    }`}
                                >
                  €{singleTransaction.amount.toFixed(2)}
                </span>

                                {/*
                  Remove button triggers the callback from the parent (App).
                  We pass the transaction id so the parent can filter it out.
                */}
                                <button
                                    onClick={() => onRemoveTransaction(singleTransaction.id)}
                                    className="text-xs text-slate-400 hover:text-rose-400"
                                >
                                    Remove
                                </button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}

// Export so App.jsx (or others) can import and use this component.
export default TransactionList;