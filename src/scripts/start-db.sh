#!/bin/bash
set -e

POSTGRES_IMAGE="postgres";
PW="password";
DB="e2e_db";

echo "echo stop & remove old docker [$POSTGRES_IMAGE] and starting new fresh instance of [$POSTGRES_IMAGE]"
(docker kill $POSTGRES_IMAGE || :) && \
  (docker rm $POSTGRES_IMAGE || :) && \
  docker run --name $POSTGRES_IMAGE -e POSTGRES_PASSWORD=$PW \
  -e PGPASSWORD=$PW \
  -p 5432:5432 \
  -d postgres

# wait for pg to start
echo "sleep wait for pg-server [$POSTGRES_IMAGE] to start";
SLEEP 3;

# create the db
echo "CREATE DATABASE $DB ENCODING 'UTF-8';" | docker exec -i $POSTGRES_IMAGE psql -U postgres
echo "\l" | docker exec -i $POSTGRES_IMAGE psql -U postgres