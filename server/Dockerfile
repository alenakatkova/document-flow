FROM node:18-alpine AS deps
# https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine why libc6-compat might be needed
RUN apk add --no-cache libc6-compat
WORKDIR /server
COPY package*.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . ./
EXPOSE 8080
CMD ["node", "index.js"]