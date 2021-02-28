# card-example

In root `ws` WebSocket library and `express`.

In client Vue3, Vite install.

### Purpose

The purpose of this repo is to show an example of flattened component design.

See index page: [App.vue](https://github.com/rdelga80/card-example/blob/master/client/src/App.vue)

And the card component: [GameCard.vue](https://github.com/rdelga80/card-example/blob/master/client/src/components/GameCard.vue)

Each component still updates when the WebSocket returns more data, but the rendering process should be much less burdensome because the updates are kept very high and the rendering process should only run in a single high-level component.

Tested up to 3000 entries with no performance issues.

#### Slider

Leveraging Transitions and CSS Transitions, this slider moves the 3 visible cards to the left or right, then removes them from the DOM.

The effect is slightly different than is currently being used to show the change in cards, but the advantage is that the the only cards that render on data changes are the three visible cards - therefore greatly reducing the weight of rendering on change.

#### Issues

* Responsiveness - This example does not account for responsiveness, especially how to determine how many cards should shift across various screen widths.
