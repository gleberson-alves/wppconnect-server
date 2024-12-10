#!/bin/sh
NODE_NO_WARNINGS=1
# Executar o comando apenas na criação do container
if [ ! -f /app/initialized ]; then
  echo "HOST=${HOST}" > /app/.env
  echo "DEVICE_NAME=${DEVICE_NAME}" >> /app/.env
  echo "POWERED_BY=${POWERED_BY}" >> /app/.env
  echo "SECRET_KEY=${SECRET_KEY}" >> /app/.env
  echo "PORT=${PORT}" >> /app/.env
  echo "CUSTOM_USER_DADA_DIR=${CUSTOM_USER_DADA_DIR}" >> /app/.env

  # Marcar que o contêiner foi inicializado
  touch /app/initialized

  mkdir -p "/app/dist"
  cp -r /home/admin/wppconnect-server/dist /app/ && \
  cp /app/.env /app/dist/ && \
  
  # Verificar conteúdo de /app/dist
  ls -la /app/dist/ && \

  # Navegar para o diretório e instalar pacotes
  cd /app/dist/ && yarn install --production=true --pure-lockfile

  # Mudar a propriedade do diretório
  chown -R admin:admin /app
fi

echo "******* chegou aqui ***********"
# Passa os argumentos para o CMD
exec "$@"
#node /app/dist/server.js
