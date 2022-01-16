/* ---------------- */
/* Adding new habit */
/* ---------------- */
let nextBtnsArr = [
    document.getElementById('next-1'),
    document.getElementById('next-2'),
    document.getElementById('next-3')
];

let prevBtnsArr = [
    document.getElementById('prev-2'),
    document.getElementById('prev-3'),
    document.getElementById('prev-4')
];

const screenOne = document.querySelector('.newHabitForm-categoryEvaluation');
const screenTwo = document.querySelector('.newHabitForm-habitDefinitionYesNo');
const screenThree = document.querySelector('.newHabitForm-habitDefinitionNumeric');
const screenFour = document.querySelector('.newHabitForm-habitFrequency');

const screens = [
    document.getElementById("screen-1"),
    document.getElementById("screen-2"),
    document.getElementById("screen-3"),
    document.getElementById("screen-4")
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

nextBtnsArr.forEach(function(item) {
    item.addEventListener("click", function() {
        increaseId();
        dBlockAdd(screenId);
        dBlockRemove(screenId-1);
    });
})

prevBtnsArr.forEach(function(item) {
    item.addEventListener("click", function() {
        decreaseId();
        dBlockRemove(screenId+1);
        dBlockAdd(screenId);
    });
})

let myHabits = [];

function addHabit(ev) {
    ev.preventDefault();

    let habit = {
        category : document.forms['newHabitForm']['habitCategory'].value,
        trackingMethod : document.forms['newHabitForm']['trackingMethod'].value
    }
    myHabits.push(habit);
    document.forms[0].reset();

    console.warn('added', {myHabits});
}

document.addEventListener("DOMContentLoaded", ()=> {
    document.getElementById('submit').addEventListener('click', addHabit);
})