#!/bin/bash

echo "Stopping all Docker containers..."
docker stop $(docker ps -aq)

echo "Removing all Docker containers..."
docker rm $(docker ps -aq)

echo "Removing all Docker images..."
docker rmi $(docker images -q)

echo "Pruning all unused volumes..."
docker volume prune -f

echo "All Docker containers, images, and volumes have been removed!"
