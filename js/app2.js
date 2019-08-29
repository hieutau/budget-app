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
    }

    return overviewFinance;
  }

  // ADD BUDGET AND UPDATE BALANCE
  static addBudgetBalanceStorage(updateTotalFinance) {
    const overviewFinance = this.getBudgetStorage();
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
    const valueTotalBudget = document.querySelector('#budget-amount');
    valueTotalBudget.innerHTML = budget;
    const valueTotalBalance = document.querySelector('#balance-amount');
    const valueTotalExpense = document.querySelector('#expense-amount');
    let balance = Number(budget) - Number(valueTotalExpense.textContent);
    valueTotalBalance.innerHTML = balance;

  }

  static addNewBudgetUpdateBalance() {
    const valueTotalBudget = document.querySelector('#budget-amount').textContent;
    const valueTotalBalance = document.querySelector('#balance-amount').textContent;
    const valueTotalExpense = document.querySelector('#expense-amount').textContent;

    const overviewFinance = OverViewFinance.getBudgetStorage();
    console.log(overviewFinance);

    overviewFinance[overviewFinance.length - 1].budget = valueTotalBudget;
    overviewFinance[overviewFinance.length - 1].balance = valueTotalBalance;
    overviewFinance[overviewFinance.length - 1].expense = valueTotalExpense;

    sessionStorage.setItem('overview', JSON.stringify(overviewFinance));
    console.log('Yes update budget and balance to Storage');
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
    if(e.parentElement.className === "delete-icon" || e.parentElement.className.indexOf('edit-icon') != -1) {

      e.parentElement.parentElement.parentElement.remove();
      const valueTotalBalance = document.querySelector('#balance-amount');
      const valueTotalExpense = document.querySelector('#expense-amount');

      let vlUpdateTotalExpense = Number(valueTotalExpense.textContent) - Number(e.parentElement.parentElement.previousElementSibling.textContent);
      valueTotalExpense.innerHTML = vlUpdateTotalExpense;

      let vlUpdateTotalBalance = Number(valueTotalBalance.textContent) + Number(e.parentElement.parentElement.previousElementSibling.textContent);
      valueTotalBalance.innerHTML = vlUpdateTotalBalance;

      // delete Item and Update Expense - Balance
      UI.deleteItemUpdateExpenseBalance(vlUpdateTotalExpense, vlUpdateTotalBalance);
      console.log('yes');
    }
  }

  static deleteItemUpdateExpenseBalance(vlUpdateTotalExpense, vlUpdateTotalBalance) {
    const overviewFinance = OverViewFinance.getBudgetStorage();
    overviewFinance[overviewFinance.length - 1].expense = vlUpdateTotalExpense;
    overviewFinance[overviewFinance.length - 1].balance = vlUpdateTotalBalance
    sessionStorage.setItem('overview', JSON.stringify(overviewFinance));
    console.log('yes update');
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

    listFinance.forEach(finance => {
    console.log(finance);
    document.querySelector('#budget-amount').innerHTML = finance.budget;
    document.querySelector('#expense-amount').innerHTML = finance.expense;
    document.querySelector('#balance-amount').innerHTML = finance.balance;
    })
  }

  static customExpense(e) {
    let index = (e.parentElement.id.slice(-1));
    let vlName = document.querySelectorAll('.expense-title')[index].textContent;

    let vlExpense = document.querySelectorAll('.expense-amount')[index].textContent;
    console.log(vlName, vlExpense);

    document.querySelector('#expense-input').value = vlName;
    document.querySelector('#expense-input').focus();

    document.querySelector('#amount-input').value = vlExpense;
    document.querySelector('#amount-input').focus();

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
    // console.log('yes');
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
    if(document.querySelector('#expense-amount').textContent === "0") {

      // Add new Budget to UI
      UI.addNewBudget(inputAddBudget);

      // Add new Budget to viewFinance (Storage)
      const updateTotalFinance = new viewFinance(inputAddBudget, 0, inputAddBudget);
      OverViewFinance.addBudgetBalanceStorage(updateTotalFinance);
    } else {
      // Add new Budget to UI
      UI.addNewBudget(inputAddBudget);

      // add new Budget and update balance to 
      UI.addNewBudgetUpdateBalance();
    }
    
    // Alert Success
    const alertSuccess = document.querySelector('.budget-feedback');
    UI.alertShow(alertSuccess);

    // Clearn Fields Budget
    UI.clear();

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

    // Add new Expense and update Balance to Storage
    OverViewFinance.addExpenseBalanceStorage(inputAmountExpense);

  }

});


//============================
// EVENT: REMOVE A EXPENSE
document.querySelector('#expense-list__item').addEventListener('click', (e) => {

  // EVENT: CUSTOM A EXPENSE
  if(e.target.parentElement.className.indexOf('edit-icon') != -1) {
    // Custom Expense form UI
    UI.customExpense(e.target);

  }

  // Remove Expense form UI
  UI.deleteExpense(e.target);

  // console.log(e.target.parentElement.id.slice(-1));

  // Remove Expense form Store
  Store.removeExpense(e.target.parentElement.parentElement.previousElementSibling.textContent);
})
