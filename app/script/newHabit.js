/* ---------------- */
/* Adding new habit */
/* ---------------- */
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

let trackingMethod = '';
const TrackingMethodEnum = {
    YesNo : 'yesNo',
    Numeric : 'numeric'
};

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
                    resetSpecificDayDiv();
                    break;
                case "someDays":
                    console.log("jakiś dzień w tygodniu");
                    sometimesDiv.classList.remove('d-block');
                    repeatDiv.classList.remove('d-block');
                    daysDiv.classList.add('d-block');
                    resetSpecificDayDiv();
                    break;
                case "specificDay":
                    console.log("jakiś dzień");
                    daysDiv.classList.remove('d-block');
                    sometimesDiv.classList.remove('d-block');
                    repeatDiv.classList.remove('d-block');
                    specificDay();
                    break;
                case "sometimes":
                    console.log("co jakiś czas");
                    daysDiv.classList.remove('d-block');
                    repeatDiv.classList.remove('d-block');
                    sometimesDiv.classList.add('d-block');
                    resetSpecificDayDiv();
                    break;
                case "repeat":
                    console.log("powtorz");
                    daysDiv.classList.remove('d-block');
                    sometimesDiv.classList.remove('d-block');
                    repeatDiv.classList.add('d-block');
                    resetSpecificDayDiv();
                    break;
                default:
                    break;
            }

            habitFrequency = item;
          });
        });
      }
})

let specificDayDiv = document.querySelector('.newHabitForm-specificDay');

function specificDay() {
    let dayBtn = [];

    for (let i = 0; i < 31; i++) {
        let btn = document.createElement('button');
        btn.id = `day-${i+1}`;
        btn.innerText = i+1;
        dayBtn.push(btn);
    }

    for (let j = 0; j < 31; j++) {
        specificDayDiv.appendChild(dayBtn[j]);
    }
}

function resetSpecificDayDiv() {
    specificDayDiv.innerHTML = '';
}



function addHabit(ev) {
    ev.preventDefault();

    myHabits = JSON.parse(localStorage.getItem('habits')) || [];

    let habit = {};

    habit = {
        category : document.forms['newHabitForm']['habitCategory'].value,
        trackingMethod : trackingMethod,
        habitName : document.forms['newHabitForm']['habitName'].value,
        description : document.forms['newHabitForm']['habitDescription'].value,
        frequency : habitFrequency
    }

    myHabits.push(habit);

    localStorage.setItem('habits', JSON.stringify(myHabits));
    document.forms[0].reset();

    console.warn('added', {myHabits});
}

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

document.addEventListener("DOMContentLoaded", ()=> {
    let el = document.getElementById('submit');
    if (el) {
        el.addEventListener('click', addHabit);
    }
})