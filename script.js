class Gladiator {
    constructor(name, health, power, speed) {
        this.name = name
        this.health = health
        this.power = power
        this.speed = speed
    }

    attackEnemyAt(index) {
        const otherGladiator = gladiators[index]
        let time = setTimeout( () => {
            otherGladiator.health -= this.power
            otherGladiator.speed = this.speed * (otherGladiator.health / this.health) 
            if (otherGladiator.health <= 0) {
               requireCeasersChoiceForGladiator(otherGladiator, index, time)
            }else if(otherGladiator.health <= 30) {
                otherGladiator.speed *= 3;
            }
        }, 5/this.speed)
    }
}

function genereteGladiators() {
    let arr = [];
    let name = faker.name.findName()
    let power =  getRandomInt(1,6)
    let speed =  getRandomInt(1,6)
    for (let i = 0; i < 5; ++i) {
        arr.push(new Gladiator(name, 100,  power , speed))
    }
    return arr;
}

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
}

function randomGladiator() {
    return gladiators[getRandomInt(0, gladiators.length)]
}

function requireCeasersChoiceForGladiator(gladiator, index) {
    let ceasersChoice = confirm("👎" + "👍")
    if (ceasersChoice) {
        gladiator.health = 50
    } else {
        gladiators.splice(index, 1)
    }
    return ceasersChoice;
}

function start() {
    let time = setInterval(()=> {
        
    if (gladiators.length < 2) {
        
        console.log(gladiators[0].name)
        clearInterval(time)
    }

    for (let idx = 0; idx < gladiators.length; ++idx) {
        const gladiator = gladiators[idx]

        let randomIdx = idx
        while (randomIdx === idx && gladiators.length > 1) {
            randomIdx = getRandomInt(0, gladiators.length)
        }

        if (randomIdx === idx) {
            return
        }

        gladiator.attackEnemyAt(randomIdx)
    }
    },0)
}

let gladiators = genereteGladiators();
start();