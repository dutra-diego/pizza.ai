#!/bin/sh
set -e

echo "Applying Prisma migrations..."
npx prisma db push

echo "Starting application..."
exec npm run dev
