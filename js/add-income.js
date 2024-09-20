document.addEventListener('DOMContentLoaded', () => {
    const incomeForm = document.getElementById('income-form');

    // Обработчик отправки формы
    incomeForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const category = document.getElementById('category').value;
        const amount = parseFloat(document.getElementById('amount').value);
        const date = document.getElementById('date').value;

        saveIncomeToLocalStorage(category, amount, date);

        incomeForm.reset();
    });

    // Функция для сохранения дохода в localStorage
    function saveIncomeToLocalStorage(category, amount, date) {
        const incomes = JSON.parse(localStorage.getItem('incomes')) || [];
        incomes.push({ category, amount, date });
        localStorage.setItem('incomes', JSON.stringify(incomes));
        updateTotalIncome();
        updateBalance(amount);
    }

    // Функция для обновления общей суммы доходов
    function updateTotalIncome() {
        const incomes = JSON.parse(localStorage.getItem('incomes')) || [];
        const totalIncome = incomes.reduce((total, income) => total + income.amount, 0);
        localStorage.setItem('totalIncome', totalIncome);
    }

    // Функция для обновления баланса
    function updateBalance(amount) {
        let balance = parseFloat(localStorage.getItem('balance')) || 0;
        balance += amount;
        localStorage.setItem('balance', balance);
    }
});