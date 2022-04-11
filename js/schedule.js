const daysChecked = document.querySelectorAll('.checkbox');
const gridItems = document.getElementsByClassName('grid-item');
const submitButton = document.getElementById('submit-form');
let daysPicked = [];

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
  }
  else{
    return false;
  }
}

submitButton.addEventListener('click', (e) => {
  // we need to check for the following:
  //  course title 
  //  time slot matches
  //  day matches

  e.preventDefault();

  // Fill in array (daysChecked) for the days chosen.
  daysChecked.forEach((checkbox) =>{
    if (checkbox.checked) {
      daysPicked.push(true);
    }else{
      daysPicked.push(false);
    }
  });

  let index = 0;
  let placement = 0;
  for (let gridItem of gridItems){
    // checks for input
    if (emtpyInput()){
      alert("You are missing either course name or time"); // pop up location
      break;
    }
    // finds the time block

    if (gridItem.innerText === player1.dropDownMenu.value) {
      for (let i = 0; i < daysPicked.length; i++){
        placement = index + i + 1; // where the actual block is
        if (daysPicked[i]){ //daysPicked[i] findBlock(daysChecked) === false)
          if(gridItems[placement].innerText === '' || gridItems[placement].style === ''){
            gridItems[placement].style.backgroundColor = player1.colorInput.value;
            gridItems[placement].innerText = 
            `${player1.courseInput.value}\n${player1.locationInput.value}\n${player1.professorInput.value}`;
          }else{
            alert("This is full."); // pop up location
            break;
          }
        } 
      }
    }
    index++;
  }
  
  reset(); //end
});