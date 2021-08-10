## Express alkalmazás futtatása konténerizált környezetben

Videó: Docker - app és DB konténerek

Nézzük meg, hogyan tudjuk az elkészült Express REST API alkalmazásunkat konténerizált környezetben futtatni Docker segítségével!

Első lépésben telepítsük a Docker-t Windows / Mac / Linux operációs rendszerre, Windows esetén lehetőleg a **WSL 2** backendet használó verziót válasszuk.

Ezután a projekt gyökerében hozzunk létre egy fájlt **Dockerfile** néven az alábbi tartalommal:

    FROM node:latest
    WORKDIR '/app'
    COPY package.json ./
    RUN npm install
    COPY . .
    CMD ["npm", "run", "start"]

Ez a node:latest Docker image-et használja alapul, az **app** mappába először átmásolja a **package.json** fájlt, és telepíti a függőségeket. Ezek után átmásol minden mást is a képfájlba, majd elindítja az alkalmazást az npm run start paranccsal.

Vegyük fel a **package.json** fájlba az alábbi *docker:build* parancsot:

    {
      // ...
      "scripts": {
        // ...
        "docker:build": "docker build -t frontend-express-app-basics:latest .",
      },
      // ...
    }

Ezután a `docker run frontend-express-app-basics` paranccsal tudjuk elindítani az alkalmazást.


## MongoDB és Express konténerizált futtatása Docker Compose használatával

A **Docker Compose** segítségével azt is elérhetjük, hogy egy-egy külön konténerben elinduljon az Express API alkalmazásunk, illetve egy MongoDB-példány, és azok együtt dolgozzanak.

Ehhez hozzunk létre a projekt gyökerében egy **docker-compose.yml** fájlt az alábbi tartalommal:

    version: "3"
    services:
    app:
    build:
    dockerfile: Dockerfile
    context: .
    volumes:
    - /app/node_modules
    - .:/app
    ports:
    - 3000:3000
    links:
    - mongo
    mongo:
    container_name: mongo
    image: mongo:latest
    volumes:
    - ./data:/data/db
    ports:
    - "27017:27017"

Ebben a fájlban 2 konténert (service-t) definiálunk:

- Az alkalmazásunkat *app* néven, amelyet a **Dockerfile** alapján rakunk össze, és a 3000-es porton futtatjuk. A *volumes* szekcióban megadhatunk mappaleképezéseket, így a projekt gyökere az image-en belül az **app** mappába fog kerülni.
- A MongoDB-példányt *mongo* néven futtatjuk, a *mongo:latest* Docker image-ből készítjük, és a 27017-es porton futtatjuk.

Futtatás előtt írjuk át az **index.js** fájlt, hogy az adatbázisba csatlakozáskor a *mongodb://${dbConfig.host}* connection stringet használja, a **default.json** konfigurációs fájl tartalmát pedig módosítsuk a következőre:

    {  "database": {    "host": "mongo:27017/myFirstDatabase?retryWrites=true&w=majority"  } }

A **package.json** fájlban vegyük fel a "docker-compose:up": "docker-compose up" parancsot, majd indítsuk el a konténereinket az `npm run docker-compose:up` paranccsal!


