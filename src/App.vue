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
      <router-link class="task-link" to="/">Objectifs</router-link>
      <router-link class="experience-link" to="/experience">Expérience</router-link>
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
.dg-backdrop, .dg-container {
  z-index: 999999;
}
.dg-content-cont--floating {
  top: 50%;
  transform: translateY(-50%);
}
.dg-main-content {
  width: 330px;
  font-family: 'Gotham';
  font-weight: 600;
  .dg-content-body {
    border-bottom: none;
    text-align: center;
    h1 {
      font-size: 25px;
      margin-bottom: 10px;
    }
  }
  .dg-content-footer {
    display: flex;
    flex-flow: column-reverse;
    button {
      &.dg-btn--ok {
        color: $white;
        font-size: 20px;
        text-align: center;
        background-color: #87DEAE;
        border: 2px solid #B1F4CF;
        border-radius: 4px;
        padding: 15px 20px;
        font-weight: 700;
        width: auto;
        min-width: 200px;
        margin-bottom: 10px;
      }
      &.dg-btn--cancel {
        margin-top: 0;
        background-color: transparent;
        color: #ff7777;
        border: none;
      }
    }
  }
}

#header {
  background-color: $white;
  position: relative;
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
      max-width: 40px;
      height: auto;
      margin-right: 10px;
    }
    .name {
      font-weight: 700;
      color: $black;
      font-size: 22px;
    }
  }
}

#nav {
  position: fixed;
  z-index: 3;
  bottom: 0;
  left: 0;
  display: flex;
  width: 100%;
  background-color: $white;
  box-shadow: 0px -1px 4px rgba(0, 0, 0, 0.17);
  a {
    text-align: center;
    padding-top: 15px;
    flex-grow: 1;
    height: 50px;
    font-weight: 900;
    color: $black;
    text-decoration: none;
    background-color: $white;
    user-select: none;
    &.router-link-exact-active {
      color: $white;
      &.task-link {
        background-color: #42b983;
      }
      &.experience-link {
        background-color: #9890E3;
      }
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
