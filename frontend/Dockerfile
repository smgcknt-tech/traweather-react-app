FROM node:14 AS builder
WORKDIR /app
ENV NODE_ENV production
ENV PATH /app/node_modules/.bin:$PATH
COPY . .
RUN npm ci
RUN yarn install --frozen-lockfile
CMD [ "npm", "run" ,"build"]

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
