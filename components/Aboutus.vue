<script setup>
const nuxtApp = useNuxtApp();
defineProps({
  isEdit: Boolean,
});
const updatedData = useNuxtApp().$updateMenu;
const imageUrl = ref([]);
console.log('nuxtAppABOUT', nuxtApp.$aboutus);
const aboutusImages = useNuxtApp().$aboutImages;

function handleUploadSuccess(newUrl, index) {
  console.log('Uploaded image URL:', newUrl);
  // Further processing with the new URL
  imageUrl.value[index] = newUrl;
}

async function handleChange(id, field, customId) {
  console.log('Aboutus', customId);
  var editableParagraph = document.getElementById(customId);

  console.log('Content changed:', editableParagraph.innerText);
  if (editableParagraph.innerText && editableParagraph.innerText.length > 0) {
    if (field == 'title') {
      await updatedData('aboutus', id, {
        title: editableParagraph.innerText,
      });
    }

    if (field == 'description') {
      await updatedData('aboutus', id, {
        description: editableParagraph.innerText,
      });
    }
  }
}
</script>

<template>
  <div class="w-full py-10 lg:py-20" id="about" v-if="nuxtApp.$aboutus">
    <div
      class="container px-4 lg:px-20 mx-auto flex flex-wrap lg:flex-nowrap gap-4 items-center"
    >
      <div class="w-full lg:w-1/2">
        <h4
          class="text-xl text-center text-[#002261] mb-4 lg:mb-10 lg:text-5xl font-bold"
          :contenteditable="isEdit"
          :id="nuxtApp.$aboutus[0].id"
          @blur="
            () =>
              handleChange(
                nuxtApp.$aboutus[0].id,
                'title',
                nuxtApp.$aboutus[0].id
              )
          "
        >
          {{ nuxtApp.$aboutus[0].data.title }}
        </h4>

        <div class="space-y-2 text-lg">
          <p
            :contenteditable="isEdit"
            @blur="
              () =>
                handleChange(
                  nuxtApp.$aboutus[0].id,
                  'description',
                  nuxtApp.$aboutus[0].id + nuxtApp.$aboutus[0].data.description
                )
            "
            :id="nuxtApp.$aboutus[0].id + nuxtApp.$aboutus[0].data.description"
          >
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
                :src="imageUrl && imageUrl[0] ? imageUrl[0] : aboutusImages[0]"
                alt=""
                class="absolute h-full w-full object-cover"
              />
              <UploadImage
                name="aboutus1"
                v-if="isEdit"
                @uploadSuccess="(newUrl) => handleUploadSuccess(newUrl, 0)"
                folder="aboutus"
              />
            </div>

            <div
              class="h-full w-full rounded-full bg-cover bg-no-repeat bg-white bg-[url('/img/781A6109.jpg')]"
              v-else
            >
              <UploadImage v-if="isEdit" name="aboutus2" folder="aboutus" />
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
                :src="imageUrl && imageUrl[1] ? imageUrl[1] : aboutusImages[1]"
                alt=""
                class="absolute h-full w-full object-cover"
              />
              <UploadImage
                name="aboutus3"
                v-if="isEdit"
                @uploadSuccess="(newUrl) => handleUploadSuccess(newUrl, 1)"
                folder="aboutus"
              />
            </div>

            <div
              class="h-full w-full rounded-full relative overflow-hidden bg-cover bg-no-repeat bg-white bg-[url('/img/781A6141.jpg')]"
              v-else
            >
              <UploadImage v-if="isEdit" name="aboutus4" folder="aboutus" />
            </div>
          </div>

          <div
            class="h-full w-full rounded-full overflow-hidden relative bg-cover bg-no-repeat bg-white bg-[url('/img/781A6167.jpg')]"
            v-if="aboutusImages[2]"
          >
            <img
              :src="imageUrl && imageUrl[2] ? imageUrl[2] : aboutusImages[2]"
              alt=""
              class="absolute h-full w-full object-cover"
            />
            <UploadImage
              name="aboutus5"
              v-if="isEdit"
              folder="aboutus"
              @uploadSuccess="(newUrl) => handleUploadSuccess(newUrl, 2)"
            />
          </div>
          <div
            class="h-full w-full rounded-full bg-cover relative bg-no-repeat bg-white bg-[url('/img/781A6167.jpg')]"
            v-else
          >
            <UploadImage v-if="isEdit" name="aboutus5" folder="aboutus" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
