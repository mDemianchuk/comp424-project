const Transaction = require('../models/transaction');
const jsonUtil = require('../utils/json-util');
const dateUtil = require('../utils/date-util');
const displayUtil = require('../utils/display-util');
const transactionValidate = require('../utils/validate/transactions-validate');

const transactionContainer = document.getElementById('transactions-container');
const transactionTableBody = document.getElementById('transactions-table-body');

const addTransactionButton = document.getElementById('add-transaction-button');
const findTransactionsButton = document.getElementById('find-transactions-button');

const addTransactionModal = document.getElementById('add-transaction-modal');
const findTransactionsModal = document.getElementById('find-transactions-modal');
const editTransactionModal = document.getElementById('edit-transaction-modal');

const addTransactionForm = document.getElementById('add-transaction-form');
const findTransactionsForm = document.getElementById('find-transactions-form');
const editTransactionForm = document.getElementById('edit-transaction-form');

const headerTopContainer = document.getElementById('header-top');
const noTransactionsContainer = document.getElementById('no-transactions');

const editTransactionButtons = document.getElementsByClassName('edit-transaction-button');
const deleteTransactionButtons = document.getElementsByClassName('delete-transaction-button');

const addTransactionFormValidator = new transactionValidate.AddTransactionValidator('add-transaction-form');
const findTransactionsFormValidator = new transactionValidate.FindTransactionsValidator('find-transactions-form');
const editTransactionFormValidator = new transactionValidate.EditTransactionValidator('edit-transaction-form');

function addAndDisplayTransactions(transactionsJson) {
    for (let transaction of transactionsJson) {
        // creating a row in transactions table for a new transaction
        let row = transactionTableBody.insertRow();
        row.id = transaction.uuid;
        let dateColumn = row.insertCell(0);
        dateColumn.innerHTML = dateUtil.getShortDate(transaction.date);
        dateColumn.className = "date";
        let descriptionColumn = row.insertCell(1);
        descriptionColumn.innerHTML = transaction.description;
        descriptionColumn.className = "description";
        let categoryColumn = row.insertCell(2);
        categoryColumn.innerHTML = transaction.category;
        categoryColumn.className = "category";
        let amountColumn = row.insertCell(3);
        amountColumn.innerHTML = transaction.amount;
        amountColumn.className = "amount";
        let typeColumn = row.insertCell(4);
        typeColumn.innerHTML = transaction.type;
        typeColumn.className = "type";

        let actionsColumn = row.insertCell(5);

        let editButton = document.createElement("button");

        editButton.className = "edit-transaction-button";

        let editButtonIcon = document.createElement("span");
        editButtonIcon.className = "icon";

        let editIClass = document.createElement("i");
        editIClass.classList.add("fas", "fa-edit");
        editButtonIcon.append(editIClass);
        editButton.append(editButtonIcon);

        let editButtonText = document.createElement("div");
        editButtonText.innerText = "Edit";

        editButton.append(editButtonText);

        let deleteButton = document.createElement("button");

        deleteButton.className = "delete-transaction-button";

        let deleteButtonIcon = document.createElement("span");
        deleteButtonIcon.className = "icon";

        let deleteIClass = document.createElement("i");
        deleteIClass.classList.add("fas", "fa-delete");
        deleteButtonIcon.append(deleteIClass);
        deleteButton.append(deleteButtonIcon);

        let deleteButtonText = document.createElement("div");
        deleteButtonText.innerText = "Delete";

        deleteButton.append(deleteButtonText);

        actionsColumn.append(editButton, deleteButton);
    }
    displayUtil.displayElement(transactionContainer);
}

// retrieving the list of transactions from local storage
const filteredJson = jsonUtil.parseJson(localStorage.getItem('filtered-transactions'));
let transactionsJson = jsonUtil.parseJson(localStorage.getItem('ls-transactions'));

if(jsonUtil.isValidJson(filteredJson)) {
    transactionsJson = filteredJson;
}

if (jsonUtil.isValidJson(transactionsJson)) {
    transactionsJson = jsonUtil.sortJsonByProperty(transactionsJson, 'date');
    displayUtil.hideElement(noTransactionsContainer);
    displayUtil.displayElement(headerTopContainer);
    addAndDisplayTransactions(transactionsJson);
    localStorage.setItem('filtered-transactions', '');
}

// adding event listeners
addTransactionButton.addEventListener('click', () => {
    displayUtil.displayElement(addTransactionModal);
});

findTransactionsButton.addEventListener('click', () => {
    displayUtil.displayElement(findTransactionsModal);
});

//add action listeners to edit buttons
for(var i = 0; i < editTransactionButtons.length; i++){
        let currentButton = editTransactionButtons[i];
        let parentTr = currentButton.parentNode.parentNode;

        currentButton.addEventListener('click', () => {
            document.getElementById('edit-id').value = parentTr.id;
            document.getElementById('edit-description').value = parentTr.querySelector(".description").innerHTML;
            document.getElementById('edit-date').value = parentTr.querySelector(".date").innerHTML;
            document.getElementById('edit-type').value = parentTr.querySelector(".type").innerHTML;
            document.getElementById('edit-category').value = parentTr.querySelector(".category").innerHTML;
            document.getElementById('edit-amount').value = parentTr.querySelector(".amount").innerHTML;
            displayUtil.displayElement(editTransactionModal);
        }
    );
}

//add action listeners to delete buttons
for(let i = 0; i < deleteTransactionButtons.length; i++){
    let currentButton = deleteTransactionButtons[i];
    let parentTr = currentButton.parentNode.parentNode;

    currentButton.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete transaction: ' + parentTr.querySelector(".description").innerHTML + "?")) {
                let xhttp = new XMLHttpRequest();
                xhttp.open("DELETE", "http://localhost:3000/transactions/delete/" + parentTr.id, true);
                xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhttp.onload = function(){
                    console.log(this.response);
                    document.getElementById('transactions-table-body').removeChild(parentTr);
                };

                xhttp.send();
            } else {

            }

        }
    );
}

window.addEventListener('click', (event) => {
    if (event.target === addTransactionModal) {
        displayUtil.hideElement(addTransactionModal);
    } else if (event.target === findTransactionsModal) {
        displayUtil.hideElement(findTransactionsModal);
    } else if (event.target === editTransactionModal) {
        displayUtil.hideElement(editTransactionModal);
    }
});

addTransactionForm.addEventListener('submit', () => {
    if (transactionValidate.AddTransactionValidator.prototype.isValid) {
        // getting the values from the input form
        let date = new Date(document.getElementById('add-date').value);
        let type = document.getElementById('add-type').value;
        let description = document.getElementById('add-description').value;
        let category = document.getElementById('add-category').value;
        let amount = document.getElementById('add-amount').value;

        // creating a new Transaction object
        let transaction = new Transaction(date, type, description, category, amount);

        // adding to the list of transactions
        transactionsJson.push(transaction);

        // storing the list to local storage
        let jsonString = JSON.stringify(transactionsJson);
        localStorage.setItem('ls-transactions', jsonString);
    }
});

findTransactionsForm.addEventListener('submit', () => {
    if (transactionValidate.FindTransactionsValidator.prototype.isValid) {
        // getting the values from the input form
        let dateAfter = new Date(document.getElementById('find-date-after').value);
        let dateBefore = new Date(document.getElementById('find-date-before').value);
        let type = document.getElementById('find-type').value;
        let category = document.getElementById('find-category').value;
        let lessThan = parseFloat(document.getElementById('find-less-than').value);
        let moreThan = parseFloat(document.getElementById('find-more-than').value);

        let filteredTransactions = transactionsJson;

        if (!isNaN(dateAfter.getDate())) {
            filteredTransactions = jsonUtil.getTransactionsAfterDate(filteredTransactions, dateAfter);
        }
        if (!isNaN(dateBefore.getDate())) {
            filteredTransactions = jsonUtil.getTransactionsBeforeDate(filteredTransactions, dateBefore);
        }
        if (type) {
            filteredTransactions = jsonUtil.getTransactionsByType(filteredTransactions, type);
        }
        if (category) {
            filteredTransactions = jsonUtil.getTransactionsByCategory(filteredTransactions, category);
        }
        if (lessThan) {
            filteredTransactions = jsonUtil.getTransactionsLessThan(filteredTransactions, lessThan);
        }
        if (moreThan) {
            filteredTransactions = jsonUtil.getTransactionsMoreThan(filteredTransactions, moreThan);
        }

        let filteredTransactionsStr = JSON.stringify(filteredTransactions);
        localStorage.setItem('filtered-transactions', filteredTransactionsStr);
    }
});
// TODO: implement edit/delete/find a transaction
