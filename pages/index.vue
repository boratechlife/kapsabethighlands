<script setup lang="ts">
// import { createUserWithEmailAndPassword } from "firebase/auth";

const creds = reactive({
  email: "test@123.com",
  password: "123456",
});

const user = ref(null);
const isEdit = ref(false);

onMounted(() => {
  user.value = JSON.parse(localStorage.getItem("user"));
});
// const { user, registerUser, loginUser } = useFirebaseAuth();

// const userLoggedIN = await loginUser(creds.email, creds.password);

// console.log("User", user);
const nuxtApp = useNuxtApp();
const content = nuxtApp.$homePageData?.documents;
const images = nuxtApp.$heroImages;

const updatedData = nuxtApp.$updateMenu as any;

async function handleChange(id: string, elID: string) {
  console.log("Chanhges", id);
  var editableParagraph = document.getElementById(elID) as HTMLElement;
  console.log("Content changed:", editableParagraph.innerText);
  if (editableParagraph.innerText && editableParagraph.innerText.length > 0) {
    await updatedData("home", id, {
      text: editableParagraph.innerText,
    });
  }
}

// await registerUser();
// async function registerUser() {
//   try {
//     const { user } = await createUserWithEmailAndPassword(
//       nuxtApp.$auth,
//       creds.email,
//       creds.password
//     );
//     console.log("REG", user);
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       // handle error
//     }
//   }
// }

const openMenu = ref(false);
</script>

<template>
  <div
    class="w-full flex flex-col py-4 lg:py-10 items-center justify-center"
    v-if="content"
  >
    <nav
      class="flex lg:max-w-[1122px] items-center w-full px-4 lg:px-0 justify-between lg:justify-normal"
      id="home"
    >
      <!-- MOBILE MENU -->
      <div
        v-if="openMenu"
        class="menu fixed right-0 py-4 rounded-tl-[36px] w-3/4 top-0 bottom-0 z-[99999] bg-white h-screen shadow"
      >
        <div class="flex px-4 text-red-400">
          <!-- MENU CLOSE BUTTON -->
          <button class="relative" @click="openMenu = false">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="m8.4 17l3.6-3.6l3.6 3.6l1.4-1.4l-3.6-3.6L17 8.4L15.6 7L12 10.6L8.4 7L7 8.4l3.6 3.6L7 15.6L8.4 17Zm3.6 5q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Z"
              />
            </svg>
          </button>
        </div>

        <ul class="flex flex-col gap-0 mt-6 text-lg divide-y">
          <template v-for="i in content">
            <li class="w-full px-5 py-2 hover:bg-gray-200 hover:text-red-500">
              <a
                class="text-[#002261]"
                contenteditable="true"
                :id="i.id + 'home-2'"
                @blur="() => handleChange(i.id, i.id + 'home-2')"
                tabindex="1"
              >
                {{ i.data.text }}
              </a>
            </li>
          </template>
        </ul>
      </div>
      <div
        class="logo lg:-mr-10 z-50 flex-none p-2 lg:p-4 h-[100px] aspect-square lg:h-[203px] bg-gradient-to-b from-[#002261] to-[#fff] lg:w-[203px] rounded-full flex items-center justify-center"
      >
        <div
          class="h-full w-full rounded-full bg-cover bg-no-repeat bg-white bg-[url('/logo.png')]"
        ></div>
      </div>

      <!-- MOBILE HUMBURGUR -->
      <div @click="openMenu = true">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 10h16M4 14h16M4 18h16"
          />
        </svg>
      </div>

      <div
        class="hidden bg-white w-full lg:w-[915px] rounded-[49px] h-[92px] justify-end lg:flex items-center"
      >
        <div class="flex gap-4 items-center">
          <template v-for="i in content">
            <a
              href="#"
              :id="i.id + 'home-3'"
              @blur="() => handleChange(i.id, i.id + 'home-3')"
              tabindex="1"
              :class="isEdit ? 'border rounded border-[#113]' : ''"
              class="text-[20px] text-[#000]"
              :contenteditable="isEdit"
              v-if="!i.data.type"
              >{{ i.data.text }}</a
            >
            <a
              class="bg-[#FE0A09] text-white rounded-[14px] px-6 py-2 text-xl"
              href="#contact"
              :id="i.id + 'home'"
              @blur="() => handleChange(i.id, i.id + 'home')"
              tabindex="1"
              :contenteditable="isEdit"
              v-if="i.data.type == 'button'"
            >
              {{ i.data.text }}
            </a>
          </template>

          <a
            class="bg-[#563ad454] text-white rounded-[14px] px-6 py-2 text-xl"
            @click.prevent="isEdit = true"
            v-if="user"
          >
            Edit
          </a>
        </div>
      </div>
    </nav>

    <!-- HERO SECTION -->
    <VueCarousel
      class="my-10 lg:my-20"
      v-if="images"
      :images="images"
      :isEdit="isEdit"
    />

    <!-- FEATURE SECTION -->
    <Feature />

    <!-- DIRECTORS MESSAGE -->
    <DirectorsMessage />
    <!-- ABOUT US -->
    <Aboutus />

    <!-- STATISTICS -->
    <Statistics />

    <WhyUs />

    <Gallery />

    <Contact />

    <footer class="py-20">
      <div class="container px-4 mx-auto lg:px-20">
        <div
          class="flex flex-wrap lg:flex-nowrap justify-center w-full gap-10 items-center"
        >
          <div>
            <div
              class="logo z-50 flex-none p-4 h-[203px] bg-gradient-to-b from-[#002261] to-[#fff] w-[203px] rounded-full flex items-center justify-center"
            >
              <div
                class="h-full w-full rounded-full bg-cover bg-no-repeat bg-white bg-[url('/logo.png')]"
              ></div>
            </div>
          </div>
          <div class="text-[43px] lg:text-[55px]">
            <h4 class="font-extrabold text-[#002261]">KAPSABET HIGHLANDS</h4>
            <h5 class="font-light">SCHOOL</h5>
          </div>
        </div>
        <div class="flex justify-center text-sm lg:text-base items-center">
          <span>copyright@2023 kapsabethighlands.co.ke</span>
        </div>
      </div>
    </footer>
  </div>
</template>
