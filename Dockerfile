

FROM node:8-alpine
RUN npx create-react-app /app
RUN npm install react-files
WORKDIR /app/src
EXPOSE 3000
CMD ["npm", "start"]