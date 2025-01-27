+++
title = "The Matrix Ecosystem"
sort_by = "weight"
+++

---
title: "The Matrix Ecosystem"
sort_by: "weight"
---

{{#list items}}
  * [{{title}}]({{link}}) &ndash; {{description}}
{{/list}}

<!-- Define the items array below -->
{{#set items}}
[
  {
    "title": "Clients",
    "link": "clients",
    "description": "The Matrix ecosystem is vibrant. Whatever platform you use, someone has probably already developed a client for it."
  },
  {
    "title": "Hosting",
    "link": "hosting",
    "description": "Everyone can host their Matrix server, but not everybody wants to. These are the providers the Matrix.org Foundation knows about."
  },
  {
    "title": "Servers",
    "link": "servers",
    "description": "Advanced users may want to run a homeserver by themselves for more independence and sovereignty. Here are the servers advanced users can run."
  },
  {
    "title": "Bridges",
    "link": "bridges",
    "description": "Bridges allow you to connect Matrix to a third-party platform, and interact seamlessly."
  },
  {
    "title": "Integrations",
    "link": "integrations",
    "description": "Useful integrations for more productive or fun conversations in the Matrix ecosystem."
  },
  {
    "title": "SDKs",
    "link": "sdks",
    "description": "Develop great apps, bots, and bridges. Focus on what you do best. Let the SDKs do all the heavy lifting."
  }
]
{{/set}}
