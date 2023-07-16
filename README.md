# API micro service

## Clone

```
git clone git@github.com:Pietrucci-Blacher/API-Micro-Services.git
cd API-Micro-Services
```

## Launch container

```
docker compose up -d
```

## Create dotenv

Create file `.env`

```
JWT_SECRET="somethingsecret"
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres?schema=public"
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=postgres
```

## Install dependences

Only first time

```
./install.sh
```

## Migrate database

```
cd database/
./migrate.sh
```

## Generate and export proto file

```
cd proto/
./export.sh
```
