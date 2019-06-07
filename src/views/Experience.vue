<template>
  <div class="experience-container">
    <h1>Progression</h1>
    <div class="graph-container">
      <loading-progress
        :progress="percentNum"
        :indeterminate="false"
        :counter-clockwise="false"
        :hide-background="false"
        shape="M 100 200 A 100 100 0 1 1 200 200"
        size="300"
        fill-duration="5"
      ></loading-progress>
      <div class="level-container">
        <div class="level-number">{{ this.experience.level }}</div>
        <div class="level-name">Niveau</div>
        <div class="xp-container" v-if="experience.number > 0">
          +{{ this.experience.number }}xp
        </div>
      </div>
    </div>
    <div class="xp-left">
      Plus que {{ this.xpLeft }}xp avant niveau {{ this.experience.level + 1 }}
    </div>

  </div>
</template>

<script lang="js">
import { mapGetters } from 'vuex';

export default {
  name: 'Experience',
  data() {
    return {
      percentNum: 0,
      xpLeft: 0,
      totalXpLevel: 400,
    };
  },
  computed: {
    ...mapGetters(['experience']),
  },
  methods: {
    computeProgressBarPrecent() {
      this.xpLeft = this.totalXpLevel - this.experience.number;
      this.percentNum = this.experience.number / this.totalXpLevel + 1;
    },
  },
  mounted() {
    console.log(this.experience);
    this.computeProgressBarPrecent();
  },
};
</script>

<style lang="scss">
  .experience-container {
    text-align: center;
    padding: 20px 0;
    h1 {
      font-weight: 900;
      font-size: 30px
    }
  }
  .graph-container {
    position: relative;
    .level-container {
      position: absolute;
      top: 100px;
      left: 50%;
      transform: translateX(-50%);
      .level-number {
        font-size: 60px;
        font-weight: 900;
      }
      .level-name {
        font-weight: 700;
      }
      .xp-container {
        position: relative;
        top: 40px;
      }
    }
  }
  .xp-left {
    position: relative;
    top: -30px;
    font-weight: 700;
  }
  .vue-progress-path {
    path {
      stroke-width: 14;
    }
    .progress {
      stroke: #9890E3;
    }
    .background {
      stroke: #8ce6b4;
    }
  }
</style>
