FROM node:14 AS builder
WORKDIR /app
COPY . .
ENV PATH ./node_modules/.bin:$PATH
RUN npm install react-scripts -g
RUN npm ci
RUN yarn
RUN npm run build:production

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
