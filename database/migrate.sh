#!/bin/bash

projects=(user-api weather-api auth-api)

npx prisma migrate dev --name dev

for project in "${projects[@]}"; do
    [ ! -d "../${project}" ] && continue
    [ ! -d "../${project}/prisma" ] && mkdir "../${project}/prisma"

    echo "export prisma file for $project ..."
    cp -r schema.prisma migrations "../${project}/prisma/"
done
