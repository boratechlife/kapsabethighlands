<script setup>
import { ref, onMounted, defineProps, computed } from 'vue';
import { useNuxtApp } from 'nuxt/app';

const props = defineProps({
  isEdit: Boolean,
  isLoggedIn: Boolean,
});

const nuxtApp = useNuxtApp();
const fetchCollectionData = nuxtApp.$fetchCollection;
const updatedData = nuxtApp.$updateMenu;

// Data management
const statisticData = ref(null);
const isLoading = ref(true);
const error = ref(null);

// Animation states
const countersAnimated = ref(false);
const observerInitialized = ref(false);

// Helper functions
const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Sorted statistics for consistent display
const sortedStatistics = computed(() => {
  if (!statisticData.value) return [];
  return [...statisticData.value].sort((a, b) => a.data.order - b.data.order);
});

// Initialize intersection observer for counter animation
const initIntersectionObserver = () => {
  if (observerInitialized.value || !statisticData.value) return;
  
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !countersAnimated.value) {
        animateCounters();
        countersAnimated.value = true;
      }
    },
    { threshold: 0.3 }
  );
  
  const statisticsSection = document.getElementById('statistics-section');
  if (statisticsSection) {
    observer.observe(statisticsSection);
    observerInitialized.value = true;
  }
};

// Animate the counter numbers
const animateCounters = () => {
  if (!statisticData.value) return;
  
  statisticData.value.forEach(stat => {
    const id = stat.id + stat.data.quantity;
    const targetElement = document.getElementById(id);
    const targetValue = stat.data.quantity;
    
    if (targetElement) {
      let startValue = 0;
      const duration = 2000; // 2 seconds
      const step = Math.ceil(targetValue / (duration / 20)); // Update every 20ms
      
      const counter = setInterval(() => {
        startValue += step;
        
        if (startValue > targetValue) {
          startValue = targetValue;
          clearInterval(counter);
        }
        
        targetElement.textContent = formatNumber(startValue);
      }, 20);
    }
  });
};

// Data fetching with error handling
onMounted(async () => {
  try {
    isLoading.value = true;
    const collectionData = await fetchCollectionData('statistics', '');
    statisticData.value = collectionData;
    
    // Add a small delay to ensure elements are rendered
    setTimeout(() => {
      initIntersectionObserver();
      isLoading.value = false;
    }, 300);
  } catch (err) {
    console.error('Error fetching statistics data:', err);
    error.value = 'Failed to load statistics data';
    isLoading.value = false;
  }
});

// Update data functions
async function handleChange(id, field, customId) {
  const editableParagraph = document.getElementById(customId);
  
  if (!editableParagraph || !editableParagraph.innerText.trim()) {
    return;
  }
  
  try {
    if (field === 'title') {
      await updatedData('statistics', id, {
        title: editableParagraph.innerText.trim()
      });
    } else if (field === 'quantity') {
      const value = parseInt(editableParagraph.innerText.replace(/,/g, ''), 10);
      if (!isNaN(value)) {
        await updatedData('statistics', id, {
          quantity: value
        });
      }
    }
  } catch (err) {
    console.error('Error updating statistics data:', err);
    // You could add user feedback here
  }
}
</script>

<template>
  <div 
    id="statistics-section"
    class="w-full py-12 lg:py-20"
  >
    <!-- Loading state -->
    <div v-if="isLoading" class="flex justify-center items-center h-48">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900"></div>
    </div>
    
    <!-- Error state -->
    <div v-else-if="error" class="flex justify-center items-center h-48">
      <div class="text-red-500 text-center">
        <p>{{ error }}</p>
        <button 
          @click="fetchStatisticsData" 
          class="mt-4 px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
    
    <!-- Statistics display -->
    <div 
      v-else-if="statisticData" 
      class="container mx-auto px-4 lg:px-8"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        <!-- Statistics Card -->
        <div 
          v-for="stat in sortedStatistics" 
          :key="stat.id"
          class="bg-white rounded-lg transform transition-all duration-300 hover:scale-105"
          :class="isEdit ? 'ring-2 ring-blue-200' : 'hover:shadow-xl'"
        >
          <div class="relative overflow-hidden rounded-lg">
            <!-- Card design element -->
            <div class="absolute top-0 left-0 w-16 h-16 bg-blue-900 opacity-10 rounded-br-3xl"></div>
            
            <!-- Card content -->
            <div class="p-8 flex flex-col items-center justify-center text-center h-48">
              <!-- Indicator for edit mode -->
              <div v-if="isEdit" class="absolute top-2 right-2 text-xs text-blue-500 bg-blue-50 px-2 py-1 rounded-full">
                Editable
              </div>
              
              <!-- Icon based on statistic type (you can customize these) -->
              <div class="mb-4">
                <svg v-if="stat.data.title.toLowerCase().includes('student')" xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                
                <svg v-else-if="stat.data.title.toLowerCase().includes('teacher')" xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                
                <svg v-else-if="stat.data.title.toLowerCase().includes('award')" xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              
              <!-- Statistic number -->
              <h4
                class="font-extrabold text-4xl lg:text-5xl mb-2 text-blue-900 transition-colors"
                :class="isEdit ? 'cursor-text hover:bg-blue-50' : ''"
                :contenteditable="isEdit"
                @blur="() => handleChange(stat.id, 'quantity', stat.id + stat.data.quantity)"
                :id="stat.id + stat.data.quantity"
              >
                {{ formatNumber(stat.data.quantity) }}
              </h4>
              
              <!-- Statistic title -->
              <p
                class="text-lg font-medium text-gray-700 transition-colors"
                :class="isEdit ? 'cursor-text hover:bg-blue-50' : ''"
                :contenteditable="isEdit"
                @blur="() => handleChange(stat.id, 'title', stat.id + stat.data.title)"
                :id="stat.id + stat.data.title"
              >
                {{ stat.data.title }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Card hover effect */
.rounded-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025);
}

/* Edit mode styles */
[contenteditable="true"] {
  outline: none;
  padding: 0.25rem;
  border-radius: 0.25rem;
}

[contenteditable="true"]:focus {
  background-color: rgba(219, 234, 254, 0.3); /* Light blue background when editing */
}

/* Animation for statistics */
@keyframes countUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-count-up {
  animation: countUp 0.5s ease-out forwards;
}
</style>