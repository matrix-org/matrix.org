+++
date = "2024-01-04T17:00:00Z"
title = "Migrating from EMS to self-hosted Matrix"

[taxonomies]
author = ["Josh Simmons"]
category = ["Guides"]

+++

## Running my own Matrix homeserver

I confess I'm awfully chuffed with myself as we return from the holiday break. I just completed a successful migration of my main Matrix account from managed hosting to a homeserver that I run for myself on a virtual private server (VPS).

The whole experience has been illuminating, and there are some specific details that are timely for people like me who needed to migrate off of Element Matrix Services (EMS) as they pivot to focus on enterprise.

Thus, this blog post. I'm going to share my experience in hopes that it'll help some folks with that migration!

<!-- more -->

## Beware the gotchas

Homeserver migration is a high stakes process, as there's a point past which mistakes will permanently wreck your ability to communicate with other people on the open federation. At that point, the resolution is to create a new account!

The reason it's high stakes is that we're talking about a secure, decentralized system which requires encryption keys to be exchanged, keys which change over time. That, combined with the fact that an EMS homeserver will resume running after it completes your export, means you have to take specific measures to disable interactions with all the accounts on your homeserver during the migration. I've consulted some of the brightest people in the Matrix ecosystem to account for this in my process, so **if you're using this blog post to navigate your own EMS migration, _read very carefully_.**

Migration is typically not this tricky, and the initial setup of a fresh homeserver can be a breeze with the right tools!

The other thing you need to know before you take any of my advice: I'm not a Matrix developer or expert, just a vintage web developer who likes to host some of my own infrastructure for reasons of privacy and flexibility ... and to keep my skills sharp. **This guidance does _not_ stand alone, it only makes sense if you've done your homework and read the documentation of the relevant projects.**

## Get yourself prepared

The specific path to migration I'm following today is moving from EMS to self-hosting with the matrix-docker-ansible-deploy project (which I'll refer to as the "MDAD project" going forward). I found myself reading lots of docs but the two critical starting points are [Element's own migration docs](https://ems-docs.element.io/books/element-cloud-documentation/page/migrate-from-ems-to-self-hosted) and [the MDAD project docs](https://github.com/spantaleev/matrix-docker-ansible-deploy/blob/master/docs/README.md).

I found it very helpful to play with the MDAD project on a fresh machine and an unused domain name. That got me to read the docs and get a feel for things before layering in the complexity of a migration.

I deployed my new Matrix homeserver on a VPS running Ubuntu 22.04, which I was already using to host some other things. All my local work was done by command line on my MacBook. This meant I already had a server with most of the dependencies already in place, and I could readily SSH into it. It also means that I've already got Nginx listening on ports 80 and 443, so I had to get a little creative and dig deeper into the docs to set up [Nginx as a reverse proxy in front of Traefik](https://github.com/spantaleev/matrix-docker-ansible-deploy/blob/master/examples/nginx/README.md).

A few more important facts: EMS runs the Synapse homeserver alongside the matrix-media-repo (MMR) project, I'm doing the same to make this migration possible. And EMS, when I did my export, ran Synapse v1.97 whereas the latest release is v1.98. I confirmed there were no database schema changes between those two versions, so the difference in version number was immaterial, but typically your migration target should be the same version as your export.

This migration will involve some downtime, and a period of low performance. Messages sent in encrypted rooms during that downtime will likely be unreadable, even if you do everything right. Having an alternate account can be useful, or just ask people to resend important messages. In my specific case, with a single-user homeserver that had been active for 13 months, I started my migration at 10am and by 12:30pm I could log back in but things weren't really usable until evening. To be on the safe side, plan for it to take longer.

Since this is a high stakes migration, let's also be clear on the order of operations before we begin. I cannot stress enough how important this is – _read carefully, do not cut corners_.

1. Every user account on your homeserver needs to dedicate a little time to these steps, to ensure their accounts remain usable after the migration:
    1. [Export a Recovery Key](https://ems-docs.element.io/books/element-cloud-documentation/page/set-up-cross-signing) so they can log back in without cross-verifying a device.
    2. [Export E2E room keys](https://ems-docs.element.io/books/element-cloud-documentation/page/export-and-import-e2e-room-keys) from every client they have logged in.
    3. Use a client they can access to sign out of sessions on devices they don't have access to, and any bridges that are registered in the sessions list.
    4. Log out of all the remaining clients. This reduces risk of things changing or becoming undecryptable after the migration is complete.
2. After all users have completed those steps, cut over your DNS and .well-known files. This stops traffic from being directed to your EMS host.
3. Wait twice as long as your old DNS TTL values were set to, to allow for propagation with a fudge factor.
4. Request a backup from EMS. It took about 2 hours from the time I requested my export for the database export to be ready, and 2.5 hours for the media repo export to be ready.
5. Import key configuration values, do initial setup of your homeserver, and import your database. Do not start Synapse until the database is imported! **The "set up your homeserver" instructions below are primarily focused on this step.**
    1. If this goes badly wrong, restore DNS and fix.
6. Turn your Synapse on. It'll roar to life and eat a bunch of CPU as it catches up, but that's fine.
7. Wait for things to catch up. In this time, ask your key contacts to re-send any messages they may have sent while you've been offline.
8. Also while waiting, import your media.
9. If things look good after about 2-4 hours, cancel and delete your EMS homeserver (it'll now be too far behind to roll back to).
10. Rotate your signing key at your convenience.

## Set up your homeserver

These instructions are focused on setting up your homeserver, importing your database, and importing your media. Here are some assumptions I'm making in what I've written:

* Dependencies are already addressed locally and remotely.
* You don't have any bridges setup on EMS. (Their [docs](https://ems-docs.element.io/books/element-cloud-documentation/page/migrate-from-ems-to-self-hosted) cover what to do if you do have bridges.)
* You've cloned the MDAD project locally and configured your playbook.
    * You're using the default profile (Synapse, Element, Postgres, Coturn, Traefik, Let's Encrypt, and Exim) and, of the optional services, have opted to use matrix-media-repo (MMR).
* You've already set your target host in the MDAD project.
* You've already put the `macaroon` and `pepper` keys from your EMS export into the MDAD project's `vars.yml`, under `matrix_synapse_macaroon_secret_key` and `matrix_synapse_password_config_pepper` respectively.
* You're using a bare domain for your account handles (as in, not using a subdomain).
* You've already handled the SSL certificates and prepared your DNS.
* You'll store your EMS exports locally at `~/dev/migration`.
* You've got a directory setup on the host server at `/root/migration` – and you run commands on the host as root.

OK, with all that scene setting done, let's walk through the steps you'll need to take to set up your homeserver and import your data!

### Run your Ansible playbook

From your local machine, run the Ansible playbook. All of the commands we run from the local machine are within the base directory of the MDAD project. Critically, we're only installing things – not starting any services yet.

```bash
> just roles
> ansible-playbook -i inventory/hosts setup.yml --tags=install-all
```

### Import your signing key

On your remote host, edit `/matrix/synapse/config/matrix.DOMAIN.signing.key` and replace the autogenerated signing key with the one from your EMS export.

### Upload your exports

Upload your database and media exports to your remote host by running these commands on your local machine.

```bash
> rsync -Pav ~/dev/migration/DOMAIN-synapse-database.zip root@REMOTEHOST:/root/migration/
> rsync -Pav ~/dev/migration/DOMAIN-media-DOMAIN.zip root@REMOTEHOST:/root/migration/
```

### Prepare your database for import

On your remote host, run the following sequence of commands. These will convert the EMS database export to the format that the MDAD project supports importing, and prepares Postgres for the import.

```bash
> cd ~/migration
> unzip DOMAIN-synapse-database.zip
```

Take note of the name of the directory that's extracted from the archive. It will be of the format `UNIQUEID-live-DOMAIN-synapse-database.dir` and that unique ID will be something we need to refer back to several times.

```bash
> rm DOMAIN-synapse-database.zip
> pg_restore –file=ems-export.sql UNIQUEID-live-DOMAIN-synapse-database.dir/
> rm -fr UNIQUEID-live-DOMAIN-synapse-database.dir/
```

Now that you've converted the EMS database export, let's prepare Postgres for some of the minor differences it will encounter when we run the import.

```bash
> systemctl start matrix-postgres
> /matrix/postgres/bin/cli
> > CREATE ROLE rdsadmin;
> > CREATE ROLE UNIQUEID;
> > \q
```

### Import your database

On your local machine, run this command to begin the import process on your remote host:

```bash
> just run-tags import-postgres --extra-vars=server_path_postgres_dump=/root/migration/ems-export.sql --extra-vars=postgres_default_import_database=synapse
```

Now, going back to the remote machine, let's make one change to the database to make sure the imported data is owned by the correct user:

```bash
> /matrix/postgres/bin/cli
> > \c synapse
> > REASSIGN OWNED BY UNIQUEID TO synapse;
> > \q
```

Then you're done importing the database!

### Import your media

You can afford to delay the media import if that's convenient for you, but people might notice some missing images so I recommend doing it promptly. All of these commands should be run on the remote host.

This step differs in key ways from the database import. The database import we did from our local machine, by telling the remote host to import a database file that was stored on the remote host outside of the Docker container that the database runs in. In this case, we are running these commands on the remote host and we are placing the media archive in a place that is mounted into the Docker container that matrix-media-repo is running in.

Here we go:

```bash
> mv ~/migration/DOMAIN-media-DOMAIN.zip /matrix/matrix-media-repo/data/
> cd /matrix/matrix-media-repo/data/
> unzip DOMAIN-media-DOMAIN.zip
> chown -R matrix:matrix *
> rm DOMAIN-media-DOMAIN.zip
> systemctl start matrix-media-repo
> docker exec -it matrix-media-repo /usr/local/bin/gdpr_import -directory /data/UNIQUEID-live-DOMAIN-media-DOMAIN
```

The import process will ask for a Machine ID. As it suggests, you can just enter 1.

To test if the import was successful, run the following command:

```bash
> docker exec -it matrix-media-repo /usr/local/bin/gdpr_import -directory /data/UNIQUEID-live-DOMAIN-media-DOMAIN -verify
```

### Rotate your signing key

This is not a step I've taken myself, but you may be keen to do this. The high level guidance I was given is as follows:

First, create a new key with the `generate_signing_key.py` script that comes with Synapse.

Then, list your old public key under `old_signing_keys` in your `homeserver.yaml` file ([docs](https://element-hq.github.io/synapse/latest/usage/configuration/config_documentation.html?highlight=old_signing_key#old_signing_keys)). If you're using the MDAD project as I am, you'll want to make this change using the `matrix_synapse_configuration_extension_yaml` variable locally in the `vars.yml` file.

Lastly, replace the contents of the `/matrix/synapse/config/matrix.DOMAIN.signing.key` file on your remote host with your new key.

### Fire things up

If your database and media imports have gone over successfully, you can safely start your homeserver! If not, you'll need to do some troubleshooting.

Here's the command to start your homeserver, which is meant to be run from your local machine:

```bash
> ansible-playbook -i inventory/hosts setup.yml --tags=start
```

## Have fun

In my case, I had a pretty vanilla setup on EMS – no bridges or anything. But since migrating, I've started customizing things! There's a lot you can do with Matrix and the [MDAD project](https://github.com/spantaleev/matrix-docker-ansible-deploy/tree/master) makes it fairly painless to experiment.

Here are a few of the additional things I've set up alongside my Synapse homeserver:

* Etherpad
* Synapse Admin
* Sliding Sync Proxy
* Synapse Auto Compressor
* Shared Secret Auth
* Prometheus and Grafana
* Hookshot
* Bridges for IRC, Discord, LinkedIn, Facebook, and Instagram
* Matrix Reminder Bot
* Maubot

I've also found the need to do some performance tuning – while the out-of-the-box setup on my homeserver could handle most rooms, it could not handle resource intensive rooms like Matrix HQ.

However, I'm still working this out for myself. Performance tuning, such as enabling and tuning workers, is a topic for another day and another blog post. I'll be collaborating with Tom Foster on such a post in the near future!

## Acknowledgements

It took quite a lot of help for me to puzzle out this process. I am endlessly grateful to Travis Ralston, Tom Foster, Slavi Pantaleev, Cat, Richard van der Hoff, and many others for their support.

As you embark on your own journey, I highly recommend reading the docs before you take any actions, and joining these rooms for peer support:

* [Docker + Ansible = Matrix](https://matrix.to/#/#matrix-docker-ansible-deploy:devture.com)
* [EMS (Element Matrix Services)](https://matrix.to/#/#ems:matrix.org)
* [Synapse Admins](https://matrix.to/#/#synapse:matrix.org)
* [Synapse Extreme Tuning](https://matrix.to/#/#synapse-extreme-tuning:fostered.uk)

Onwards and upwards!
