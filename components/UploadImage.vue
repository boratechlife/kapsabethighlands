<script setup>
const upload1 = ref("");
const nuxtApp = useNuxtApp();

const props = defineProps({
  name: String,
  folder: String,
});
function handleUpload(e) {
  const file = e.target.files[0];
  const fileName = "example.jpg";
  console.log(nuxtApp);
  nuxtApp.$uploadImage.uploadImage(file, props.name, props.folder);
}
</script>

<template>
  <div
    class="absolute w-full h-full bg-transparent hover:bg-white hover:bg-opacity-50 flex inset-0 items-center justify-center"
  >
    <input type="file" @change="handleUpload" class="" />
  </div>
</template>
