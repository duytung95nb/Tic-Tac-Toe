FROM node:20.11.0

WORKDIR /app
COPY dist .
COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production

CMD [ "node", "index.js" ]
