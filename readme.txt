First install all packages required to run the app 
to do that run : "npm i" in cmd.

To run the app type : "node app.js" in cmd and press enter

The app will start running then fetch data from youtube api and store at mongodb cloud database .

Routes : 

GET http://127.0.0.1:3000/videos

for getting the data from mongodb in pagination form by default page is 1 and limit = 5

To alter the page send with query eg :  ?page=2&limit=10 

Eg : 

GET http://127.0.0.1:3000/videos?page=3&limit=10

to find the required title query. eg : ?title=live cricket

the data is default sorted at descending oreder of publishedAt field .


