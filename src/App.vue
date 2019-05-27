<template>
  <div id="app">
    <header id="header">
      <div class="logo-container">
        <div class="logo">Leant</div>
      </div>
    </header>
    <div id="nav">
      <router-link to="/">Objectifs</router-link>
      <router-link to="/about">Settings</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script lang="js">
import { mapActions } from 'vuex';

export default {
  created() {
  },
  methods: {
    ...mapActions(['setTasks']),
  },
};
</script>

<style lang="scss">
@import '~reset-css';
* { box-sizing: border-box; }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-bottom: 50px;
}

#header {
  background-color: $main;
  height: 40px;
  padding: 0 15px;
  border-bottom: 1px solid $main;
  border-top: 1px solid $main;
  .logo-container {
    width: 80px;
    height: 100%;
    text-align: center;
    .logo {
      height: 100%;
      padding-top: 10px;
      background-color: $white;
    }
  }
}

#nav {
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  width: 100%;
  border-top: 2px solid $second;
  background-color: $white;
  a {
    text-align: center;
    padding-top: 15px;
    flex-grow: 1;
    height: 50px;
    font-weight: 900;
    color: $black;
    text-decoration: none;
    &:not(:last-child) {
      border-right: 2px solid $second;
    }
    &.router-link-exact-active {
      background-color: #42b983;
      color: $white;
    }
  }

}
</style>
