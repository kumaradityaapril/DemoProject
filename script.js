
const quotes = [
    { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
    { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
    { text: "Your time is limited, so don’t waste it living someone else’s life.", author: "Steve Jobs" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
    { text: "Everything you can imagine is real.", author: "Pablo Picasso" },
    { text: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier" },
    { text: "Hardships often prepare ordinary people for an extraordinary destiny.", author: "C.S. Lewis" },
    { text: "Don’t watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
    { text: "You are never too old to set another goal or to dream a new dream.", author: "C.S. Lewis" },
    { text: "The best way to predict your future is to create it.", author: "Abraham Lincoln" },
    { text: "Life is what happens when you’re busy making other plans.", author: "John Lennon" },
    { text: "If you can dream it, you can do it.", author: "Walt Disney" },
    { text: "It always seems impossible until it’s done.", author: "Nelson Mandela" },
    { text: "Try not to become a man of success. Rather become a man of value.", author: "Albert Einstein" },
    { text: "Don’t wait for opportunity. Create it.", author: "Anonymous" },
    { text: "You miss 100% of the shots you don’t take.", author: "Wayne Gretzky" },
    { text: "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.", author: "Christian D. Larson" },
    { text: "Act as if what you do makes a difference. It does.", author: "William James" },
    { text: "Success usually comes to those who are too busy to be looking for it.", author: "Henry David Thoreau" }
];


document.addEventListener("DOMContentLoaded", () => {
    const quoteText = document.getElementById("quote-text");
    const quoteAuthor = document.getElementById("quote-author");

    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    
   
    quoteText.textContent = `"${randomQuote.text}"`;
    quoteAuthor.textContent = `- ${randomQuote.author}`;
});


const goalForm = document.querySelector("form");
const goals = [];
const goalListContainer = document.createElement("div");
goalListContainer.id = "goal-list";
goalForm.parentNode.insertBefore(goalListContainer, goalForm.nextSibling);

goalForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = goalForm.elements["text"].value;
    const date = goalForm.elements["date"].value;
    const time = goalForm.elements["time"].value;

    if (!text || !date || !time) {
        alert("Please fill in all fields.");
        return;
    }

   
    goals.push({ text, date, time });
    updateGoalList();
    goalForm.reset();
});

function updateGoalList() {
    goalListContainer.innerHTML = ""; 

    if (goals.length === 0) {
        goalListContainer.innerHTML = "<p>No goals yet. Start adding your goals!</p>";
        return;
    }

    goals.forEach((goal, index) => {
        
        const goalCard = document.createElement("div");
        goalCard.classList.add("goal-card");

        goalCard.innerHTML = `
            <div class="goal-header">
                <h4>${index + 1}. ${goal.text}</h4>
            </div>
            <div class="goal-details">
                <p><b>Date:</b> ${goal.date}</p>
                <p><b>Time:</b> ${goal.time}</p>
            </div>
            <button class="delete-btn" data-index="${index}">Delete</button>
        `;

        goalListContainer.appendChild(goalCard);
    });

   
    document.querySelectorAll(".delete-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const goalIndex = e.target.dataset.index;
            goals.splice(goalIndex, 1); 
            updateGoalList(); 
        });
    });
}



let timerInterval;
let timeLeft = 1500;

const timeDisplay = document.getElementById("time-display");
const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");

function startPomodoro() {
    if (timerInterval) return; 

    timerInterval = setInterval(() => {
        timeLeft--;

        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timeDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("Time's up! Take a break.");
            timerInterval = null;
        }
    }, 1000);
}

function resetPomodoro() {
    clearInterval(timerInterval);
    timerInterval = null;
    timeLeft = 1500;
    timeDisplay.textContent = "25:00";
}

startBtn.addEventListener("click", startPomodoro);
resetBtn.addEventListener("click", resetPomodoro);
