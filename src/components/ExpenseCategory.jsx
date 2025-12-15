import {useState} from 'react'

function ExpenseCategory (
    {expenseCategories, onAddCategory, onRemoveCategory,}
){
    const [inputCategoryName, setInputCategoryName] = useState("");
    const [inputCategoryColor, setInputCategoryColor] = useState("#6b7280");

    function handleSubmit(event) {
        event.preventDefault();

        if(!inputCategoryName.trim()) return;

        const newCategory = {
            id: crypto.randomUUID(),
            name: inputCategoryName.trim(),
            color: inputCategoryColor,

        };

        onAddCategory(newCategory);
        setInputCategoryName("");
        setInputCategoryColor("#6b7280");
    }

    return (
        <section className={"bg-slate-900 border border-slate-800 rounded-xl p-4"}>
            <h2 className={"text-lg font-mono mb-3"}>Expense categories</h2>

            {/*List of categories */}
            <div className={"flex flex-wrap gap-2 mb-3"}>
                {expenseCategories.length === 0 ? (
                    <p className={"text-sm text-slate-500"}>No categories yet.</p>
                ) : (
                    expenseCategories.map((category) => (
                        <div key={category.id}
                             className={"flex gap-2 items-center rounded-lg bg-slate-950/60 px-3 py-1.5 text-sm border border-slate-700"}>
                            <span className={"w-3 h-3 rounded-full"} style={{backgroundColor: category.color}}></span>
                            <span className={"font-medium"}>{category.name}</span>
                            <button onClick={() => onRemoveCategory((category.id))} className={"ml-1 text-slate-400 hover:text-rose-400 text-xs"}>✕</button>
                        </div>
                    ))
                )}
            </div>
            {/*Add new category */}
            <form onSubmit={handleSubmit} className={"flex flex-col gap-3"}>
                <div className={"grid gap-3 md:grid-cols-[1fr,auto,auto]"}>
                    <input type={"text"}
                           placeholder={"Category name"}
                           value={inputCategoryName}
                           onChange={(event) => {
                        setInputCategoryName(event.target.value); }}
                            className={"w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-1.5 text-sm focus:outline-none focus:ring-sky-500"}/>

                    <input
                        type={"color"}
                        value={inputCategoryColor}
                        onChange={(event) => {setInputCategoryColor(event.target.value)}}
                        className={"w-16 h-10 rounded-lg bg-slate-950 border border-slate-700 cursor-pointer"}
                    />
                    <button type={"submit"}
                    className={"inline-flex items-center justify-center rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium " +
                        "hover:bg-sky-500 transition-colors whitespace-nowrap"
                        }>
                        Add category
                    </button>
                </div>
            </form>
        </section>
    )
}
export default ExpenseCategory
