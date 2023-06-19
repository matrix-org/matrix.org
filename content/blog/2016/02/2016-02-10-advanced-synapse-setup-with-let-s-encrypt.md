+++
title = "Advanced Synapse setup with Let's Encrypt"
path = "/blog/2016/02/10/advanced-synapse-setup-with-let-s-encrypt"
aliases = ["/blog/2016/02/10/advanced-synapse-setup-with-lets-encrypt"]

[taxonomies]
author = ["David Baker"]
category = ["General"]
+++

So, you've installed an configured synapse and started chatting from your very own Matrix home server? What's the next step? Well, right now you're probably accessing your new home server over plaintext HTTP, which is bad, particularly because you'll be sending your password over this connection when you log in. You could connect to Synapse's secure HTTP port, but your browser won't trust it by default because you'd normally need to pay for a certificate that your browser would recognise. That is, until recently!

<a href="https://letsencrypt.org/" target="_blank">Let's Encrypt</a> is a new initiative that issues SSL certificates free of charge, in an effort to make SSL universal on the Internet. In this blog post, we'll be walking through an example of how we can use this service to get ourselves a securely hosted Synapse.

We're going to assume you have a Synapse installed and listening on the standard ports, 8008 and 8448. If not, follow the <a href="https://github.com/matrix-org/synapse/blob/master/README.rst" target="_blank">Synapse README</a> and come back here when you're done. Everybody ready? Okay, good.

So, in order to get a certificate from Let's Encrypt, we need to prove that we own our domain. The simplest way to do this is to host some special files on our web server. Now, Synapse won't do this. We could use a separate web server, but then we'd have to stop Synapse and start the other web server every time we renewed our certificate, and that means downtime. Instead, let's put our Synapse behind a proper web server and let that serve the files. This has added advantages, including that we can host our Matrix home server on the standard port 443 without having to run Synapse as root.

For this example, we're going to use NGINX, so start by installing NGINX in whatever way your Linux distribution of choice recommends.

Now, you should have a webroot for your new web server somewhere. Hopefully your helpful Linux distribution has started you off with a config file - let's see:
<pre># nano /etc/nginx/nginx.conf
</pre>
We're looking for the 'server' section of that file. We need to make it look something like this:
<pre>    server {'{'}
        # Make sure this is 0.0.0.0: no use listening on 127.0.0.1 or we'll only be
        # serving to ourselves! There's no port here, which means we'll listen on
        # port 80
        listen 0.0.0.0;

        server_name example.com www.example.com;

        access_log /var/log/nginx/example.com.access_log main;
        error_log /var/log/nginx/example.com info;

        # This is where we put the files we want on our site
        root /var/www/examplecom/htdocs;

        # Here's where it gets interesting: This will send any path that starts
        # with /_matrix to our Synapse!

        location /_matrix {'{'}
            proxy_pass http://localhost:8008;
        {'}'}
    {'}'}
</pre>
When you're happy with the look of that file, let's restart the server:
<pre># nginx -s reload
</pre>
<p class="p1">Before we go any further, let's test our new configuration:</p>

<pre>$ curl http://example.com/_matrix/key/v2/server/auto
{'{'}"old_verify_keys":{'{'}{'}'},"server_name":"example.com","signatures":{'{'}"example.com":{'{'}"ed25519:auto":"RWb+w6vHUUokoDgElwG6Cg50ezZvBrzXtJmJIH8jEwI5x0JQ7prn3FwjhbgKTH5jE7J8Ily3HEc4COn4JCCvCA"{'}'}{'}'},"tls_fingerprints":[{'{'}"sha256":"DMbzSZ5Uj7/6p/RT/UtQYJLHm5o0TwBSVYXsqpDdVDs"{'}'}],"valid_until_ts":1455203001035,"verify_keys":{'{'}"ed25519:auto":{'{'}"key":"1YiTDjmE86AlmrbIYE2lyqauV9wPo8jw2kxZAZFfl/Q"{'}'}{'}'}{'}'}
</pre>
<p class="p1">Those are your server's public keys! Now we have a web server running, we can get our SSL certificate. Let's Encrypt have their own client which will automate everything including rewriting your NGINX config file, however that means it has a large number of dependencies and needs to be run as root. For this example, we're going to use the much simpler <a href="https://github.com/diafygi/acme-tiny" target="_blank">acme_tiny.py</a>. I'm going to assume you have a user called, 'letsencrypt', so, as root, let's set up the place for it to write its challenge files:</p>

<pre># mkdir /var/www/examplecom/htdocs/.well-known/acme-challenge
# chown letsencrypt:users /var/www/examplecom/htdocs/.well-known/acme-challenge
</pre>
<p class="p1">Now let's switch to our letsencrypt user:</p>

<pre>$ ssh letsencrypt@example.com
</pre>
<p class="p1">We'll start by getting ourselves a copy of acme_tiny.py:</p>

<pre>$ git clone https://github.com/diafygi/acme-tiny.git
</pre>
<p class="p1">Now let's set up a directory structure (let's say we might want to manage more than one domain someday):</p>

<pre>$ mkdir examplecom
$ cd examplecom
$ ln -s /var/www/examplecom/htdocs/.well-known/acme-challenge challenges
</pre>
<p class="p1">Now, we'll need to generate two keys for Let's Encrypt, and account key and a domain key. The former is what we use to identify ourselves to Let's Encrypt and the latter is the key we use to do the actual SSL.</p>

<pre>$ openssl genrsa 4096 &gt; letsencrypt_examplecom_account.key
Generating RSA private key, 4096 bit long modulus
..++
.................................................................................................................................................................................................................................................................................................................................................................................................................++
e is 65537 (0x10001)
$ chmod 600 letsencrypt_examplecom_account.key
$ openssl genrsa 4096 &gt; letsencrypt_examplecom_domain.key
Generating RSA private key, 4096 bit long modulus
.............++
.............................................................................................................................................................................................++
e is 65537 (0x10001)
$ chmod 600 letsencrypt_examplecom_domain.key
</pre>
<p class="p1">Now, store those keys somewhere safe! After you've done that, let's generate a certificate request for our domain. Note that we're requesting one for both example.com and www.example.com: this isn't strictly necessary for Matrix but could be useful if we want to host a website too.</p>

<pre>$ openssl req -new -sha256 -key letsencrypt_examplecom_domain.key -subj "/" -reqexts SAN -config &lt;(cat /etc/ssl/openssl.cnf &lt;(printf "[SAN]\\nsubjectAltName=DNS:example.com,DNS:www.example.com")) &gt; examplecom.csr
</pre>
<p class="p1">Okay, we have our keys, our certificate request, and somewhere to host our challenge files, so we're ready to request a certificate! Be careful about this part and make sure you've got everything right, because Let's Encrypt enforce strict rate limits on the number of certificates you can request for one domain. Here we go:</p>

<pre>$ python ~/acme-tiny/acme_tiny.py --account letsencrypt_examplecom_account.key --csr examplecom.csr --acme-dir challenges/ &gt; examplecom.crt
Parsing account key...
Parsing CSR...
Registering account...
Registered!
Verifying example.com...
example.com verified!
Verifying www.example.com...
www.example.com verified!
Signing certificate...
Certificate signed!
</pre>
<p class="p1">Is that it, did it work? Well, let's see:</p>

<pre>$ openssl x509 -in examplecom.crt -noout -text
Certificate:
    Data:
        Version: 3 (0x2)
        Serial Number:
            01:02:22:77:02:1b:eb:d5:3d:c3:14:6d:87:43:22:3d:fc:0f
    Signature Algorithm: sha256WithRSAEncryption
        Issuer: C=US, O=Let's Encrypt, CN=Let's Encrypt Authority X3
        Validity
            Not Before: Feb  6 21:37:00 2016 GMT
            Not After : May  6 21:37:00 2016 GMT
        Subject: CN=example.com
        Subject Public Key Info:
[etc]
</pre>
<p class="p1">Congratulations, you have an official, signed certificate for your domain! Now, before we can use it, we need to add the Let's Encrypt certificate to it, because our web server needs to send both:</p>

<pre>$ wget https://letsencrypt.org/certs/lets-encrypt-x3-cross-signed.pem
--2016-02-06 23:38:55--  https://letsencrypt.org/certs/lets-encrypt-x3-cross-signed.pem
Resolving letsencrypt.org... 23.66.17.98, 2a02:26f0:60:489::2a1f, 2a02:26f0:60:481::2a1f
Connecting to letsencrypt.org|23.66.17.98|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 1675 (1.6K) [application/x-x509-ca-cert]
Saving to: ‘lets-encrypt-x3-cross-signed.pem'
lets-encrypt-x3-cross-signed.pe 100%[======================================================&gt;]   1.64K  --.-KB/s   in 0s
2016-02-06 23:38:55 (61.5 MB/s) - ‘lets-encrypt-x3-cross-signed.pem' saved [1675/1675]
$ cat examplecom/examplecom.crt lets-encrypt-x3-cross-signed.pem &gt;examplecom/examplecom_cert_chain.crt
</pre>
<p class="p1">Now's let's symlink it in place, along with the domain key, so we can renew it easily later. We'll need to be root again for this:</p>

<pre>$ ssh root@example.com
# ln -s /home/letsencrypt/examplecom/examplecom_cert_chain.crt /etc/ssl/nginx/examplecom_cert.pem
# ln -s /home/letsencrypt/examplecom/letsencrypt_examplecom_domain.key /etc/ssl/nginx/examplecom_key.pem
</pre>
<p class="p1">Now, one more crucial thing we have to do before using our SSL is to give NGINX some Diffie Hellman parameters. This is a good thing to do for any SSL configuration (it will increase your score on <a href="https://www.ssllabs.com/ssltest/" target="_blank">SSL Labs</a>) but it's absolutely crucial for us because Synapse will only negotiate forward secret connections, so otherwise other Matrix home servers will refuse to talk to us! (Technically, Synapse also support elliptic curve Diffie Hellman, which doesn't need DH parameters, but not all Synapses will support this.) You'll already have some Diffie Hellman parameters from you existing Synapse, so you could use them:</p>

<pre># cp /home/synapse/synapse/matrix.example.com.tls.dh /etc/ssl/nginx/examplecom_dhparams.pem
</pre>
<p class="p1">...or you can generate your own. You'll probably want to do this on your desktop or laptop if you have OpenSSL installed, it will be much faster:</p>

<pre>$ openssl dhparam -out examplecom_dhparams.pem 2048
Generating DH parameters, 2048 bit long safe prime, generator 2
This is going to take a long time
........................................................+................[etc, etc]
$ scp examplecom_dhparams.pem root@example.com:/etc/ssl/nginx/examplecom_dhparams.pem
</pre>
<p class="p1">Now, let's get our new certificate in action! Open up your NGINX config file again, and add another server block that look like this:</p>

<pre>    server {'{'}
        listen 0.0.0.0:443;
        server_name example.com www.example.com;
        ssl on;
        ssl_certificate /etc/ssl/nginx/examplecom_crt.pem;
        ssl_certificate_key /etc/ssl/nginx/examplecom_key.pem;
        ssl_dhparam /etc/ssl/nginx/examplecom_dhparams.pem;
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
        ssl_prefer_server_ciphers on;
        # mozilla intermediate list, jan 2016
        ssl_ciphers "ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-DSS-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-DSS-AES128-SHA256:DHE-RSA-AES256-SHA256:DHE-DSS-AES256-SHA:DHE-RSA-AES256-SHA:ECDHE-RSA-DES-CBC3-SHA:ECDHE-ECDSA-DES-CBC3-SHA:EDH-RSA-DES-CBC3-SHA:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:AES128-SHA:AES256-SHA:AES:CAMELLIA:DES-CBC3-SHA:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!aECDH:!EDH-DSS-DES-CBC3-SHA:!KRB5-DES-CBC3-SHA";
        ssl_session_cache shared:SSL:50m;
        access_log /var/log/nginx/examplecom.ssl_access_log main;
        error_log /var/log/nginx/examplecom.ssl_error_log info;
        root /var/www/examplecom/htdocs;
        location /_matrix {'{'}
            proxy_pass http://localhost:8008;
        {'}'}
    {'}'}
</pre>
<p class="p2">It looks pretty similar to our previous server block, except for all that stuff about SSL in the middle. We're pointing NGINX at our certificate, key and Diffie Hellman parameter files and specifying what protocols and ciphers we want our server to talk. The long list here is taken from <a href="https://wiki.mozilla.org/Security/Server_Side_TLS" target="_blank">Mozilla's Server Side TLS guidelines</a> and is their 'Intermediate' list. See that page for more information on what that means, and choose a different list of ciphers if you prefer: just remember we must support at least the ephemeral Diffie Hellman ciphers, or other home servers won't talk to us!</p>
<p class="p2">Now let's restart our NGINX and see if it works:</p>

<pre># nginx -s reload
</pre>
<p class="p2">...and that command again, this time with https:</p>

<pre>$ curl https://example.com/_matrix/key/v2/server/auto
{'{'}"old_verify_keys":{'{'}{'}'},"server_name":"example.com","signatures":{'{'}"example.com":{'{'}"ed25519:auto":"RWb+w6vHUUokoDgElwG6Cg50ezZvBrzXtJmJIH8jEwI5x0JQ7prn3FwjhbgKTH5jE7J8Ily3HEc4COn4JCCvCA"{'}'}{'}'},"tls_fingerprints":[{'{'}"sha256":"DMbzSZ5Uj7/6p/RT/UtQYJLHm5o0TwBSVYXsqpDdVDs"{'}'}],"valid_until_ts":1455203001035,"verify_keys":{'{'}"ed25519:auto":{'{'}"key":"1YiTDjmE86AlmrbIYE2lyqauV9wPo8jw2kxZAZFfl/Q"{'}'}{'}'}{'}'}
</pre>
<p class="p1">Hooray! You should now be able to open a browser to https://example.com/matrix/ and log in securely over SSL!</p>

## Renewing Your Certificate

<p class="p1">Now, there's one important step left, and that's to set up renewal for the certificate, otherwise we'll find our shiny new SSL will stop working in three months time. We can use the same acme_tiny command to do this:</p>

<pre>$ python ~/acme-tiny/acme_tiny.py --account letsencrypt_examplecom_account.key --csr examplecom.csr --acme-dir challenges/ &gt; examplecom.crt
Parsing account key...
Parsing CSR...
Registering account...
Already registered!
Verifying example.com...
example.com verified!
Verifying www.example.com...
www.example.com verified!
Signing certificate...
Certificate signed!
$ wget https://letsencrypt.org/certs/lets-encrypt-x3-cross-signed.pem
--2016-02-06 23:38:55--  https://letsencrypt.org/certs/lets-encrypt-x3-cross-signed.pem
Resolving letsencrypt.org... 23.66.17.98, 2a02:26f0:60:489::2a1f, 2a02:26f0:60:481::2a1f
Connecting to letsencrypt.org|23.66.17.98|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 1675 (1.6K) [application/x-x509-ca-cert]
Saving to: ‘lets-encrypt-x3-cross-signed.pem'
lets-encrypt-x3-cross-signed.pe 100%[======================================================&gt;]   1.64K  --.-KB/s   in 0s
2016-02-06 23:38:55 (61.5 MB/s) - ‘lets-encrypt-x3-cross-signed.pem' saved [1675/1675]
$ cat examplecom/examplecom.crt lets-encrypt-x3-cross-signed.pem &gt;examplecom/examplecom_cert_chain.crt
</pre>
<p class="p1">Synapse will automatically pick up the new certificate, but we'll need to tell NGINX to reload:</p>

<pre># nginx -s reload
</pre>
<p class="p1">Setting up a cronjob to automate this is left as an exercise to the reader!</p>

## Federation behind the HTTP Proxy

<p class="p1">If you like, you can stop reading now: our clients can access our home server securely but other home server are still talking to our Synapse directly on port 8448. This is fine, and if you're happy with this, you can stop reading now. But remember how we made sure other Synapses could talk to our NGINX? Well, why not put federation behind our new web server too?</p>
<p class="p1">Now, we need to do a couple of things to make this work: were you looking carefully at the JSON those curl commands returned? If you were, you might have noticed a key called, 'tls_fingerprints'. Our home server serves up a fingerprint of the TLS certificate its using from this API, and we've just given our web server a different certificate, so we need to give Synapse our new certificate.</p>
<p class="p1">How are we going to tell other home servers to talk to our NGINX instead? Well, ultimately we're going to change our DNS SRV record to point at port 443 instead of port 8448, but that change could take a while to propagate through caches, so let's test it by having our NGINX listen on port 8448 temporarily. We can do this by copying that same block from above, but with a different port:</p>

<pre>    server {'{'}
        listen 0.0.0.0:8448;
        server_name example.com www.example.com;
    [etc]
</pre>
<p class="p2">Don't restart NGINX just yet: we need to tell our Synapse to stop listening on that port first, so lets do that and give it our new certificate:</p>

<pre>$ nano /home/synapse/synapse/homeserver.yaml
</pre>
<p class="p2">Now we'll want to find and edit the following lines:</p>

<pre>tls_certificate_path: "/etc/ssl/nginx/examplecom_crt.pem"
# We can comment this out, as long as we set no_tls to true below
# tls_private_key_path: "/whatever/path/synapse/generated"
# PEM dh parameters for ephemeral keys
tls_dh_params_path: "/whatever/path/synapse/generated"
# Turn off TLS everywhere (this overrides the listeners section below)
no_tls: True
  - port: 8008
    tls: false
    # We can bind to only localhost since only the local nginx needs to hit this
    bind_address: '127.0.0.1'
    type: http
    # Set this so that Synapse obeys nginx's X-Forwarded-For headers, then IP addresses will be correct in Synapse's logs
    x_forwarded: true
    resources:
      - names: [client, webclient]
        compress: true
      - names: [federation]
        compress: false
</pre>
<p class="p2">Note: if you have an old enough config file that you have 'bind_host' and 'bind_port' directives, now is the time to remove them.</p>
<p class="p2">Now let's restart Synapse and our web server to swap over what's listening on our port 8448:</p>

<pre>$ synctl restart
# nginx -s reload
</pre>
<p class="p2">Now let's try that test again on port 8448:</p>

<pre>$ curl https://example.com:8448/_matrix/key/v2/server/auto
{'{'}"old_verify_keys":{'{'}{'}'},"server_name":"example.com","signatures":{'{'}"example.com":{'{'}"ed25519:auto":"bdca31805e4209f6ff4d644251a29d0cb1dc828a4d6131c57cf8305288f337c0"{'}'}{'}'},"tls_fingerprints":[{'{'}"sha256":"1d9ec66599e229654a79f28e26675fdeb585027553af6d581926e821a6b6527c"{'}'}],"valid_until_ts":1455203001035,"verify_keys":{'{'}"ed25519:auto":{'{'}"key":"1YiTDjmE86AlmrbIYE2lyqauV9wPo8jw2kxZAZFfl/Q"{'}'}{'}'}{'}'}
</pre>
<p class="p1">Notice anything different? The tls_fingerprints part has changed because we now have a different certificate. The signatures/example.com/ed25519:auto value has changed too: that's because that part is a signature of the rest of JSON object, so changing the tls_fingerprints has caused this to change too.</p>
<p class="p1">And that's it! If you're happy everything is working, you can then change your DNS SRV record to point at port 443 instead of 8448, then after leaving a few days for the change to propagate through caches, remove the extra server block from your nginx.conf and restart to stop your nginx listening on port 8448.</p>
