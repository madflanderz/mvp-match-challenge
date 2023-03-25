# MVP Code Challenge

This is my attempt to build this website:
https://www.figma.com/file/t00BR74ObZibDzdMquHcGk/Test?node-id=36-4928&t=dxN1frOPRDqH62aL-0

I worked for 6 hours. I think it's way to much for one day to scaffold a project from scratch, build all the features, implement pixel perfect figma design and follow best practices.  

I tried to finish as much as possible with "good enough for now" paradigm instead of just some things in 100% proper and clean way.

Things that are included:

- NextJS with Typescript
- Material UI theme adjustments
- recharts for pie chart
- unit and integration tests with jest, react testing library and [MockServiceWorker](https://mswjs.io/)

Things i would do with more time:

- add more ui tests
- translation with [i18n](https://react.i18next.com/)
- adjust the theme little bit more 
- add proper lint rules like rules for react and hooks
- refactor the data calculation and write some more tests
- storybook for component development

## How to Use

In your terminal, run the following command:

```bash
yarn
yarn start dev
```

## Run Jest Tests

```bash
yarn test
```
