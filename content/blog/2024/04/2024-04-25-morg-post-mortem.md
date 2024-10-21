+++
date = "2024-04-25T16:20:00Z"
title = "Post-mortem of the Matrix.org Outage"

[taxonomies]
author = ["SRE Team", "Thib"]
category = ["Foundation"]
+++


The Matrix.org homeserver suffered from an outage on Monday 22 April, between 08:00 UTC and 10:00 UTC, followed by slowness for the next 2 hours.

The outage occurred during scheduled maintenance with no expected downtime. It included upgrading the base OS of the machines running Matrix.org’s deployment.

<!-- more -->

## Technical cause

The Matrix.org homeserver is _large_. To operate at this scale and distribute the load on several machines, it relies on Synapse workers.

The first machines upgraded only ran stateless workers and were trivial to upgrade. Upgrading the machines with stateful workers was more difficult. To avoid downtime, the stateful workers had to be moved to other machines from the same deployment, and be restarted.

The machines that received the additional workers ended up being resource-starved. In the meantime, it took significant time to upgrade the free machine and bring its network back online before we could move the workers back to it to better share the load.

## Organizational cause

Matrix.org is a historical and complex deployment that is difficult and costly to replicate entirely in a staging environment at this scale. It is also the largest deployment in the federation and has unique performance requirements.

Through this upgrade process, gaps in the deployment documentation were identified and these gaps contributed to the upgrade taking longer than expected. The deployment specificity has now been properly documented, and we are confident that the next machines’ upgrade will be significantly faster.

## Lessons learned

To perform an upgrade without downtime, the Foundation would need to add another server in the deployment of the Matrix.org homeserver, as a consequence of steadily increasing traffic. An extra server introduces a recurring cost and requires additional work that the Foundation cannot afford right now.

The next upgrade will have about an hour of planned downtime and will be announced shortly. In the meantime, the Foundation is investigating the most cost-effective way to improve redundancy on matrix.org.
