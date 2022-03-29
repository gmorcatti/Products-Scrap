FROM node:16

WORKDIR /app-node

EXPOSE 3000

COPY . .

RUN npm install
RUN apt-get update && apt-get install espeak -y
RUN apt install libgconf-2-4 libatk1.0-0 libatk-bridge2.0-0 libgdk-pixbuf2.0-0 libgtk-3-0 libgbm-dev libnss3-dev libxss-dev -y

ENTRYPOINT npm run dev
