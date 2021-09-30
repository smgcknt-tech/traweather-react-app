FROM node:14
WORKDIR /app
ENV NODE_ENV production
ENV PATH /app/node_modules/.bin:$PATH
COPY . .
RUN npm ci
RUN yarn install --frozen-lockfile
CMD [ "npm", "run" ,"build"]

FROM nginx
WORKDIR /root/
COPY --from=0 /app/build ./usr/share/nginx/html
COPY nginx/default.conf ./etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
