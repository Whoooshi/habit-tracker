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

let habitFrequency = '';

function addHabit(ev) {
    ev.preventDefault();

    myHabits = JSON.parse(localStorage.getItem('habits')) || [];

    let habit = {};

    habit = {
        category : document.forms['newHabitForm']['habitCategory'].value,
        trackingMethod : trackingMethod,
        habitName : document.forms['newHabitForm']['habitName'].value,
        habitDescription : document.forms['newHabitForm']['habitDescriptionYesNo'].value
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