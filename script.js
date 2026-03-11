const test = document.getElementById('button');
const wizardry = document.getElementById('demo');
const buttonField = document.getElementById('button-field');
var selectedButton;
var mode = "solve";

var seedA = 3531358754;
var seedB = 976420920;
var seedC = 1423383887;
var seedD = 204146484;
function random(max) { // Implementing sfc32 from PractRand. Thanks bryc from stackoverflow.
    seedA |= 0; seedB |= 0; seedC |= 0; seedD |= 0;
    let t = (seedA + seedB | 0) + seedD | 0;
    seedD = seedD + 1 | 0;
    seedA = seedB ^ seedB >>> 9;
    seedB = seedC + (seedC << 3) | 0;
    seedC = (seedC << 21 | seedC >>> 11);
    seedC = seedC + t | 0;
    return Math.floor((t >>> 0) / 4294967296 * max);
}

test.addEventListener("click", () => wizardry.innerHTML = random(1000));
test.innerHTML = "skeboop";

const buttonArray = [];
const clues = [["apple"], ["pear"], ["banana"], ["pineapple"], ["tomato"], ["hedgehog"], ["pig"], ["sheep"], ["polar bear"], ["doggo"], ["diorite"], ["andesite"], ["granite"], ["basalt"], ["obsidian"], ["up"], ["down"], ["left"], ["right"], ["inside"], ["pi"], ["sqrt 2"], ["2i+1"], ["-0"], ["9"]];
const categories = ["fruit", "fruit", "fruit", "fruit", "fruit", "mammals", "mammals", "mammals", "mammals", "mammals", "rock types", "rock types", "rock types", "rock types", "rock types", "directions", "directions", "directions", "directions", "directions", "numbers", "numbers", "numbers", "numbers", "numbers"];
const names = [];

const cells = clues.length;


for (let i = 0; i < cells; i++) { // temporary: replace with real clues and categories
    let j = random(i, cells);
    let clue = clues[j];
    let cat = categories[j];
    clues[j] = clues[i];
    categories[j] = categories[i];
    clues[i] = clue;
    categories[i] = cat;
    names.push("");
}

var columns = 1;
while ((columns*columns) <= cells) columns++;
var gridstyle = "";
for (let i = 0; i < columns; i++) gridstyle += "auto ";
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