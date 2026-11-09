# JET 26 Web Application

## Quick start

**Prerequisites:** [Node.js](https://nodejs.org/en/download), Yarn 4 (run `corepack enable` if `yarn --version` isn't 4.x), [Docker Desktop](https://www.docker.com/products/docker-desktop/) and the `psql` client. On Windows see the note below.

1. Install the dependencies and generate the Prisma client:
   ```bash
   yarn install
   yarn prisma generate
   ```
2. Set up your environment file (`.env`, in the repo root, next to `package.json`). Do this **before** the seed: its migration step reads the database URL from `.env`.
   - There is no `.env.example`: **ask the team lead for the `.env` file** and save it in the repo root. It is gitignored, so never commit it.
   - Windows: Explorer won't let you name a file `.env` directly. Rename it from a terminal (`ren a.env .env`) or in VS Code, and make sure it isn't saved as `.env.txt`.
3. Start the database container (it starts **empty**):
   ```bash
   yarn dev:db:start
   ```
4. Create the `setdb` database and load the seed data:
   ```bash
   yarn dev:db:seed
   ```
   This creates `setdb`, imports `database/seeds/PROD_db_seed-22-10-2026.sql` and applies the migrations. That file is **gitignored** (the `seeds/` folder is): ask the team lead for it and save it in `database/seeds/` first. `psql` will ask for the `postgres` password; it is the one defined for the database service in `database/docker-compose.yml`.
5. Start the dev server and open [http://localhost:3000](http://localhost:3000):
   ```bash
   yarn dev
   ```
   If you see `Cannot read properties of undefined` on an enum, the Prisma client is missing or stale. Stop the server (`Ctrl+C`) and run:
   ```bash
   yarn prisma generate
   rmdir /s /q .next     # cmd; in PowerShell/WSL: rm -rf .next
   yarn dev
   ```

> **Windows:** you can work natively or in WSL.
> - **Native (cmd/PowerShell):** run `corepack enable` once in a terminal opened **as Administrator** (it starts in `C:\Windows\System32`; if `corepack` isn't recognized, run `npm install -g corepack` first), then work from a normal terminal in the repo folder (`cd /d "C:\path\to\project"`). To get `psql`, install [PostgreSQL for Windows](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads) (on *Select Components*, untick everything except *Command Line Tools*) and add `C:\Program Files\PostgreSQL\<version>\bin` to your `PATH`.
> - **WSL:** Docker Desktop's WSL integration must be enabled (Settings → Resources → WSL integration → your distro), and Node, Yarn and `psql` must be installed **inside WSL**. Follow the [WSL steps in LOCAL_SETUP.md](LOCAL_SETUP.md#windows).

> **Port 5432 already in use?** Only if Postgres is installed locally, stop it with `sudo service postgresql stop`. On a clean machine you can skip this (a "Unit not loaded" message is harmless). On native Windows, a full PostgreSQL install also runs a service on 5432: stop it in `services.msc` (or install only the command line tools).

Stuck? See the full guide in [LOCAL_SETUP.md](LOCAL_SETUP.md).

## Database commands

| Command | What it does |
| --- | --- |
| `yarn dev:db:start` | Start the Postgres container |
| `yarn dev:db:seed` | Create `setdb` and load seed data (**do not run after a db push**, it fails if `setdb` already exists) |
| `yarn dev:db:dump` | Save a snapshot of `setdb` to `database/seeds/` |
| `yarn prisma migrate dev` | Apply/create migrations after changing the Prisma schema |
| `yarn prisma studio` | Browse and edit the tables at <http://localhost:5555> (run it in a second terminal while `yarn dev` runs) |
| `yarn dev:db:stop` | Stop **and remove** the containers, Postgres and Redis (**your local data is deleted**, run `yarn dev:db:dump` first) |

> **Warning:** give migrations suitable names and write them so they won't break a production environment.

Tip: the VS Code Docker extension lets you see the running containers.

The `pages/api` directory is mapped to `/api/*`. Files there are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Development Processes

### Component

`⚠️` Make sure you are at the `main` branch on git !

1. Create a new branch

```
git checkout -b feature-<component's name>
```

2. For each achievement during the development, you should `commit` your changes.

```
git add .
git commit -m "feat/<component's name> <message>"
git push --set-upstream origin feature-<component's name>
```

3. After testing and pushing all your implementations, create a `Pull Request`.

### Page

`⚠️` Make sure you are at the `main` branch on git !

1. Create a new branch

```
git checkout -b page-<page's name>
```

2. For each achievement during the development, you should `commit` your changes.

```
git add .
git commit -m "page/<page's name> <message>"
git push --set-upstream origin page-<page's name>
```

3. After testing and pushing all your implementations, create a `Pull Request`.

## Important notes:

The following Git hooks are being used to ensure code quality:

- **Pre-commit:** Code linting
- **Pre-push:** Build

If you're having troubles pushing or commiting code then you should probably check your code and confirm that it's working.<br>
Also be in mind that pushing code will take longer than expected

## Deployment

Documentation regarding **Deployment** and **DevOps** can be found on [Deployment.md](Deployment.md)
