# JET 26 Web Application

First, install the required packages:

```bash
yarn install
```

Then run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Set up alongside database:

- Make sure you have docker and docker-compose installed
- Make sure you are not running any service of postgres locally by running:
  ```
  sudo service postgresql stop
  ```
- Start the db
  ```
  yarn dev:db:start
  ```
- Sometimes it's useful to have some fake data. You can seed the database using:
  ```
  yarn dev:db:seed
  ```
  > **Warning: Do not run this command after a db push!**
- You can also save a snapshot of the data present in the db using:
  ```
  yarn dev:db:dump
  ```
- After making changes to the prisma schema, run the following command to update the db:
  ```
  yarn migrate dev
  ```
  > **Warning: You should always give suitable names for migrations and alter them in a way that won't break a production environment.**
- To play/check values on tables created run:
  ```
  yarn prisma studio
  ```
- To stop the db instance:
  ```
  yarn dev:db:stop
  ```

Tip: vscode docker extension let's you see the instances created

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
