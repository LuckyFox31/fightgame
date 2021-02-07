const gameStart = document.querySelector("#gameStart");

export let shutdown = false;
let text = document.createElement("p");
text.className = "consoleParagraph";

export class Player{
    constructor(name, weapon){
        this.name = name;
        this.weapon = weapon;
        this.health = 100;
        this.armor = 0;
        this.damages = 0;
    }

    init(){
        let text = document.createElement("p");
        text.className = "consoleParagraph";
        text.textContent = `A new player appear! ${this.name} join the fight!`;
        gameStart.appendChild(text);

        try {
            switch (this.weapon) {
                case "sword":
                    this.damages = 7;
                    this.armor = Math.floor(Math.random() * 10 + 10);
                    break;
            
                case "bow":
                    this.damages = 5;
                    this.armor = Math.floor(Math.random() * 20 + 10);
                    break;
    
                case "gun":
                    this.damages = 10;
                    this.armor = Math.floor(Math.random() * 5 + 10);
                    break;
    
                default:
                    throw new Error(`Player ${this.name} does not have a weapon.`)
                    break;
            }
        } catch (e) {
            console.error(`An error has occurred : ${e}`);
        }
    }

    attack(otherPlayer){
        const random = Math.floor(Math.random() * this.damages);
        let text = document.createElement("p");
        text.className = "consoleParagraph";

        if(otherPlayer.armor <= 0){
            if(otherPlayer.health <= 0){
                this.stop(this, otherPlayer);
            }else{
                otherPlayer.health -= random;
                if(otherPlayer.health < 0){
                    otherPlayer.health = 0;
                }
                text.textContent = `${this.name} attacks ${otherPlayer.name} and inflicts ${random} damages! (Remaining life of ${otherPlayer.name}: ${otherPlayer.health}hp).`;
                gameStart.append(text);
            }
        }else{
            otherPlayer.armor -= random;
            if(otherPlayer.armor < 0){
                otherPlayer.armor = 0;
            }
            text.textContent = `${this.name} attacks ${otherPlayer.name} and inflicts ${random} damages! (Remaining armor of ${otherPlayer.name}: ${otherPlayer.armor}hp / Remaining life of ${otherPlayer.name}: ${otherPlayer.health}hp).`;
            gameStart.append(text);
        }
    }

    stop(player, otherPlayer){
        let text = document.createElement("p");
        text.className = "consoleParagraph";
        shutdown = true;
        if(player.health <= 0){
            text.textContent = `Nobody wins, Tie!`;
        }else{
            text.textContent = `${player.name} has defeated ${otherPlayer.name}! He has ${player.health}hp left.`;
        }
        gameStart.append(text);
    }
}