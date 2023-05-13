# Campus Meets

This is an application that just enables new students meet up their fellow students through sports. Here the students schdule sports with n number of players.

# How to run
1. This Project is done with Next.js and typescript so you need to check if Node.js is installed on your computer first and to do this, run **node -v** to check this. If it is not available, check **[here](https://nodejs.org/en/download)** to download.

2.Clone the repository and run the server with npm run dev
3. open your browser and enter http://localhost:3000
4. To start the server, cd into the server and run npm install or yarn install
5. run npx nodemon index to start the server

NB: Please you need to have PostgreSQL to use this.

Check ther Server folder to see the db scripts inside the db folder.

Also, Change the connection below in the package.json in the server folder to your db details
```
 "env": {
      "PORT": 4000,
      "User": "postgres",
      "Host": "localhost",
      "Database": "postgres",
      "Password": "",
      "DBPort": "5432"
    }
```