<template>
  <div id="app">
    <transition name="fade-out">
      <onboard v-if="showOnboard" @close-onboard="setNewUserFalse"></onboard>
    </transition>
    <header id="header">
      <div class="logo-container">
        <img :src="require('@/assets/logo.png')" alt="Leant" class="logo">
        <div class="name">Leant</div>
      </div>
    </header>
    <div id="nav">
      <router-link to="/">Objectifs</router-link>
      <router-link to="/about">Expérience</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script lang="js">
import { mapActions } from 'vuex';
import onboard from '@/components/onboard.vue';

export default {
  components: {
    onboard,
  },
  data() {
    const { new_user } = this.$store.state;
    return {
      showOnboard: new_user, /* new_user */
    };
  },
  created() {
    console.log(this.$store.state.new_user);
  },
  methods: {
    setNewUserFalse() {
      this.showOnboard = false;
      this.$store.dispatch('setNewUser', false);
    },
    ...mapActions(['setTasks']),
  },
};
</script>

<style lang="scss">
@import '~reset-css';
@import './assets/scss/variables.scss';

* { box-sizing: border-box; }
#app {
  font-family: 'Gotham';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-bottom: 50px;
}

#header {
  background-color: $white;
  height: 69px;
  padding: 0 15px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.17);
  .logo-container {
    line-height: 69px;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    .logo {
      max-width: 36px;
      height: auto;
      margin-left: 10px;
    }
    .name {
      font-weight: 700;
      color: $black;
      font-size: 20px;
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
.fade-out-leave-active {
  transition: opacity 0.5s;
}
.fade-out-leave-to {
  opacity: 0;
}
</style>
