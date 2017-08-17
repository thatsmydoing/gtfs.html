# gtfs.html

This project aims to build tools to help create and maintain [GTFS][1] feeds. At
the moment, we can visualize and explore a GTFS feed loaded entirely in the
browser. Because of limitations of doing everything in the browser however, big
GTFS files will generally not work.

## Build

The project is built using npm and webpack. Assuming you have npm installed,

    npm install
    npm start

will start a local development server on `http://localhost:8080`.

## GTFS Live Reload Server

There is an optional server component which lets you watch a folder containing
an unzipped GTFS feed and live reload whenever changes are made.

    npm run server -- ../gtfs 8080

Will start a local development server on `http://localhost:8080` that will load
the gtfs feed at `../gtfs` and will live reload whenever something is changed.

Note that this does not mitigate big GTFS feed issues since the implementation
is very crude at the moment.

[1]: http://gtfs.org
