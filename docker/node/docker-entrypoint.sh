#!/bin/sh
set -eux

npx prisma migrate dev --name init

exec "$@"
