class Animal {
    // a function that executes to initial a new instance of this class
    constructor(weight, name, species) {
        this.weight = weight
        this.name = name
        this.species = species
    }

    displayDetails() {
        console.log(`Weight: ${this.weight}
Name: ${this.name}
Species: ${this.species}
`)
    }
}



const lion = new Animal(25, "Simba", "🦁")
const whale = new Animal(347, "Moby", "🐳")

lion.displayDetails() // Weight: 25, Name: Simba, Species: 🦁
whale.displayDetails() // Weight: 347, Name: Moby, Species: 🐳