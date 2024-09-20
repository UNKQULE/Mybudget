document.addEventListener('DOMContentLoaded', () => {
    const historyList = document.querySelector('.history-list');

    // Загрузка истории доходов из localStorage
    loadIncomeHistory();

    // Функция для загрузки истории доходов из localStorage
    function loadIncomeHistory() {
        const incomes = JSON.parse(localStorage.getItem('incomes')) || [];
        incomes.forEach(income => addIncomeToHistory(income.category, income.amount, income.date));
    }

    // Функция для добавления дохода в историю
    function addIncomeToHistory(category, amount, date) {
        const li = document.createElement('li');
        li.classList.add('history-item');
        li.innerHTML = `
            <span>${category} - ${amount} руб. - ${date}</span>
            <button class="delete-income" onclick="deleteIncome(this)">Удалить</button>
        `;
        historyList.appendChild(li);
    }

    // Функция для удаления дохода из истории
    window.deleteIncome = function(button) {
        const li = button.parentElement;
        const spanText = li.querySelector('span').textContent.split(' - ');
        const category = spanText[0];
        const amount = parseFloat(spanText[1].split(' руб.')[0]);
        const date = spanText[2];

        console.log(`Удаление дохода: категория=${category}, сумма=${amount}, дата=${date}`);

        li.remove();
        removeIncomeFromLocalStorage(category, amount, date);
        updateTotalIncome();
    }

    // Функция для удаления дохода из localStorage
    function removeIncomeFromLocalStorage(category, amount, date) {
        let incomes = JSON.parse(localStorage.getItem('incomes')) || [];
        incomes = incomes.filter(income => {
            return !(income.category === category && income.amount === amount && income.date === date);
        });
        localStorage.setItem('incomes', JSON.stringify(incomes));
        console.log('Обновленный список доходов:', incomes);
    }

    // Функция для обновления общей суммы доходов
    function updateTotalIncome() {
        const incomes = JSON.parse(localStorage.getItem('incomes')) || [];
        const totalIncome = incomes.reduce((total, income) => total + parseFloat(income.amount), 0);
        localStorage.setItem('totalIncome', totalIncome);
    }
});