# Api Starships

He elegido los endpoint de Starships de swapi para el proyecto

-Para el post utilizado el mismo output del get/{id}

## Enpoints

- /starships
    - Metodo : GET
    - Retorna la lista de starships

- /starships/{id}
    - Metodo :  GET
    - Retorna un starhip por su ID de swappi

- /starships/internal/{name}
    - Metodo :  GET
    - Retorna un starhip por su nombre en la db

- /starships
    - Metodo : POST
    - Inserta una nueva nave , campo requerido {nombre : *String*}
