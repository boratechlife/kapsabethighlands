<script setup>
const nuxtApp = useNuxtApp();
const galleryImages = nuxtApp.$galleryImages;
const imageUrl = ref([]);

defineProps({
  isEdit: Boolean,
});

function handleUploadSuccess(newUrl, index) {
  console.log('Uploaded image URL:', newUrl);
  // Further processing with the new URL
  imageUrl.value[index] = newUrl;
}

console.log('Gallery images');
</script>

<template>
  <div class="py-10 lg:py-20" id="gallery">
    <div class="container px-0 lg:px-20 mx-auto flex flex-col gap-10 lg:gap-40">
      <div class="w-full px-4 flex items-center justify-center">
        <h4 class="text-3xl text-[#002261] mb- lg:text-5xl font-bold">
          GALLERY
        </h4>
      </div>

      <div class="w-full grid grid-cols-4 row-auto cols-1">
        <div class="1 row-span-3 flex relative">
          <img
            :src="imageUrl && imageUrl[0] ? imageUrl[0] : galleryImages[0]"
            class="object-cover h-full w-full"
            alt=""
            v-if="galleryImages && galleryImages[0]"
          />
          <img
            src="/img/781A5713.jpg"
            class="object-cover h-full w-full"
            alt=""
            v-else
          />

          <UploadImage
            name="image1"
            v-if="isEdit"
            @uploadSuccess="(newUrl) => handleUploadSuccess(newUrl, 0)"
            folder="gallery"
          />
        </div>
        <div class="flex w-full bg-black relative">
          <img
            :src="imageUrl && imageUrl[1] ? imageUrl[1] : galleryImages[1]"
            class="object-cover h-full w-full"
            alt=""
            v-if="galleryImages && galleryImages[1]"
          />
          <img
            src="/img/781A5728.jpg"
            class="object-cover h-full w-full"
            alt=""
            v-else
          />

          <UploadImage
            name="image2"
            v-if="isEdit"
            @uploadSuccess="(newUrl) => handleUploadSuccess(newUrl, 1)"
            folder="gallery"
          />
        </div>
        <div class="flex w-full bg-black relative">
          <img
            :src="imageUrl && imageUrl[2] ? imageUrl[2] : galleryImages[2]"
            class="object-cover h-full w-full"
            alt=""
            v-if="galleryImages && galleryImages[2]"
          />
          <img
            src="/img/781A5890.jpg"
            class="object-cover h-full w-full"
            alt=""
            v-else
          />

          <UploadImage
            name="image3"
            v-if="isEdit"
            @uploadSuccess="(newUrl) => handleUploadSuccess(newUrl, 2)"
            folder="gallery"
          />
        </div>
        <div class="row-span-2 relative">
          <img
            :src="imageUrl && imageUrl[3] ? imageUrl[3] : galleryImages[3]"
            class="object-cover h-full w-full"
            alt=""
            v-if="galleryImages && galleryImages[3]"
          />
          <img
            src="/img/781A6109.jpg"
            class="object-cover h-full w-full"
            alt=""
            v-else
          />

          <UploadImage
            name="image4"
            v-if="isEdit"
            @uploadSuccess="(newUrl) => handleUploadSuccess(newUrl, 3)"
            folder="gallery"
          />
        </div>
        <div class="flex w-full bg-black relative">
          <img
            :src="imageUrl && imageUrl[4] ? imageUrl[4] : galleryImages[4]"
            class="object-cover h-full w-full"
            alt=""
            v-if="galleryImages && galleryImages[4]"
          />
          <img
            src="/img/781A6141.jpg"
            class="object-cover h-full w-full"
            alt=""
            v-else
          />

          <UploadImage
            name="image5"
            v-if="isEdit"
            @uploadSuccess="(newUrl) => handleUploadSuccess(newUrl, 4)"
            folder="gallery"
          />
        </div>
        <div class="flex w-full bg-black relative">
          <img
            :src="imageUrl && imageUrl[5] ? imageUrl[5] : galleryImages[5]"
            class="object-cover h-full w-full"
            alt=""
            v-if="galleryImages && galleryImages[5]"
          />
          <img
            src="/img/781A6167.jpg"
            class="object-cover h-full w-full"
            alt=""
            v-else
          />

          <UploadImage
            name="image6"
            v-if="isEdit"
            @uploadSuccess="(newUrl) => handleUploadSuccess(newUrl, 5)"
            folder="gallery"
          />
        </div>
        <div class="flex w-full bg-black relative">
          <img
            :src="imageUrl && imageUrl[6] ? imageUrl[6] : galleryImages[6]"
            class="object-cover h-full w-full"
            alt=""
            v-if="galleryImages && galleryImages[6]"
          />
          <img
            src="/img/781A6205.jpg"
            class="object-cover h-full w-full"
            alt=""
            v-else
          />

          <UploadImage
            name="image7"
            v-if="isEdit"
            @uploadSuccess="(newUrl) => handleUploadSuccess(newUrl, 6)"
            folder="gallery"
          />
        </div>
        <div class="flex w-full bg-black relative">
          <img
            :src="imageUrl && imageUrl[7] ? imageUrl[7] : galleryImages[7]"
            class="object-cover h-full w-full"
            alt=""
            v-if="galleryImages && galleryImages[7]"
          />
          <img
            src="/img/781A6210.jpg"
            class="object-cover h-full w-full"
            alt=""
            v-else
          />

          <UploadImage
            name="image8"
            v-if="isEdit"
            @uploadSuccess="(newUrl) => handleUploadSuccess(newUrl, 7)"
            folder="gallery"
          />
        </div>
        <div class="flex w-full bg-black relative">
          <img
            :src="imageUrl && imageUrl[8] ? imageUrl[8] : galleryImages[8]"
            class="object-cover h-full w-full"
            alt=""
            v-if="galleryImages && galleryImages[8]"
          />
          <img
            src="/img/781A6211.jpg"
            class="object-cover h-full w-full"
            alt=""
            v-else
          />

          <UploadImage
            name="image9"
            v-if="isEdit"
            @uploadSuccess="(newUrl) => handleUploadSuccess(newUrl, 8)"
            folder="gallery"
          />
        </div>

        <div class="col-span-2 relative">
          <img
            :src="imageUrl && imageUrl[9] ? imageUrl[9] : galleryImages[9]"
            class="object-cover h-full w-full"
            alt=""
            v-if="galleryImages && galleryImages[9]"
          />
          <img
            src="/img/781A6212.jpg"
            class="object-cover h-full w-full"
            alt=""
            v-else
          />

          <UploadImage
            name="image10"
            v-if="isEdit"
            @uploadSuccess="(newUrl) => handleUploadSuccess(newUrl, 9)"
            folder="gallery"
          />
        </div>
        <div class="col-span-2 relative">
          <img
            :src="imageUrl && imageUrl[10] ? imageUrl[10] : galleryImages[10]"
            class="object-cover h-full w-full"
            alt=""
            v-if="galleryImages && galleryImages[10]"
          />
          <img
            src="/img/781A6226.jpg"
            class="object-cover h-full w-full"
            alt=""
            v-else
          />

          <UploadImage
            name="image11"
            v-if="isEdit"
            @uploadSuccess="(newUrl) => handleUploadSuccess(newUrl, 10)"
            folder="gallery"
          />
        </div>
      </div>
    </div>
  </div>
</template>
