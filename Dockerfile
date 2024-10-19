FROM node:22.10.0-alpine3.20 as base

WORKDIR /project

COPY package.json .
COPY . .