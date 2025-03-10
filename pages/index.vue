<script setup>
// Refined imports and reactive state management
import { ref, reactive, onMounted, computed } from 'vue';
import { useRouter, useNuxtApp } from 'nuxt/app';

// User authentication state
const user = ref(null);
const isEdit = ref(false);
const isLoggedIn = computed(() => !!user.value);

// Credentials for login (should be moved to a login component)
const creds = reactive({
  email: 'test@123.com',
  password: '123456',
});

// Navigation state
const activeSection = ref('home');
const mobileMenuOpen = ref(false);

// Application setup
const router = useRouter();
const nuxtApp = useNuxtApp();

// Data fetching utilities
const fetchCollectionData = nuxtApp.$fetchCollection;
const getImagesFromDirectory = nuxtApp.$getImagesFromDirectory;
const updatedData = nuxtApp.$updateMenu;

// Content state
const content = ref(null);
const images = ref(null);

// Theme configuration - centralized for easy updates
const theme = reactive({
  colors: {
    primary: '#002261',
    secondary: '#FE0A09',
    accent: '#e3f2fd',
    light: '#ffffff',
    dark: '#212121',
  },
  fonts: {
    heading: '"Montserrat", sans-serif',
    body: '"Open Sans", sans-serif',
  },
  borderRadius: {
    small: '8px',
    medium: '14px',
    large: '24px',
    xl: '49px',
    circle: '50%',
  },
  spacing: {
    section: '80px',
  },
  shadows: {
    default: '0 4px 6px rgba(0, 0, 0, 0.1)',
    elevated: '0 10px 25px rgba(0, 0, 0, 0.1)',
  },
  transitions: {
    default: 'all 0.3s ease',
  }
});

// Authentication functions
async function logout() {
  try {
    await nuxtApp.$auth.signOut();
    window.localStorage.removeItem('user');
    user.value = null;
    router.push('/login');
  } catch (error) {
    console.error('Logout error:', error);
  }
}

// Content management
async function handleChange(id, elID) {
  const editableParagraph = document.getElementById(elID);
  if (editableParagraph && editableParagraph.innerText.trim().length > 0) {
    await updatedData('home', id, {
      text: editableParagraph.innerText.trim(),
    });
  }
}

// Scroll to section helper
function scrollToSection(sectionId) {
  mobileMenuOpen.value = false;
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
    activeSection.value = sectionId;
  }
}

// Initialize data
onMounted(async () => {
  try {
    // Load content data
    const collectionData = await fetchCollectionData('home', 'order');
    content.value = collectionData;
    
    // Load images
    images.value = await getImagesFromDirectory('images');
    
    // Load user data
    const userData = window.localStorage.getItem('user');
    if (userData) {
      user.value = JSON.parse(userData);
    }
    
    // Set up scroll observer for active section highlighting
    setupScrollObserver();
  } catch (error) {
    console.error('Error initializing page data:', error);
  }
});

// Observer to highlight active navigation item based on scroll
function setupScrollObserver() {
  const sections = document.querySelectorAll('section[id]');
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id;
        }
      });
    },
    { threshold: 0.3 }
  );
  
  sections.forEach(section => {
    navObserver.observe(section);
  });
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header Navigation -->
    <header 
      class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      :class="{'bg-white shadow-lg': activeSection !== 'home', 'bg-transparent': activeSection === 'home'}"
    >
      <div class="container mx-auto px-4 lg:px-8">
        <nav class="flex items-center justify-between h-20 lg:h-24">
          <!-- Logo -->
          <div class="flex items-center">
            <div class="relative h-16 w-16 lg:h-20 lg:w-20 flex-shrink-0">
              <div class="absolute inset-0 rounded-full bg-gradient-to-b from-blue-800 to-blue-600 shadow-lg"></div>
              <div class="absolute inset-1 rounded-full bg-white flex items-center justify-center">
                <div class="h-full w-full rounded-full bg-cover bg-center bg-no-repeat bg-[url('/logo.png')]"></div>
              </div>
            </div>
            <div class="ml-3 lg:ml-4">
              <h1 class="text-xl lg:text-2xl font-bold text-blue-900 leading-tight">KAPSABET HIGHLANDS</h1>
              <p class="text-sm lg:text-base text-gray-600 font-light">SCHOOL</p>
            </div>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden lg:flex items-center space-x-8">
            <template v-if="content">
              <template v-for="item in content" :key="item.id">
                <a
                  v-if="!item.data.type"
                  href="#"
                  @click.prevent="scrollToSection(item.data.text.toLowerCase())"
                  :class="[
                    'text-base font-medium transition-colors hover:text-blue-600',
                    activeSection === item.data.text.toLowerCase() ? 'text-blue-600' : 'text-gray-700'
                  ]"
                  :id="item.id + 'home-nav'"
                  @blur="() => handleChange(item.id, item.id + 'home-nav')"
                  tabindex="1"
                  :contenteditable="isEdit"
                >{{ item.data.text }}</a>
                
                <a
                  v-if="item.data.type === 'button'"
                  href="#contact"
                  @click.prevent="scrollToSection('contact')"
                  class="px-6 py-2.5 bg-red-600 text-white rounded-md font-medium text-sm shadow-sm hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  :id="item.id + 'home-button'"
                  @blur="() => handleChange(item.id, item.id + 'home-button')"
                  tabindex="1"
                  :contenteditable="isEdit"
                >{{ item.data.text }}</a>
              </template>
            </template>

            <!-- Edit/Save Button for Admins -->
            <button
              v-if="isLoggedIn"
              @click="isEdit = !isEdit"
              class="px-4 py-2 bg-indigo-100 text-indigo-800 rounded-md font-medium text-sm hover:bg-indigo-200 transition-colors"
            >
              {{ isEdit ? 'Save Changes' : 'Edit Mode' }}
            </button>

            <!-- Authentication Button -->
            <button 
              v-if="isLoggedIn" 
              @click="logout"
              class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md font-medium text-sm hover:bg-gray-300 transition-colors"
            >
              Logout
            </button>
            <a 
              v-else 
              href="/login"
              class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md font-medium text-sm hover:bg-gray-300 transition-colors"
            >
              Login
            </a>
          </div>

          <!-- Mobile Menu Button -->
          <button 
            class="lg:hidden text-gray-700 focus:outline-none"
            @click="mobileMenuOpen = !mobileMenuOpen"
          >
            <svg 
              v-if="!mobileMenuOpen"
              xmlns="http://www.w3.org/2000/svg" 
              class="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg 
              v-else
              xmlns="http://www.w3.org/2000/svg" 
              class="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </nav>
      </div>
    </header>

    <!-- Mobile Navigation Menu -->
    <div 
      v-if="mobileMenuOpen"
      class="fixed inset-0 z-40 lg:hidden bg-white"
    >
      <div class="flex flex-col h-full">
        <div class="flex items-center justify-between p-4 border-b">
          <div class="flex items-center">
            <div class="h-12 w-12 rounded-full bg-gradient-to-b from-blue-800 to-blue-500 p-0.5">
              <div class="h-full w-full rounded-full bg-white bg-cover bg-center bg-[url('/logo.png')]"></div>
            </div>
            <div class="ml-3">
              <h1 class="text-lg font-bold text-blue-900">KAPSABET HIGHLANDS</h1>
              <p class="text-xs text-gray-600">SCHOOL</p>
            </div>
          </div>
          <button 
            class="text-gray-700"
            @click="mobileMenuOpen = false"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="flex-grow overflow-y-auto">
          <ul class="py-2" v-if="content">
            <li 
              v-for="item in content" 
              :key="item.id"
              class="border-b border-gray-100 last:border-b-0"
            >
              <a
                v-if="!item.data.type"
                @click="scrollToSection(item.data.text.toLowerCase())"
                class="block px-4 py-3 text-gray-800 hover:bg-gray-50 hover:text-blue-600"
                :class="{'text-blue-600 font-medium': activeSection === item.data.text.toLowerCase()}"
                :id="item.id + 'mobile-nav'"
                @blur="() => handleChange(item.id, item.id + 'mobile-nav')"
                tabindex="1"
                :contenteditable="isEdit"
              >
                {{ item.data.text }}
              </a>
              
              <a
                v-if="item.data.type === 'button'"
                @click="scrollToSection('contact')"
                class="block px-4 py-3 text-red-600 font-medium hover:bg-red-50"
                :id="item.id + 'mobile-button'"
                @blur="() => handleChange(item.id, item.id + 'mobile-button')"
                tabindex="1"
                :contenteditable="isEdit"
              >
                {{ item.data.text }}
              </a>
            </li>
          </ul>
          
          <div class="p-4 space-y-2">
            <button
              v-if="isLoggedIn"
              @click="isEdit = !isEdit"
              class="w-full px-4 py-2 bg-indigo-100 text-indigo-800 rounded-md font-medium text-sm hover:bg-indigo-200 transition-colors"
            >
              {{ isEdit ? 'Save Changes' : 'Edit Mode' }}
            </button>
            
            <button 
              v-if="isLoggedIn" 
              @click="logout"
              class="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-md font-medium text-sm hover:bg-gray-300 transition-colors"
            >
              Logout
            </button>
            <a 
              v-else 
              href="/login"
              class="block w-full px-4 py-2 bg-gray-200 text-center text-gray-800 rounded-md font-medium text-sm hover:bg-gray-300 transition-colors"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <main class="pt-20 lg:pt-24">
      <!-- Hero Section -->
      <section id="home" class="relative">
        <VueCarousel
          class="w-full"
          v-if="images"
          :images="images"
          :isEdit="isEdit"
          :isLoggedIn="isLoggedIn"
        />
        
        <!-- Hero Overlay -->
        <div class="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900/30 pointer-events-none"></div>
      </section>

      <!-- Features Section -->
      <section id="features" class="py-16 lg:py-24 bg-white">
        <div class="container mx-auto px-4 lg:px-8">
          <h2 class="text-3xl lg:text-4xl font-bold text-center text-blue-900 mb-12">
            Our <span class="text-red-600">Features</span>
          </h2>
          <Feature :isEdit="isEdit" :isLoggedIn="isLoggedIn" />
        </div>
      </section>

      <!-- Director's Message -->
      <section id="message" class="py-16 lg:py-24 bg-gray-50">
        <div class="container mx-auto px-4 lg:px-8">
          <h2 class="text-3xl lg:text-4xl font-bold text-center text-blue-900 mb-12">
            Director's <span class="text-red-600">Message</span>
          </h2>
          <DirectorsMessage :isEdit="isEdit" :isLoggedIn="isLoggedIn" />
        </div>
      </section>

      <!-- About Us -->
      <section id="about" class="py-16 lg:py-24 bg-white">
        <div class="container mx-auto px-4 lg:px-8">
          <h2 class="text-3xl lg:text-4xl font-bold text-center text-blue-900 mb-12">
            About <span class="text-red-600">Us</span>
          </h2>
          <Aboutus :isEdit="isEdit" :isLoggedIn="isLoggedIn" />
        </div>
      </section>

      <!-- Statistics -->
      <section id="statistics" class="py-16 lg:py-24 bg-blue-900 text-white">
        <div class="container mx-auto px-4 lg:px-8">
          <h2 class="text-3xl lg:text-4xl font-bold text-center text-white mb-12">
            Our <span class="text-red-400">Statistics</span>
          </h2>
          <Statistics :isEdit="isEdit" :isLoggedIn="isLoggedIn" />
        </div>
      </section>

      <!-- Why Us -->
      <section id="why-us" class="py-16 lg:py-24 bg-white">
        <div class="container mx-auto px-4 lg:px-8">
          <h2 class="text-3xl lg:text-4xl font-bold text-center text-blue-900 mb-12">
            Why <span class="text-red-600">Choose Us</span>
          </h2>
          <WhyUs :isEdit="isEdit" :isLoggedIn="isLoggedIn" />
        </div>
      </section>

      <!-- Gallery -->
      <section id="gallery" class="py-16 lg:py-24 bg-gray-50">
        <div class="container mx-auto px-4 lg:px-8">
          <h2 class="text-3xl lg:text-4xl font-bold text-center text-blue-900 mb-12">
            Our <span class="text-red-600">Gallery</span>
          </h2>
          <Gallery :isEdit="isEdit" :isLoggedIn="isLoggedIn" />
        </div>
      </section>

      <!-- Contact -->
      <section id="contact" class="py-16 lg:py-24 bg-white">
        <div class="container mx-auto px-4 lg:px-8">
          <h2 class="text-3xl lg:text-4xl font-bold text-center text-blue-900 mb-12">
            Contact <span class="text-red-600">Us</span>
          </h2>
          <Contact :isEdit="isEdit" :isLoggedIn="isLoggedIn" />
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="bg-blue-900 text-white pt-16 pb-8">
      <div class="container mx-auto px-4 lg:px-8">
        <!-- Footer Top -->
        <div class="flex flex-col lg:flex-row justify-between mb-12 gap-8">
          <!-- School Info -->
          <div class="lg:w-1/3">
            <div class="flex items-center mb-6">
              <div class="h-16 w-16 rounded-full bg-gradient-to-b from-blue-700 to-blue-500 p-0.5">
                <div class="h-full w-full rounded-full bg-white bg-cover bg-center bg-[url('/logo.png')]"></div>
              </div>
              <div class="ml-4">
                <h3 class="text-xl font-bold">KAPSABET HIGHLANDS</h3>
                <p class="text-blue-200">SCHOOL</p>
              </div>
            </div>
            <p class="text-blue-200 mb-4">
              Nurturing excellence and cultivating future leaders through quality education
              and holistic development.
            </p>
          </div>
          
          <!-- Quick Links -->
          <div>
            <h4 class="text-lg font-bold mb-4 border-b border-blue-800 pb-2">Quick Links</h4>
            <ul class="space-y-2" v-if="content">
              <li v-for="item in content.filter(i => !i.data.type)" :key="item.id">
                <a 
                  @click="scrollToSection(item.data.text.toLowerCase())"
                  class="text-blue-200 hover:text-white transition-colors"
                >
                  {{ item.data.text }}
                </a>
              </li>
            </ul>
          </div>
          
          <!-- Contact Information -->
          <div>
            <h4 class="text-lg font-bold mb-4 border-b border-blue-800 pb-2">Contact Information</h4>
            <ul class="space-y-2">
              <li class="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-blue-300 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                </svg>
                <span class="text-blue-200">Kapsabet, Kenya</span>
              </li>
              <li class="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-blue-300 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span class="text-blue-200">info@kapsabethighlands.co.ke</span>
              </li>
              <li class="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-blue-300 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span class="text-blue-200">+254 700 000000</span>
              </li>
            </ul>
          </div>
        </div>
        
        <!-- Footer Bottom -->
        <div class="pt-8 border-t border-blue-800 text-center text-blue-300 text-sm">
          <p>© {{ new Date().getFullYear() }} Kapsabet Highlands School. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Open+Sans:wght@300;400;500;600&display=swap');

:root {
  --primary-color: #002261;
  --secondary-color: #FE0A09;
  --accent-color: #e3f2fd;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Open Sans', sans-serif;
  color: #212121;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Montserrat', sans-serif;
}

/* Transitions */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #002261;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #001a4d;
}
</style>