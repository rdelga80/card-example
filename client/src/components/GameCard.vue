<template>
  <article class="card">
    <header class="title">
      <span class="teams">
        <slot name="teams"/>
      </span>

      <span class="date">
        <slot name="date"/>
      </span>
    </header>

    <section class="content">
      <div class="home">
        <slot name="home"/>

        <slot name="home-action"/>
      </div>

      <div class="money-line">
        <span>
          Money Line:
        </span>

        <slot name="money-action"/>
      </div>

      <div class="away">
        <slot name="away"/>

        <slot name="away-action"/>
      </div>
    </section>
  </article>
</template>

<script>
export default {
  name: 'GameCard',
}
</script>

<style scoped>
.card {
  border: 1px solid slategray;
  display: flex;
  flex-direction: column;
  min-width: 300px;
}

.title {
  border-bottom: 1px solid slategray;
  display: flex;
  font-size: 12px;
  justify-content: space-between;
  padding: 1rem;
}

.content {
  display: flex;
  flex-direction: column;
  font-size: 16px;
  padding: 1rem;
}

.home,
.money-line,
.away {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
}

.away {
  margin-bottom: 0;
}
</style>
