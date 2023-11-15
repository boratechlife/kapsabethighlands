<script setup>
const nuxtApp = useNuxtApp();
console.log("nuxtAppABOUT", nuxtApp.$aboutus);
const aboutusImages = useNuxtApp().$aboutImages;
</script>

<template>
  <div class="w-full py-10 lg:py-20" id="about" v-if="nuxtApp.$aboutus">
    <div
      class="container px-4 lg:px-20 mx-auto flex flex-wrap lg:flex-nowrap gap-4 items-center"
    >
      <div class="w-full lg:w-1/2">
        <h4
          class="text-xl text-center text-[#002261] mb-4 lg:mb-10 lg:text-5xl font-bold"
        >
          {{ nuxtApp.$aboutus[0].data.title }}
        </h4>

        <div class="space-y-2 text-lg">
          <p>
            {{ nuxtApp.$aboutus[0].data.description }}
          </p>
        </div>
      </div>
      <div class="w-full lg:w-1/2 flex justify-center py-14 lg:py-0">
        <div
          class="logo z-50 flex-none p-4 lg:h-[481px] bg-gradient-to-b from-[#002261] to-[#fff] w-full aspect-square lg:w-[481px] rounded-full flex items-center justify-center relative"
        >
          <!-- TOP IMAGE -->
          <div
            class="absolute-logo-top absolute -top-[4rem] -right-4 z-50 flex-none p-4 h-[120px] lg:h-[169px] bg-gradient-to-b from-[#002261] to-[#fff] lg:w-[169px] aspect-square rounded-full flex items-center justify-center"
          >
            <div
              class="h-full w-full relative rounded-full flex overflow-hidden bg-cover bg-no-repeat bg-white"
              v-if="aboutusImages"
            >
              <img
                :src="aboutusImages[0]"
                alt=""
                class="absolute h-full w-full object-cover"
              />
              <UploadImage name="aboutus1" folder="aboutus" />
            </div>

            <div
              class="h-full w-full rounded-full bg-cover bg-no-repeat bg-white bg-[url('/img/781A6109.jpg')]"
              v-else
            >
              <UploadImage name="aboutus1" folder="aboutus" />
            </div>
          </div>

          <!-- BOTTOM IMAGE -->
          <div
            class="absolute-logo-bottom absolute -bottom-[5rem] -left-2 lg:-left-8 z-50 flex-none p-4 h-[120px] aspect-square lg:h-[169px] bg-gradient-to-b from-[#002261] to-[#fff] lg:w-[169px] rounded-full flex items-center justify-center"
          >
            <div
              class="h-full w-full rounded-full bg-cover relative overflow-hidden bg-no-repeat bg-white bg-[url('/img/781A6141.jpg')]"
              v-if="aboutusImages[1]"
            >
              <img
                :src="aboutusImages[1]"
                alt=""
                class="absolute h-full w-full object-cover"
              />
              <UploadImage name="aboutus2" folder="aboutus" />
            </div>

            <div
              class="h-full w-full rounded-full relative overflow-hidden bg-cover bg-no-repeat bg-white bg-[url('/img/781A6141.jpg')]"
              v-else
            >
              <UploadImage name="aboutus2" folder="aboutus" />
            </div>
          </div>

          <div
            class="h-full w-full rounded-full overflow-hidden relative bg-cover bg-no-repeat bg-white bg-[url('/img/781A6167.jpg')]"
            v-if="aboutusImages[2]"
          >
            <img
              :src="aboutusImages[2]"
              alt=""
              class="absolute h-full w-full object-cover"
            />
            <UploadImage name="aboutus3" folder="aboutus" />
          </div>
          <div
            class="h-full w-full rounded-full bg-cover relative bg-no-repeat bg-white bg-[url('/img/781A6167.jpg')]"
            v-else
          >
            <UploadImage name="aboutus3" folder="aboutus" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
