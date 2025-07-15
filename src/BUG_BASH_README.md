To test out the Neon Local Connect vscode extension: 

- create a .env with the following fields in it

PORT=3000

- There are currently 2 different versions of the db.js file, one that uses the postgres driver and one that uses the Neon serverless driver. To test each driver you can rename whichever file you want to use as "db.js" and start up the vscode extension in your desired mode to test it. 

- Just make sure that the port that you have specified in the db.js file matches the port you have selected in the vscode extension.