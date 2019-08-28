//  REPRESENT A INPUT EXPENSE
class addExpense {
  constructor(nameExpense, valueExpense) {
    this.title = nameExpense;
    this.value = valueExpense;
  }
}

class viewFinance {
  constructor(valueTotalBudget, valueTotalExpense, valueTotalBalance) {
    this.budget = valueTotalBudget;
    this.expense = valueTotalExpense;
    this.balance = valueTotalBalance;
  }
}

// add view Finance to sessionStorage
class OverViewFinance {

  static getBudgetStorage() {
    let overviewFinance;

    if (sessionStorage.getItem('overview') === null){
      overviewFinance = [];

    } else {
      overviewFinance = JSON.parse(sessionStorage.getItem('overview'));

      // overviewFinance[overviewFinance.length - 1].expense += 100 
      // console.log(overviewFinance);
    }

    return overviewFinance;
  }

  // ADD BUDGET AND UPDATE BALANCE
  static addBudgetBalanceStorage(updateTotalFinance) {
    const overviewFinance = this.getBudgetStorage();
    // console.log(overviewFinance);
    overviewFinance.push(updateTotalFinance);
    sessionStorage.setItem('overview', JSON.stringify(overviewFinance));
  }

  // ADD EXPENSE AND UPDATE BALANCE
  static addExpenseBalanceStorage(inputAmountExpense) {
    const overviewFinance = this.getBudgetStorage();

    overviewFinance[overviewFinance.length - 1].expense =
    Number(overviewFinance[overviewFinance.length - 1].expense) + Number(inputAmountExpense);

    overviewFinance[overviewFinance.length - 1].balance -=   inputAmountExpense;

    sessionStorage.setItem('overview', JSON.stringify(overviewFinance));
  }

}

// UI CLASS: HANDLES UI TASK
class UI {
  static addNewBudget(budget) {
    // console.log(budget);
    const valueTotalBudget = document.querySelector('#budget-amount');
    valueTotalBudget.innerHTML = budget;
    const valueTotalBalance = document.querySelector('#balance-amount');
    const valueTotalExpense = document.querySelector('#expense-amount');
    valueTotalBalance.innerHTML = Number(budget) + Number(valueTotalExpense.textContent);
  }


  static displayExpense() {
    const listExpenses = Store.getExpense();
    listExpenses.forEach((itemEp, index) => {
      UI.addExpenseToList(itemEp, index);
    });
  }


  static addExpenseToList(itemEp, index) {
    const expense = document.querySelector('#expense-list__item');
    const div = document.createElement('div');
    div.className = 'expense-item d-flex justify-content-between align-items-baseline';
    div.innerHTML = 
    `
      <h6 class="expense-title mb-0 text-uppercase list-item">- ${itemEp.title}</h6>
      <h5 class="expense-amount mb-0 list-item">${itemEp.value}</h5>

      <div class="expense-icons list-item">
          <a href="#" class="edit-icon mx-2" id="custom${index}">
          <i class="fas fa-edit"></i>
          </a>
          <a href="#" class="delete-icon" id="delete${index}">
          <i class="fas fa-trash"></i>
          </a>
      </div>
    `;
    expense.appendChild(div);
  }

  static alertShow(element) {
    element.style.display = "block";
    setTimeout(() => {
      element.style.display = "none";
    }, 3000);
  }

  static clear() {
    const inputNameExpense = document.querySelector('#expense-input');
    const inputAmountExpense = document.querySelector('#amount-input');
    const inputAddBudget = document.querySelector('#budget-input');

    inputAddBudget.value = "";
    inputNameExpense.value = "";
    inputAmountExpense.value = "";
  }

  static deleteExpense(e) {
    if(e.parentElement.className === "delete-icon") {
      e.parentElement.parentElement.parentElement.remove();
    } else {
      const valueTotalBalance = document.querySelector('#balance-amount');
      const valueTotalExpense = document.querySelector('#expense-amount');
      valueTotalExpense.innerHTML = Number(valueTotalExpense.textContent) + Number(e.parentElement.parentElement.previousElementSibling.textContent);
      valueTotalBalance.innerHTML = Number(valueTotalBalance.textContent) + Number(e.parentElement.parentElement.previousElementSibling.textContent);
    }
  
  }

  static plusTotolExpense(value) {
    const valueTotalExpense = document.querySelector('#expense-amount');
    valueTotalExpense.innerHTML = Number(valueTotalExpense.textContent) + Number(value);
  }

  static minusTotalBalance(value) {
    const valueTotalBalance = document.querySelector("#balance-amount");
    valueTotalBalance.innerHTML = Number(valueTotalBalance.textContent) - Number(value);
  }

  static displayOverViewFinance() {
    const listFinance = OverViewFinance.getBudgetStorage();
    // console.log(listFinance);
    listFinance.forEach(finance => {
    console.log(finance);
    document.querySelector('#budget-amount').innerHTML = finance.budget;
    document.querySelector('#expense-amount').innerHTML = finance.expense;
    document.querySelector('#balance-amount').innerHTML = finance.balance;
    })
}
}


//========================
// STORE CLASS: HANDLES STORAGE
class Store {
  static getExpense() {
    let expenses; 
    // console.log(sessionStorage.getItem('expense'));
    if (sessionStorage.getItem('expenses') === null) {
      expenses = [];
    } else {
      expenses = JSON.parse(sessionStorage.getItem('expenses'));
    }
    return expenses;
  }

  static addExpense (newExpense) {
    const expenses = this.getExpense();
    expenses.push(newExpense);
    sessionStorage.setItem('expenses', JSON.stringify(expenses));
  }

  static removeExpense(e){
    const expenses = this.getExpense();
    expenses.forEach((expense, index) => {
      if (expense.value === e) {
        expenses.splice(index, 1);
      }
    });
    sessionStorage.setItem('expenses', JSON.stringify(expenses));
  }

}


//========================
// EVENT: DISPLAY BOOKS
document.addEventListener('DOMContentLoaded', UI.displayExpense);


//========================
// EVENT: DISPLAY OverviewFinance
document.addEventListener('DOMContentLoaded', UI.displayOverViewFinance);



//========================
// EVENT: ADD A BUDGET
const btnAddBudget = document.querySelector('#budget-submit');
btnAddBudget.addEventListener('click', (e) => {

  e.preventDefault();

  // Get value input
  const inputAddBudget = document.querySelector('#budget-input').value;

  // Validate
  if (inputAddBudget == ""){
    alert('Please fill out the full fields!')
  } else {
    // Add new Budget to UI
    UI.addNewBudget(inputAddBudget);

    // Alert Success
    const alertSuccess = document.querySelector('.budget-feedback');
    UI.alertShow(alertSuccess);

    // Clearn Fields Budget
    UI.clear();

    // Add new Budget to viewFinance
    const updateTotalFinance = new viewFinance(inputAddBudget, 0, inputAddBudget);
    OverViewFinance.addBudgetBalanceStorage(updateTotalFinance);
  }

})


//========================
// EVENT: ADD A EXPENSE
const btnAddExpense = document.querySelector('#expense-submit');
btnAddExpense.addEventListener('click', (e) => {

  e.preventDefault();

  const inputNameExpense = document.querySelector('#expense-input').value;
  const inputAmountExpense = document.querySelector('#amount-input').value;

  // Validate
  if (inputNameExpense === "" || inputAmountExpense === ""){
    alert('Please fill out the full fields!');
  } else {
    // Instatiate new Expense
    const newExpense = new addExpense(inputNameExpense, inputAmountExpense);

    // Add new Expense to UI
    UI.addExpenseToList(newExpense);

    // Add Expense to Store
    Store.addExpense(newExpense);

    // Alert Success
    const alertSuccess = document.querySelector('.expense-feedback');
    UI.alertShow(alertSuccess);

    // Plus Total Expense
    UI.plusTotolExpense(newExpense.value);

    // Minus Total Balance
    UI.minusTotalBalance(newExpense.value);

    // Clearn Fields Expense
    UI.clear();

    // Add new Expense and update Balance 
    const addExpenseUpdateBalance = new viewFinance(inputAmountExpense, 0, inputAmountExpense);
    OverViewFinance.addExpenseBalanceStorage(inputAmountExpense);

  }

});


//============================
// EVENT: REMOVE A EXPENSE
document.querySelector('#expense-list__item').addEventListener('click', (e) => {

  // Remove Expense form UI
  UI.deleteExpense(e.target);

  // Remove Expense form Store
  Store.removeExpense(e.target.parentElement.parentElement.previousElementSibling.textContent);
})