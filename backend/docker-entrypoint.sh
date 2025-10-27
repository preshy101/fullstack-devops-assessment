#!/usr/bin/env bash
set -e

# wait for DB to be ready (simple loop)
if [ -n "$DB_HOST" ]; then
  echo "Waiting for database at $DB_HOST:$DB_PORT..."
  retries=15
  until php -r "try{ new PDO('mysql:host=' . getenv('DB_HOST') . ';port=' . getenv('DB_PORT') . ';dbname=' . getenv('DB_DATABASE'), getenv('DB_USERNAME'), getenv('DB_PASSWORD')); echo 'db ok'; } catch (Exception \$e) { echo 'db wait'; exit(1); }"
  do
    sleep 2
    retries=$((retries-1))
    if [ $retries -le 0 ]; then
      echo "Database not available, continuing anyway..."
      break
    fi
  done
fi

# Copy .env if example exists and APP_KEY not set (for local dev convenience)
if [ -f ".env.example" ] && [ ! -f ".env" ]; then
  cp .env.example .env
fi

# Install composer dependencies if vendor is missing
if [ ! -d "vendor" ]; then
  composer install --no-interaction --optimize-autoloader
fi

# Generate app key if missing
if php -r "exit(file_exists('.env') && strpos(file_get_contents('.env'), 'APP_KEY=') !== false ? 0 : 1)"; then
  if [ -z "$APP_KEY" ]; then
    php artisan key:generate --force || true
  fi
fi

# Run migrations if configured (use env SKIP_MIGRATIONS=true to skip)
if [ "${SKIP_MIGRATIONS:-false}" != "true" ]; then
  echo "Running migrations..."
  php artisan migrate --force || true
fi

exec "$@"
