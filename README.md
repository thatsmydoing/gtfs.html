# gtfs.html

This project aims to build tools to help create and maintain [GTFS][1] feeds. At
the moment, we can visualize and explore a GTFS feed loaded entirely in the
browser. No server component is needed. Because of limitations of doing
everything in the browser however, big GTFS files will generally not work.

## Build

The project is built using npm and webpack. Assuming you have npm installed,

    npm install
    npm start

will start a local development server on `http://localhost:8080`.

[1]: http://gtfs.org
