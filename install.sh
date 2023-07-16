#!/bin/bash

projects=(user-api weather-api auth-api database)

[ -z "$(which pnpm 2> /dev/null)" ] && echo "Please install pnpm" && exit 1

for project in "${projects[@]}"; do
    cd "$project" || exit 1
    pnpm install
    cd ..
done
