<script setup>
import { ref } from 'vue';

const upload1 = ref('');
const nuxtApp = useNuxtApp();

const props = defineProps({
  name: String,
  folder: String,
});

// Declare the event
const emit = defineEmits(['uploadSuccess']);

async function handleUpload(e) {
  const file = e.target.files[0];
  const fileName = file.name; // Using the actual file name, or you can customize it as needed
  console.log(nuxtApp);
  const newUrl = await nuxtApp.$uploadImage.uploadImage(
    file,
    props.name || fileName, // Use the passed name prop or the file's original name
    props.folder
  );
  if (newUrl) {
    console.log('Upload successful, URL:', newUrl);
    emit('uploadSuccess', newUrl); // Emit the event with the new URL
  } else {
    console.error('Upload failed');
  }
}
</script>

<template>
  <div
    class="absolute w-full h-full bg-transparent hover:bg-white hover:bg-opacity-50 flex inset-0 items-center justify-center"
  >
    <input type="file" @change="handleUpload" class="" />
  </div>
</template>
