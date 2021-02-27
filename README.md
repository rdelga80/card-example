# card-example

In root `ws` WebSocket library and `express`.

In client Vue3, Vite install.

### Purpose

The purpose of this repo is to show an example of flattened component design.

See index page: [App.vue](https://github.com/rdelga80/card-example/blob/master/client/src/App.vue)

And the card component: [GameCard.vue](https://github.com/rdelga80/card-example/blob/master/client/src/components/GameCard.vue)

Each component still updates when the WebSocket returns more data, but the rendering process should be much less burdensome because the updates are kept very high and the rendering process should only run in a single high-level component.
