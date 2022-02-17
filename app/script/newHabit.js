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
            } else if (screenId == '3') {
                if (trackingMethod = TrackingMethodEnum.Numeric) {
                    decreaseId();
                    dBlockRemove(screenId+1);
                    dBlockAdd(screenId);
                } else if (trackingMethod = TrackingMethodEnum.YesNo) {
                    decreaseId();
                    decreaseId();
                    dBlockRemove(screenId+2);
                    dBlockAdd(screenId);
                }
            } else {
                decreaseId();
                dBlockRemove(screenId+1);
                dBlockAdd(screenId);
            }
        }, false);
    }
})

document.addEventListener("DOMContentLoaded", ()=> {
    let yesNoNextbtn = document.getElementById('next-1-yesNo');
    if (yesNoNextbtn) {
        yesNoNextbtn.addEventListener("click", function() {
            increaseId();
            dBlockAdd(screenId);
            dBlockRemove(screenId-1);
        })
    }
})

const numericDetailsDiv = document.querySelector('.newHabitForm-numericDetails');

document.addEventListener("DOMContentLoaded", ()=> {
    let numericNextbtn = document.getElementById('next-1-numeric');
    if (numericNextbtn) {
        numericNextbtn.addEventListener("click", function() {
            increaseId();
            dBlockAdd(screenId);
            dBlockRemove(screenId-1);
            numericDetailsDiv.classList.add('d-block');
        })
    }
})

document.addEventListener('DOMContentLoaded', function() {
    let yesNoBtn = document.getElementById('next-1-yesNo');
    if (yesNoBtn) {
        yesNoBtn.addEventListener('click', function() {
            trackingMethod = TrackingMethodEnum.YesNo;
        })
    }
})

document.addEventListener('DOMContentLoaded', function() {
    let numericBtn = document.getElementById('next-1-numeric');
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
            document.getElementById('newHabitForm-numeric-amount').value,
            document.getElementById('newHabitForm-numeric-period').selectedOptions[0].value
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
            let daysDiv = document.getElementById('days')
            let sometimesDiv = document.querySelector('.newHabitForm-sometimes');
            let repeatDiv = document.querySelector('.newHabitForm-repeat');

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
                    someDays();
                    break;
                case "specificDay":
                    console.log("jakiś dzień");
                    daysDiv.classList.remove('d-block');
                    sometimesDiv.classList.remove('d-block');
                    repeatDiv.classList.remove('d-block');
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
const someDaysNodeList = document.querySelectorAll(".newHabitForm-days > input[name='day']");
let someDaysArr = Array.from(someDaysNodeList);

function someDays() {
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
const specificDayDiv = document.querySelector('.newHabitForm-specificDay');

function specificDayAddDayBtns() {
    let dayBtn = [];

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
    let time = [
        document.getElementById('newHabitForm-sometimes-amount').value,
        document.getElementById('newHabitForm-sometimes-period').selectedOptions[0].value
    ]
    return time;
}

// Repeat
function getDaysIntervalToRepeat() {
    let interval = document.getElementById('newHabitForm-repeat-amount').value;
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
        category : document.forms['newHabitForm']['habitCategory'].value,
        trackingMethod : trackingMethod,
        trackingMethodDetails : trackingMethodDetails(),
        habitName : document.forms['newHabitForm']['habitName'].value,
        description : document.forms['newHabitForm']['habitDescription'].value,
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
    let el = document.getElementById('submit');
    if (el) {
        el.addEventListener('click', addHabit);
    }
})