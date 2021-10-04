FROM node:14.17.6
WORKDIR /app
COPY ./package.json ./
RUN npm i
COPY . .
EXPOSE 5000
CMD ["npm", "run", "start"]