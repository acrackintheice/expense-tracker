FROM node AS BUILD
WORKDIR /app
COPY . .
RUN npm install 
RUN npm run build

FROM node:alpine
WORKDIR /app
COPY --from=BUILD /app/build /app/build
EXPOSE 8080
EXPOSE 3000
RUN npm install -g serve 
CMD serve -s build -l 8080