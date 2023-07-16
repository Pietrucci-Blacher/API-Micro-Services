#!/bin/bash

projects=(user-api weather-api auth-api database)
install=1
env=1

while getopts "ieh" opt; do
    case $opt in
        i)
            install=0 ;;
        e)
            env=0 ;;
        h)
            echo "Usage: install.sh [-i] [-e]"
            echo "-i .................. skip install"
            echo "-e .................. skip env copy"
            exit 0 ;;
        \?)
            echo "Invalid option: -$OPTARG" >&2 ;;
    esac
done

[ -z "$(which pnpm 2> /dev/null)" ] && echo "Please install pnpm" && exit 1

for project in "${projects[@]}"; do
    cd "$project" || exit 1
    [ $install -eq 1 ] && pnpm install
    [ $env -eq 1 ] && cp ../.env .
    cd ..
done
