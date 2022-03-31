FROM node:16

WORKDIR /app-node

EXPOSE 3000

COPY . .

# RUN npm i yarn
RUN yarn install

# RUN apt update && apt install chromium -y

# Add files to fix the puppeteer error: "Failed to launch the browser process! Cannot open shared object file: no such file or directory"
RUN apt-get update && apt-get install espeak -y
RUN apt install libgconf-2-4 libatk1.0-0 libatk-bridge2.0-0 libgdk-pixbuf2.0-0 libgtk-3-0 libgbm-dev libnss3-dev libxss-dev -y

# #  Fix the puppeteer error: "could not find expected browser (chrome) locally"
# RUN cd ./node_modules/puppeteer
# RUN npm install

# RUN cd ../../

ENTRYPOINT npm run dev
