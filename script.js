const checkBoxList = document.querySelectorAll('.circle')
const inputFields = document.querySelectorAll('input')
const errorLabel = document.querySelector('.warning')
const goalProgress = document.querySelector('.goalprogress')
const progressBar = document.querySelector('.progressbar')
const progressValue = document.querySelector('.progressvalue')

const allQuotes = [
    'Raise the bar by completing your goals!',
    'One task is completed!',
    'Just a step away, keep going!',
    'Whoa! You just completed all the goals, time for chill :D'
]

const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {
    first: {
        name: '',
        completed: false,
    },
    second: {
        name: '',
        completed: false,
    },
    third: {
        name: '',
        completed: false,
    },
}
let completedGoalCount = Object.values(allGoals).filter((goal) => goal.completed).length
progressValue.style.width = `${(completedGoalCount / 3) * 100}%`
progressValue.firstElementChild.innerText = `${completedGoalCount}/3 completed`
goalProgress.innerText = allQuotes[completedGoalCount]

checkBoxList.forEach((checkbox) => {
    checkbox.addEventListener('click', (e) => {
const alloptionsFilled = [...inputFields].every((inputss) => {
    return inputss.value
})

if (alloptionsFilled) {
checkbox.parentElement.classList.toggle('completed')

const inputId = checkbox.nextElementSibling.id
allGoals[inputId].completed = !allGoals[inputId].completed 
completedGoalCount = Object.values(allGoals).filter((goal) => goal.completed).length
progressValue.style.width = `${completedGoalCount / 3 * 100}%`
progressValue.firstElementChild.innerText = `${completedGoalCount}/3 completed`
goalProgress.innerText = allQuotes[completedGoalCount]
localStorage.setItem('allGoals', JSON.stringify(allGoals))



}
else {
    progressBar.classList.add('showError')
}
    })
})

inputFields.forEach((inputsss) => {

    inputsss.value = allGoals[inputsss.id].name

if(allGoals[inputsss.id].completed) {

    inputsss.parentElement.classList.add('completed')
}


  inputsss.addEventListener('focus', () => {
        progressBar.classList.remove('showError')
    })

    inputsss.addEventListener('input' , (e) => { 

        if(allGoals[inputsss.id].completed) {
inputsss.value = allGoals[inputsss.id].name
return
        }
        allGoals[inputsss.id].name = inputsss.value
        localStorage.setItem('allGoals', JSON.stringify(allGoals))
    })


})