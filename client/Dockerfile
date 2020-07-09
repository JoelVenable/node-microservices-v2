FROM node:12.18.2-alpine3.11

WORKDIR /app
COPY package*.json ./
RUN npm install --only=prod

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "dev" ]