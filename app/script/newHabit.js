/* ---------- */
/* Navigation */
/* ---------- */
let prevBtnsArr = [
    document.getElementById('prev-2'),
];

const screens = [
    document.getElementById("screen-1"),
    document.getElementById("screen-2"),
];

let screenId = 1;

function dBlockAdd(screenId) {
    screens[screenId-1].classList.add('d-block');
}

function dBlockRemove(screenId) {
    screens[screenId-1].classList.remove('d-block');
}

function increaseId() {
    return screenId++;
}

function decreaseId() {
    return screenId--;
}

prevBtnsArr.forEach(function(item) {
    if (item) {
        item.addEventListener("click", function() {
            if (screenId == '2') {
                decreaseId();
                dBlockRemove(screenId+1);
                dBlockAdd(screenId);
                numericDetailsDiv.classList.remove('d-block');
            } else {
                decreaseId();
                dBlockRemove(screenId+1);
                dBlockAdd(screenId);
            }
        }, false);
    }
})

document.addEventListener("DOMContentLoaded", ()=> {
    const yesNoBtn = document.getElementById('yesNo');
    if (yesNoBtn) {
        yesNoBtn.addEventListener("click", function() {
            increaseId();
            dBlockAdd(screenId);
            dBlockRemove(screenId-1);
        })
    }
})

const numericDetailsDiv = document.querySelector('.frequencyContainer__numeric');

document.addEventListener("DOMContentLoaded", ()=> {
    const numericBtn = document.getElementById('numeric');
    if (numericBtn) {
        numericBtn.addEventListener("click", function() {
            increaseId();
            dBlockAdd(screenId);
            dBlockRemove(screenId-1);
            numericDetailsDiv.classList.add('d-block');
        })
    }
})

document.addEventListener('DOMContentLoaded', function() {
    let yesNoBtn = document.getElementById('yesNo');
    if (yesNoBtn) {
        yesNoBtn.addEventListener('click', function() {
            trackingMethod = TrackingMethodEnum.YesNo;
        })
    }
})

document.addEventListener('DOMContentLoaded', function() {
    let numericBtn = document.getElementById('numeric');
    if (numericBtn) {
        numericBtn.addEventListener('click', function() {
            trackingMethod = TrackingMethodEnum.Numeric;
        })
    }
})

let trackingMethod = '';
const TrackingMethodEnum = {
    YesNo : 'yesNo',
    Numeric : 'numeric'
};

function trackingMethodDetails() {
    let details = new Array(2);
    if (trackingMethod === 'yesNo') {
        details.pop();
        details.pop();
    } else if (trackingMethod == 'numeric') {
        details = [
            document.getElementById('numericHowMany').value,
            document.getElementById('numericHowOften').selectedOptions[0].value
        ]
    }
    return details;
}

/* ------------------ */
/* Defining frequency */
/* ------------------ */

let habitFrequency = '';

document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('input[name="frequency"]')) {
        document.querySelectorAll('input[name="frequency"]').forEach((elem) => {
          elem.addEventListener("change", function(event) {
            let item = event.target.value;
            const daysDiv = document.getElementById('weekDays')
            const sometimesDiv = document.getElementById('sometimesDetailsContainer');
            const repeatDiv = document.getElementById('repeatDetailsContainer');

            let choice = event.target.value;

            switch (choice) {
                case "everyDay":
                    console.log("codziennie");
                    daysDiv.classList.remove('d-block');
                    sometimesDiv.classList.remove('d-block');
                    repeatDiv.classList.remove('d-block');
                    specificDayRemoveDayBtns();
                    break;
                case "someDays":
                    console.log("jakiś dzień w tygodniu");
                    sometimesDiv.classList.remove('d-block');
                    repeatDiv.classList.remove('d-block');
                    daysDiv.classList.add('d-block');
                    specificDayRemoveDayBtns();
                    getDaysOfWeek();
                    break;
                case "specificDay":
                    console.log("jakiś dzień");
                    daysDiv.classList.remove('d-block');
                    sometimesDiv.classList.remove('d-block');
                    repeatDiv.classList.remove('d-block');
                    specificDayDiv.classList.add('d-block');
                    specificDayAddDayBtns();
                    break;
                case "sometimes":
                    console.log("co jakiś czas");
                    daysDiv.classList.remove('d-block');
                    repeatDiv.classList.remove('d-block');
                    sometimesDiv.classList.add('d-block');
                    specificDayRemoveDayBtns();
                    break;
                case "repeat":
                    console.log("powtorz");
                    daysDiv.classList.remove('d-block');
                    sometimesDiv.classList.remove('d-block');
                    repeatDiv.classList.add('d-block');
                    specificDayRemoveDayBtns();
                    break;
                default:
                    break;
            }
            habitFrequency = item;
          });
        });
      }
})

// Every day
const everyDayArr = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// Some day
const someDaysNodeList = document.querySelectorAll("#weekDays > input[name='day']");
let someDaysArr = Array.from(someDaysNodeList);

function getDaysOfWeek() {
    const days = [];
    someDaysNodeList.forEach(element => element.addEventListener('change', function() {
        if (this.checked) {
            days.push(this.value);
        } else if (this.checked != true) {
            for (let i = 0; i < days.length; i++){
                if (days[i] === this.value) {
                    days.splice(i, 1);
                }
            }
        }
        someDaysArr = days;
        console.log(days);
    }))
}

// Specific day
const specificDayDiv = document.getElementById('specificDayBtnsContainer');

function specificDayAddDayBtns() {
    const dayBtn = [];

    for (let i = 0; i < 31; i++) {
        let btn = document.createElement('button');
        btn.id = `day-${i+1}`;
        btn.innerText = i+1;
        btn.setAttribute('type', 'button');
        dayBtn.push(btn);
    }
    for (let j = 0; j < 31; j++) {
        specificDayDiv.appendChild(dayBtn[j]);
    }
    specificDayAddToArr(dayBtn);
}

function specificDayRemoveDayBtns() {
    specificDayDiv.innerHTML = '';
}

const specificDaysArr = [];

function specificDayAddToArr(arr) {
    arr.forEach(element => element.addEventListener('click', function() {
        element.classList.toggle('red');
        if (element.classList.contains('red')) {
            specificDaysArr.push(element.id);
        } else if (element.classList.contains('red') != true) {
            for (let i = 0; i < specificDaysArr.length; i++){
                if (specificDaysArr[i] === this.id) {
                    specificDaysArr.splice(i, 1);
                }
            }
        }
        console.log(specificDaysArr);
    }))
}

// Time period
function someTimePerPeriod() {
    const time = [
        document.getElementById('sometimesHowMany').value,
        document.getElementById('sometimesHowOften').selectedOptions[0].value
    ]
    return time;
}

// Repeat
function getDaysIntervalToRepeat() {
    const interval = document.getElementById('repeatHowMany').value;
    return interval;
}

// Define tracking days/time of new habit
function frequencyDays(details) {
    const frequencyDaysArr = {
        everyDay : everyDayArr,
        someDays : someDaysArr,
        specificDay : specificDaysArr,
        sometimes : someTimePerPeriod(),
        repeat : getDaysIntervalToRepeat()
    }
    return frequencyDaysArr[details];
}

/* ---------------- */
/* Adding new habit */
/* ---------------- */
let habit = {};

function addHabit(ev) {
    ev.preventDefault();

    myHabits = JSON.parse(localStorage.getItem('habits')) || [];

    habit = {
        category : document.forms['newHabit']['habitCategory'].value,
        trackingMethod : trackingMethod,
        trackingMethodDetails : trackingMethodDetails(),
        habitName : document.forms['newHabit']['habitName'].value,
        description : document.forms['newHabit']['habitDescription'].value,
        frequency : habitFrequency,
        frequencyDetails : frequencyDays(habitFrequency)
    }

    myHabits.push(habit);

    localStorage.setItem('habits', JSON.stringify(myHabits));
    document.forms[0].reset();

    console.warn('added', {myHabits});
    console.log(habit);
}

document.addEventListener("DOMContentLoaded", ()=> {
    const addHabitBtn = document.getElementById('submit');
    if (addHabitBtn) {
        addHabitBtn.addEventListener('click', addHabit);
    }
})