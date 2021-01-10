FROM node:13.12.0-alpine

WORKDIR /webapp/frontend
ENV NODE_OPTIONS="--max-old-space-size=30000"

COPY package*.json ./
#COPY pnpm-lock.yaml ./
# RUN npm install -g pnpm 
RUN npm install 
RUN npm install -g serve 
#RUN pnpm install 

COPY . ./

RUN npm run build

EXPOSE 5000

CMD ["serve", "build","-l", "5000"]