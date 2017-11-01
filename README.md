# BAYZYEN

## Servers

Each instance of Bayzyen is run on a different EC2 container: p66.demo & us.demo. The node application is run under [forever](https://www.npmjs.com/package/forever) which re-starts the application in case of failure.

To access the server create an access key or use server.pem. SSH into the machine by looking up its Public DNS in the [console](https://us-east-2.console.aws.amazon.com/ec2/v2/home?region=us-east-2#Instances:sort=desc:instanceId). For p66, for example:

`%> ssh ubuntu@ec2-18-221-58-76.us-east-2.compute.amazonaws.com -i server.pem`

The application is being run under ~/2da-bayzyen-server. From that directory you have access to the following commands:

```sh
%> forever logs 0 # read logs
%> forever stop 0 # stop the 0th process, aka our application
%> NODE_ENV=p66 forever start start.js # set the NODE_ENV to get the correct database configuration
```

## Importing data into the database

You can seamlessly pull down the latest CSVs from S3:

`%> aws s3 sync s3://data.bayzyen.com seed`

We are using [flyway](https://flywaydb.org) to maintain database migrations. You will have to change flyway.conf to point to the appropriate database.

You can find the URI for each database in the [RDS section](https://us-east-2.console.aws.amazon.com/rds/home?region=us-east-2#dbinstances:) in the console. For p66, for example:

`p66.cczrjcntqihi.us-east-2.rds.amazonaws.com:5432\p66`

Commands are:

```sh
%> flyway clean
%> flyway migrate
```

When you want to populate or re-populate a database run those commands first. Then:

```sh
%> NODE_ENV=p66 node seed/seed.js --directory p66
%> NODE_ENV=p66 node seed/import_segments.js
```

This will use the seed/p66 directory to load CSVs and import them into the database. Importing segment coordinates is a little different. These are loaded from a segments.txt file because of the coordinates format.
