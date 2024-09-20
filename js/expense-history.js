document.addEventListener('DOMContentLoaded', () => {
    const historyList = document.querySelector('.history-list');

    // Загрузка истории расходов из localStorage
    loadExpenseHistory();

    // Функция для загрузки истории расходов из localStorage
    function loadExpenseHistory() {
        const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        expenses.forEach(expense => addExpenseToHistory(expense.category, expense.amount, expense.date));
    }

    // Функция для добавления расхода в историю
    function addExpenseToHistory(category, amount, date) {
        const li = document.createElement('li');
        li.classList.add('history-item');
        li.innerHTML = `
            <span>${category} - ${amount} руб. - ${date}</span>
            <button class="delete-expense" onclick="deleteExpense(this)">Удалить</button>
        `;
        historyList.appendChild(li);
    }

    // Функция для удаления расхода из истории
    window.deleteExpense = function(button) {
        const li = button.parentElement;
        const spanText = li.querySelector('span').textContent.split(' - ');
        const category = spanText[0];
        const amount = parseFloat(spanText[1].split(' руб.')[0]);
        const date = spanText[2];

        li.remove();
        removeExpenseFromLocalStorage(category, amount, date);
        updateTotalExpenses();
    }

    // Функция для удаления расхода из localStorage
    function removeExpenseFromLocalStorage(category, amount, date) {
        let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        expenses = expenses.filter(expense => !(expense.category === category && parseFloat(expense.amount) === amount && expense.date === date));
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }

    // Функция для обновления общей суммы расходов
    function updateTotalExpenses() {
        const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        const totalExpenses = expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);
        localStorage.setItem('totalExpenses', totalExpenses);
    }
});