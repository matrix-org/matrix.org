# Developer Notes

These are notes for advanced tooling use of the repository and are not mandatory for the process at this time.

## Stylelint

The repo already contains a config but not the package.json for the dependencies. This is for now an exercise to the reader.

Required dependencies besides stylelint itself are currently:

- stylelint-config-standard-scss

You can then run it with `npx stylelint "sass/**/*.scss"`