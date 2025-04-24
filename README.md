# Neon Local example React Express application

An example application to demonstrate how to use [Neon Local](https://neon.tech/docs/).

## Getting started

There are two different `.env.example` files. One for Development, and one for Production. Be sure to rename them correctly. `NEON_API_KEY`, `NEON_PROJECT_ID` and `PORT` will likely be the same in both files.

### 1. development variables

Rename `.env.dev.example` to `.env.dev` and add required values. This environment will create an ephemeral branch when the container is started.

```shell
NODE_ENV=dev
NEON_API_KEY=
NEON_PROJECT_ID=
PORT=3000
```

### 2. production variables

Rename `.env.prod.example` to `.env.prod` and add required values. This environment connects to the database as defined by: `DATABASE_URL`.

```shell
DATABASE_URL=
NODE_ENV=prod
NEON_API_KEY=
NEON_PROJECT_ID=
PORT=3000
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start container

Depending on which environment you want to use will determine which docker compose command you run.

```bash
docker compose --profile dev --env-file .env.dev up --watch
docker compose --profile prod --env-file .env.prod up --build
```

### 🚀 5. Preview

Visit: [http://localhost:8080/](http://localhost:8080/) to view the app running.

### ☝️ Warning

> Do not run the following command directly:
>
> ```bash
> npm run dev
> ```

Running `npm run dev` is only intended to be used by **Docker**.

### Kill All

If you need to kill all containers and images, run the following command:

```
bash kill.sh
```

## Routes / Functions

The default route `/`, will display the current Postgres version of the database defined by the `NEON_PROJECT_ID`.

To change the query, edit the following file: `src/function.js`

## Postgres Client

This repository uses the Neon [serverless driver](https://neon.tech/docs/serverless/serverless-driver). The configuration is set up in `src/db.js`. While you can switch to using the `pg` driver, please note that the setup will be slightly different. For more information, refer to the [Neon Local docs](https://neon.tech/docs/).
