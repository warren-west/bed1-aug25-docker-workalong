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

**`Genre`:**
- `GET` `/genres`: Fetches all Genre records.
- `GET` `/genres/:id`: Fetches a single Genre record by ID.

**`Band`:**
- `GET` `/bands`: Fetches all Band records.
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