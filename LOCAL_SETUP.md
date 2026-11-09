# Local Setup Guide

Step-by-step guide to run the JET 26 website on your machine. The short version lives in the [README](README.md).

## 1. Requirements

| Tool | Notes |
| --- | --- |
| Node.js | [Download](https://nodejs.org/en/download). Use the version the team uses (ask if unsure) |
| Yarn 4 | The repo pins `yarn@4.10.3`. Run `corepack enable` once (recent Node versions don't bundle corepack: `npm install -g corepack` first) |
| Docker + Compose | [Docker Desktop](https://www.docker.com/products/docker-desktop/) on Windows/macOS |
| `psql` / `pg_dump` | Client only, same version as the container's Postgres or newer (Windows: [PostgreSQL installer](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)). Needed by `yarn dev:db:seed` and `yarn dev:db:dump`. Ubuntu/WSL: `sudo apt install postgresql-client` |
| Git | |

### Windows

You can work natively (cmd/PowerShell) or in WSL2.

**Native Windows**

1. Install Node.js and Docker Desktop.
2. Open cmd **as Administrator** and run:
   ```bat
   corepack enable
   ```
   Without admin rights it fails with a permissions error. The folder doesn't matter for this command (an admin cmd starts in `C:\Windows\System32`), but then close that window.
   If it says `'corepack' is not recognized`, your Node probably doesn't bundle corepack (recent versions). Run `npm install -g corepack` first, then `corepack enable`. If `node --version` also fails, reopen the terminal (or Windows) so the PATH refreshes, or reinstall Node.
3. Open a normal terminal **in the repo folder** (for an admin cmd: `cd /d "C:\path\to\project"`, `/d` also switches drive, quotes are needed if the path has spaces) and continue below. Check `yarn --version` prints 4.x (a global Yarn 1.22.x installed by another project will otherwise be used).
4. Install the `psql` client by installing PostgreSQL for Windows ([download](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)), but **only the command line tools**. On the installer's *Select Components* screen:
   - **untick** *PostgreSQL Server*, *pgAdmin 4* and *Stack Builder*
   - **keep ticked** *Command Line Tools*

   Finish the installer, then add `C:\Program Files\PostgreSQL\<version>\bin` to the `Path` environment variable: Windows search → *Edit environment variables* → select `Path` under *User variables* (your account only, no admin needed; *System variables* also works and applies to all accounts) → *Edit* → *New* → paste the folder → OK. Edit the existing `Path`, don't create a new variable or replace its entries. Reopen the terminal and check with `psql --version`.
   If you ticked *PostgreSQL Server*, the installer asks for a password: that password is only for that Windows server and is unrelated to the project's database password (the one in the Docker setup). The server also runs a Windows service on port 5432 that clashes with the Docker container; stop it (`services.msc`, or `net stop postgresql-x64-<version>` as Administrator) before `yarn dev:db:start`, or reinstall with only the command line tools.

**WSL2**

Everything must be installed **inside WSL**. WSL inherits your Windows PATH, so without this it silently falls back to the Windows `node`/`yarn`/`corepack`, which fail with confusing errors (see Troubleshooting).

1. Install WSL2 and a distro (e.g. Ubuntu).
2. Docker Desktop → **Settings → Resources → WSL integration** → enable it for your distro → *Apply & restart*. In the WSL terminal, check that `docker ps` works.
3. Install Node with nvm, then Yarn. In the WSL terminal:
   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
   ```
   Close and reopen the terminal (or `nvm` won't be found), then:
   ```bash
   nvm install --lts
   npm install -g corepack     # recent Node versions no longer bundle it
   corepack enable
   which node corepack yarn    # must be under ~/.nvm/..., NOT /mnt/c/...
   ```
   (If `curl` is missing: `sudo apt update && sudo apt install -y curl`.)
4. Install the Postgres **client** (needed by `yarn dev:db:seed` and `yarn dev:db:dump`; this does not install a Postgres server). Its version must be **the same as or newer than the container's Postgres** (currently 18; check with `docker ps` / the image in `database/docker-compose.yml`), and Ubuntu's own `postgresql-client` is older, so use the official PostgreSQL apt repository:
   ```bash
   sudo apt update && sudo apt install -y postgresql-common
   sudo /usr/share/postgresql-common/pgdg/apt.postgresql.org.sh -y
   sudo apt install -y postgresql-client-18
   pg_dump --version      # should print 18.x
   ```
5. Clone the repo **inside WSL** (e.g. `~/projects`). Under `/mnt/c/...` it also works but is much slower (installs, builds, the pre-push hook).
6. `cd` into the cloned folder (the one containing `package.json`), check `yarn --version` prints 4.x, and run every command below from there.

> Windows and WSL share Docker Desktop, so containers started from either side are the same ones. If you already set the project up on Windows, `setdb` already exists and you can skip the seed.

## 2. Install dependencies

```bash
yarn install
```

This also installs the Git hooks (husky): lint on commit, build on push.

Don't `yarn add` packages by hand (e.g. `axios`, `@tanstack/react-query`): they are already in `package.json`. If they seem missing, the install was done with the wrong Yarn version; fix Yarn and run `yarn install` again (about 5 minutes).

Then generate the Prisma client (the app imports enums and types from it, and a fresh clone doesn't have it):

```bash
yarn prisma generate
```

Run it again after pulling schema changes.

If the site then shows `Cannot read properties of undefined (reading 'Active')` (or similar on an enum), the client is missing or stale. Stop the server (`Ctrl+C`) and run:

```bash
yarn prisma generate
rmdir /s /q .next     # cmd; in PowerShell/WSL: rm -rf .next
yarn dev
```

## 3. Environment variables

The file must be called `.env` and live in the repo root (next to `package.json`). Set it up **before** the database step: the seed's migration step needs the database URL from it. Never commit `.env`.

There is no `.env.example` in the repo. **Ask the team lead for the `.env` file** and save it in the repo root.

Sanity check: the database URL inside it must match the Docker container (host `localhost`, port `5432`, user `postgres`, database `setdb`, and the password set in `database/docker-compose.yml`).

**Windows tip:** Explorer refuses to create or rename a file to just `.env` (no name before the dot). Workarounds:
- Rename from a terminal: `ren a.env .env`
- Or rename in VS Code (right-click → Rename)
- Or in Explorer type `.env.` (with a trailing dot); Windows removes it
- Turn on *View → File name extensions* and check it didn't end up as `.env.txt`

## 4. Database

The Postgres container starts **empty**: there is no `setdb` yet.

```bash
yarn dev:db:start     # start the container
yarn dev:db:seed      # create setdb + import seed + apply migrations
```

**Before seeding**, get the seed file from the team lead and save it as `database/seeds/PROD_db_seed-22-10-2026.sql`. It is not in the repo: the `seeds/` folder is in `.gitignore` (and the file may contain production data, so don't force-add it to Git).

`yarn dev:db:seed` runs `psql`, so it will ask for the `postgres` password. It stops at the first error, for example if `setdb` already exists.

**Without seed data** (empty database): create it yourself, then migrate.

```bash
psql -h localhost -p 5432 -U postgres -c 'create database setdb'
yarn prisma migrate dev
```

## 5. Run the site

```bash
yarn dev
```

Open <http://localhost:3000>.

### Prisma Studio (database browser)

Open a **second terminal** in the repo folder (keep `yarn dev` running in the first) and run:

```bash
yarn prisma studio
```

Then open <http://localhost:5555>. Stop it with `Ctrl+C`. It needs the database container running and a valid database URL in `.env`.

Use it to browse and edit tables, for example the role of your own user, to see the site at <http://localhost:3000> as that role (log out and in again if the change doesn't show).

- Browser doesn't open (WSL): open the URL yourself, or run `yarn prisma studio --browser none`.
- Port 5555 in use: stop the other Studio, or use `yarn prisma studio --port 5556`.

## 6. Everyday commands

| Command | Purpose |
| --- | --- |
| `yarn prisma migrate dev` | Apply/create migrations after editing `database/prisma/schema.prisma` |
| `yarn prisma studio` | Inspect data in the browser |
| `yarn dev:db:dump` | Save a snapshot to `database/seeds/db_seed-<date>.sql` |
| `yarn dev:db:stop` | Stop and remove the containers (Postgres and Redis) |
| `yarn lint` / `yarn build` | What the pre-commit / pre-push hooks run |

> **`yarn dev:db:stop` removes both containers (Postgres and Redis) and their data**: after stopping and starting again, `setdb` no longer exists (tested). Run `yarn dev:db:dump` first if you need your data, and restore it afterwards with `psql -h localhost -p 5432 -U postgres -c "create database setdb"` and `psql -h localhost -p 5432 -U postgres setdb < database/seeds/db_seed-<date>.sql`.
> **Do not run `yarn dev:db:seed` after a db push.**

## 7. Troubleshooting

| Problem | Fix |
| --- | --- |
| `Unit postgresql.service not loaded` | Harmless. Postgres isn't installed locally, so there is nothing to stop |
| Port 5432 already in use | Local Postgres is running: `sudo service postgresql stop` |
| `docker: command not found` in WSL | Enable Docker Desktop's WSL integration (section 1) |
| `psql: command not found` | Install the client (WSL step 4, or the native Windows steps) |
| `pg_dump: error: aborting because of server version mismatch` | The client is older than the container's Postgres (Ubuntu's default is 14, the container runs 18). Install `postgresql-client-18` from the PostgreSQL apt repository (WSL step 4) |
| Seed fails with "No such file" / "cannot find the file" for `PROD_db_seed-...sql` | The seed file is missing (it's gitignored). Ask the team lead for it and save it in `database/seeds/`. The script had already created an empty `setdb`, so drop it before retrying: `psql -h localhost -p 5432 -U postgres -c "drop database setdb"`, then `yarn dev:db:seed` |
| `database "setdb" already exists` on seed | It was already created, e.g. by another clone or from Windows/WSL (the container is shared). Skip the seed, or `yarn dev:db:dump` and then stop and start the containers (losing data) |
| `Missing script: migrate` | Use `yarn prisma migrate dev` |
| `.env` not picked up | It must be named exactly `.env` (not `a.env`, not `.env.txt`) and sit next to `package.json`. Restart `yarn dev` after changing it |
| Prisma can't connect | Check `.env` credentials and that `yarn dev:db:start` is running (`docker ps`) |
| `/mnt/c/Program Files/nodejs/yarn: exec: node: not found` (WSL) | WSL is using the Windows Yarn. Install Node inside WSL (nvm, WSL step 3), reopen the terminal and check `which node yarn` |
| `corepack: /bin/sh^M: bad interpreter` (WSL) | The Windows `corepack` is being used. Your Node has no corepack: run `npm install -g corepack` (check `which npm` is under `~/.nvm`), `hash -r`, then `corepack enable` |
| `Couldn't find a package.json` / `yarn run v1.22.22` | You're not in the repo folder (`git clone` creates a subfolder). `cd` into the folder that contains `package.json`; Yarn only switches to 4.x there |
| `'corepack' is not recognized` (Windows) | Node isn't in this terminal's PATH, or your Node doesn't bundle corepack. Check `node --version` / `where corepack`; run `npm install -g corepack`, then `corepack enable` |
| `yarn --version` shows 1.22.x | Wrong Yarn (or you're outside the repo folder). Run `corepack enable` (as Administrator on native Windows; permission errors mean you forgot), reopen the terminal, then `yarn install` |
| `psql` is not recognized (Windows) | Add `C:\Program Files\PostgreSQL\<version>\bin` to `PATH` and reopen the terminal |
| `Cannot read properties of undefined (reading 'Active')` or similar on an enum, or `yarn dev` fails on the Prisma client | The Prisma client is missing or stale. `Ctrl+C`, `yarn prisma generate`, delete the `.next` folder (`rmdir /s /q .next` in cmd, `rm -rf .next` elsewhere), `yarn dev` |
| Red TypeScript errors in VS Code on modules that are installed | *File → Open Folder* must be the folder that directly contains `package.json` and `node_modules`. Then `Ctrl+Shift+P` → *Developer: Reload Window*, and in a `.ts` file *TypeScript: Select TypeScript Version → Use Workspace Version* |
| Push takes long | Normal: the pre-push hook runs a full build |
