const weighted = require('weighted')

const {fruits} = require('./items.json')

// setup
var items = []
var weights = []
var values = []
var grades = []

fruits.forEach(fruit => {
    
    items.push(fruit.name)
    weights.push(fruit.chance)

    if (values[fruit.name] == null) values[fruit.name] = fruit.value
    if (grades[fruit.name] == null) grades[fruit.name] = fruit.grade
})

const roll1 = () => {

    var tmp = weighted.select(items, weights)

    return {
        name: tmp,
        grade: grades[tmp]
    }
}

module.exports = {
    roll1
}