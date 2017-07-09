import React from 'react';

export default function About() {
  return (
    <div>
      <h1>GTFS.html</h1>
      <p>This website lets you view and explore the contents of a <a
          href="http://gtfs.org">GTFS</a> file right in your browser.
        Simply drop a GTFS file into the area below to open it. You can
        also click the area to select a file from your computer.
      </p>
      <p>All data is loaded locally in the browser, the GTFS file is not
        uploaded anywhere. Because everything is local, the site cannot
        handle large GTFS files. If your browser stops responding or
        crashes, it might be too big.
      </p>
      <p>You can find GTFS files from <a href="http://transitfeeds.com/">
          TransitFeeds</a>. Alternatively, you can use some feeds we maintain: <a href="/pnr-gtfs.zip">PNR GTFS</a> and <a href="/rail-gtfs.zip">Philippine Rail GTFS</a>.
      </p>
      <p>This is still a work in progress. I already find it useful for my
        needs, and I wanted to see if other people might find it helpful.
        If you run into a bug or want to request a feature, please make an <a
          href="https://github.com/thatsmydoing/gtfs.html/issues">issue
          here</a>. You can also contribute and play with the <a
          href="https://github.com/thatsmydoing/gtfs.html">source code</a>.
      </p>
    </div>
  )
}
