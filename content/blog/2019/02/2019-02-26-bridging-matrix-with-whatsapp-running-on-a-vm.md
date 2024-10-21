+++
title = "Bridging Matrix with WhatsApp running on a VM"
path = "/blog/2019/02/26/bridging-matrix-with-whatsapp-running-on-a-vm"

[taxonomies]
author = ["Ben Parsons"]
category = ["Tutorials"]
+++

This guide will live with the documentation at <a href="/docs/guides/whatsapp-bridging-mautrix-whatsapp">https://matrix.org/docs/guides/whatsapp-bridging-mautrix-whatsapp</a>, but you can find the text below.

<hr />

Matrix is:

> an open standard for <em>interoperable</em>, <em>decentralised</em>, <em>real-time communication</em>.

In this article we'll benefit from all three of these attributes:
<ul>
  <li><em>interoperable:</em> we'll see how Matrix can be made to interact with WhatsApp</li>
  <li><em>decentralised</em>: you can perform this on your own server while still enjoying the benefits of being connected to the rest of the Matrix federation</li>
  <li><em>real-time communication</em>: we'll see how to send and receive messages in real-time</li>
</ul>

## Install your homeserver and install mautrix-whatsapp, the WhatsApp bridge

Firstly, you need to have a Matrix homeserver installed. If you don't currently have one, take a look at the instructions at <a href="/docs/guides/installing-synapse">Installing Synapse</a>, and also in the <a href="https://github.com/matrix-org/synapse">Synapse README</a>.

Next, install <a href="https://github.com/tulir/mautrix-whatsapp">mautrix-whatsapp</a> by following the instructions at <a href="https://github.com/tulir/mautrix-whatsapp/wiki">mautrix-whatsapp/wiki</a>.

If you are starting from scratch, I suggest you take a look at <a href="https://github.com/spantaleev/matrix-docker-ansible-deploy/">matrix-docker-ansible-deploy</a>, as this project will enable you to deploy Synapse, <a href="https://github.com/tulir/mautrix-whatsapp">mautrix-whatsapp</a> and other components easily.

For example, if you have an existing deployment using <a href="https://github.com/spantaleev/matrix-docker-ansible-deploy/">matrix-docker-ansible-deploy</a>, you can add <a href="https://github.com/tulir/mautrix-whatsapp">mautrix-whatsapp</a> simply by adding the following line to your configuration file:
<pre><code class="yaml language-yaml">matrix_mautrix_whatsapp_enabled: true
</code></pre>
... and re-running the setup:
<pre><code class="unix language-unix">ansible-playbook -i inventory/hosts setup.yml --tags=setup-all
</code></pre>
Either way, you will soon have a functioning Matrix Synapse homeserver and <a href="https://github.com/tulir/mautrix-whatsapp">mautrix-whatsapp</a> installed with it. Next, we will set up an Android VM.

## Set up an Android VM

The best way to run an Android Virtual Machine is to use the Android Studio tools from Google. First, <a href="https://developer.android.com/studio/install">install Android Studio</a>, making sure to follow the post-install steps, as they will install additional tools we need, including AVD Manager.

Once installed, run AVD manager by choosing <code>Tools -&gt; AVD Manager</code> from the menu.

Follow the steps to create a new virtual machine, in this example I have a Nexus 5X running Android 9, but almost any configuration is fine here. Make sure that you give the device access to the Play Store.

<img src="/docs/img/avd.png" alt="" />

## Install WhatsApp and sign-in

Launch the Virtual Device, the open the Play Store and sign in. Now use the Play Store to install WhatsApp on the Virtual Device.

You will be asked to verify your phone number, use your number on another device to complete this step.

<center>
<!-- markdownlint-disable-next-line no-alt-text -->
<img src="/docs/img/nexus5.png" /></center>

## Setup mautrix-whatsapp bridge

Now that you have WhatsApp working in a VM, and Matrix working on your server, it's time to bridge them together!

Per the instructions at <a href="https://github.com/tulir/mautrix-whatsapp/wiki">mautrix-whatsapp/wiki</a>, you must start a new chat with <strong>@whatsappbot:<em>&lt;yourdomain</em>&gt;</strong>. Type <code>login</code> to begin the authentication process.

mautrix-whatsapp operates by using the WhatsApp Web feature of WhatsApp - which means it uses a QR code that you must now scan on the device running WhatsApp - which in your case is the AVD. In order to scan the presented QR code, set your AVD camera to passthrough the camera device on your host machine - see the images below.

<img src="/docs/img/camera1.png" alt="" />
<img src="/docs/img/camera2.png" alt="" />

Once this is complete, you can type <code>sync</code>, to start bridging contacts, and <code>sync --create</code> to automatically create room invites.

And that's it! You may need to take a little time to watch the sync happen, particularly if you have a very large number of chats on the WhatsApp side, but there is no further configuration needed.

## Demo

{{ youtube_player(video_id="edSgP2dEZ1o") }}
