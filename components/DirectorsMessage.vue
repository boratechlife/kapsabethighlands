<script setup>
const dirmessage = useNuxtApp().$dirmessage;
const directorsImages = useNuxtApp().$directorsImages;
const imageUrl = ref(null);
const updatedData = useNuxtApp().$updateMenu;
async function handleChange(id, field, customId) {
  console.log('Director', customId);
  var editableParagraph = document.getElementById(customId);

  console.log('Content changed:', editableParagraph.innerText);
  if (editableParagraph.innerText && editableParagraph.innerText.length > 0) {
    if (field == 'title') {
      await updatedData('director', id, {
        d_message: {
          title: editableParagraph.innerText,
        },
      });
    } else if (field == 'msg') {
      await updatedData('director', id, {
        msg: editableParagraph.innerText,
      });
    } else {
      await updatedData('director', id, {
        name: editableParagraph.innerText,
      });
    }
  }
}

function handleUploadSuccess(newUrl) {
  console.log('Uploaded image URL:', newUrl);
  // Further processing with the new URL
  imageUrl.value = newUrl;
}
</script>
<template>
  <div
    class="w-full bg-white lg:h-[596px] py-10 lg:py-0 flex lg:my-28 items-center lg:rounded-tl-[152px] lg:rounded-br-[152px]"
    id="director"
    v-if="dirmessage"
  >
    <div
      class="container px-4 lg:px-20 mx-auto flex flex-wrap lg:flex-nowrap gap-4 items-center justify-between"
    >
      <div
        class="logo z-40 flex-none p-4 aspect-square bg-gradient-to-b from-[#002261] to-[#fff] w-full lg:w-[447px] rounded-full flex items-center justify-center relative"
      >
        <!-- <div
          v-if="directorsImages"
          class="h-full w-full relative rounded-full overflow-hidden bg-cover bg-no-repeat bg-white"
          :style="`background:url('${directorsImages[0]}')`"
        >
          <UploadImage name="director" folder="directors" />
        </div> -->
        <div
          :class="!directorsImages ? 'bg-[url(\'/img/director.jpg\')]' : ''"
          class="h-full w-full relative rounded-full overflow-hidden bg-cover bg-no-repeat bg-white"
        >
          <img :src="imageUrl ? imageUrl : directorsImages[0]" alt="" />
          <UploadImage
            name="director"
            folder="directors"
            @uploadSuccess="handleUploadSuccess"
          />
        </div>
      </div>

      <div class="w-full lg:w-1/2">
        <h4
          contenteditable="true"
          :id="dirmessage[0].id"
          @blur="
            () => handleChange(dirmessage[0].id, 'title', dirmessage[0].id)
          "
          class="text-xl text-[#002261] mb-4 lg:text-5xl font-bold"
        >
          {{ dirmessage[0].data.d_message.title }}
        </h4>

        <p
          contenteditable="true"
          @blur="
            () =>
              handleChange(
                dirmessage[0].id,
                'msg',
                dirmessage[0].id + dirmessage[0].data.msg
              )
          "
          :id="dirmessage[0].id + dirmessage[0].data.msg"
          class="font-light text-[24px] lg:text-[28px] mb-6"
        >
          {{ dirmessage[0].data.msg }}
        </p>

        <div class="flex items-center gap-2">
          <svg
            width="58"
            class="w-5"
            height="1"
            viewBox="0 0 58 1"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line y1="0.5" x2="58" y2="0.5" stroke="#858080" />
          </svg>
          <b
            class="text-[33px]"
            contenteditable="true"
            @blur="
              () =>
                handleChange(
                  dirmessage[0].id,
                  'name',
                  dirmessage[0].id + dirmessage[0].data.name
                )
            "
            :id="dirmessage[0].id + dirmessage[0].data.name"
            >{{ dirmessage[0].data.name }}</b
          >
        </div>
      </div>
    </div>
  </div>
</template>
