const habitInput = document.getElementById("habitInput");
const addBtn = document.getElementById("addBtn");
const habitTable = document.getElementById("habitTable");
const emptyState = document.getElementById("emptyState");
const weekTitle = document.getElementById("weekTitle");

let habits = JSON.parse(localStorage.getItem("habits")) || [];

let currentDate = new Date();

const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];


/* SAVE */

function saveHabits(){
    localStorage.setItem("habits", JSON.stringify(habits));
}


/* GET WEEK */

function getWeekDates(date){

    const start = new Date(date);

    start.setDate(
        start.getDate() - start.getDay()
    );

    let week = [];

    for(let i=0; i<7; i++){

        const day = new Date(start);

        day.setDate(start.getDate() + i);

        week.push(day);
    }

    return week;
}


/* FORMAT DATE */

function formatDate(date){

    return date.toISOString().split("T")[0];
}


/* STREAK */

function calculateStreak(completedDates){

    let streak = 0;

    let current = new Date();

    while(true){

        const dateStr = formatDate(current);

        if(completedDates.includes(dateStr)){

            streak++;

            current.setDate(current.getDate() - 1);

        }else{
            break;
        }
    }

    return streak;
}


/* RENDER */

function renderHabits(){

    if(habits.length === 0){

        emptyState.style.display = "block";

    }else{

        emptyState.style.display = "none";
    }

    const week = getWeekDates(currentDate);

    weekTitle.innerText =
        week[0].toDateString() +
        " - " +
        week[6].toDateString();

    let html = `
        <thead>
            <tr>
                <th>Habit</th>

                ${week.map(day => `
                    <th class="${
                        formatDate(day) === formatDate(new Date())
                        ? "today"
                        : ""
                    }">
                        ${days[day.getDay()]}
                    </th>
                `).join("")}

                <th>Streak</th>
            </tr>
        </thead>

        <tbody>
    `;

    habits.forEach(habit => {

        html += `
            <tr>

                <td>

                    <div class="habit-cell">

                        <span>${habit.name}</span>

                        <div class="actions">

                            <button onclick="editHabit(${habit.id})">
    <i class="fa-solid fa-pen"></i>
</button>

<button
    class="delete-btn"
    onclick="deleteHabit(${habit.id})"
>
    <i class="fa-solid fa-trash"></i>
</button>

                        </div>

                    </div>

                </td>
        `;

        week.forEach(day => {

            const dateStr = formatDate(day);

            const checked =
                habit.completedDates.includes(dateStr);

            html += `
                <td class="${
                    formatDate(day) === formatDate(new Date())
                    ? "today"
                    : ""
                }">

                    <div
                        class="check ${checked ? "active" : ""}"
                        onclick="
                            toggleCheck(
                                ${habit.id},
                                '${dateStr}'
                            )
                        "
                    ></div>

                </td>
            `;
        });

        html += `
            <td>
                <span class="streak">
                    ${calculateStreak(habit.completedDates)} 🔥
                </span>
            </td>

            </tr>
        `;
    });

    html += `</tbody>`;

    habitTable.innerHTML = html;
}


/* ADD HABIT */

addBtn.addEventListener("click", () => {

    const name = habitInput.value.trim();

    if(name === "") return;

    habits.push({

        id: Date.now(),

        name:name,

        completedDates:[]
    });

    saveHabits();

    renderHabits();

    habitInput.value = "";
});


/* TOGGLE CHECK */

function toggleCheck(id, date){

    habits = habits.map(habit => {

        if(habit.id === id){

            if(habit.completedDates.includes(date)){

                habit.completedDates =
                    habit.completedDates.filter(
                        d => d !== date
                    );

            }else{

                habit.completedDates.push(date);
            }
        }

        return habit;
    });

    saveHabits();

    renderHabits();
}


/* DELETE */

function deleteHabit(id){

    habits = habits.filter(
        habit => habit.id !== id
    );

    saveHabits();

    renderHabits();
}


/* EDIT */

function editHabit(id){

    const newName = prompt("Enter new name");

    if(!newName) return;

    habits = habits.map(habit => {

        if(habit.id === id){

            habit.name = newName;
        }

        return habit;
    });

    saveHabits();

    renderHabits();
}


/* WEEK NAV */

document
.getElementById("prevWeek")
.addEventListener("click", () => {

    currentDate.setDate(
        currentDate.getDate() - 7
    );

    renderHabits();
});


document
.getElementById("nextWeek")
.addEventListener("click", () => {

    currentDate.setDate(
        currentDate.getDate() + 7
    );

    renderHabits();
});


/* INITIAL */

renderHabits();