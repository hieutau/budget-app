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
  
      // console.log(updateTotalFinance);
  
      if (sessionStorage.getItem('overview') === null){
        overviewFinance = [];
  
        // console.log(overviewFinance);
        // console.log(overview);
  
      } else {
        // console.log(updateTotalFinance);
  
        overviewFinance = JSON.parse(sessionStorage.getItem('overview'));
      }
  
      return overviewFinance;
    }

    static addBudgetStorage(updateTotalFinance) {
      const overviewFinance = this.getBudgetStorage();
      overviewFinance.push(updateTotalFinance);
      sessionStorage.setItem('overview', JSON.stringify(overviewFinance));
    }
}

class UI {
    static displayOverViewFinance() {
        const listFinance = OverViewFinance.getBudgetStorage();
        console.log(listFinance);
        listFinance.forEach(finance => {
        // document.querySelector('#budget-input').innerHTML = finance.budget;
        console.log(finance);
        })
    }
}


//========================
// EVENT: DISPLAY OverviewFinance
document.addEventListener('DOMContentLoaded', UI.displayOverViewFinance);


//========================
// EVENT: ADD A BUDGET
const btnAddBudget = document.querySelector('#budget-submit');
btnAddBudget.addEventListener('click', () => {

    // Add new Budget to viewFinance
    const updateTotalFinance = new viewFinance(inputAddBudget, 0, 0);
    console.log(updateTotalFinance);
    OverViewFinance.addBudgetStorage(updateTotalFinance);
    }
)