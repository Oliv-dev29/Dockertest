FROM node:latest

WORKDIR /postit

COPY . .

RUN npm install

EXPOSE 5173

CMD ["npm","run","dev"]
