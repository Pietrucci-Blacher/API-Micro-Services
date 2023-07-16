#!/bin/bash

projects=(user-api weather-api auth-api database)

for project in "${projects[@]}"; do
    cd "$project" || exit 1
    pnpm install
    cd ..
done
