FROM node:14 AS builder
WORKDIR /app
ENV NODE_ENV production
ENV PATH /app/node_modules/.bin:$PATH
COPY . .
RUN npm ci
RUN yarn install --frozen-lockfile
CMD [ "npm", "run" ,"build"]

FROM nginx
COPY --from=builder /app/build /usr/share/nginx/html
COPY --from=builder /app/nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
