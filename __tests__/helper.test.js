const translate = require('../helpers/translate');

const starshipInitial = {
    name: "Death Star",
    crew: "342,953",
}
const starshipTranslated = {
    nombre: "Death Star",
    tripulacion: "342,953",
}

test('translating object keys', () => {
    const traducido = translate.translateStarship(starshipInitial);
    expect(traducido).toStrictEqual(starshipTranslated);
});