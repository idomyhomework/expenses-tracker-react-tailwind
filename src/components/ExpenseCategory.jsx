// src/components/ExpenseCategory.jsx

// Import useState hook for managing component-specific state (form inputs).
import { useState } from "react";

// Functional component that receives category data and handlers as props.
function ExpenseCategory({
  expenseCategories, // Array of category objects from App.jsx.
  onAddCategory, // Callback to add a new category to App.jsx's state.
  onRemoveCategory, // Callback to remove a category from App.jsx's state.
}) {
  // --- Form Input States ---
  // States for the input fields in the "Add new category" form.
  const [inputCategoryName, setInputCategoryName] = useState(""); // State for the new category's name.
  const [inputCategoryColor, setInputCategoryColor] = useState("#6b7280"); // State for the new category's color (default grey).

  // --- Event Handler ---

  // Handles the submission of the "Add category" form.
  function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission.

    // Basic validation: ensure the category name is not empty or just whitespace.
    if (!inputCategoryName.trim()) {
      alert("Category name cannot be empty."); // User feedback
      return;
    }

    // Create a new category object.
    const newCategory = {
      id: crypto.randomUUID(), // Generate a unique ID for the category.
      name: inputCategoryName.trim(), // Trim whitespace from the name.
      color: inputCategoryColor, // The selected color.
    };

    // Call the `onAddCategory` prop (from App.jsx) to update the global categories list.
    onAddCategory(newCategory);

    // Reset form fields after submission.
    setInputCategoryName("");
    setInputCategoryColor("#6b7280"); // Reset color to default.
  }

  // --- Component Rendering ---
  return (
    // Section container for the expense categories management.
    <section className="bg-slate-900 border border-slate-800 rounded-xl p-4">
      <h2 className="text-lg font-semibold mb-3">Expense Categories</h2>

      {/* Display area for the list of existing categories. */}
      <div className="mb-4 flex flex-wrap gap-2">
        {/* Conditional rendering: If no categories, display a message. */}
        {expenseCategories.length === 0 ? (
          <p className="text-sm text-slate-500">No categories yet.</p>
        ) : (
          // Map over the `expenseCategories` array to display each category.
          expenseCategories.map((singleCategory) => (
            <div
              key={singleCategory.id} // `key` prop for list rendering.
              className="flex items-center gap-2 rounded-lg bg-slate-950/60 px-3 py-1.5 text-sm border border-slate-700"
            >
              {/* Color indicator: a small circle with the category's color. */}
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: singleCategory.color }} // Inline style for dynamic color.
              ></span>
              <span className="font-medium">{singleCategory.name}</span>
              {/* Remove button for the category. */}
              <button
                onClick={() => onRemoveCategory(singleCategory.id)} // Calls handler with category ID.
                className="ml-1 text-slate-400 hover:text-rose-400 text-xs"
              >
                ✕ {/* Unicode multiplication sign for a simple 'close' icon. */}
              </button>
            </div>
          ))
        )}
      </div>

      {/* Form for adding new categories. */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {/* Grid layout for the input fields and button. */}
        {/* `md:grid-cols-[1fr,auto,auto]` makes it responsive:
            - Category name input takes available space (1fr).
            - Color picker and button take their natural width (auto). */}
        <div className="grid gap-3 md:grid-cols-[1fr,auto,auto]">
          {/* Category Name Input */}
          <input
            type="text"
            placeholder="Category name"
            value={inputCategoryName}
            onChange={(event) => setInputCategoryName(event.target.value)}
            className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />

          {/* Color Picker Input */}
          <input
            type="color"
            value={inputCategoryColor}
            onChange={(event) => setInputCategoryColor(event.target.value)}
            className="w-16 h-10 rounded-lg bg-slate-950 cursor-pointer"
          />

          {/* Add Category Button */}
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium hover:bg-sky-500 transition-colors whitespace-nowrap"
          >
            Add category
          </button>
        </div>
      </form>
    </section>
  );
}

// Export the component.
export default ExpenseCategory;
