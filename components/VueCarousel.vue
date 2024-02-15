<template>
  <Splide :options="{ rewind: true }" aria-label="My Favorite Images">
    <SplideSlide>
      <div class="flex lg:h-[560px] 2xl:h-[700px] w-full relative">
        <UploadImage
          v-if="isEdit && isLoggedIn"
          name="image1"
          @uploadSuccess="(newUrl) => handleUploadSuccess(newUrl, 0)"
        />
        <img
          :src="imageUrl.length > 0 && imageUrl[0] ? imageUrl[0] : images[0]"
          class="h-full w-full object-cover"
          alt="Sample 1"
        />
      </div>
    </SplideSlide>
    <SplideSlide>
      <div class="flex lg:h-[560px] 2xl:h-[700px] w-full">
        <UploadImage
          v-if="isEdit && isLoggedIn"
          name="image2"
          @uploadSuccess="(newUrl) => handleUploadSuccess(newUrl, 1)"
        />
        <img
          :src="imageUrl.length > 0 && imageUrl[1] ? imageUrl[1] : images[1]"
          class="h-full w-full object-cover"
          alt="Sample 1"
        />
      </div>
    </SplideSlide>
  </Splide>
</template>
<script>
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import '@splidejs/vue-splide/css';

export default defineComponent({
  components: {
    Splide,
    SplideSlide,
  },
  data() {
    return {
      upload1: '',
      imageUrl: [],
    };
  },

  props: {
    isEdit: Boolean,
    isLoggedIn: Boolean,
    images: {
      type: Object,
    },
  },
  methods: {
    handleUploadSuccess(newUrl, activeId) {
      console.log('Uploaded image URL:', newUrl, activeId);
      // Further processing with the new URL
      this.imageUrl[activeId] = newUrl;
    },
  },
  mounted() {
    console.log('Images', this.$nuxt);
  },
});
</script>
