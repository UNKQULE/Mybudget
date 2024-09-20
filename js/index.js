document.addEventListener('DOMContentLoaded', () => {
    const drawerToggle = document.querySelector('.drawer-toggle');
    const drawer = document.querySelector('.drawer');
    const authModal = document.getElementById('authModal');
    const balanceModal = document.getElementById('balanceModal');
    const budgetModal = document.getElementById('budgetModal');
    const authButton = document.querySelector('.auth-button');
    const closeButtons = document.querySelectorAll('.close');
    const balanceValue = document.getElementById('balance-value');
    const budgetValue = document.getElementById('budget-value');
    const incomeValue = document.getElementById('income-value');
    const expensesValue = document.getElementById('expenses-value');

    // Функция для переключения шторки
    function toggleDrawer() {
        if (drawer.style.right === '0px') {
            drawer.style.right = '-250px'; // Скрываем шторку
        } else {
            drawer.style.right = '0px'; // Показываем шторку
        }
    }

    // Добавляем обработчик события клика для переключения шторки
    if (drawerToggle) {
        drawerToggle.addEventListener('click', toggleDrawer);
    }

    // Функция для открытия модального окна
    function openModal(modalElement) {
        modalElement.style.display = 'block';
    }

    // Функция для закрытия модального окна
    function closeModal(modalElement) {
        modalElement.style.display = 'none';
    }

    // При нажатии на кнопку авторизации открываем модальное окно
    if (authButton) {
        authButton.onclick = function() {
            openModal(authModal);
        }
    }

    // При нажатии на крестик закрываем соответствующее модальное окно
    closeButtons.forEach(function(button) {
        button.onclick = function() {
            closeModal(button.closest('.modal'));
        }
    });

    // При нажатии вне модального окна также закрываем его
    window.onclick = function(event) {
        if (event.target === authModal) {
            closeModal(authModal);
        } else if (event.target === balanceModal) {
            closeModal(balanceModal);
        } else if (event.target === budgetModal) {
            closeModal(budgetModal);
        }
    }

    // Функция для открытия модального окна изменения баланса
    window.openBalanceModal = function() {
        openModal(balanceModal);
    }

    // Функция для открытия модального окна изменения бюджета
    window.openBudgetModal = function() {
        openModal(budgetModal);
    }

    // Обработчики для форм изменения баланса и бюджета
    document.getElementById('balanceForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const newBalance = parseFloat(document.getElementById('new-balance').value);
        balanceValue.textContent = newBalance + ' ₽';
        localStorage.setItem('balance', newBalance);
        closeModal(balanceModal);
    });

    document.getElementById('budgetForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const newBudget = parseFloat(document.getElementById('new-budget').value);
        budgetValue.textContent = newBudget + ' ₽';
        localStorage.setItem('budget', newBudget);
        closeModal(budgetModal);
    });

    // Функция для загрузки баланса, бюджета, доходов и расходов из localStorage
    function loadFinancialData() {
        const savedBalance = localStorage.getItem('balance');
        const savedBudget = localStorage.getItem('budget');
        const savedIncome = localStorage.getItem('totalIncome');
        const savedExpenses = localStorage.getItem('totalExpenses');

        console.log('Загрузка данных:', { savedBalance, savedBudget, savedIncome, savedExpenses });

        if (savedBalance !== null) {
            balanceValue.textContent = parseFloat(savedBalance).toFixed(2) + ' ₽';
        }

        if (savedBudget !== null) {
            budgetValue.textContent = parseFloat(savedBudget).toFixed(2) + ' ₽';
        }

        if (savedIncome !== null) {
            incomeValue.textContent = parseFloat(savedIncome).toFixed(2) + ' ₽';
        }

        if (savedExpenses !== null) {
            expensesValue.textContent = parseFloat(savedExpenses).toFixed(2) + ' ₽';
        }
    }

    // Загрузка данных при загрузке страницы
    loadFinancialData();
});