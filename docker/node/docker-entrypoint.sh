#!/bin/sh
set -eux

# npx prisma migrate dev --name init
npx prisma migrate deploy
npx prisma generate


exec "$@"
