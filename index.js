let levenshtein = require('fast-levenshtein');
let carbranns = require('./car-models.json');



function extendWithDistance(arrayOfObjects, propName, referenceString) {
    return arrayOfObjects.map((object) => {
        let distance = levenshtein.get(object[propName], referenceString);
        
        return Object.assign(object, {distance});
    })
}

function findMinimalDistance(arrayOfObjects) {
    return  arrayOfObjects.reduce((min, p) => p.distance < min ? p.distance : min, arrayOfObjects[0].distance);
} 



let example = "Fort Edje";

 let manufacturersWithDistance = extendWithDistance(carbranns, "brand", example);

 let minDistanceManufacturer = findMinimalDistance(manufacturersWithDistance);

let bestMatchManufacturer = manufacturersWithDistance.filter((model) => model.distance === minDistanceManufacturer)[0]; // here we cann add parametr for getting "close to minimum" results

let modelsWithDistance = bestMatchManufacturer.models.map(modelName => {
        let distance =  levenshtein.get(modelName, example);
        return {modelName, distance};
    })

bestMatchManufacturer.models = modelsWithDistance;

let minDistanceModel = findMinimalDistance(bestMatchManufacturer.models);

let bestMatchModel = bestMatchManufacturer.models.filter((model) => model.distance === minDistanceModel)[0]; // here we cann add parametr for getting "close to minimum" results

console.log("Best match manufacturer with models list: \n")
console.log(bestMatchManufacturer);

console.log("\nBest match model: \n")
console.log(bestMatchModel.modelName);

