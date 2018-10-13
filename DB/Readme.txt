This folder contains DB files in JSON Format.

Note: Please run below command on your cmd in mongoDB bin folder for your database dump.



For export the database      mongoexport --db dbname --collection collectionname --out  contacts.json
For import to database       mongoimport --db dbname --collection collectionname --file contacts.json
      


     for data dump mongodump --out path/app/DB
