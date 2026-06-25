const form = document.getElementById("expenseForm");
const itemName = document.getElementById("itemName");
const amount = document.getElementById("amount");
const category = document.getElementById("category");
const customCategory = document.getElementById("customCategory");

const balance = document.getElementById("balance");
const transactionList = document.getElementById("transactionList");
const sortSelect = document.getElementById("sort");
const themeBtn = document.getElementById("themeBtn");

let transactions =
    JSON.parse(localStorage.getItem("transactions")) || [];

let categories =
    JSON.parse(localStorage.getItem("categories")) || [];

let chart;

// ======================
// LOAD CUSTOM CATEGORY
// ======================

function loadCategories() {

    categories.forEach(cat => {

        if (
            [...category.options].some(option => option.value === cat)
        ) return;

        const option = document.createElement("option");

        option.value = cat;
        option.textContent = cat;

        category.insertBefore(
            option,
            category.lastElementChild
        );

    });

}

loadCategories();

// ======================
// SHOW CUSTOM INPUT
// ======================

category.addEventListener("change", () => {

    if(category.value === "Custom"){

        customCategory.style.display = "block";

    }else{

        customCategory.style.display = "none";

    }

});

// ======================
// ADD TRANSACTION
// ======================

form.addEventListener("submit", function(e){

    e.preventDefault();

    let name = itemName.value.trim();
    let price = Number(amount.value);
    let cat = category.value;

    if(cat === "Custom"){

        cat = customCategory.value.trim();

        if(cat === ""){

            alert("Please enter custom category.");

            return;

        }

        if(!categories.includes(cat)){

            categories.push(cat);

            localStorage.setItem(
                "categories",
                JSON.stringify(categories)
            );

            loadCategories();

        }

    }

    if(
        name === "" ||
        price <= 0 ||
        cat === ""
    ){

        alert("Please complete all fields.");

        return;

    }

    const transaction = {

        id: Date.now(),

        name,

        amount: price,

        category: cat

    };

    transactions.push(transaction);

    saveTransactions();

    renderTransactions();

    updateBalance();

    updateChart();

    form.reset();

    customCategory.style.display = "none";

});

// ======================
// SAVE
// ======================

function saveTransactions(){

    localStorage.setItem(

        "transactions",

        JSON.stringify(transactions)

    );

}

// ======================
// DELETE
// ======================

function deleteTransaction(id){

    transactions = transactions.filter(

        item => item.id !== id

    );

    saveTransactions();

    renderTransactions();

    updateBalance();

    updateChart();

}