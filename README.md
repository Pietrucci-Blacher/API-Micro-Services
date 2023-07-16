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
