FROM node:14.15.4
WORKDIR /app
COPY ./package.json ./
RUN npm i
COPY . .
EXPOSE 5000
CMD ["npm", "run", "start"]