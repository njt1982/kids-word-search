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
$font-family-sans-serif: 'Dosis', 'Helvetica Neue', Arial, sans-serif;
// $font-weight-light: 200;
// $font-weight-base: 200;
@import './sass/_variables.scss';
// $border-radius:    0;
// $border-radius-lg: 0;
// $border-radius-sm: 0;
@import '../node_modules/bootstrap/scss/bootstrap.scss';
@import './sass/_bootstrap.scss';

@import './sass/_custom.scss';

</style>
