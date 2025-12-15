// src/components/TransactionList.jsx
function TransactionList({ transactionList, onRemoveTransaction }) {
    if (transactionList.length === 0) {
        return (
            <section className="bg-slate-900 border border-slate-800 rounded-xl p-4 font-mono">
                <h2 className="text-lg font-semibold mb-2">Transactions</h2>
                <p className="text-sm text-slate-500">
                    No transactions yet. Start by adding one above.
                </p>
            </section>
        );
    }

    return (
        <section className="bg-slate-900 border border-slate-800 rounded-xl p-4 font-mono">
            <h2 className="text-lg font-semibold mb-3">Transactions</h2>
            <ul className="space-y-2">
                {transactionList.map((singleTransaction) => (
                    <li
                        key={singleTransaction.id}
                        className="flex items-center justify-between rounded-lg bg-slate-950/60 px-3 py-2 text-sm"
                    >
                        <div>
                            <p className="font-medium">{singleTransaction.description}</p>
                            <p className="text-xs text-slate-500">
                                {singleTransaction.type.toUpperCase()}
                                {singleTransaction.category &&
                                    ` • ${singleTransaction.category}`}
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
              <span
                  className={`font-semibold ${
                      singleTransaction.amount < 0 ? "text-rose-400" : "text-emerald-400"
                  }`}
              >
                €{singleTransaction.amount.toFixed(2)}
              </span>
                            <button
                                onClick={() => onRemoveTransaction(singleTransaction.id)}
                                className="text-xs text-slate-400 hover:text-rose-400"
                            >
                                Remove
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default TransactionList;