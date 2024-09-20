document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expense-form');

    // Обработчик отправки формы
    expenseForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const category = document.getElementById('category').value;
        const amount = parseFloat(document.getElementById('amount').value);
        const date = document.getElementById('date').value;

        saveExpenseToLocalStorage(category, amount, date);

        expenseForm.reset();
    });

    // Функция для сохранения расхода в localStorage
    function saveExpenseToLocalStorage(category, amount, date) {
        const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        expenses.push({ category, amount, date });
        localStorage.setItem('expenses', JSON.stringify(expenses));
        updateTotalExpenses();
        updateBalance(-amount);
    }

    // Функция для обновления общей суммы расходов
    function updateTotalExpenses() {
        const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
        localStorage.setItem('totalExpenses', totalExpenses);
    }

    // Функция для обновления баланса
    function updateBalance(amount) {
        let balance = parseFloat(localStorage.getItem('balance')) || 0;
        balance += amount;
        localStorage.setItem('balance', balance);
    }
});