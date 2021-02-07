import {Player, shutdown} from "./player.mjs";

const playerOneName = document.querySelector("#playerOneName");
const playerOneNameInput = document.querySelector("#playerOneNameInput");
const playerOneNameButton = document.querySelector("#playerOneNameButton");
const playerOneWeapon = document.querySelector("#playerOneWeapon");
const weaponsPlayerOne = document.querySelectorAll(".weaponsPlayerOne");
const playerTwoName = document.querySelector("#playerTwoName");
const playerTwoNameInput = document.querySelector("#playerTwoNameInput");
const playerTwoNameButton = document.querySelector("#playerTwoNameButton");
const playerTwoWeapon = document.querySelector("#playerTwoWeapon");
const weaponsPlayerTwo = document.querySelectorAll(".weaponsPlayerTwo");
const game = document.querySelector("#game");

let playerOneNameValue = "";
let playerOneWeaponSelected = "";
let playerTwoNameValue = "";
let playerTwoWeaponSelected = "";

playerOneNameButton.addEventListener("click", () => {
    playerOneNameValue = playerOneNameInput.value;
    if(playerOneNameValue != ""){
        playerOneName.style.display = "none";
        playerOneWeapon.style.display = "block";
    }
})

for (let i = 0; i < weaponsPlayerOne.length; i++) {
    weaponsPlayerOne[i].addEventListener("click", () => {
        playerOneWeaponSelected = weaponsPlayerOne[i].value;
        playerOneWeapon.style.display = "none";
        playerTwoName.style.display = "block";
    })
}

playerTwoNameButton.addEventListener("click", () => {
    playerTwoNameValue = playerTwoNameInput.value;
    if(playerTwoNameValue != ""){
        playerTwoName.style.display = "none";
        playerTwoWeapon.style.display = "block";
    }
})

for (let i = 0; i < weaponsPlayerTwo.length; i++) {
    weaponsPlayerTwo[i].addEventListener("click", () => {
        playerTwoWeaponSelected = weaponsPlayerOne[i].value;
        playerTwoWeapon.style.display = "none";
        game.style.display = "block";
        start();
    })
}

function start(){
    let player1 = new Player(playerOneNameValue, playerOneWeaponSelected);
    let player2 = new Player(playerTwoNameValue, playerTwoWeaponSelected);
    player1.init();
    player2.init();
    while(shutdown == false){
        player1.attack(player2);
        if(player2.health > 0){
            player2.attack(player1);
        }
    }
}

