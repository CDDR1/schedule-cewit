const daysChecked = document.querySelectorAll('.checkbox');
const timeSlots = document.querySelectorAll('.grid-hour');
const gridItems = document.getElementsByClassName('grid-item');
const submitButton = document.getElementById('submit-form');
let daysPicked = [];
let blockTakenList = [];  

const player1 = {
  courseInput: document.querySelector('#courseTitle'),
  colorInput: document.querySelector('#colorPicker'),
  dropDownMenu: document.querySelector('#time-slots'),
  locationInput: document.querySelector('.location-input'),
  professorInput: document.querySelector('.professor-input')
};

function reset(){
  for (let p of [player1]){
    p.courseInput.value = '';
    p.colorInput.value = '';
    p.locationInput.value = '';
    p.professorInput.value = '';
    p.dropDownMenu.value = '';
    daysChecked.forEach((box) => (box.checked = false));
    daysPicked = [];  
  }
}
function emtpyInput(){
  if(player1.dropDownMenu.value === '' || player1.courseInput.value === ''){
    return true;
  } else{
    return false;
  }
}

function findBlock(days){
  //if true, there is repeating time block
  let index = 0;
  let placement = 0;
  for (let gridItem of gridItems){
    if(gridItem.innerText === player1.dropDownMenu.value){
      for (let i of days){
        placement = index + i + 1;
        if(gridItems[placement].innerText != ''){ // finds a repeating block
          return true;
        }
      }
      return false;
    }
  }
}

submitButton.addEventListener('click', (e) => {
  // we need to check for the following:
  //  course title 
  //  time slot matches
  //  day matches

  e.preventDefault();

  // Fill in array (daysChecked) for the days chosen.
  daysChecked.forEach((checkbox) => 
  {
    if (checkbox.checked) 
    {
      daysPicked.push(true);
    } 
    else 
    {
      daysPicked.push(false);
    }
  });

  let index = 0;
  let placement = 0;
  for (let gridItem of gridItems){
    // checks for input
    if (emtpyInput()){
      alert("You are missing either course name or time");
      break;
    }
    // finds the time block

    if (gridItem.innerText === player1.dropDownMenu.value) {
      for (let i = 0; i < daysPicked.length; i++) { 
        // finds the days picked
        placement = index + i + 1; // where the actual block is
        if (daysPicked[i]){ //daysPicked[i] findBlock(daysChecked) === false)
          gridItems[placement].style.backgroundColor = player1.colorInput.value;
          gridItems[placement].innerText = 
          `${player1.courseInput.value}\n${player1.locationInput.value}\n${player1.professorInput.value}`;
        } 
        // end of nested if statement
      }
    }
    index++;
  }
  reset();
});