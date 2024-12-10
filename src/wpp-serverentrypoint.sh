#!/bin/sh

# Executar o comando apenas na criação do container
if [ ! -f /app/initialized ]; then
  cp -r /home/admin/wppconnect-server/dist /app/ && \
  ls /app/dist && \
  cd /app/dist/ && npm install

  # Cria um arquivo para marcar que o container foi inicializado
  touch /app/initialized
fi

# Passa os argumentos para o CMD
exec "$@"