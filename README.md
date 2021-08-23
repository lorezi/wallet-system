# Wallet System Documentation

Wallet system implementation.

## Documentation

API Documentation [here](https://documenter.getpostman.com/view/17190443/TzzDKFSf)

---

**API** built with Node + Express + Postgres + Sequelize + Jest.

Written in TypeScript.

---

## Start Development

Kindly clone the repo ``

### Setup

Create a .env file in the root directory and add the following properties

```markdown
PORT=?
DATABASE_USERNAME=?
DATABASE_PASSWORD=?
DATABASE_NAME=?
DB_HOST=?
DB_PORT=?
```

### Installation

To install the necessary packages, in your root folder directory kindly run

```bash
# Install dependencies
$ npm install

# Start the app
$ npm start

# Run test
$ npm test
```

---

## API Endpoints

#### Base Url - `http://localhost:{PORT}/api/v1`

#### Wallet System

- `POST /signup`
- `PATCH /verify `
- `PATCH /generate`
- `PATCH /transfer`

## TODO

- Login
- Jwt authentication
- Password encryption
- Protected routes

## 🎩 Author

- Lawrence 😁😁😁
