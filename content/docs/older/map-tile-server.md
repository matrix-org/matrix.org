+++
title = "Self-hosting a map tile server for location sharing"
extra.author = "Andy Balaam"
aliases = ["/docs/guides/map-tile-server"]
+++

Thanks to
[MSC3488](https://github.com/matrix-org/matrix-doc/blob/matthew/location/proposals/3488-location.md),
the ability to share your location is coming soon to various Matrix clients,
including FluffyChat (which has had this for some time) and Element.

When we are sharing information about our location, we need to be
extra-cautious that it is kept private.  Because Matrix provides robust,
publicly-audited end-to-end encryption, we can be confident when we share a
location, that the message we are sending is only going to be readable for
the people in the room.

In addition to the messages we are sending, though, we need to consider other
ways our information might leak out.  In particular, when we are drawing maps
on the screen, we need to talk to an additional server to fetch the map
information, and the sections of map we are looking for (known as 'tiles')
can reveal our approximate location if they get into the wrong hands.

Element is funding the hosting of a tile server that will be used by default
by the Element clients, and will not share information with your homeserver,
meaning that there is separation between the people who see which tiles are
being requested, and the people who have access to metadata like the pattern
of your Matrix activity.

But Matrix is all about giving you control over your own information and
infrastructure, so here is a guide that will help you enjoy fully-featured
location sharing in the Element client, while ensuring that all the tile
requests go to servers that you control.

We will describe how to run
[OSM tile server stack](https://github.com/Overv/openstreetmap-tile-server),
and how to add the config Element needs to use it to display maps.

## Not production ready

Note: this is not a guide on how to host a robust, production-ready map tile
server for many users. To do that you will need serious hardware, and further
research on how to provide high availability, monitoring and everything else
you will need in your own hosting environment.

This guide should give you the information you need to run a tile server
locally, so you can begin learning what you need to bring one up in production.

(For a little more of what you will need for production-readiness, see
[Self-Host a Matrix Map Server](https://wrily.foad.me.uk/self-host-a-matrix-map-server),
which includes some ansible scripts and hardware requirements.)

## Prerequisites

This guide is built on [Docker](https://www.docker.com/get-started), so you
will need an environment that supports Docker, or a compatible container
engine.

The setup below was tested on a modern (2022) laptop running Ubuntu Linux
21.10, but should run fine on any Docker-compatible Linux, and maybe even
elsewhere. For production use by large numbers of users, you will need very
powerful machines, and lots of bandwidth.

All the map information we use below is freely available under open licenses
from [OpenStreetMap](https://www.openstreetmap.org) and
[Geofabrik](http://download.geofabrik.de/), and we think what we recommend
complies with their terms of use - please let us know if not!

## Running the tile server

The [OSM tile server stack](https://github.com/Overv/openstreetmap-tile-server)
is a map tile server that provides tiles via HTTP, and provides a simple web UI
to browse the map data:

<iframe
    width="560"
    height="315"
    src="https://www.youtube.com/embed/gngwBZc8lYE"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
></iframe>

### Download the raw data

In order to run a tile server, we need some map data, that we will then process
and provide as map tiles.  (Tiles are images of a particular area of the map,
whereas the raw data contains the exact locations of roads, buildings etc.)

You can download map data (PBF files) from
[download.geofabrik.de](http://download.geofabrik.de/).  For example, to
download data for the UK, run this command:

```sh
wget 'https://download.geofabrik.de/europe/great-britain-latest.osm.pbf'
```

### Import it

Once we have the data, we need to import it into the tile server. Run these
commands:

(Change "great-britain" to match what you downloaded.)

```sh
docker volume create openstreetmap-data
docker volume create openstreetmap-rendered-tiles
docker run \
    -v $PWD/great-britain-latest.osm.pbf:/data.osm.pbf \
    -v openstreetmap-data:/var/lib/postgresql/12/main \
    -v openstreetmap-rendered-tiles:/var/lib/mod_tile \
    -e THREADS=24 \
    overv/openstreetmap-tile-server:1.3.10 \
    import
```

This expects the downloaded PFB file to be in the current directory, and saves
the imported data into the two docker volumes created by the first two
commands.

The import process may take quite a while. On a reasonably powerful 2022 laptop
the UK data took 39 minutes to import.

If you are running your tile server as a service, you will probably want to
automate the process of downloading new data and importing it. Updating should
involve re-running the download command from "Download the raw data", then
re-running the `import` command above.

### Run the tile server

Once the data has been imported, you can run your server like this:

```sh
docker run \
    -p 8080:80 \
    -v openstreetmap-data:/var/lib/postgresql/12/main \
    -v openstreetmap-rendered-tiles:/var/lib/mod_tile \
    -e THREADS=24 \
    -e ALLOW_CORS=enabled \
    -d overv/openstreetmap-tile-server:1.3.10 \
    run
```

This should launch the docker container in the background, which you can check
with `docker ps`.

### Test it

Once the server is running, you can grab a single file by going to
[http://127.0.0.1:8080/tile/0/0/0.png](http://127.0.0.1:8080/tile/0/0/0.png),
or interact with the web UI at
[http://127.0.0.1:8080](http://127.0.0.1:8080).

When you first start the service, it will take a lot of CPU and be quite
unresponsive, but after a few minutes it should perform reasonably smoothly.

## Providing the JSON file the client needs

Once the tile server is running, we need to provide the config so that Element
(and any similar clients) can use it.

Element uses the [MapLibre GL](https://maplibre.org/) library to render maps,
and MapLibre requires a style file that describes how to find map tiles.
Here's how it looks:

<iframe
    width="560"
    height="315"
    src="https://www.youtube.com/embed/_c-V_kvIVj8"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
></iframe>

The style file is quite simple. To describe a tile server on this machine,
we need to create a file `style.json` like this:

<!-- markdownlint-disable line-length -->
```json
{
  "version": 8,
  "sources": {
    "localsource": {
      "type": "raster",
      "tiles": [
        "http://127.0.0.1:8080/tile/{z}/{x}/{y}.png"
      ],
      "tileSize": 256,
      "attribution": "Maps Copyright 2022 &lt;a href=\"http://www.geofabrik.de/\"&gt;Geofabrik GmbH&lt;/a&gt; and &lt;a href=\"http://www.openstreetmap.org/\"&gt;OpenStreetMap Contributors&lt;/a&gt;"
    }
  },
  "layers": [
    {
      "id": "locallayer",
      "source": "localsource",
      "type": "raster"
    }
  ]
}
```
<!-- markdownlint-enable line-length -->

We need this file to be served up by the tile server, but that is easily done
by slightly modifying the command we use to run it.

First stop your tile server.  Use `docker ps` to find the CONTAINER ID of your
tile server, then use `docker kill <CID>` (substituting in the CONTAINER ID
instead of `<CID>`) to stop it.

Now re-launch the tile server, asking it to serve up our style file as well:

```sh
docker run \
    -p 8080:80 \
    -v $PWD/style.json:/var/www/html/style.json \
    -v openstreetmap-data:/var/lib/postgresql/12/main \
    -v openstreetmap-rendered-tiles:/var/lib/mod_tile \
    -e THREADS=24 \
    -e ALLOW_CORS=enabled \
    -d overv/openstreetmap-tile-server:1.3.10 \
    run
```

(Notice the extra line mentioning `style.json`.  This assumes `style.json` is
in the current directory.)

Now if I edit the config of my Element client to point to that style file,
it will use our tile server to display its maps.

If you are self-hosting Element Web, you can add this to the top level of its
`config.json` file:

```json
{
   ... other config ...
   "map_style_url": "http://127.0.0.1:8080/style.json",
   ... other config ...
}
```

Also, if you run a home server, the Element client will prefer a tile server
you specify in your `.well-known` area over its own config setting.  You should
serve up a file from your server root called `/.well-known/matrix/client`
containing information like this:

```json
{
  ... other info ...
  "m.tile_server": {
    "map_style_url": "http://mytileserver.example.com/style.json"
  }
  ... other info ...
}
```

Once you have one of those settings in place, your Element client should use
your very own tile server every time it displays a map!

## Further reading and acknowledgements

julian posted an excellent guide building on this one, which includes ansible
scripts and some comments on the hardware needed:

* [Self-Host a Matrix Map Server](https://wrily.foad.me.uk/self-host-a-matrix-map-server)

This guide was constructed by reading the following links. Credit and thanks
are due to their authors:

* [Switch2OSM - The Basics](https://switch2osm.org/the-basics/) - explanation
  of some of the concepts
* [Switch2OSM - serving tiles using a Docker container](https://switch2osm.org/serving-tiles/using-a-docker-container)
    * the basis for most of the information in "Running the tile server" above
* [openstreetmap-tile-server README](https://github.com/Overv/openstreetmap-tile-server/blob/master/README.md)
    * lots of further detail on how to run the tile server

Some other useful links:

* [Location Guard Firefox Plugin](https://addons.mozilla.org/en-US/firefox/addon/location-guard/)
    * allows setting a hard-coded location instead of sharing your real location.
* [Implementing Vector Tile Support in Libshumate](https://www.jwestman.net/2021/11/08/implementing-vector-tile-support-in-libshumate.html)
    * explanation of some of the key ideas from James Westman
