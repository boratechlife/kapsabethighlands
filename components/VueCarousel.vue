<template>
  <Splide :options="{ rewind: true }" aria-label="My Favorite Images">
    <SplideSlide>
      <div class="flex lg:h-[560px] 2xl:h-[700px] w-full">
        <img
          src="/img/781A5713.jpg"
          class="h-full w-full object-cover"
          alt="Sample 1"
        />
      </div>
    </SplideSlide>
    <SplideSlide>
      <div class="flex lg:h-[560px] 2xl:h-[700px] w-full">
        <img
          src="/img/781A5728.jpg"
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
});
</script>
