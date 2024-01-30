FROM node:18 As builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY .  .
RUN npm run build

#Production stage
FROM node:18
RUN apt-get update && apt-get intall -y ffmpeg
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD [ "npm","run","serve" ]
