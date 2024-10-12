## Matrix.org Website

If you want to contribute to the website, make sure the problem you're trying to
fix or the feature you want to implement has been discussed in our issue tracker
and that we are interested in reviewing and merging such a contribution.

To discuss maintenance of this site, please come talk to the team in
[#matrix.org-website:matrix.org](https://matrix.to/#/#matrix.org-website:matrix.org).

## Building the website

Install the latest version of [Zola](https://www.getzola.org), clone the repo, and from the root of the
repo type

```
zola serve
```

Zola will build the website and start a web server, usually at
<http://127.0.0.1:1111>

## Tests

We are using <https://playwright.dev/> for simple UI and accessibility tests.

## Running tests

To run tests you need a few dependencies:

- PNPM - The package manager used
- Playwright itself - Run `pnpm install` to install it
- The Plawright Browsers - Run `pnpm exec playwright install` to install those (The dependency errors are webkit specific and can be ignored)
- The system dependencies (This will not work on other systems than ubuntu or debian) - `sudo pnpm exec playwright install-deps`

After installing the dependencies you can either run in headless mode using:

```
pnpm exec playwright test
```

Run in interactive UI mode using:

```
pnpm exec playwright test --ui
```

Or generate files using codegen:

```
pnpm exec playwright codegen
```

See the playwright documentation for more ways to launch tests.

## Building tests

For tests we are seeking mostly simple e2e tests ensuring things will work after changes.
Examples are things like our hover menu, accessibility or the rss feed.
