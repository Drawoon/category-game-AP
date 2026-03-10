const test = document.getElementById('button');
const wizardry = document.getElementById('demo');
const buttonField = document.getElementById('button-field');
var selectedButton;
var mode = "solve";

test.addEventListener("click", () => wizardry.innerHTML = Date());
test.innerHTML = "skeboop";

const cells = 1600;

const buttonArray = [];
const clues = [];
const categories = [];
const names = [];

for (let i = 0; i < cells; i++) { // temporary: replace with real clues and categories
    clues.push([i]);
    categories.push(i%11);
    names.push("");
}

var columns = 1;
while ((columns*columns) <= cells) columns++;
var gridstyle = "";
for (let i = 0; i < columns; i++) gridstyle += "auto ";
wizardry.innerHTML = columns;
buttonField.style.gridTemplateColumns = gridstyle;

for (let i = 0; i < columns*columns; i++){
    const cell = document.createElement("div");
    if ((Math.floor(i / columns) + (i % columns)) % 2 == 1) cell.className = "cell dark";
    else cell.className = "cell";
    const button = document.createElement("div");
    button.className = "button";
    button.setAttribute("button-id", i);
    cell.appendChild(button);
    if (i < cells) updateClue(button);
    button.addEventListener("click", () => pressButton(button));
    buttonField.appendChild(cell);
    buttonArray.push(button);
}

function pressButton(button) {
    button.classList.toggle("selected");
    if (selectedButton == button) selectedButton = null;
    else if (selectedButton == null) selectedButton = button;
    else {
        if (mode == "switch"){
            parentA = selectedButton.parentElement;
            parentB = button.parentElement;
            parentA.appendChild(button);
            parentB.appendChild(selectedButton);
            button.classList.toggle("selected");
            selectedButton.classList.toggle("selected");
            selectedButton = null;
        }
        else if (mode == "solve"){
            idA = selectedButton.getAttribute("button-id");
            idB = button.getAttribute("button-id");
            if (categories[idA] == categories[idB]){
                clues[idB] = clues[idB].concat(clues[idA]);
                clues[idA] = [];
                categories[idA] = null;
                if (names[idB] == "" & names[idA] != "") names[idB] = names[idA];
                names[idA] = "";
                wizardry.innerHTML = clues[idB].toString();
                updateClue(selectedButton);
                updateClue(button);
            }
            button.classList.toggle("selected");
            selectedButton.classList.toggle("selected");
            selectedButton = null;
        }
    };
}

function updateClue(button) {
    const id = button.getAttribute("button-id");
    const size = clues[id].length;
    if (names[id] != "") button.innerHTML = names[id] + " [" + size + "]";
    else if (size == 0) button.innerHTML = "";
    else if (size == 1) button.innerHTML = clues[id][0];
    else button.innerHTML = clues[id][0] + ", " + clues[id][1] + "... [" + size + "]";
}