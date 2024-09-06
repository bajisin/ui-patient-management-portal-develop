FROM node:14.17.3

RUN npm install --prefix /usr/lib/ elastic-apm-node

# ------------------
# Create app directory
# ------------------
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# ------------------
# ENV Vars
# ------------------
ENV HOST 0.0.0.0
ENV PORT 8080
ENV DOMAIN brass

# ------------------
# Environment variables from the Jenkins environment used as build argument
# ------------------
ARG GIT_BRANCH
ARG GIT_COMMIT
ARG BUILD_DISPLAY_NAME
ARG ENV

# ------------------
# Environment variables not defined below are set on the task definition in ECS by Terraform
# ------------------
ENV GIT_BRANCH=${GIT_BRANCH}
ENV GIT_COMMIT=${GIT_COMMIT}
ENV BUILD_DISPLAY_NAME=${BUILD_DISPLAY_NAME}

# ------------------
# Install app dependencies
# ------------------
COPY package.json /usr/src/app/
# RUN npm cache clean --force
RUN npm install --no-optional
RUN npm install --save-dev ajv@^7
# RUN npm audit fix
COPY . ./
RUN npm run build:develop
RUN npm run sonarfinal
EXPOSE 8080:8080

CMD ["node", "-r", "/usr/lib/node_modules/elastic-apm-node/start", "./dist/server.js"]
