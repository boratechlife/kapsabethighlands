<script setup>
const nuxtApp = useNuxtApp();

const whyus = nuxtApp.$whyus;
const whyusimages = nuxtApp.$whyusImages;

console.log("Why us images", whyusimages);
</script>

<template>
  <div class="py-10 lg:py-20" id="why-us" v-if="whyus">
    <div class="container px-4 lg:px-20 mx-auto flex flex-col gap-20 lg:gap-40">
      <div class="w-full flex items-center justify-center">
        <h4 class="text-3xl text-[#002261] mb- lg:text-5xl font-bold">
          WHY US
        </h4>
      </div>

      <!-- ITEM -->
      <div class="item flex flex-wrap lg:flex-nowrap gap-4 items-center">
        <div class="w-full lg:w-1/2 flex items-baseline gap-4">
          <div
            class="h-10 flex-none w-10 rounded-full bg-white flex items-center justify-center font-extrabold text-[23px] lg:text-[28px]"
          >
            1
          </div>
          <div class="pr-10">
            <h5
              class="text-[23px] lg:text-[33px] text-[#002261] font-bold mb-4"
              v-text="whyus[0].data.title"
            ></h5>
            <p class="text-[18px] lg:text-[22px] text-[#616060]">
              {{ whyus[0].data.description }}
            </p>
          </div>
        </div>
        <div class="w-full lg:w-1/2 flex justify-center relative">
          <img
            src="/img/buses.jpg"
            class="h-[364px] lg:h-[464px] aspect-square object-cover rounded rounded-tl-[53px] lg:rounded-tl-[103px] rounded-br-[43px] lg:rounded-br-[83px]"
            alt=""
            v-if="!whyusimages"
          />
          <img
            :src="whyusimages[0]"
            class="h-[364px] lg:h-[464px] aspect-square object-cover rounded rounded-tl-[53px] lg:rounded-tl-[103px] rounded-br-[43px] lg:rounded-br-[83px]"
            alt=""
            v-if="whyusimages && whyusimages[0]"
          />

          <UploadImage name="image1" folder="whyus" />
        </div>
      </div>

      <!-- ITEM -->
      <div class="item flex flex-wrap lg:flex-nowrap gap-4 items-center">
        <div class="w-full lg:w-1/2 flex items-baseline gap-4">
          <div
            class="h-10 flex-none w-10 rounded-full bg-white flex items-center justify-center font-extrabold text-[23px] lg:text-[28px]"
          >
            2
          </div>
          <div class="pr-10">
            <h5
              class="text-[23px] lg:text-[33px] text-[#002261] font-bold mb-4"
            >
              {{ whyus[1].data.title }}
            </h5>
            <p class="text-[18px] lg:text-[22px] text-[#616060]">
              {{ whyus[1].data.description }}
            </p>
          </div>
        </div>
        <div class="w-full lg:w-1/2 flex justify-center relative">
          <img
            :src="whyusimages[1]"
            class="h-[364px] lg:h-[464px] aspect-square object-cover rounded rounded-tl-[53px] lg:rounded-tl-[103px] rounded-br-[43px] lg:rounded-br-[83px]"
            alt=""
            v-if="whyusimages && whyusimages[1]"
          />
          <img
            src="/img/dorms.jpg"
            class="h-[364px] lg:h-[464px] aspect-square object-cover rounded rounded-tl-[53px] lg:rounded-tl-[103px] rounded-br-[43px] lg:rounded-br-[83px]"
            alt=""
            v-else
          />

          <UploadImage name="image2" folder="whyus" />
        </div>
      </div>

      <!-- ITEM -->
      <div class="item flex flex-wrap lg:flex-nowrap gap-4 items-center">
        <div class="w-full lg:w-1/2 flex items-baseline gap-4">
          <div
            class="h-10 flex-none w-10 rounded-full bg-white flex items-center justify-center font-extrabold text-[23px] lg:text-[28px]"
          >
            3
          </div>
          <div class="pr-10">
            <h5
              class="text-[23px] lg:text-[33px] text-[#002261] font-bold mb-4"
            >
              {{ whyus[2].data.title }}
            </h5>
            <p class="text-[18px] lg:text-[22px] text-[#616060]">
              {{ whyus[2].data.description }}
            </p>
          </div>
        </div>
        <div class="w-full lg:w-1/2 flex justify-center relative">
          <img
            :src="whyusimages[2]"
            class="h-[364px] lg:h-[464px] aspect-square object-cover rounded rounded-tl-[53px] lg:rounded-tl-[103px] rounded-br-[43px] lg:rounded-br-[83px]"
            alt=""
            v-if="whyusimages && whyusimages[2]"
          />
          <img
            src="/img/playgroup.png"
            class="h-[364px] lg:h-[464px] aspect-square object-cover rounded rounded-tl-[53px] lg:rounded-tl-[103px] rounded-br-[43px] lg:rounded-br-[83px]"
            alt=""
            v-else
          />

          <UploadImage name="image3" folder="whyus" />
        </div>
      </div>

      <!-- ITEM -->
      <div class="item flex flex-wrap lg:flex-nowrap gap-4 items-center">
        <div class="w-full lg:w-1/2 flex items-baseline gap-4">
          <div
            class="h-10 flex-none w-10 rounded-full bg-white flex items-center justify-center font-extrabold text-[23px] lg:text-[28px]"
          >
            4
          </div>
          <div class="pr-10">
            <h5
              class="text-[23px] lg:text-[33px] text-[#002261] font-bold mb-4"
            >
              {{ whyus[3].data.title }}
            </h5>
            <p class="text-[18px] lg:text-[22px] text-[#616060]">
              {{ whyus[3].data.description }}
            </p>
          </div>
        </div>
        <div class="w-full lg:w-1/2 flex justify-center relative">
          <img
            :src="whyusimages[3]"
            class="h-[364px] lg:h-[464px] aspect-square object-cover rounded rounded-tl-[53px] lg:rounded-tl-[103px] rounded-br-[43px] lg:rounded-br-[83px]"
            alt=""
            v-if="whyusimages && whyusimages[3]"
          />
          <img
            src="/img/781A6212.jpg"
            class="h-[364px] lg:h-[464px] aspect-square object-cover rounded rounded-tl-[53px] lg:rounded-tl-[103px] rounded-br-[43px] lg:rounded-br-[83px]"
            alt=""
            v-else
          />

          <UploadImage name="image4" folder="whyus" />
        </div>
      </div>

      <!-- ITEM -->
      <div class="item flex flex-wrap lg:flex-nowrap gap-4 items-center">
        <div class="w-full lg:w-1/2 flex items-baseline gap-4">
          <div
            class="h-10 flex-none w-10 rounded-full bg-white flex items-center justify-center font-extrabold text-[23px] lg:text-[28px]"
          >
            5
          </div>
          <div class="pr-10">
            <h5
              class="text-[23px] lg:text-[33px] text-[#002261] font-bold mb-4"
            >
              {{ whyus[4].data.title }}
            </h5>
            <p class="text-[18px] lg:text-[22px] text-[#616060]">
              {{ whyus[4].data.description }}
            </p>
          </div>
        </div>
        <div class="w-full lg:w-1/2 flex justify-center relative">
          <img
            :src="whyusimages[4]"
            class="h-[364px] lg:h-[464px] aspect-square object-cover rounded rounded-tl-[53px] lg:rounded-tl-[103px] rounded-br-[43px] lg:rounded-br-[83px]"
            alt=""
            v-if="whyusimages && whyusimages[4]"
          />
          <img
            src="/img/mph.jpg"
            class="h-[364px] lg:h-[464px] aspect-square object-cover rounded rounded-tl-[53px] lg:rounded-tl-[103px] rounded-br-[43px] lg:rounded-br-[83px]"
            alt=""
            v-else
          />

          <UploadImage name="image5" folder="whyus" />
        </div>
      </div>
    </div>
  </div>
</template>
