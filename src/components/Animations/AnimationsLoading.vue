<template>
  <div>
    <lottie
      class="resize-animation"
      :options="defaultOptions"
      v-on:animCreated="handleAnimation"
    />
  </div>
</template>

<script>
import Lottie from "vue-lottie";
import * as animation from "../../utils/animation_fly.json";

export default {
  name: "AnimationComponent",
  mounted() {
    this.anim.setSpeed(0.5);
  },
  components: {
    lottie: Lottie,
  },
  data() {
    return {
      defaultOptions: { animationData: animation.default },
      animationSpeed: 0.5,
    };
  },
  methods: {
    handleAnimation: function (anim) {
      this.anim = anim;
    },
  },
};
</script>
<style scoped>
@media (max-width: 575.98px) {
  .resize-animation {
    width: 120px !important;
    height: 120px !important;
  }
}

@media (min-width: 576px) and (max-width: 767.98px) {
  .resize-animation {
    width: 150px !important;
    height: 150px !important;
  }
}

@media (min-width: 768px) and (max-width: 991.98px) {
  .resize-animation {
    width: 190px !important;
    height: 190px !important;
  }
}

@media (min-width: 992px) and (max-width: 1199.98px) {
  .resize-animation {
    width: 220px !important;
    height: 190px !important;
  }
}

@media (min-width: 1200px) {
  .resize-animation {
    width: 220px !important;
    height: 190px !important;
  }
}
</style>
