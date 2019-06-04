<template>
  <div class="onboard-container">
    <div class="header">
      <div class="subtitle">Bienvenue sur</div>
      <div class="header-content">
        <img :src="require('@/assets/logo.png')" alt="Leant">
        <h1>Leant</h1>
      </div>
      <div class="onboard-body">
        <Carousel
          :perPage="1">
          <slide>
            <div class="content">
              <p>Leant est un outil d'accompagnement permettant d'atteindre vos objectifs.</p>
            </div>
          </slide>
          <slide>
            <div class="content">
              <p>Basé sur un système de todo-list et de principes agiles,
                l'application vous permet de suivre votre progression
                selon vos propres attentes !</p>
            </div>
          </slide>
          <slide>
            <div class="content">
              <p class="text-center">
                Prêt à embarquer ?
              </p>
            </div>
          </slide>
        </Carousel>
        <button class="confirm-onboard" @click="$emit('close-onboard')">
          Commencer
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="js">
import { Carousel, Slide } from 'vue-carousel';

export default {
  name: 'onboard',
  components: {
    Carousel,
    Slide,
  },
};
</script>

<style lang="scss">
.text-center {text-align: center!important;}
.onboard-container {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow-y: auto;
  background-color: $white;
  z-index: 999;
  text-align: center;
  .header {
    margin-top: 30px;
    .subtitle {
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 20px;
    }
    .header-content {
      display: flex;
      flex-flow: row wrap;
      justify-content: center;
      align-items: center;
      h1 {
        font-weight: 700;
        font-size: 46px;
      }
      img {
        max-width: 80px;
        height: auto;
        margin-right: 20px;
      }
    }
    .onboard-body {
      max-width: 334px;
      margin: 30px auto 0;
      .VueCarousel {
        margin-bottom: 20px;
      }
      .VueCarousel-wrapper {
        border: 5px solid $black;
        border-radius: 5px;
      }
      .VueCarousel-slide {
        height: 30vh;
      }
      .content {
        position: relative;
        top: 50%;
        transform: translateY(-50%);
        padding: 30px;
      }
      p {
        text-align: left;
        color: $black;
        font-size: 16px;
        line-height: 1.6;
        font-weight: 600;
        margin-bottom: 10px;
      }
    }
    .confirm-onboard {
      background-color: $black;
      width: 100%;
      height: 49px;
      line-height: 49px;
      text-align: center;
      font-size: 20px;
      color: $white;
      border-radius: 5px;
      border: none;
      padding: 0;
      font-weight: 700;
      letter-spacing: 2px;
    }
  }
}
</style>
