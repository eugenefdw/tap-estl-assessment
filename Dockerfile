FROM node
WORKDIR /tap-estl/backend
COPY /backend/package.json .
RUN npm install
COPY /backend ./
EXPOSE 3000
CMD ["npm", "start"]
