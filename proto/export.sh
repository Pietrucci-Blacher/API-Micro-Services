#!/bin/bash

projects=(user-api weather-api auth-api)

for project in "${projects[@]}"; do
    [ ! -d "../${project}" ] && continue
    [ ! -d "../${project}/src/proto" ] && mkdir "../${project}/src/proto"

    echo "export proto file for $project ..."
    buf export . --output "../${project}/src/proto"
done
