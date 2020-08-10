FROM node:12.18.2-alpine3.11

WORKDIR /app
COPY package*.json ./
COPY pnpm-lock.yaml .

RUN npm i -g pnpm
RUN pnpm install --only=prod

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]