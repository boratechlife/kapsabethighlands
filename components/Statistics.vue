<script setup>
const nuxtApp = useNuxtApp();

console.log("STATS", nuxtApp.$statistics);
</script>

<template>
  <div
    class="w-full py-20 flex lg:h-[432px] items-center justify-center bg-white lg:rounded-tl-[152px] lg:rounded-br-[95px]"
    id="statistic"
    v-if="nuxtApp.$statistics"
  >
    <div
      class="container px-4 lg:px-20 mx-auto flex flex-wrap lg:flex-nowrap gap-4 justify-between"
    >
      <!-- ITEM -->
      <div
        class="w-[290px] h-[186px] flex rounded-tl-[41px] rounded-bl-[77px] rounded-r flex-col items-center justify-center"
        style="box-shadow: 0px 4px 64px -12px rgba(0, 0, 0, 0.1)"
      >
        <h4 class="font-extrabold text-[40px] mb-2 text-[#002261]">
          {{ nuxtApp.$statistics[1].data.quantity }}
        </h4>
        <p class="text-[20px]">{{ nuxtApp.$statistics[1].data.title }}</p>
      </div>

      <!-- ITEM -->
      <div
        class="w-[290px] h-[186px] flex rounded-tl-[41px] rounded-bl-[77px] rounded-r flex-col items-center justify-center"
        style="box-shadow: 0px 4px 64px -12px rgba(0, 0, 0, 0.1)"
      >
        <h4 class="font-extrabold text-[40px] mb-2 text-[#002261]">
          {{ nuxtApp.$statistics[3].data.quantity }}
        </h4>
        <p class="text-[20px]">{{ nuxtApp.$statistics[3].data.title }}</p>
      </div>

      <!-- ITEM -->
      <div
        class="w-[290px] h-[186px] flex rounded-tl-[41px] rounded-bl-[77px] rounded-r flex-col items-center justify-center"
        style="box-shadow: 0px 4px 64px -12px rgba(0, 0, 0, 0.1)"
      >
        <h4 class="font-extrabold text-[40px] mb-2 text-[#002261]">
          {{ nuxtApp.$statistics[2].data.quantity }}
        </h4>
        <p class="text-[20px]">{{ nuxtApp.$statistics[2].data.title }}</p>
      </div>

      <!-- ITEM -->
      <div
        class="w-[290px] h-[186px] flex rounded-tl-[41px] rounded-bl-[77px] rounded-r flex-col items-center justify-center"
        style="box-shadow: 0px 4px 64px -12px rgba(0, 0, 0, 0.1)"
      >
        <h4 class="font-extrabold text-[40px] mb-2 text-[#002261]">
          {{ nuxtApp.$statistics[0].data.quantity }}
        </h4>
        <p class="text-[20px]">{{ nuxtApp.$statistics[0].data.title }}</p>
      </div>
    </div>
  </div>
</template>
