#!/usr/bin/env bash

# pwd - current working directory in host machine.
# currentRelativeFilePath - path relative to where shell was executed from.
# hostPath - will be used when calling docker-compose from inside 'manager' container to point to the host VM path rather than trying to mount from manager container. as mounting volumes from other container causes issues.
currentRelativeFilePath=$(dirname "$0")
applicationHostPath="`pwd`/$currentRelativeFilePath/../"
echo host path: $applicationHostPath

docker run \
    --volume $applicationHostPath:/project/application \
    --volume /var/run/docker.sock:/var/run/docker.sock \
    --env "hostPath=$applicationHostPath" \
    myuserindocker/container-manager:latest \
    containerCommand "$@"
