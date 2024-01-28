const starshipApi = require('../api/starship')

test('getting list', async() => {
    const response = await starshipApi.list();
    expect(response.statusCode).toBe(200);
    expect(response.body).not.toBe({});
});

test('getting one starship', async() => {
    const response = await starshipApi.get({ pathParameters: { id: 9 } });
    expect(response.statusCode).toBe(200);
    expect(response.body).not.toBe({});
});