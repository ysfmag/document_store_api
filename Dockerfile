FROM node:12.16.1-alpine AS node_cache
WORKDIR /cache
COPY ./package*.json ./
RUN npm ci


FROM node:12.16.1-alpine AS builder
WORKDIR /app
COPY --from=node_cache /cache ./
COPY . .
RUN npm run build

FROM node:12.16.1-alpine 
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
