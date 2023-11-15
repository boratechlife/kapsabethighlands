<template>
  <Splide :options="{ rewind: true }" aria-label="My Favorite Images">
    <SplideSlide>
      <div class="flex lg:h-[560px] 2xl:h-[700px] w-full relative">
        <UploadImage v-if="isEdit" name="image1" />
        <img
          :src="images[0]"
          class="h-full w-full object-cover"
          alt="Sample 1"
        />
      </div>
    </SplideSlide>
    <SplideSlide>
      <div class="flex lg:h-[560px] 2xl:h-[700px] w-full">
        <UploadImage v-if="isEdit" name="image2" />
        <img
          :src="images[1]"
          class="h-full w-full object-cover"
          alt="Sample 1"
        />
      </div>
    </SplideSlide>
  </Splide>
</template>
<script>
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import "@splidejs/vue-splide/css";

export default defineComponent({
  components: {
    Splide,
    SplideSlide,
  },
  data() {
    return {
      upload1: "",
    };
  },

  props: {
    isEdit: String,
    images: {
      type: Object,
    },
  },
  mounted() {
    console.log("Images", this.$nuxt);
  },
});
</script>
