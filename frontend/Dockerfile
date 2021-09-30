FROM node:14 AS builder
ENV NODE_ENV production
RUN mkdir -p /app
WORKDIR /app
COPY . .
RUN npm install react-scripts -g
RUN npm install --production
RUN yarn install --production
CMD [ "npm", "run" ,"build"]

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
