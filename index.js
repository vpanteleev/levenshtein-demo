let levenshtein = require('fast-levenshtein');
let carbranns = require('./car-models.json');


let example = "Mustang";

let calculatedBrands = carbranns.map(manufacturer => {
    let models =  manufacturer.models.map(modelName => {
        let distance =  levenshtein.get(modelName, example);
        return {modelName, distance};
    })

    return {...manufacturer, models}
})


let min = calculatedBrands[0].models[0].distance;
let brandName = calculatedBrands[0].brand;

calculatedBrands.forEach(manufacturer => {
    manufacturer.models.forEach(model => {
        if (model.distance < min) {
            min = model.distance;
            brandName = manufacturer.brand;
        }
    })
})

console.log(`Reference string is [${example}]`);

console.log("Best match manufacturer with models list: \n")
console.log(brandName);
