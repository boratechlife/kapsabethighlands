<script setup>
const nuxtApp = useNuxtApp();
defineProps({
  isEdit: Boolean,
  isLoggedIn: Boolean,
});
const updatedData = useNuxtApp().$updateMenu;
const imageUrl = ref([]);

const getImagesFromDirectory = nuxtApp.$getImagesFromDirectory;

const aboutusImages = ref(null);

const fetchCollectionData = nuxtApp.$fetchCollection;
const aboutData = ref(null);

onMounted(async () => {
  aboutusImages.value = await getImagesFromDirectory('aboutus');
  const collectionData = await fetchCollectionData('aboutus', '');
  aboutData.value = collectionData;
  console.log('aboutusImages images', aboutusImages.value);
});

function handleUploadSuccess(newUrl, index) {
  console.log('Uploaded image URL:', newUrl);
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

// Animation on scroll
const isVisible = ref(false);
onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      isVisible.value = true;
    }
  }, { threshold: 0.2 });
  
  setTimeout(() => {
    const element = document.getElementById('about');
    if (element) observer.observe(element);
  }, 100);
});
</script>

<template>
  <div 
    class="w-full py-8 lg:py-16 bg-gradient-to-b from-white to-gray-50" 
    id="about" 
    v-if="aboutData"
  >
    <div class="container px-4 lg:px-20 mx-auto">
      <!-- Section header with accent element -->
      <div class="flex items-center justify-center mb-10">
        <div class="h-1 w-12 bg-[#002261] rounded mr-4"></div>
        <h2 class="text-3xl lg:text-4xl font-bold text-center text-blue-900 ">
            About <span class="text-red-600">Us</span>
          </h2>
        <div class="h-1 w-12 bg-[#002261] rounded ml-4"></div>
      </div>
      
      <div 
        class="flex flex-col lg:flex-row gap-12 items-center"
        :class="{ 'opacity-0 translate-y-10 transition-all duration-1000 ease-out': !isVisible, 'opacity-100 translate-y-0 transition-all duration-1000 ease-out': isVisible }"
      >
        <!-- Content left side -->
        <div class="w-full lg:w-1/2">
          <h4
            class="text-2xl text-left text-[#002261] mb-4 lg:mb-6 lg:text-4xl font-bold leading-tight"
            :contenteditable="isEdit"
            :id="aboutData[0].id"
            @blur="() => handleChange(aboutData[0].id, 'title', aboutData[0].id)"
          >
            {{ aboutData[0].data.title }}
          </h4>

          <div class="w-16 h-1 bg-[#4a7aff] mb-6 rounded"></div>

          <div class="space-y-4 text-lg text-gray-700 leading-relaxed">
            <p
              :contenteditable="isEdit"
              @blur="
                () =>
                  handleChange(
                    aboutData[0].id,
                    'description',
                    aboutData[0].id + aboutData[0].data.description
                  )
              "
              :id="aboutData[0].id + aboutData[0].data.description"
            >
              {{ aboutData[0].data.description }}
            </p>
          </div>
          
          <!-- Added stats section -->
          <div class="grid grid-cols-3 gap-4 mt-10 text-center">
            <div class="p-4 bg-white rounded-lg shadow-sm">
              <div class="text-3xl font-bold text-[#002261]">25+</div>
              <div class="text-sm text-gray-600 mt-1">Years of Excellence</div>
            </div>
            <div class="p-4 bg-white rounded-lg shadow-sm">
              <div class="text-3xl font-bold text-[#002261]">96%</div>
              <div class="text-sm text-gray-600 mt-1">Student Success</div>
            </div>
            <div class="p-4 bg-white rounded-lg shadow-sm">
              <div class="text-3xl font-bold text-[#002261]">45</div>
              <div class="text-sm text-gray-600 mt-1">Expert Faculty</div>
            </div>
          </div>
        </div>
        
        <!-- Images right side - improved layout -->
        <div
          class="w-full lg:w-1/2 flex justify-center py-14 lg:py-0 relative"
          v-if="aboutusImages"
        >
          <!-- Background design element -->
          <div class="absolute -top-10 -right-10 w-64 h-64 bg-[#e6ecff] rounded-full opacity-30 z-0"></div>
          <div class="absolute -bottom-10 -left-10 w-48 h-48 bg-[#e6ecff] rounded-full opacity-30 z-0"></div>
          
          <div class="relative z-10">
            <!-- Main image container -->
            <div
              class="logo z-50 p-2 lg:h-[440px] bg-white shadow-lg w-full aspect-square lg:w-[440px] rounded-xl flex items-center justify-center relative"
            >
              <!-- TOP IMAGE -->
              <div
                class="absolute -top-12 -right-12 z-50 p-2 h-[120px] lg:h-[160px] bg-white shadow-lg lg:w-[160px] aspect-square rounded-xl flex items-center justify-center"
              >
                <div
                  class="h-full w-full relative rounded-lg flex overflow-hidden bg-cover bg-no-repeat bg-white"
                  v-if="aboutusImages"
                >
                  <img
                    :src="imageUrl && imageUrl[0] ? imageUrl[0] : aboutusImages[0]"
                    alt="School life"
                    class="absolute h-full w-full object-cover"
                  />
                  <UploadImage
                    name="aboutus1"
                    v-if="isEdit && isLoggedIn"
                    @uploadSuccess="(newUrl) => handleUploadSuccess(newUrl, 0)"
                    folder="aboutus"
                  />
                </div>
              </div>

              <!-- BOTTOM IMAGE -->
              <div
                class="absolute -bottom-12 -left-12 z-50 p-2 h-[120px] lg:h-[160px] bg-white shadow-lg aspect-square lg:w-[160px] rounded-xl flex items-center justify-center"
              >
                <div
                  class="h-full w-full rounded-lg relative overflow-hidden bg-cover bg-no-repeat bg-white"
                  v-if="aboutusImages[2]"
                >
                  <img
                    :src="imageUrl && imageUrl[2] ? imageUrl[2] : aboutusImages[2]"
                    alt="Campus view"
                    class="absolute h-full w-full object-cover"
                  />
                  <UploadImage
                    name="aboutus3"
                    v-if="isEdit && isLoggedIn"
                    @uploadSuccess="(newUrl) => handleUploadSuccess(newUrl, 2)"
                    folder="aboutus"
                  />
                </div>
              </div>
              
              <!-- MIDDLE IMAGE -->
              <div
                class="h-full w-full rounded-lg overflow-hidden relative bg-cover bg-no-repeat bg-white"
                v-if="aboutusImages[3]"
              >
                <img
                  :src="imageUrl && imageUrl[3] ? imageUrl[3] : aboutusImages[3]"
                  alt="Our students"
                  class="absolute h-full w-full object-cover"
                />
                <UploadImage
                  name="aboutus4"
                  v-if="isEdit && isLoggedIn"
                  folder="aboutus"
                  @uploadSuccess="(newUrl) => handleUploadSuccess(newUrl, 3)"
                />
                
                <!-- Overlay with school values -->
                <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#002261] p-4 text-white">
                  <div class="text-sm font-semibold">Our Core Values</div>
                  <div class="flex gap-2 mt-2">
                    <span class="text-xs bg-white/20 px-2 py-1 rounded">Excellence</span>
                    <span class="text-xs bg-white/20 px-2 py-1 rounded">Integrity</span>
                    <span class="text-xs bg-white/20 px-2 py-1 rounded">Innovation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Call to action button -->
      <div class="mt-16 text-center">
        <a href="#" class="inline-block px-8 py-3 bg-[#002261] text-white rounded-lg font-medium hover:bg-[#00184a] transition-colors duration-300">Learn More About Our Programs</a>
      </div>
    </div>
  </div>
</template>