const starshipTranslation = require("../constants/starshipTranslation")

module.exports.translateStarship = function(object) {
    var newStarship = {};
    Object.keys(object).forEach(key => {
        starshipTranslation.has(key) ? newStarship[starshipTranslation.get(key)] = object[key] : newStarship[key] = object[key];
    });

    return newStarship;
}