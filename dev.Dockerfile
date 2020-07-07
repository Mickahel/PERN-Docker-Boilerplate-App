# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /app/client

# add `/app/client/node_modules/.bin` to $PATH
#ENV PATH /app/client/node_modules/.bin:$PATH

# install app dependencies
COPY package*.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm 
RUN pnpm install --silent
#RUN npm install react-scripts@3.4.0 -g --silent

# add app
COPY . ./

# start app
CMD ["pnpm", "start"]