// Data storage
let expenses = [];
let goals = [];
let quizScore = 0;
let quizAttempts = 0;

// Expense categories with colors
const expenseCategories = {
    food: { icon: '🍔', color: '#FF6B6B', name: 'Food & Snacks' },
    fun: { icon: '🎮', color: '#4ECDC4', name: 'Fun & Entertainment' },
    clothes: { icon: '👕', color: '#45B7D1', name: 'Clothes & Shoes' },
    school: { icon: '📚', color: '#96CEB4', name: 'School Supplies' },
    transport: { icon: '🚌', color: '#FFEAA7', name: 'Transportation' },
    bills: { icon: '🏠', color: '#DDA0DD', name: 'Bills' },
    other: { icon: '📦', color: '#778899', name: 'Other' }
};

// Quiz questions
const quizQuestions = [
    {
        question: "What should you do with money FIRST?",
        options: [
            "Buy toys and games",
            "Pay for needs like food and rent",
            "Give it all to friends",
            "Hide it under your bed"
        ],
        correct: 1,
        explanation: "Always take care of needs first! Needs are things you must have to live."
    },
    {
        question: "What is the difference between a NEED and a WANT?",
        options: [
            "They are the same thing",
            "Needs are fun, wants are boring",
            "Needs are necessary to live, wants are nice to have",
            "Wants cost more than needs"
        ],
        correct: 2,
        explanation: "Needs are essential for survival (food, shelter), while wants make life more enjoyable but aren't necessary."
    },
    {
        question: "Why is it important to save money?",
        options: [
            "To show off to friends",
            "For emergencies and future goals",
            "Because parents say so",
            "To make your wallet heavy"
        ],
        correct: 1,
        explanation: "Saving helps you prepare for unexpected expenses and achieve things you want in the future!"
    },
    {
        question: "What is a budget?",
        options: [
            "A type of wallet",
            "A plan for how to spend and save money",
            "A game about money",
            "A bank account"
        ],
        correct: 1,
        explanation: "A budget is your money plan - it helps you decide how to spend and save wisely!"
    },
    {
        question: "If you have $10 and want to follow the 50/30/20 rule, how much should you save?",
        options: [
            "$1",
            "$2",
            "$5",
            "$10"
        ],
        correct: 1,
        explanation: "20% of $10 is $2. The 50/30/20 rule means: 50% needs, 30% wants, 20% savings!"
    }
];

// Initialize app when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    setupBudgetGuide();
});

// Load data from localStorage
function loadData() {
    const savedExpenses = localStorage.getItem('expenses');
    const savedGoals = localStorage.getItem('goals');
    const savedIncome = localStorage.getItem('income');

    if (savedExpenses) expenses = JSON.parse(savedExpenses);
    if (savedGoals) goals = JSON.parse(savedGoals);
    if (savedIncome) document.getElementById('income').value = savedIncome;

    displayExpenses();
    displayGoals();
    calculateBudget();
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
    localStorage.setItem('goals', JSON.stringify(goals));
    localStorage.setItem('income', document.getElementById('income').value);
}

// Setup budget guide
function setupBudgetGuide() {
    const budgetTab = document.getElementById('budget');
    const existingGuide = budgetTab.querySelector('.budget-guide');
    
    if (!existingGuide) {
        const budgetGuide = document.createElement('div');
        budgetGuide.className = 'tip-box budget-guide';
        budgetGuide.innerHTML = `
            <h4>📋 Budget Guide (50/30/20 Rule)</h4>
            <p><strong>50% Needs</strong> - Housing, food, utilities, transportation</p>
            <p><strong>30% Wants</strong> - Entertainment, dining out, hobbies</p>
            <p><strong>20% Savings</strong> - Emergency fund, goals, investments</p>
        `;
        budgetTab.insertBefore(budgetGuide, budgetTab.querySelector('.form-group'));
    }
}

// Tab switching
function openTab(tabName) {
    const tabs = document.querySelectorAll('.tab-content');
    const buttons = document.querySelectorAll('.tab-button');

    tabs.forEach(tab => tab.classList.remove('active'));
    buttons.forEach(btn => btn.classList.remove('active'));

    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');

    if (tabName === 'quiz') {
        initializeQuiz();
    }
}

// Calculate budget
function calculateBudget() {
    const income = parseFloat(document.getElementById('income').value) || 0;
    const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const remaining = income - totalExpenses;
    const percentUsed = income > 0 ? (totalExpenses / income) * 100 : 0;

    document.getElementById('totalIncome').textContent = '$' + income.toFixed(2);
    document.getElementById('totalExpenses').textContent = '$' + totalExpenses.toFixed(2);
    document.getElementById('remaining').textContent = '$' + remaining.toFixed(2);

    const progressBar = document.getElementById('budgetProgress');
    progressBar.style.width = Math.min(percentUsed, 100) + '%';
    progressBar.textContent = percentUsed.toFixed(0) + '% Used';

    const statusEl = document.getElementById('budgetStatus');
    if (percentUsed <= 70) {
        statusEl.textContent = '✅ Great job! You\'re managing your money well!';
        statusEl.style.color = '#28a745';
    } else if (percentUsed <= 90) {
        statusEl.textContent = '⚠️ Be careful! You\'re spending most of your money.';
        statusEl.style.color = '#ffc107';
    } else {
        statusEl.textContent = '🚨 Warning! You\'re spending more than you earn!';
        statusEl.style.color = '#dc3545';
    }

    showExpenseChart();
    saveData();
}

// Show expense chart
function showExpenseChart() {
    const chartContainer = document.getElementById('expenseChart');
    const categoryTotals = {};
    
    // Calculate category totals
    expenses.forEach(expense => {
        categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + expense.amount;
    });

    const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);

    if (totalSpent === 0) {
        chartContainer.innerHTML = '<p style="text-align: center; color: #999;">No expenses to show yet. Start tracking your spending!</p>';
        return;
    }

    let chartHTML = '<h3>📊 Spending by Category</h3>';
    
    Object.entries(categoryTotals)
        .sort(([,a], [,b]) => b - a)
        .forEach(([category, total]) => {
            const percentage = (total / totalSpent) * 100;
            const cat = expenseCategories[category];
            
            chartHTML += `
                <div class="category-item">
                    <div style="display: flex; justify-content: between; align-items: center;">
                        <span style="flex: 1;">${cat.icon} ${cat.name}</span>
                        <span style="font-weight: bold;">$${total.toFixed(2)}</span>
                        <span style="color: #666; margin-left: 10px;">${percentage.toFixed(1)}%</span>
                    </div>
                    <div class="category-bar">
                        <div class="category-color" style="background: ${cat.color};"></div>
                        <div class="category-progress">
                            <div class="category-progress-fill" style="width: ${percentage}%; background: ${cat.color};"></div>
                        </div>
                    </div>
                </div>
            `;
        });

    chartContainer.innerHTML = chartHTML;
}

// Add expense
function addExpense() {
    const name = document.getElementById('expenseName').value.trim();
    const amount = parseFloat(document.getElementById('expenseAmount').value);
    const category = document.getElementById('expenseCategory').value;

    if (!name || !amount || amount <= 0) {
        alert('Please fill in all fields with valid information!');
        return;
    }

    expenses.push({
        id: Date.now(),
        name: name,
        amount: amount,
        category: category,
        date: new Date().toLocaleDateString()
    });

    document.getElementById('expenseName').value = '';
    document.getElementById('expenseAmount').value = '';

    displayExpenses();
    calculateBudget();
    saveData();
}

// Display expenses
function displayExpenses() {
    const listEl = document.getElementById('expenseList');
    
    if (expenses.length === 0) {
        listEl.innerHTML = '<p style="text-align: center; color: #999; padding: 20px;">No expenses tracked yet. Add your first expense above!</p>';
        return;
    }

    listEl.innerHTML = '<h3>Your Spending History</h3>' + 
        expenses.map(expense => {
            const cat = expenseCategories[expense.category];
            return `
                <div class="expense-item">
                    <div class="expense-info">
                        <div class="expense-name">${cat.icon} ${expense.name}</div>
                        <div class="expense-category">${expense.date} • ${cat.name}</div>
                    </div>
                    <div class="expense-amount">$${expense.amount.toFixed(2)}</div>
                    <button class="delete-btn" onclick="deleteExpense(${expense.id})">Delete</button>
                </div>
            `;
        }).join('');
}

// Delete expense
function deleteExpense(id) {
    if (confirm('Are you sure you want to delete this expense?')) {
        expenses = expenses.filter(exp => exp.id !== id);
        displayExpenses();
        calculateBudget();
        saveData();
    }
}

// Add goal
function addGoal() {
    const name = document.getElementById('goalName').value.trim();
    const target = parseFloat(document.getElementById('goalAmount').value);
    const saved = parseFloat(document.getElementById('goalSaved').value) || 0;

    if (!name || !target || target <= 0) {
        alert('Please fill in all fields with valid information!');
        return;
    }

    goals.push({
        id: Date.now(),
        name: name,
        target: target,
        saved: saved
    });

    document.getElementById('goalName').value = '';
    document.getElementById('goalAmount').value = '';
    document.getElementById('goalSaved').value = '';

    displayGoals();
    saveData();
}

// Display goals
function displayGoals() {
    const listEl = document.getElementById('goalList');
    
    if (goals.length === 0) {
        listEl.innerHTML = '<p style="text-align: center; color: #999; padding: 20px;">No savings goals yet. Create your first goal above!</p>';
        return;
    }

    listEl.innerHTML = '<h3>Your Savings Goals</h3>' + 
        goals.map(goal => {
            const percentage = (goal.saved / goal.target) * 100;
            const remaining = goal.target - goal.saved;
            
            return `
                <div class="goal-item">
                    <div class="goal-info">
                        <div class="goal-name">🎯 ${goal.name}</div>
                        <div class="goal-description">
                            Target: $${goal.target.toFixed(2)} | 
                            Saved: $${goal.saved.toFixed(2)} | 
                            Remaining: $${remaining.toFixed(2)}
                        </div>
                        <div class="progress-bar-wrapper" style="margin-top: 10px;">
                            <div class="progress-bar" style="width: ${Math.min(percentage, 100)}%">
                                ${percentage.toFixed(0)}%
                            </div>
                        </div>
                    </div>
                    <button class="delete-btn" onclick="deleteGoal(${goal.id})">Delete</button>
                </div>
            `;
        }).join('');
}

// Delete goal
function deleteGoal(id) {
    if (confirm('Are you sure you want to delete this goal?')) {
        goals = goals.filter(goal => goal.id !== id);
        displayGoals();
        saveData();
    }
}

// Update goal progress
function updateGoalProgress(goalId, amount) {
    const goal = goals.find(g => g.id === goalId);
    if (goal) {
        goal.saved += amount;
        if (goal.saved > goal.target) goal.saved = goal.target;
        displayGoals();
        saveData();
        
        // Check if goal is completed
        if (goal.saved >= goal.target) {
            setTimeout(() => {
                alert(`🎉 Congratulations! You've reached your goal: ${goal.name}`);
            }, 500);
        }
    }
}

// Initialize quiz
function initializeQuiz() {
    const container = document.getElementById('quizContainer');
    container.innerHTML = quizQuestions.map((q, index) => `
        <div class="quiz-question">
            <h3>Question ${index + 1}: ${q.question}</h3>
            <div class="quiz-options" id="options-${index}">
                ${q.options.map((option, optIndex) => `
                    <div class="quiz-option" onclick="checkAnswer(${index}, ${optIndex})">
                        ${option}
                    </div>
                `).join('')}
            </div>
            <div id="explanation-${index}" style="display: none; margin-top: 15px; padding: 15px; background: #e3f2fd; border-radius: 8px;">
                <strong>💡 Explanation:</strong> ${q.explanation}
            </div>
        </div>
    `).join('');
}

// Check quiz answer
function checkAnswer(questionIndex, selectedIndex) {
    const question = quizQuestions[questionIndex];
    const options = document.querySelectorAll(`#options-${questionIndex} .quiz-option`);
    const explanation = document.getElementById(`explanation-${questionIndex}`);

    options.forEach((option, index) => {
        option.classList.remove('correct', 'incorrect');
        if (index === question.correct) {
            option.classList.add('correct');
        } else if (index === selectedIndex) {
            option.classList.add('incorrect');
        }
        option.onclick = null; // Disable further clicks
    });

    explanation.style.display = 'block';

    if (selectedIndex === question.correct) {
        quizScore++;
    }
    quizAttempts++;

    // Show final score if all questions answered
    if (quizAttempts === quizQuestions.length) {
        setTimeout(() => {
            alert(`🎊 Quiz Complete! You scored ${quizScore} out of ${quizQuestions.length}!`);
        }, 500);
    }
}

// Reset quiz
function resetQuiz() {
    quizScore = 0;
    quizAttempts = 0;
    initializeQuiz();
}

// Get spending insights
function getSpendingInsights() {
    const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const avgDailySpend = totalSpent / 30; // Rough monthly average
    const largestExpense = expenses.length > 0 ? 
        Math.max(...expenses.map(exp => exp.amount)) : 0;
    
    return {
        totalSpent,
        avgDailySpend,
        largestExpense,
        expenseCount: expenses.length
    };
}