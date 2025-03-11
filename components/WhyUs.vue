<script setup>
const nuxtApp = useNuxtApp();
defineProps({
  isEdit: Boolean,
  isLoggedIn: Boolean,
});
const whyus = ref(null);
const whyusimages = ref(null);
const updatedData = useNuxtApp().$updateMenu;

const getImagesFromDirectory = nuxtApp.$getImagesFromDirectory;

const imageUrl = ref([]);

const fetchCollectionData = nuxtApp.$fetchCollection;

// Add animation visibility state
const visibleSections = ref([]);

onMounted(async () => {
  whyusimages.value = await getImagesFromDirectory('whyus');
  const collectionData = await fetchCollectionData('whyus', 'order');
  whyus.value = collectionData;
  console.log('whyusimages images', whyusimages.value);
  
  // Initialize the visibility array with false values
  if (whyus.value) {
    visibleSections.value = Array(whyus.value.length).fill(false);
  }
  
  // Set up intersection observers for animations
  setTimeout(() => {
    setupObservers();
  }, 100);
});

function setupObservers() {
  const sections = document.querySelectorAll('.whyus-item');
  sections.forEach((section, index) => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        visibleSections.value[index] = true;
      }
    }, { threshold: 0.2 });
    
    observer.observe(section);
  });
}

function handleUploadSuccess(newUrl, index) {
  console.log('Uploaded image URL:', newUrl);
  imageUrl.value[index] = newUrl;
}

async function handleChange(id, field, customId) {
  console.log('Statistics', customId);
  var editableParagraph = document.getElementById(customId);

  console.log('Content changed:', editableParagraph.innerText);
  if (editableParagraph.innerText && editableParagraph.innerText.length > 0) {
    if (field == 'title') {
      await updatedData('whyus', id, {
        title: editableParagraph.innerText,
      });
    }
    if (field == 'description') {
      await updatedData('whyus', id, {
        description: editableParagraph.innerText,
      });
    }
  }
}
</script>

<template>
  <div class="py-16 lg:py-24 bg-white" id="why-us" v-if="whyus">
    <div class="container px-4 lg:px-20 mx-auto" v-if="whyusimages">
      <!-- Section header with accent styling -->
      <div class="text-center mb-16">
        <div class="flex items-center justify-center mb-3">
          <div class="h-1 w-12 bg-[#002261] rounded mr-4"></div>
          <h5 class="text-lg uppercase tracking-wider text-[#002261] font-semibold">Our Advantages</h5>
          <div class="h-1 w-12 bg-[#002261] rounded ml-4"></div>
        </div>
        <h2 class="text-4xl lg:text-5xl font-bold text-[#002261]">WHY CHOOSE US</h2>
        <p class="mt-4 max-w-2xl mx-auto text-gray-600">Discover what sets our educational approach apart and why families choose our school for their children's future.</p>
      </div>

      <!-- Feature items container -->
      <div class="space-y-24 lg:space-y-32">
        <!-- ITEM 1 - Assuming the first item is missing in the original data -->
        <div class="whyus-item relative" v-if="whyus.length > 1 && whyus[0]" :class="{ 'opacity-0 translate-y-10 transition-all duration-1000 ease-out': !visibleSections[0], 'opacity-100 translate-y-0 transition-all duration-1000 ease-out': visibleSections[0] }">
          <!-- Background accent shape -->
          <div class="absolute -z-10 rounded-full bg-blue-50 w-64 h-64 -left-20 -top-10 opacity-50"></div>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <!-- Left image column (reversed order from other items) -->
            <div class="relative overflow-hidden group">
              <div class="absolute -z-10 top-0 right-0 w-32 h-32 bg-[#002261] opacity-10 rounded-full transform translate-x-16 -translate-y-16"></div>
              
              <img
                :src="imageUrl && imageUrl[0] ? imageUrl[0] : whyusimages[0]"
                class="w-full h-[400px] object-cover rounded-xl shadow-lg transform transition-transform duration-500 group-hover:scale-[1.02]"
                alt="School feature"
                v-if="whyusimages && whyusimages[0]"
              />
              <img
                src="/img/mph.jpg"
                class="w-full h-[400px] object-cover rounded-xl shadow-lg"
                alt="School feature"
                v-else
              />
              
              <div class="absolute top-4 left-4 bg-[#002261] text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl shadow-md">1</div>
              
              <UploadImage
                name="image1"
                v-if="isEdit && isLoggedIn"
                @uploadSuccess="(newUrl) => handleUploadSuccess(newUrl, 0)"
                folder="whyus"
              />
            </div>
            
            <!-- Right content column -->
            <div class="pl-0 lg:pl-8">
              <h3
                class="text-2xl lg:text-3xl text-[#002261] font-bold mb-5"
                v-text="whyus[0]?.data.title || 'Academic Excellence'"
                :contenteditable="isEdit"
                @blur="() => handleChange(whyus[0]?.id, 'title', whyus[0]?.id + whyus[0]?.data.title)"
                :id="whyus[0]?.id + whyus[0]?.data.title"
              ></h3>
              
              <div class="w-16 h-1 bg-[#4a7aff] mb-5 rounded"></div>
              
              <p
                class="text-lg text-gray-700 leading-relaxed"
                :contenteditable="isEdit"
                @blur="() => handleChange(whyus[0]?.id, 'description', whyus[0]?.id + 'description')"
                :id="whyus[0]?.id + 'description'"
              >
                {{ whyus[0]?.data.description || 'Our school consistently achieves outstanding academic results, with students performing above national averages in standardized tests. Our rigorous curriculum challenges students while providing the support they need to excel.' }}
              </p>
              
              <!-- Feature highlights -->
              <div class="mt-6 grid grid-cols-2 gap-3">
                <div class="flex items-center">
                  <div class="w-2 h-2 bg-[#002261] rounded-full mr-2"></div>
                  <span class="text-sm text-gray-700">Personalized Learning</span>
                </div>
                <div class="flex items-center">
                  <div class="w-2 h-2 bg-[#002261] rounded-full mr-2"></div>
                  <span class="text-sm text-gray-700">Small Class Sizes</span>
                </div>
                <div class="flex items-center">
                  <div class="w-2 h-2 bg-[#002261] rounded-full mr-2"></div>
                  <span class="text-sm text-gray-700">Expert Teachers</span>
                </div>
                <div class="flex items-center">
                  <div class="w-2 h-2 bg-[#002261] rounded-full mr-2"></div>
                  <span class="text-sm text-gray-700">Advanced Curriculum</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ITEM 2 -->
        <div class="whyus-item relative" :class="{ 'opacity-0 translate-y-10 transition-all duration-1000 ease-out': !visibleSections[1], 'opacity-100 translate-y-0 transition-all duration-1000 ease-out': visibleSections[1] }">
          <!-- Background accent shape -->
          <div class="absolute -z-10 rounded-full bg-blue-50 w-64 h-64 -right-20 -top-10 opacity-50"></div>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <!-- Left content column -->
            <div class="order-2 lg:order-1">
              <h3
                class="text-2xl lg:text-3xl text-[#002261] font-bold mb-5"
                v-text="whyus[1]?.data.title"
                :contenteditable="isEdit"
                @blur="() => handleChange(whyus[1]?.id, 'title', whyus[1]?.id + whyus[1]?.data.title)"
                :id="whyus[1]?.id + whyus[1]?.data.title"
              ></h3>
              
              <div class="w-16 h-1 bg-[#4a7aff] mb-5 rounded"></div>
              
              <p
                class="text-lg text-gray-700 leading-relaxed"
                :contenteditable="isEdit"
                @blur="() => handleChange(whyus[1]?.id, 'description', whyus[1]?.id + 'description')"
                :id="whyus[1]?.id + 'description'"
              >
                {{ whyus[1]?.data.description }}
              </p>
              
              <!-- Feature highlights -->
              <div class="mt-6 grid grid-cols-2 gap-3">
                <div class="flex items-center">
                  <div class="w-2 h-2 bg-[#002261] rounded-full mr-2"></div>
                  <span class="text-sm text-gray-700">Student-Centered</span>
                </div>
                <div class="flex items-center">
                  <div class="w-2 h-2 bg-[#002261] rounded-full mr-2"></div>
                  <span class="text-sm text-gray-700">Innovative Teaching</span>
                </div>
                <div class="flex items-center">
                  <div class="w-2 h-2 bg-[#002261] rounded-full mr-2"></div>
                  <span class="text-sm text-gray-700">Research-Based</span>
                </div>
                <div class="flex items-center">
                  <div class="w-2 h-2 bg-[#002261] rounded-full mr-2"></div>
                  <span class="text-sm text-gray-700">Proven Results</span>
                </div>
              </div>
            </div>
            
            <!-- Right image column -->
            <div class="relative overflow-hidden group order-1 lg:order-2">
              <div class="absolute -z-10 top-0 left-0 w-32 h-32 bg-[#002261] opacity-10 rounded-full transform -translate-x-16 -translate-y-16"></div>
              
              <img
                :src="imageUrl && imageUrl[1] ? imageUrl[1] : whyusimages[1]"
                class="w-full h-[400px] object-cover rounded-xl shadow-lg transform transition-transform duration-500 group-hover:scale-[1.02]"
                alt="Educational methodology"
                v-if="whyusimages && whyusimages[1]"
              />
              <img
                src="/img/mph.jpg"
                class="w-full h-[400px] object-cover rounded-xl shadow-lg"
                alt="Educational methodology"
                v-else
              />
              
              <div class="absolute top-4 right-4 bg-[#002261] text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl shadow-md">2</div>
              
              <UploadImage
                name="image2"
                v-if="isEdit && isLoggedIn"
                @uploadSuccess="(newUrl) => handleUploadSuccess(newUrl, 1)"
                folder="whyus"
              />
            </div>
          </div>
        </div>

        <!-- ITEM 3 -->
        <div class="whyus-item relative" :class="{ 'opacity-0 translate-y-10 transition-all duration-1000 ease-out': !visibleSections[2], 'opacity-100 translate-y-0 transition-all duration-1000 ease-out': visibleSections[2] }">
          <!-- Background accent shape -->
          <div class="absolute -z-10 rounded-full bg-blue-50 w-64 h-64 -left-20 -top-10 opacity-50"></div>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <!-- Left image column -->
            <div class="relative overflow-hidden group">
              <div class="absolute -z-10 top-0 right-0 w-32 h-32 bg-[#002261] opacity-10 rounded-full transform translate-x-16 -translate-y-16"></div>
              
              <img
                :src="imageUrl && imageUrl[2] ? imageUrl[2] : whyusimages[2]"
                class="w-full h-[400px] object-cover rounded-xl shadow-lg transform transition-transform duration-500 group-hover:scale-[1.02]"
                alt="Campus facilities"
                v-if="whyusimages && whyusimages[2]"
              />
              <img
                src="/img/mph.jpg"
                class="w-full h-[400px] object-cover rounded-xl shadow-lg"
                alt="Campus facilities"
                v-else
              />
              
              <div class="absolute top-4 left-4 bg-[#002261] text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl shadow-md">3</div>
              
              <UploadImage
                name="image3"
                v-if="isEdit && isLoggedIn"
                @uploadSuccess="(newUrl) => handleUploadSuccess(newUrl, 2)"
                folder="whyus"
              />
            </div>
            
            <!-- Right content column -->
            <div class="pl-0 lg:pl-8">
              <h3
                class="text-2xl lg:text-3xl text-[#002261] font-bold mb-5"
                v-text="whyus[2]?.data.title"
                :contenteditable="isEdit"
                @blur="() => handleChange(whyus[2]?.id, 'title', whyus[2]?.id + whyus[2]?.data.title)"
                :id="whyus[2]?.id + whyus[2]?.data.title"
              ></h3>
              
              <div class="w-16 h-1 bg-[#4a7aff] mb-5 rounded"></div>
              
              <p
                class="text-lg text-gray-700 leading-relaxed"
                :contenteditable="isEdit"
                @blur="() => handleChange(whyus[2]?.id, 'description', whyus[2]?.id + 'description')"
                :id="whyus[2]?.id + 'description'"
              >
                {{ whyus[2]?.data.description }}
              </p>
              
              <!-- Feature highlights -->
              <div class="mt-6 grid grid-cols-2 gap-3">
                <div class="flex items-center">
                  <div class="w-2 h-2 bg-[#002261] rounded-full mr-2"></div>
                  <span class="text-sm text-gray-700">Modern Facilities</span>
                </div>
                <div class="flex items-center">
                  <div class="w-2 h-2 bg-[#002261] rounded-full mr-2"></div>
                  <span class="text-sm text-gray-700">Technology Integration</span>
                </div>
                <div class="flex items-center">
                  <div class="w-2 h-2 bg-[#002261] rounded-full mr-2"></div>
                  <span class="text-sm text-gray-700">Safe Environment</span>
                </div>
                <div class="flex items-center">
                  <div class="w-2 h-2 bg-[#002261] rounded-full mr-2"></div>
                  <span class="text-sm text-gray-700">Specialized Spaces</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ITEM 4 -->
        <div class="whyus-item relative" :class="{ 'opacity-0 translate-y-10 transition-all duration-1000 ease-out': !visibleSections[3], 'opacity-100 translate-y-0 transition-all duration-1000 ease-out': visibleSections[3] }">
          <!-- Background accent shape -->
          <div class="absolute -z-10 rounded-full bg-blue-50 w-64 h-64 -right-20 -top-10 opacity-50"></div>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <!-- Left content column -->
            <div class="order-2 lg:order-1">
              <h3
                class="text-2xl lg:text-3xl text-[#002261] font-bold mb-5"
                v-text="whyus[3]?.data.title"
                :contenteditable="isEdit"
                @blur="() => handleChange(whyus[3]?.id, 'title', whyus[3]?.id + whyus[3]?.data.title)"
                :id="whyus[3]?.id + whyus[3]?.data.title"
              ></h3>
              
              <div class="w-16 h-1 bg-[#4a7aff] mb-5 rounded"></div>
              
              <p
                class="text-lg text-gray-700 leading-relaxed"
                :contenteditable="isEdit"
                @blur="() => handleChange(whyus[3]?.id, 'description', whyus[3]?.id + 'description')"
                :id="whyus[3]?.id + 'description'"
              >
                {{ whyus[3]?.data.description }}
              </p>
              
              <!-- Feature highlights -->
              <div class="mt-6 grid grid-cols-2 gap-3">
                <div class="flex items-center">
                  <div class="w-2 h-2 bg-[#002261] rounded-full mr-2"></div>
                  <span class="text-sm text-gray-700">Diverse Programs</span>
                </div>
                <div class="flex items-center">
                  <div class="w-2 h-2 bg-[#002261] rounded-full mr-2"></div>
                  <span class="text-sm text-gray-700">Talent Development</span>
                </div>
                <div class="flex items-center">
                  <div class="w-2 h-2 bg-[#002261] rounded-full mr-2"></div>
                  <span class="text-sm text-gray-700">Cultural Activities</span>
                </div>
                <div class="flex items-center">
                  <div class="w-2 h-2 bg-[#002261] rounded-full mr-2"></div>
                  <span class="text-sm text-gray-700">Holistic Education</span>
                </div>
              </div>
            </div>
            
            <!-- Right image column -->
            <div class="relative overflow-hidden group order-1 lg:order-2">
              <div class="absolute -z-10 top-0 left-0 w-32 h-32 bg-[#002261] opacity-10 rounded-full transform -translate-x-16 -translate-y-16"></div>
              
              <img
                :src="imageUrl && imageUrl[3] ? imageUrl[3] : whyusimages[3]"
                class="w-full h-[400px] object-cover rounded-xl shadow-lg transform transition-transform duration-500 group-hover:scale-[1.02]"
                alt="Extracurricular activities"
                v-if="whyusimages && whyusimages[3]"
              />
              <img
                src="/img/mph.jpg"
                class="w-full h-[400px] object-cover rounded-xl shadow-lg"
                alt="Extracurricular activities"
                v-else
              />
              
              <div class="absolute top-4 right-4 bg-[#002261] text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl shadow-md">4</div>
              
              <UploadImage
                name="image4"
                v-if="isEdit && isLoggedIn"
                @uploadSuccess="(newUrl) => handleUploadSuccess(newUrl, 3)"
                folder="whyus"
              />
            </div>
          </div>
        </div>

        <!-- ITEM 5 -->
        <div class="whyus-item relative" :class="{ 'opacity-0 translate-y-10 transition-all duration-1000 ease-out': !visibleSections[4], 'opacity-100 translate-y-0 transition-all duration-1000 ease-out': visibleSections[4] }">
          <!-- Background accent shape -->
          <div class="absolute -z-10 rounded-full bg-blue-50 w-64 h-64 -left-20 -top-10 opacity-50"></div>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <!-- Left image column -->
            <div class="relative overflow-hidden group">
              <div class="absolute -z-10 top-0 right-0 w-32 h-32 bg-[#002261] opacity-10 rounded-full transform translate-x-16 -translate-y-16"></div>
              
              <img
                :src="imageUrl && imageUrl[4] ? imageUrl[4] : whyusimages[4]"
                class="w-full h-[400px] object-cover rounded-xl shadow-lg transform transition-transform duration-500 group-hover:scale-[1.02]"
                alt="Community engagement"
                v-if="whyusimages && whyusimages[4]"
              />
              <img
                src="/img/mph.jpg"
                class="w-full h-[400px] object-cover rounded-xl shadow-lg"
                alt="Community engagement"
                v-else
              />
              
              <div class="absolute top-4 left-4 bg-[#002261] text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl shadow-md">5</div>
              
              <UploadImage
                name="image5"
                v-if="isEdit && isLoggedIn"
                folder="whyus"
                @uploadSuccess="(newUrl) => handleUploadSuccess(newUrl, 4)"
              />
            </div>
            
            <!-- Right content column -->
            <div class="pl-0 lg:pl-8">
              <h3
                class="text-2xl lg:text-3xl text-[#002261] font-bold mb-5"
                v-text="whyus[4]?.data.title"
                :contenteditable="isEdit"
                @blur="() => handleChange(whyus[4]?.id, 'title', whyus[4]?.id + whyus[4]?.data.title)"
                :id="whyus[4]?.id + whyus[4]?.data.title"
              ></h3>
              
              <div class="w-16 h-1 bg-[#4a7aff] mb-5 rounded"></div>
              
              <p
                class="text-lg text-gray-700 leading-relaxed"
                :contenteditable="isEdit"
                @blur="() => handleChange(whyus[4]?.id, 'description', whyus[4]?.id + 'description')"
                :id="whyus[4]?.id + 'description'"
              >
                {{ whyus[4]?.data.description }}
              </p>
              
              <!-- Feature highlights -->
              <div class="mt-6 grid grid-cols-2 gap-3">
                <div class="flex items-center">
                  <div class="w-2 h-2 bg-[#002261] rounded-full mr-2"></div>
                  <span class="text-sm text-gray-700">Parent Involvement</span>
                </div>
                <div class="flex items-center">
                  <div class="w-2 h-2 bg-[#002261] rounded-full mr-2"></div>
                  <span class="text-sm text-gray-700">Community Service</span>
                </div>
                <div class="flex items-center">
                  <div class="w-2 h-2 bg-[#002261] rounded-full mr-2"></div>
                  <span class="text-sm text-gray-700">Local Partnerships</span>
                </div>
                <div class="flex items-center">
                  <div class="w-2 h-2 bg-[#002261] rounded-full mr-2"></div>
                  <span class="text-sm text-gray-700">Global Perspective</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Call to action section -->
      <div class="mt-24 text-center">
        <div class="bg-gradient-to-r from-[#002261] to-[#0042b8] rounded-xl p-8 lg:p-12 shadow-lg">
          <h3 class="text-white text-2xl lg:text-3xl font-bold mb-4">Ready to join our school community?</h3>
          <p class="text-blue-100 mb-8 max-w-2xl mx-auto">Experience firsthand the educational excellence and caring environment that sets our school apart.</p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#" class="px-8 py-3 bg-white text-[#002261] rounded-lg font-medium hover:bg-blue-50 transition-colors duration-300">Schedule a Visit</a>
            <a href="#" class="px-8 py-3 bg-transparent border border-white text-white rounded-lg font-medium hover:bg-white/10 transition-colors duration-300">Apply Now</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>