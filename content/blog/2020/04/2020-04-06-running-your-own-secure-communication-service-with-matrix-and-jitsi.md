+++
title = "Running your own secure communication service with Matrix and Jitsi"
path = "/blog/2020/04/06/running-your-own-secure-communication-service-with-matrix-and-jitsi"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["General"]

[extra]
image = "https://matrix.org/blog/img/runthru.jpg"
+++

Hi all,

Over the last few weeks there's been huge increase in interest from folks
wanting the security and autonomy of running their remote collaboration
services, rather than being at the mercy of traditional proprietary
centralised apps.  Meanwhile, the Matrix.org homeserver has been very
overloaded (although we're at last making excellent progress in radically
improving Synapse's performance) - so it's particularly important right now to
help folks run their own servers.

Therefore we're very happy to announce that it's easier than ever before now to
self-host your own video conferencing alongside Riot & Synapse: as of Riot/Web
1.5.15 (released last week), it's now a single config option to point Riot at
a specific Jitsi rather than needing to hook up to an integration manager!

Meanwhile, over the last 18 months, it's got easier and easier to run your
own Matrix deployments: the Debian packages are unrecognisably better now, and
with `.well-known` URL support it's trivial to set up federation without
needing to worry about complicated DNS, TLS or load balancer configurations.

So, to try to show off just how smooth this has become, we thought we'd do a
run-through video showing installing Synapse, Riot & Jitsi on a completely
fresh Debian install.  It's (almost) filmed in a single shot, and takes about
20 minutes from beginning to end.

Please note that this does assume you're pretty familiar with Linux system
administration.  If you're not, then we'd recommend using a Matrix hosting
provider such as [Modular.im](https://modular.im) (which directly supports development of the core team),
[Ungleich.ch](https://ungleich.ch/u/products/hosted-matrix-chat/), or [StartupStack](https://startupstack.tech/).

Finally, while the video shows how to install on Debian via Debian packages,
there are many many other environments and architectures (e.g. installing
under Docker) - this is just one relatively easy way to skin the cat.  Perhaps
there will be other 'speed-run' videos in future :)

{{ youtube_player(video_id="dDddKmdLEdg") }}

If you want to follow along at home without listening to the video (and I can't blame you if you do ;) the high level steps are as follows:

### Debian & DNS

* Take one fresh Debian 10 install.
* Point the DNS for your domain to it.  You should use separate subdomains for the various services as a hygiene measure to make cross-site scripting attacks less effective.  In this example, we set up DNS for:
    * `dangerousdemos.net` (general website, and for hosting a .well-known path to advertise the Matrix service)
    * `matrix.dangerousdemos.net` (Synapse)
    * `riot.dangerousdemos.net` (Riot/Web)
    * `jitsi.dangerousdemos.net` (Jitsi video conferencing)
    * In practice, we used a `*.dangerousdemos.net` wildcard DNS record for the three subdomains in this instance.

### Nginx and LetsEncrypt

* Install nginx as a webserver: `apt-get update && apt -y install nginx`
* Go to `/etc/nginx/sites-enabled` and copy the vhost configuration block from the bottom of `default` to new files called `dangerousdemos.net`, `matrix.dangerousdemos.net`, and `riot.dangerousdemos.net`.  We don't set up `jitsi.dangerousdemos.net` at this point as the jitsi installer handles it for us.
    * Rename the `server_name` field in the new files to match the hostname of each host, and point `root` to an appropriate location per domain (e.g. `/var/www/dangerousdemos.net` for the main domain, or `/var/www/riot.dangerousdemos.net/riot` for riot)
    * For the Synapse domain (`matrix.dangerousdemos.net` here), you should replace the contents of the `location` block with `proxy_pass http://localhost:8008;` - telling nginx to pass the traffic through to synapse, which listens by default for plaintext HTTP traffic on port 8008.  (N.B. do **not** put a trailing slash on the URL here, otherwise nginx will mangle the forwarded URLs.)
* Enable TLS via LetsEncrypt on nginx, by: `apt install -y python3-certbot-nginx && certbot --nginx -d dangerousdemos.net -d riot.dangerousdemos.net -d matrix.dangerousdemos.net` (or whatever your domains are).
* You should be able to go to <https://dangerousdemos.net> at this point and see a page with valid HTTPS.

### Synapse

* Then, install Synapse via Debian packages using the instructions at <https://github.com/matrix-org/synapse/blob/master/INSTALL.md#debianubuntu> (see below).  If you're not on Debian, keep an eye out for all the other OSes we support too!
    * You should specify the server name to be the domain you want in your matrix IDs - i.e. `dangerousdemos.net` in this example.
    * Please report anonymous aggregate stats to us so we can gauge uptake and help justify funding for Matrix!

```bash
sudo apt install -y lsb-release wget apt-transport-https
sudo wget -O /usr/share/keyrings/matrix-org-archive-keyring.gpg https://packages.matrix.org/debian/matrix-org-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/matrix-org-archive-keyring.gpg] https://packages.matrix.org/debian/ $(lsb_release -cs) main" |
    sudo tee /etc/apt/sources.list.d/matrix-org.list
sudo apt update
sudo apt install matrix-synapse-py3
```

* You should now be able to go to <https://matrix.dangerousdemos.net> and see a valid "It works! Synapse is running" page.
* Then, you should enable registration on your synapse by switching `enable_registration: true` in `/etc/matrix-synapse/homeserver.yaml` and restarting synapse via `systemctl restart matrix-synapse`.

* Now you need to tell the rest of Matrix how to find your server.  The easiest way to do this is to publish a file at <https://dangerousdemos.net/.well-known/matrix/server> which tells everyone the hostname and port where they can find the synapse for dangerousdemos.net - in this instance, it's `matrix.dangerousdemos.net:443`:

```bash
mkdir -p /var/www/dangerousdemos.net/.well-known/matrix
cd /var/www/dangerousdemos.net/.well-known/matrix
echo '{ "m.server": "matrix.dangerousdemos.net:443" }' > server
```

* **Alternatively**, you could advertise the server via DNS, if you don't have write access to `/.well-known` on your main domain.  However, to prove you are allowed to host the Matrix traffic for dangerousdemos.net, you would have to configure nginx to use the dangerousdemos.net TLS certificate for the matrix.dangerousdemos.net vhost (i.e. the "wrong" one), and in general we think that `/.well-known` is much easier to reason about.  In this case you would advertise the server with an SRV record like this:

```txt
_matrix._tcp.dangerousdemos.net. 300    IN  SRV 10 5 443 matrix.dangerousdemos.net.
```

### Riot/Web

* Then, install Riot/Web.  Grab the latest .tgz release from <https://github.com/vector-im/riot-web/releases>.  You should check its GnuPG signature too:

```bash
mkdir /var/www/riot.dangerousdemos.net
cd /var/www/riot.dangerousdemos.net
wget https://github.com/vector-im/riot-web/releases/download/v1.5.15/riot-v1.5.15.tar.gz

# check its GnuPG signature (particularly advisable, given Riot is what stores
# your end-to-end encryption keys)
apt install -y gnupg
wget https://github.com/vector-im/riot-web/releases/download/v1.5.15/riot-v1.5.15.tar.gz.asc

# grab the signing key for the riot releases repository, ideally from a keyserver...
gpg --keyserver keyserver.ubuntu.com --search-keys releases@riot.im

# ...and/or you can grab or cross-check the signing key from packages.riot.im
wget https://packages.riot.im/riot-release-key.asc
gpg --import riot-release-key.asc

gpg --verify riot-v1.5.15.tar.gz.asc
# hopefully this will report "Good signature", even though it won't know to trust the riot release key.

# you could also choose to explicitly trust the key by editing it, entering 'trust' and then '5' for ultimate trust.
gpg --edit-key 74692659bda3d940

tar -xzvf riot-v1.5.15.tar.gz
ln -s riot-v1.5.15 riot
chown www-data:www-data -R riot
cd riot
cp config.sample.json config.json
```

* You then tweak the `config.json` to change the `base_url` of the homeserver to be `https://matrix.dangerousdemos.net` (i.e. where to find the Client Server API for your server), and change the `server_name` to be `dangerousdemos.net` (i.e. the name of your server).
* You should then be able to go to <https://riot.dangerousdemos.net>, register for an account, sign in, and talk to the rest of Matrix!

### Jitsi

* Finally, we install Jitsi so you can run your own video conferencing.  We take the instructions from [Jitsi's quick install guide](https://github.com/jitsi/jitsi-meet/blob/master/doc/quick-install.md):

```bash
echo 'deb https://download.jitsi.org stable/' >> /etc/apt/sources.list.d/jitsi-stable.list
wget -qO -  https://download.jitsi.org/jitsi-key.gpg.key | sudo apt-key add -
apt-get update
apt-get -y install jitsi-meet
```

* We give the installer the hostname `jitsi.dangerousdemos.net`.  **Make sure this DNS is already set up, otherwise the installer will fail!**
* The installer magically detects you have nginx installed and adds in an appropriate vhost!
* We select a self-signed certificate for now, and then upgrade it to LetsEncrypt after the fact with `/usr/share/jitsi-meet/scripts/install-letsencrypt-cert.sh`.
    * Alternatively, you could have specified manual certificates, and then used `certbot` alongside the rest of nginx to create a certificate for `jitsi.dangerousdemos.net` - both work.
* You should now be able to go to <https://jitsi.dangerousdemos.net> and use the Jitsi directly.

* Finally, and this is the cool new bit: you can now point Riot to use the new Jitsi by going to its config.json at `/var/www/riot.dangerousdemos.net/riot/config.json` and changing the `preferredDomain` of the `jitsi` block from `https://jitsi.riot.im` to your own self-hosted `https://jitsi.dangerousdemos.net`.
* You then refresh your Riot/Web, and you should be all set to use Jitsi from within your new Riot - as Riot/Web 1.5.15 and later has the ability to natively embed Jitsi straight into the app without needing to use an integration manager.

### Conclusion

Matrix nowadays provides an excellent alternative to the centralised solutions.  It gives:

* Full autonomy over how to host and store your own conversations
* Full freedom to talk to anyone else on the wider global Matrix network (or indeed anyone else bridged into Matrix)
* Full privacy via full end-to-end-encryption for chats, file transfer and 1:1 voice/video calls (when enabled)
* Full transparency by being 100% open source (as well as benefiting from the overall open source community)

Hopefully this gives some confidence that it's pretty easy to run your own fully functional Matrix instance these days.
If not, then hopefully someone will do a similar one to show off Docker!
And if that's still too scary, please take a look at a hosting services like [Modular.im](https://modular.im).

(Comments over at [HN](https://news.ycombinator.com/item?id=22793239) and [here too](https://news.ycombinator.com/item?id=22802645))
