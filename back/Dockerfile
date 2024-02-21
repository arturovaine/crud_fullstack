
FROM node:20.11.0

WORKDIR ./src

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]