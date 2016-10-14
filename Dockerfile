FROM node:6.7.0

RUN mkdir /app
ADD package.json /app
WORKDIR /app

RUN npm install -g yarn
RUN yarn install

EXPOSE 8080
CMD [ "npm", "start" ]
