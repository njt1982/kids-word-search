<template>
  <div id="app">
    <Header />
    <Helper />
  </div>
</template>

<script>
import 'popper.js';
import 'bootstrap';

import Helper from './components/Helper';
import Header from './components/Header';

export default {
  name: 'App',
  components: {
    Helper,
    Header,
  },
};
</script>

<style lang="scss">
$font-family-sans-serif: 'Ruluko', sans-serif;
$badge-font-size: 1em;
$badge-font-weight: normal;

$container-max-widths: (
  md: 720px,
  lg: 960px,
  xl: 1140px
);
@import './sass/_variables.scss';

@import '../node_modules/bootstrap/scss/bootstrap.scss';
@import './sass/_bootstrap.scss';

@import './sass/_custom.scss';

</style>
