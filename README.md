#  BED1 AUG25 SRV Workalong
This Express backend project connects to a remote MySql database, and will soon be hosted in the cloud on a free PaaS platform.

## Usage
Install all dependencies with:
```
npm i
```

Run the server with:
```
npm start
```

Run unit tests *(Coming soon)* with:
```
npm test
```

## Endpoints

**`Populate DB with Seed Data`:**
- `POST` `/populate`: Inserts Genre, Band, and Member records into the DB.

**`Genre`:**
- `GET` `/genres`: Fetches all Genre records.
- `GET` `/genres/:id`: Fetches a single Genre record by ID.

**`Band`:**
- `GET` `/bands`: Fetches all Band records.
- `GET` `/bands?GenreId=4`: Fetches all Band records within a specified `Genre`.
- `GET` `/bands?name=Ariana`: Fetches all Band records partially matching a `name`.
- `GET` `/bands?GenreId=4&name=an`: Fetches all Band records filtered by `Genre` and `name`.
- `GET` `/bands/:id`: Fetches a single Band record by ID.

**`Member`:**
- `GET` `/members`: Fetches all Member records.
- `GET` `/members/:id`: Fetches a single Member record by ID.

## Technologies
- [ExpressJS](https:npmjs.com/package/express)
- [MySql2](https:npmjs.com/package/mysql2)
- [Sequelize](https:npmjs.com/package/sequelize)
- [Dotenv](https:npmjs.com/package/dotenv)

## Authors
@warren-west | Noroff Fagskole AS &copy; | Norway

## License
[MIT](https://choosealicense.com/licenses/mit/)