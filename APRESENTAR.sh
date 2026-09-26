#!/usr/bin/env bash
set -e

if [ ! -d node_modules ]; then
  echo "Dependências não encontradas. Executando npm install..."
  npm install
fi

npm start
