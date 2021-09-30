FROM node:14 AS builder
WORKDIR /app
COPY . ./
ENV PATH /app/node_modules/.bin:$PATH
RUN npm ci
RUN yarn
CMD ["npm", "run", "build"]

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder app/build /usr/share/nginx/html
