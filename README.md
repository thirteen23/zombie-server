# BAYZYEN

## Importing data into the database

We are using [flyway](https://flywaydb.org) to maintain database migrations. Commands are:

```sh
%> flyway clean
%> flyway migrate
```

When you want to populate or re-populate a database. Run those commands first. Then:

```sh
%> node seed/seed.js --directory p66
%> node seed/import_segments.js
```

This will use the seed/p66 directory to load CSVs and import them into the database. Importing segment coordinates is a little different. These are loaded from a segments.txt file because of the coordinates format.
