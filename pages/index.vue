<script setup lang="ts">
import { createUserWithEmailAndPassword } from "firebase/auth";

const creds = reactive({
  email: "test@123.com",
  password: "123456",
});

const { user, registerUser, loginUser } = useFirebaseAuth();

// const userLoggedIN = await loginUser(creds.email, creds.password);

// console.log("User", user);
const nuxtApp = useNuxtApp();

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
  <div class="w-full flex flex-col py-4 lg:py-10 items-center justify-center">
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
          <li class="w-full px-5 py-2 hover:bg-gray-200 hover:text-red-500">
            <a href="#">Home</a>
          </li>

          <li class="w-full px-5 py-2 hover:bg-gray-200 hover:text-red-500">
            <a href="#about">About</a>
          </li>

          <li class="w-full px-5 py-2 hover:bg-gray-200 hover:text-red-500">
            <a href="#gallery">Gallery</a>
          </li>
          <li class="w-full px-5 py-2 hover:bg-gray-200 hover:text-red-500">
            <a href="#contact">Contact</a>
          </li>
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
        <div class="flex gap-6 items-center">
          <a href="#" class="text-[20px] text-[#000]">Home</a>
          <a href="#about" class="text-[20px] text-[#000]">About</a>
          <a href="#why-us" class="text-[20px] text-[#000]">Why Us</a>
          <a href="#gallery">Gallery</a>
          <a
            class="bg-[#FE0A09] text-white rounded-[14px] px-6 py-2 text-xl"
            href="#contact"
          >
            contact
          </a>
        </div>
      </div>
    </nav>

    <!-- HERO SECTION -->
    <VueCarousel class="my-10 lg:my-20" />

    <!-- FEATURE SECTION -->
    <div
      class="container px-4 rounded-[21px] -mt-[80px] lg:-mt-[160px] z-40 lg:px-20 w-full bg-white flex flex-wrap lg:flex-nowrap items-center lg:h-[170px] justify-between"
      style="box-shadow: 0px 4px 58px -9px rgba(0, 0, 0, 0.25)"
      id="features"
    >
      <!-- ITEM -->
      <div
        class="flex flex-col items-center p-4 px-6 cursor-pointer rounded-xl hover:bg-slate-200 gap-2 justify-center"
      >
        <svg
          width="55"
          height="55"
          class="h-10 w-10"
          viewBox="0 0 55 55"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.16669 36.6667C9.16669 38.6833 10.0604 40.4938 11.4584 41.7542V48.125H18.3334V43.5417H36.6667V48.125H43.5417V41.7542C44.9396 40.4938 45.8334 38.6833 45.8334 36.6667V13.75C45.8334 5.72918 37.6292 4.58334 27.5 4.58334C17.3709 4.58334 9.16669 5.72918 9.16669 13.75V36.6667ZM17.1875 38.9583C15.2854 38.9583 13.75 37.4229 13.75 35.5208C13.75 33.6188 15.2854 32.0833 17.1875 32.0833C19.0896 32.0833 20.625 33.6188 20.625 35.5208C20.625 37.4229 19.0896 38.9583 17.1875 38.9583ZM37.8125 38.9583C35.9104 38.9583 34.375 37.4229 34.375 35.5208C34.375 33.6188 35.9104 32.0833 37.8125 32.0833C39.7146 32.0833 41.25 33.6188 41.25 35.5208C41.25 37.4229 39.7146 38.9583 37.8125 38.9583ZM41.25 25.2083H13.75V13.75H41.25V25.2083Z"
            fill="#002261"
          />
        </svg>

        <span class="text-[#002261]">Transport</span>
      </div>

      <!-- ITEM -->
      <div
        class="flex flex-col items-center p-4 px-6 cursor-pointer rounded-xl hover:bg-slate-200 gap-2 justify-center"
      >
        <svg
          width="43"
          height="43"
          class="h-10 w-10"
          viewBox="0 0 43 43"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.79166 34.0417V16.125L14.3333 7.16666L26.875 16.125V17.3344C26.1882 17.6628 25.5462 18.0439 24.9489 18.4774C24.3517 18.911 23.7993 19.396 23.2917 19.9323V17.9167L14.3333 11.5562L5.37499 17.9167V30.4583H8.95832V21.5H19.7083V30.4583H19.8427C19.9323 31.0854 20.0667 31.6976 20.2458 32.2948C20.425 32.892 20.6489 33.4743 20.9177 34.0417H16.125V25.0833H12.5417V34.0417H1.79166ZM41.2083 1.79166V19.9323C40.7007 19.3948 40.1483 18.9092 39.551 18.4757C38.9538 18.0421 38.3118 17.6616 37.625 17.3344V5.37499H21.5V7.88332L17.9167 5.28541V1.79166H41.2083ZM30.4583 12.5417H34.0417V8.95832H30.4583V12.5417ZM32.25 37.625C29.7715 37.625 27.6585 36.7513 25.9111 35.0038C24.1636 33.2563 23.2905 31.1439 23.2917 28.6667C23.2917 26.1882 24.1654 24.0752 25.9129 22.3277C27.6603 20.5803 29.7727 19.7071 32.25 19.7083C34.7285 19.7083 36.8414 20.5821 38.5889 22.3295C40.3364 24.077 41.2095 26.1894 41.2083 28.6667C41.2083 31.1451 40.3346 33.2581 38.5871 35.0056C36.8396 36.753 34.7273 37.6262 32.25 37.625ZM31.3542 34.0417H33.1458V29.5625H37.625V27.7708H33.1458V23.2917H31.3542V27.7708H26.875V29.5625H31.3542V34.0417Z"
            fill="black"
          />
        </svg>

        <span class="text-[#002261]">Domitories</span>
      </div>

      <!-- ITEM -->
      <div
        class="flex flex-col items-center p-4 px-6 cursor-pointer rounded-xl hover:bg-slate-200 gap-2 justify-center"
      >
        <svg
          width="43"
          class="h-10 w-10"
          height="43"
          viewBox="0 0 43 43"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.79166 34.0417V16.125L14.3333 7.16666L26.875 16.125V17.3344C26.1882 17.6628 25.5462 18.0439 24.9489 18.4774C24.3517 18.911 23.7993 19.396 23.2917 19.9323V17.9167L14.3333 11.5562L5.37499 17.9167V30.4583H8.95832V21.5H19.7083V30.4583H19.8427C19.9323 31.0854 20.0667 31.6976 20.2458 32.2948C20.425 32.892 20.6489 33.4743 20.9177 34.0417H16.125V25.0833H12.5417V34.0417H1.79166ZM41.2083 1.79166V19.9323C40.7007 19.3948 40.1483 18.9092 39.551 18.4757C38.9538 18.0421 38.3118 17.6616 37.625 17.3344V5.37499H21.5V7.88332L17.9167 5.28541V1.79166H41.2083ZM30.4583 12.5417H34.0417V8.95832H30.4583V12.5417ZM32.25 37.625C29.7715 37.625 27.6585 36.7513 25.9111 35.0038C24.1636 33.2563 23.2905 31.1439 23.2917 28.6667C23.2917 26.1882 24.1654 24.0752 25.9129 22.3277C27.6603 20.5803 29.7727 19.7071 32.25 19.7083C34.7285 19.7083 36.8414 20.5821 38.5889 22.3295C40.3364 24.077 41.2095 26.1894 41.2083 28.6667C41.2083 31.1451 40.3346 33.2581 38.5871 35.0056C36.8396 36.753 34.7273 37.6262 32.25 37.625ZM31.3542 34.0417H33.1458V29.5625H37.625V27.7708H33.1458V23.2917H31.3542V27.7708H26.875V29.5625H31.3542V34.0417Z"
            fill="black"
          />
        </svg>

        <span class="text-[#002261]">ECD/Playgroup</span>
      </div>

      <!-- ITEM -->
      <div
        class="flex flex-col items-center p-4 px-6 cursor-pointer rounded-xl hover:bg-slate-200 gap-2 justify-center"
      >
        <svg
          width="45"
          class="h-10 w-10"
          height="45"
          viewBox="0 0 45 45"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M38.6648 34.6395C38.5664 32.4422 37.8246 31.0149 36.4816 29.7774C33.1277 26.6801 29.0848 23.7234 25.3617 21.0762C23.6355 19.8492 21.716 18.2285 19.7156 17.4797C16.8961 16.4215 13.7109 16.7977 10.691 17.2266C9.37265 17.4129 8.04726 17.6238 6.74648 17.9297C5.24179 18.2883 3.45586 18.7137 2.17969 19.6172C1.03359 20.4293 1.17422 21.4453 1.73672 22.3875C1.82109 22.8199 1.74023 23.2313 1.74375 23.6707C1.75078 24.5004 1.65586 25.3301 1.45547 26.1316C1.3289 26.6274 1.15664 27.1055 0.99492 27.5906C0.35156 29.468 2.12695 31.043 3.44179 32.1293C4.18008 32.7375 4.96758 33.2859 5.70937 33.8906C8.59219 36.2356 11.5453 38.3555 14.4949 40.5879C17.9508 43.207 19.2691 44.1176 23.5828 42.6445C24.7465 42.2473 25.9383 41.9309 27.1301 41.625C28.8176 41.1926 31.0605 40.7813 32.7023 40.2047C34.3652 39.6211 36.5133 38.8477 37.7332 37.5152C38.3449 36.8508 38.6051 35.8981 38.6086 35.0121C38.6508 34.9031 38.6719 34.7836 38.6648 34.6395Z"
            fill="white"
          />
          <path
            d="M4.70039 20.468C6.35976 19.7684 12.8812 18.7559 14.3191 18.5906C15.5391 18.45 17.0754 18.2531 18.2848 18.4324C18.7734 18.5133 20.3414 19.3324 21.9691 20.4398C25.2984 22.7039 34.0805 29.2887 34.6359 29.7984C34.7836 29.9356 35.9894 31.0852 35.3812 31.0781C34.766 31.0711 34.1508 31.1133 33.5426 31.1836C32.5019 31.3066 26.4305 32.7516 23.6742 33.4266C23.1293 33.5602 21.6527 33.8344 21.2449 33.9152C20.0918 34.1508 19.1461 33.7816 18.2039 33.1207C16.2387 31.7496 4.01132 22.3277 3.6914 21.6633C3.45937 21.1922 3.92695 20.7949 4.70039 20.468Z"
            fill="#BDCF46"
          />
          <path
            d="M38.9637 32.3332C38.584 31.3348 37.684 30.5437 36.8719 29.7914C33.1559 26.3601 29.25 23.5547 25.1578 20.6016C24.1066 19.8422 23.0766 19.1109 21.9832 18.4113C21.4418 18.0668 20.7703 17.775 20.1937 17.4867C18.2883 16.534 16.3055 16.6043 14.2453 16.8398C10.4941 17.2687 6.86953 17.3953 3.26953 18.6258C2.26758 18.9703 1.28672 19.4484 1.05468 20.6543C0.963278 21.143 1.23398 21.9691 1.40976 22.4121C1.54687 22.7496 0.393747 26.9754 0.221481 27.4816C-0.207425 28.7437 0.411325 29.8758 1.27265 30.8215C1.74375 31.3418 15.0117 41.5687 15.3457 41.8113C16.6113 42.743 17.6133 43.3793 18.6855 43.6887C20.0426 44.0789 21.5086 43.9312 23.7586 43.1648C24.6621 42.8555 31.9359 41.0519 35.9824 39.4523C37.3605 38.9074 38.1516 38.1762 38.475 37.8211C38.8687 37.3922 39.1219 36.8473 39.259 36.2742C39.3434 35.9262 39.3855 35.5641 39.3891 35.2125C39.4242 35.1035 39.2379 33.0539 38.9637 32.3332ZM4.70039 20.468C6.35976 19.7684 12.8812 18.7559 14.3191 18.5906C15.5391 18.45 17.0754 18.2531 18.2848 18.4324C18.7734 18.5133 20.3414 19.3324 21.9691 20.4398C25.2984 22.7039 34.0805 29.2887 34.6359 29.7984C34.7836 29.9355 35.9894 31.0852 35.3812 31.0781C34.766 31.0711 34.1508 31.1133 33.5426 31.1836C32.502 31.3066 26.4305 32.7516 23.6742 33.4266C23.1293 33.5602 21.6527 33.8344 21.2449 33.9152C20.0918 34.1508 19.1461 33.7816 18.2039 33.1207C16.2387 31.7496 4.01132 22.3277 3.6914 21.6633C3.45937 21.1922 3.92695 20.7949 4.70039 20.468ZM3.30117 30.2309C2.96015 29.8863 1.6207 29.0004 1.98633 27.8824C2.38007 26.673 2.75625 24.7148 2.84062 23.4246C4.35234 24.6375 18.4289 35.3812 19.3008 35.6309C19.8457 37.3254 19.8527 39.2273 19.248 40.9043C19.1637 41.1363 19.0969 41.3613 18.9984 41.5863C18.6117 41.4422 18.232 41.2383 17.8242 40.9887C17.1703 40.5809 4.44023 31.3805 3.30117 30.2309ZM36.116 37.2797C34.8504 38.1832 32.9414 38.5453 31.6898 38.9144C29.0109 39.709 26.3074 40.4332 23.6004 41.1223C22.7953 41.3262 21.9797 41.5723 21.157 41.7094C21.3082 41.3754 21.4383 41.0309 21.5297 40.6687C21.7723 39.7125 21.818 38.6859 21.7125 37.7051C21.6562 37.2023 21.6387 36.2848 21.5191 35.7996C21.6598 35.7891 24.975 35.0051 27.5941 34.3371C30.259 33.6586 33.3492 32.7199 35.202 32.6812C35.7555 32.6729 36.2944 32.8596 36.7242 33.2086C37.3711 33.7394 37.5187 34.7203 37.357 35.5008C37.2059 36.2672 36.7383 36.8367 36.116 37.2797Z"
            fill="#2F2F2F"
          />
          <path
            d="M8.38828 27.9703C10.3992 29.5137 15.6516 33.525 18.0633 35.3672C18.8297 35.9508 19.691 36.5555 21.4383 36.2391C23.1855 35.9227 34.084 33.0961 34.084 33.0961C35.0789 32.8359 36.1793 32.7656 37.1988 32.9027C37.568 32.952 37.9301 33.068 38.2605 33.2438C38.3766 33.307 38.4996 33.3703 38.6051 33.4547C38.6613 33.5004 38.7 33.5602 38.7598 33.6024C39.5648 34.1473 39.0727 32.5125 38.9812 32.291C38.7598 31.7531 38.4539 31.2504 38.1023 30.7863C37.8197 30.4198 37.5069 30.0776 37.1672 29.7633C33.4547 26.3356 29.3484 23.3684 25.2562 20.4152C24.2051 19.6559 23.168 18.8684 22.0746 18.1688C21.5332 17.8242 20.9848 17.4832 20.4117 17.1949C18.5027 16.2422 16.3687 16.3371 14.3086 16.5727C10.5574 17.0016 6.80625 17.2125 3.20625 18.4465C2.20078 18.791 0.987889 19.4344 0.762889 20.6473C0.671483 21.1359 0.671483 21.9867 1.53281 22.7496C2.15859 23.3051 5.7375 25.9348 8.38828 27.9703Z"
            fill="#BDCF46"
          />
          <path
            d="M44.1949 25.2984C44.0965 23.1012 43.3547 21.6738 42.0117 20.4363C38.6578 17.3391 34.6148 14.3824 30.8883 11.7351C29.1621 10.5082 27.2426 8.88749 25.2422 8.13866C22.4227 7.08046 19.2375 7.45663 16.2141 7.88554C14.8957 8.07187 13.5703 8.2828 12.273 8.58866C10.7684 8.94374 8.97891 9.37265 7.70274 10.2762C6.55664 11.0883 6.69727 12.1078 7.25977 13.0465C7.34414 13.4789 7.26328 13.8902 7.2668 14.3297C7.27383 15.1594 7.17891 15.9891 6.97852 16.7906C6.85196 17.2863 6.67969 17.7644 6.51797 18.2496C5.87813 20.1269 7.65352 21.6984 8.97188 22.7883C9.71016 23.3965 10.4977 23.9449 11.2395 24.5496C14.1188 26.8945 17.0754 29.0144 20.0215 31.2469C23.4773 33.866 24.7957 34.7766 29.1094 33.3035C30.2731 32.9062 31.4648 32.5898 32.6566 32.284C34.3441 31.8516 36.5836 31.4402 38.2289 30.8637C39.8918 30.2801 42.0398 29.5066 43.2598 28.1742C43.868 27.5098 44.1316 26.557 44.1387 25.6711C44.1809 25.5621 44.202 25.4391 44.1949 25.2984Z"
            fill="white"
          />
          <path
            d="M10.2305 11.127C11.8898 10.4274 18.4078 9.41486 19.8492 9.24962C21.0691 9.109 22.602 8.91212 23.8148 9.09142C24.3035 9.17228 25.8715 9.99142 27.4992 11.0988C30.8285 13.3629 39.6105 19.9477 40.1625 20.4574C40.3102 20.5945 41.5195 21.7442 40.9113 21.7371C40.2961 21.7301 39.6844 21.7723 39.0727 21.8426C38.0355 21.9656 31.9606 23.4106 29.2043 24.0856C28.6594 24.2192 27.1828 24.4934 26.775 24.5742C25.6219 24.8098 24.6762 24.4406 23.7305 23.7797C21.7652 22.4086 9.53789 12.9867 9.21797 12.3223C8.98946 11.8512 9.45703 11.4539 10.2305 11.127Z"
            fill="#BDCF46"
          />
          <path
            d="M44.4938 23.6883C44.1141 22.6863 43.2141 21.8953 42.402 21.1465C38.6895 17.7188 34.7836 14.9098 30.6879 11.9602C29.6332 11.2008 28.6066 10.4695 27.5133 9.77344C26.9684 9.42891 26.3004 9.13712 25.7238 8.84883C23.8113 7.8961 21.8355 7.96641 19.7719 8.20196C16.0242 8.63087 12.3996 8.75743 8.79961 9.99141C7.79766 10.3359 6.81328 10.8106 6.58477 12.0199C6.49336 12.5086 6.76055 13.3348 6.93984 13.7777C7.07695 14.1152 5.92383 18.341 5.75156 18.8438C5.32266 20.1059 5.94141 21.2379 6.80274 22.1871C7.27383 22.7074 20.5418 32.9344 20.8758 33.177C22.1414 34.1051 23.1434 34.7449 24.2156 35.0508C25.5691 35.4375 27.0387 35.2934 29.2887 34.527C30.1922 34.2176 37.466 32.4141 41.5125 30.818C42.8906 30.2731 43.6816 29.5383 44.0051 29.1867C44.3988 28.7578 44.652 28.2129 44.7926 27.6399C44.877 27.2918 44.9191 26.9297 44.9227 26.5781C44.9543 26.4586 44.768 24.409 44.4938 23.6883ZM10.2305 11.8231C11.8898 11.1234 18.4078 10.1145 19.8492 9.94571C21.0691 9.80157 22.602 9.60821 23.8148 9.78751C24.3035 9.86837 25.8715 10.6875 27.4992 11.7949C30.8285 14.059 39.6105 20.6438 40.1625 21.1535C40.3102 21.2906 41.5195 22.4402 40.9113 22.4332C40.2961 22.4262 39.6844 22.4649 39.0727 22.5387C38.0355 22.6617 31.9605 24.1102 29.2043 24.7816C28.6594 24.9152 27.1828 25.1859 26.775 25.2703C25.6219 25.5059 24.6762 25.1367 23.7305 24.4793C21.7652 23.1082 9.53789 13.6863 9.21797 13.0219C8.98945 12.5473 9.45703 12.15 10.2305 11.8231ZM8.83125 21.5859C8.49024 21.2414 7.15078 20.359 7.51641 19.2375C7.91016 18.0281 8.28633 16.0734 8.36719 14.7797C9.87891 15.9891 23.9555 26.7363 24.8273 26.9859C25.3723 28.6805 25.3793 30.5824 24.7746 32.2559C24.6902 32.4879 24.6234 32.7164 24.525 32.9379C24.1383 32.7938 23.7586 32.5898 23.3508 32.3402C22.7004 31.9359 9.97031 22.7356 8.83125 21.5859ZM41.6461 28.6348C40.3805 29.5348 38.4715 29.9004 37.2234 30.2731C34.5445 31.0676 31.841 31.7883 29.134 32.4809C28.3254 32.6883 27.5133 32.9309 26.6906 33.068C26.8418 32.734 26.9684 32.3895 27.0633 32.0273C27.3059 31.0676 27.3516 30.0445 27.2496 29.0637C27.1934 28.5609 27.1723 27.6469 27.0527 27.1582C27.1934 27.1477 30.5086 26.3637 33.1277 25.6957C35.7926 25.0172 38.8793 24.0785 40.7391 24.0398C41.4738 24.0258 42.0152 24.3668 42.2578 24.5672C42.9047 25.0981 43.0559 26.0789 42.8941 26.8594C42.7359 27.6223 42.2684 28.1918 41.6461 28.6348Z"
            fill="#2F2F2F"
          />
          <path
            d="M13.9184 18.6293C15.9293 20.1727 21.1816 24.184 23.5969 26.0262C24.3633 26.6133 25.2246 27.2144 26.9684 26.898C28.7121 26.5816 39.6141 23.7551 39.6141 23.7551C40.6305 23.4925 41.6878 23.4268 42.7289 23.5617C43.1016 23.6109 43.4637 23.7269 43.7906 23.9027C43.9066 23.966 44.0297 24.0293 44.1352 24.1137C44.1914 24.1594 44.2301 24.2191 44.2898 24.2578C45.0949 24.8027 44.5992 23.1715 44.5078 22.9465C44.2863 22.4086 43.9805 21.9059 43.6289 21.4418C43.3463 21.0753 43.0335 20.7331 42.6938 20.4187C38.9813 16.9945 34.8785 14.0273 30.7828 11.0742C29.7281 10.3148 28.6945 9.52734 27.6012 8.82773C27.0598 8.4832 26.5113 8.14218 25.9383 7.8539C24.0293 6.90117 21.8953 6.99609 19.8352 7.23163C16.084 7.66054 12.3328 7.87148 8.73281 9.10546C7.72735 9.44999 6.51797 10.0969 6.28945 11.3062C6.19805 11.7949 6.19805 12.6457 7.05938 13.4086C7.68867 13.9641 11.2676 16.5937 13.9184 18.6293Z"
            fill="#006CA2"
          />
          <path
            d="M40.7566 19.3219C40.6582 17.1246 39.9199 15.6973 38.5734 14.4598C35.2195 11.3625 31.1766 8.40585 27.4535 5.75858C25.7273 4.53163 23.8078 2.91093 21.8074 2.1621C18.9879 1.1039 15.7992 1.48007 12.7828 1.90897C11.4609 2.0953 10.1355 2.30624 8.83828 2.6121C7.33359 2.97069 5.54414 3.39608 4.26797 4.2996C3.12187 5.11171 3.2625 6.13124 3.825 7.06991C3.90586 7.50233 3.82851 7.91366 3.83203 8.35312C3.83906 9.1828 3.74414 10.0125 3.54023 10.8141C3.41719 11.3098 3.24492 11.7879 3.07969 12.273C2.43984 14.1504 4.21523 15.7219 5.53359 16.8117C6.27187 17.4199 7.05937 17.9684 7.80117 18.573C10.6805 20.918 13.6371 23.0379 16.5832 25.2703C20.0391 27.8894 21.3609 28.8 25.6746 27.3269C26.8383 26.9297 28.0266 26.6133 29.2219 26.3074C30.9094 25.875 33.1488 25.4637 34.7906 24.8871C36.457 24.3035 38.6016 23.5301 39.825 22.1976C40.4332 21.5332 40.6969 20.5805 40.7039 19.6945C40.7426 19.5855 40.7637 19.4625 40.7566 19.3219Z"
            fill="white"
          />
          <path
            d="M6.79219 5.15041C8.45156 4.4508 14.973 3.4383 16.4109 3.27306C17.6309 3.13244 19.1672 2.93556 20.3766 3.11486C20.8617 3.19572 22.4332 4.01486 24.0609 5.12228C27.3902 7.38634 36.1723 13.9711 36.7242 14.4809C36.8719 14.618 38.0777 15.7676 37.4695 15.7606C36.8543 15.7535 36.2426 15.7957 35.6309 15.866C34.5902 15.9891 28.5187 17.434 25.7625 18.109C25.2176 18.2426 23.741 18.5168 23.3332 18.5977C22.1801 18.8332 21.2344 18.4641 20.2887 17.8031C18.3234 16.432 6.09609 7.01017 5.77617 6.34572C5.55469 5.87111 6.01875 5.47384 6.79219 5.15041Z"
            fill="#BDCF46"
          />
          <path
            d="M41.0555 17.0121C40.6758 16.0137 39.7793 15.2227 38.9637 14.4703C35.2512 11.0426 31.3453 8.23712 27.2496 5.28399C26.1984 4.52462 25.1684 3.79337 24.075 3.09376C23.5336 2.74923 22.8621 2.45743 22.2855 2.16915C20.3766 1.21641 18.3973 1.28673 16.3371 1.52227C12.5859 1.95118 8.96484 2.07774 5.36133 3.31173C4.35937 3.65626 3.375 4.13087 3.14648 5.34024C3.05507 5.82891 3.32226 6.65509 3.50156 7.09805C3.63867 7.43555 2.48203 11.6613 2.31328 12.1676C1.88437 13.4297 2.50312 14.5617 3.36445 15.5074C3.83554 16.0277 17.1035 26.2547 17.4375 26.4973C18.7031 27.4289 19.7051 28.0652 20.7773 28.3711C22.1309 28.7613 23.6004 28.6137 25.8504 27.8473C26.7574 27.5379 34.0277 25.7344 38.0742 24.1348C39.4523 23.5898 40.2434 22.8586 40.5668 22.5035C40.9605 22.0746 41.2137 21.5297 41.3543 20.9566C41.4387 20.6086 41.4773 20.2465 41.4844 19.8949C41.516 19.7859 41.3297 17.7363 41.0555 17.0121ZM6.79218 5.1504C8.45156 4.45079 14.973 3.43829 16.4109 3.27305C17.6309 3.13243 19.1672 2.93555 20.3766 3.11485C20.8617 3.19571 22.4332 4.01485 24.0609 5.12227C27.3902 7.38633 36.1723 13.9711 36.7242 14.4809C36.8719 14.618 38.0777 15.7676 37.4695 15.7606C36.8543 15.7535 36.2426 15.7957 35.6309 15.866C34.5902 15.9891 28.5187 17.434 25.7625 18.109C25.2176 18.2426 23.741 18.5168 23.3332 18.5977C22.1801 18.8332 21.2344 18.4641 20.2887 17.8031C18.3234 16.432 6.09609 7.01016 5.77617 6.34571C5.55468 5.8711 6.01875 5.47383 6.79218 5.1504ZM5.39297 14.9133C5.05195 14.5688 3.7125 13.6828 4.07812 12.5649C4.47187 11.3555 4.84804 9.39727 4.93242 8.10704C6.44062 9.31993 20.5172 20.0637 21.3926 20.3133C21.9375 22.0078 21.9445 23.9098 21.3398 25.5867C21.2555 25.8188 21.1887 26.0438 21.0902 26.2688C20.7 26.1246 20.3238 25.9207 19.916 25.6711C19.2656 25.2633 6.53203 16.0594 5.39297 14.9133ZM38.2113 21.9586C36.9422 22.8586 35.0367 23.2242 33.7852 23.5934C31.1062 24.3879 28.4027 25.1121 25.6957 25.8012C24.8906 26.0051 24.075 26.2512 23.2523 26.3883C23.4035 26.0543 23.5336 25.7098 23.625 25.3477C23.8676 24.3914 23.9133 23.3648 23.8078 22.384C23.7516 21.8813 23.734 20.9637 23.6144 20.475C23.7551 20.4645 27.0703 19.6805 29.6894 19.016C32.3543 18.3375 35.4445 17.3988 37.3008 17.3602C37.8544 17.3519 38.3932 17.5385 38.823 17.8875C39.4699 18.4184 39.6176 19.3992 39.4559 20.1797C39.2977 20.9461 38.8301 21.5191 38.2113 21.9586Z"
            fill="#2F2F2F"
          />
          <path
            d="M10.4801 12.6492C12.4945 14.1926 17.7434 18.2039 20.1586 20.0461C20.925 20.6332 21.7863 21.2344 23.5301 20.918C25.2738 20.6016 36.1758 17.775 36.1758 17.775C37.1707 17.5148 38.2711 17.4445 39.2906 17.5816C39.6598 17.6309 40.0219 17.7469 40.3523 17.9226C40.4684 17.9859 40.5914 18.0492 40.6969 18.1336C40.7531 18.1793 40.7918 18.2391 40.8516 18.2812C41.6566 18.8262 41.1609 17.1914 41.0695 16.9699C40.848 16.432 40.5422 15.9293 40.1906 15.4652C39.9094 15.0996 39.5965 14.7586 39.259 14.4422C35.5465 11.0144 31.4402 8.04726 27.348 5.09413C26.2969 4.33476 25.2598 3.54726 24.1629 2.84765C23.6215 2.50663 23.0766 2.16562 22.5 1.87734C20.591 0.924603 18.457 1.01952 16.3969 1.25507C12.6457 1.68749 8.89804 1.89843 5.29804 3.1289C4.29258 3.47343 3.07968 4.12031 2.85117 5.32968C2.75976 5.81835 2.75976 6.66913 3.62109 7.43202C4.25039 7.98749 7.82929 10.6172 10.4801 12.6492Z"
            fill="#ED6C30"
          />
          <path
            d="M13.9395 8.62735C13.6336 8.59219 13.3383 8.5043 13.057 8.33907C12.491 8.00508 11.8547 7.51289 11.4996 6.99258C11.0812 6.38086 11.5699 6.15586 12.1852 6.00118C13.0359 5.79024 13.9113 5.65313 14.7867 5.53711C15.6867 5.41758 16.6078 5.34727 17.5078 5.22774C18.1969 5.13282 18.9035 5.06953 19.5855 5.00274C19.9969 4.96758 20.4328 4.89727 20.8371 5.02383C21.252 5.15391 21.6246 5.44219 21.941 5.71289C22.2926 6.01524 22.6723 6.29297 22.9641 6.64805C23.0449 6.75 23.1363 6.84493 23.1644 6.975C23.182 7.05235 23.1891 7.10157 23.1469 7.16836C23.0309 7.33711 22.718 7.45313 22.5211 7.47422C21.4312 7.59727 20.4012 7.90313 19.3289 8.09649C18.3832 8.26524 17.4023 8.30743 16.4461 8.41993C15.9574 8.47969 15.4652 8.51485 14.973 8.56407C14.6285 8.60274 14.291 8.66954 13.9395 8.62735Z"
            fill="white"
          />
        </svg>

        <span class="text-[#002261]">JSS</span>
      </div>

      <!-- ITEM -->
      <div
        class="flex flex-col items-center p-4 px-6 cursor-pointer rounded-xl hover:bg-slate-200 gap-2 justify-center"
      >
        <svg
          width="43"
          height="43"
          class="h-10 w-10"
          viewBox="0 0 43 43"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.79166 34.0417V16.125L14.3333 7.16666L26.875 16.125V17.3344C26.1882 17.6628 25.5462 18.0439 24.9489 18.4774C24.3517 18.911 23.7993 19.396 23.2917 19.9323V17.9167L14.3333 11.5562L5.37499 17.9167V30.4583H8.95832V21.5H19.7083V30.4583H19.8427C19.9323 31.0854 20.0667 31.6976 20.2458 32.2948C20.425 32.892 20.6489 33.4743 20.9177 34.0417H16.125V25.0833H12.5417V34.0417H1.79166ZM41.2083 1.79166V19.9323C40.7007 19.3948 40.1483 18.9092 39.551 18.4757C38.9538 18.0421 38.3118 17.6616 37.625 17.3344V5.37499H21.5V7.88332L17.9167 5.28541V1.79166H41.2083ZM30.4583 12.5417H34.0417V8.95832H30.4583V12.5417ZM32.25 37.625C29.7715 37.625 27.6585 36.7513 25.9111 35.0038C24.1636 33.2563 23.2905 31.1439 23.2917 28.6667C23.2917 26.1882 24.1654 24.0752 25.9129 22.3277C27.6603 20.5803 29.7727 19.7071 32.25 19.7083C34.7285 19.7083 36.8414 20.5821 38.5889 22.3295C40.3364 24.077 41.2095 26.1894 41.2083 28.6667C41.2083 31.1451 40.3346 33.2581 38.5871 35.0056C36.8396 36.753 34.7273 37.6262 32.25 37.625ZM31.3542 34.0417H33.1458V29.5625H37.625V27.7708H33.1458V23.2917H31.3542V27.7708H26.875V29.5625H31.3542V34.0417Z"
            fill="black"
          />
        </svg>

        <span class="text-[#002261]">MPH</span>
      </div>
    </div>

    <!-- DIRECTORS MESSAGE -->
    <div
      class="w-full bg-white lg:h-[596px] py-10 lg:py-0 flex lg:my-28 items-center lg:rounded-tl-[152px] lg:rounded-br-[152px]"
      id="director"
    >
      <div
        class="container px-4 lg:px-20 mx-auto flex flex-wrap lg:flex-nowrap gap-4 items-center justify-between"
      >
        <div
          class="logo z-50 flex-none p-4 aspect-square bg-gradient-to-b from-[#002261] to-[#fff] w-full lg:w-[447px] rounded-full flex items-center justify-center"
        >
          <div
            class="h-full w-full rounded-full blur-3xl bg-cover bg-no-repeat bg-white bg-[url('/img/director.jpg')]"
          ></div>
        </div>

        <div class="w-full lg:w-1/2">
          <h4 class="text-xl text-[#002261] mb-4 lg:text-5xl font-bold">
            DIRECTORS MESSAGE
          </h4>

          <p class="font-light text-[24px] lg:text-[28px] mb-6">
            "Welcome to Kapsabet Highlands School, where we believe in nurturing
            young minds to reach for the highest peaks of knowledge. With a
            dedicated team, modern facilities, and a holistic approach to
            education, we're committed to shaping well-rounded individuals
            primed for a bright future. Explore, learn, and grow with us!"
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
            <b class="text-[33px]"> Mrs. Kimaru</b>
          </div>
        </div>
      </div>
    </div>
    <!-- ABOUT US -->
    <div class="w-full py-10 lg:py-20" id="about">
      <div
        class="container px-4 lg:px-20 mx-auto flex flex-wrap lg:flex-nowrap gap-4 items-center"
      >
        <div class="w-full lg:w-1/2">
          <h4
            class="text-xl text-center text-[#002261] mb-4 lg:mb-10 lg:text-5xl font-bold"
          >
            ABOUT US
          </h4>

          <div class="space-y-2 text-lg">
            <p>
              Kapsabet Highlands School stands as a beacon of quality education,
              embracing both day and boarding students within the 8-4-4 system.
              Nestled 600m from Chepterit Shopping Center, our serene location
              along Chepterit–Baraton Road, off Eldoret–Kapsabet Road, provides
              an optimal environment for learning, just 10km from Kapsabet
              township towards Eldoret.
            </p>

            <p>
              Founded on the belief that a child's development encompasses
              academics, physicality, spirituality, and social growth, we
              provide a nurturing Christian atmosphere. Our vision encapsulates
              this aspiration: "nurturing a self-reliant child; providing
              quality education in a loving Christian environment." With
              outstanding physical facilities, students thrive in a peaceful
              backdrop conducive to holistic education.
            </p>

            <p>
              At Kapsabet Highlands School, we open our doors to children from
              all walks of life, dispelling the notion that certain segments
              cannot access private education. We prioritize dialogue with
              parents, ensuring feasible fee payment arrangements within each
              term. Central to our success is a robust prayer life, encouraging
              students to cultivate a spiritual foundation. Our well-structured
              day incorporates a diverse range of extracurricular activities,
              from sports to environmental and nature studies.
            </p>

            <p>
              We instill core values such as humility, obedience, honesty, and
              service to God and others in every pupil. Boarding life fosters an
              environment where each student unlocks their full potential across
              academic and personal realms. Here, young minds develop a spectrum
              of skills, talents, and qualities, paving the way for confident,
              poised members of society.
            </p>
            <p>
              Our esteemed Board of Directors, including Judge Mr. Justice L.
              Kimaru and legal expert Mr. Richard K. Cheruiyot, brings a wealth
              of experience to our management team. Guided by Director Mrs.
              Beatrice C. Cheruiyot, a seasoned educator with a B.Ed (Hons) from
              Moi University, and led by Mr. Paul Yegon, formerly of Gilgil
              Hills Academy, our school is supported by a motivated and capable
              teaching staff, dedicated to nurturing the leaders of tomorrow.
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
                class="h-full w-full rounded-full bg-cover bg-no-repeat bg-white bg-[url('/img/781A6109.jpg')]"
              ></div>
            </div>

            <!-- BOTTOM IMAGE -->
            <div
              class="absolute-logo-bottom absolute -bottom-[5rem] -left-2 lg:-left-8 z-50 flex-none p-4 h-[120px] aspect-square lg:h-[169px] bg-gradient-to-b from-[#002261] to-[#fff] lg:w-[169px] rounded-full flex items-center justify-center"
            >
              <div
                class="h-full w-full rounded-full bg-cover bg-no-repeat bg-white bg-[url('/img/781A6141.jpg')]"
              ></div>
            </div>

            <div
              class="h-full w-full rounded-full bg-cover bg-no-repeat bg-white bg-[url('/img/781A6167.jpg')]"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- STATISTICS -->
    <div
      class="w-full py-20 flex lg:h-[432px] items-center justify-center bg-white lg:rounded-tl-[152px] lg:rounded-br-[95px]"
      id="statistic"
    >
      <div
        class="container px-4 lg:px-20 mx-auto flex flex-wrap lg:flex-nowrap gap-4 justify-between"
      >
        <!-- ITEM -->
        <div
          class="w-[290px] h-[186px] flex rounded-tl-[41px] rounded-bl-[77px] rounded-r flex-col items-center justify-center"
          style="box-shadow: 0px 4px 64px -12px rgba(0, 0, 0, 0.1)"
        >
          <h4 class="font-extrabold text-[40px] mb-2 text-[#002261]">500</h4>
          <p class="text-[20px]">Total Enrollment</p>
        </div>

        <!-- ITEM -->
        <div
          class="w-[290px] h-[186px] flex rounded-tl-[41px] rounded-bl-[77px] rounded-r flex-col items-center justify-center"
          style="box-shadow: 0px 4px 64px -12px rgba(0, 0, 0, 0.1)"
        >
          <h4 class="font-extrabold text-[40px] mb-2 text-[#002261]">34</h4>
          <p class="text-[20px]">Teachers</p>
        </div>

        <!-- ITEM -->
        <div
          class="w-[290px] h-[186px] flex rounded-tl-[41px] rounded-bl-[77px] rounded-r flex-col items-center justify-center"
          style="box-shadow: 0px 4px 64px -12px rgba(0, 0, 0, 0.1)"
        >
          <h4 class="font-extrabold text-[40px] mb-2 text-[#002261]">4</h4>
          <p class="text-[20px]">School Buses</p>
        </div>

        <!-- ITEM -->
        <div
          class="w-[290px] h-[186px] flex rounded-tl-[41px] rounded-bl-[77px] rounded-r flex-col items-center justify-center"
          style="box-shadow: 0px 4px 64px -12px rgba(0, 0, 0, 0.1)"
        >
          <h4 class="font-extrabold text-[40px] mb-2 text-[#002261]">10</h4>
          <p class="text-[20px]">Support staff</p>
        </div>
      </div>
    </div>

    <div class="py-10 lg:py-20" id="why-us">
      <div
        class="container px-4 lg:px-20 mx-auto flex flex-col gap-20 lg:gap-40"
      >
        <div class="w-full flex items-center justify-center">
          <h4 class="text-3xl text-[#002261] mb- lg:text-5xl font-bold">
            WHY US
          </h4>
        </div>

        <!-- ITEM -->
        <div class="item flex flex-wrap lg:flex-nowrap gap-4 items-center">
          <div class="w-full lg:w-1/2 flex items-baseline gap-4">
            <div
              class="h-10 flex-none w-10 rounded-full bg-white flex items-center justify-center font-extrabold text-[23px] lg:text-[28px]"
            >
              1
            </div>
            <div class="pr-10">
              <h5
                class="text-[23px] lg:text-[33px] text-[#002261] font-bold mb-4"
              >
                Transport
              </h5>
              <p class="text-[18px] lg:text-[22px] text-[#616060]">
                Our school offers a safe and reliable transportation service for
                students. Our fleet of well-maintained vehicles is equipped with
                modern safety features and supervised by trained drivers. We
                cover a wide range of routes to ensure convenience for all our
                students, allowing them to commute comfortably to and from
                school. Safety is our top priority, and we strictly adhere to
                transportation guidelines to provide peace of mind for parents
                and guardians.
              </p>
            </div>
          </div>
          <div class="w-full lg:w-1/2 flex justify-center">
            <img
              src="/img/buses.jpg"
              class="h-[364px] lg:h-[464px] aspect-square object-cover rounded rounded-tl-[53px] lg:rounded-tl-[103px] rounded-br-[43px] lg:rounded-br-[83px]"
              alt=""
            />
          </div>
        </div>

        <!-- ITEM -->
        <div class="item flex flex-wrap lg:flex-nowrap gap-4 items-center">
          <div class="w-full lg:w-1/2 flex items-baseline gap-4">
            <div
              class="h-10 flex-none w-10 rounded-full bg-white flex items-center justify-center font-extrabold text-[23px] lg:text-[28px]"
            >
              2
            </div>
            <div class="pr-10">
              <h5
                class="text-[23px] lg:text-[33px] text-[#002261] font-bold mb-4"
              >
                Dormitories
              </h5>
              <p class="text-[18px] lg:text-[22px] text-[#616060]">
                For students seeking accommodation, our well-appointed
                dormitories provide a comfortable and secure living space. Each
                dormitory is supervised by experienced staff, ensuring a
                supportive and nurturing environment. We offer separate
                facilities for boys and girls, with spacious rooms and modern
                amenities. Our priority is to create a home-away-from-home
                atmosphere, fostering a sense of community and camaraderie among
                residents. Additionally, we maintain a strict code of conduct to
                ensure a conducive learning environment and a healthy work-life
                balance for our boarding students.
              </p>
            </div>
          </div>
          <div class="w-full lg:w-1/2 flex justify-center">
            <img
              src="/img/dorms.jpg"
              class="h-[364px] lg:h-[464px] aspect-square object-cover rounded rounded-tl-[53px] lg:rounded-tl-[103px] rounded-br-[43px] lg:rounded-br-[83px]"
              alt=""
            />
          </div>
        </div>

        <!-- ITEM -->
        <div class="item flex flex-wrap lg:flex-nowrap gap-4 items-center">
          <div class="w-full lg:w-1/2 flex items-baseline gap-4">
            <div
              class="h-10 flex-none w-10 rounded-full bg-white flex items-center justify-center font-extrabold text-[23px] lg:text-[28px]"
            >
              3
            </div>
            <div class="pr-10">
              <h5
                class="text-[23px] lg:text-[33px] text-[#002261] font-bold mb-4"
              >
                ECD/ Playgroup
              </h5>
              <p class="text-[18px] lg:text-[22px] text-[#616060]">
                Our Early Childhood Development (ECD) program focuses on
                providing a nurturing and stimulating environment for young
                learners. Through interactive play-based activities, we lay the
                foundation for a lifelong love of learning. Our dedicated
                teachers are trained to engage children in age-appropriate
                curriculum that promotes cognitive, social, and emotional
                development. Our ECD/playgroup classes are equipped with
                engaging learning materials, ensuring a fun and enriching
                experience for every child. We prioritize a child-centric
                approach, fostering creativity, curiosity, and confidence in our
                youngest learners.
              </p>
            </div>
          </div>
          <div class="w-full lg:w-1/2 flex justify-center">
            <img
              src="/img/playgroup.png"
              class="h-[364px] lg:h-[464px] aspect-square object-cover rounded rounded-tl-[53px] lg:rounded-tl-[103px] rounded-br-[43px] lg:rounded-br-[83px]"
              alt=""
            />
          </div>
        </div>

        <!-- ITEM -->
        <div class="item flex flex-wrap lg:flex-nowrap gap-4 items-center">
          <div class="w-full lg:w-1/2 flex items-baseline gap-4">
            <div
              class="h-10 flex-none w-10 rounded-full bg-white flex items-center justify-center font-extrabold text-[23px] lg:text-[28px]"
            >
              4
            </div>
            <div class="pr-10">
              <h5
                class="text-[23px] lg:text-[33px] text-[#002261] font-bold mb-4"
              >
                Junior Secondary
              </h5>
              <p class="text-[18px] lg:text-[22px] text-[#616060]">
                Our Junior Secondary program offers a well-rounded education
                tailored to the unique needs of early adolescents. We provide a
                comprehensive curriculum that balances academic rigor with
                holistic development. Our experienced educators create an
                inclusive and engaging learning environment, fostering critical
                thinking, communication skills, and character development.
                Through a range of subjects and extracurricular activities,
                students explore their interests and talents, preparing them for
                the challenges of higher education. We are committed to
                nurturing well-rounded individuals who are equipped with the
                skills and knowledge needed to excel in their academic journey.
              </p>
            </div>
          </div>
          <div class="w-full lg:w-1/2 flex justify-center">
            <img
              src="/img/781A6212.jpg"
              class="h-[364px] lg:h-[464px] aspect-square object-cover rounded rounded-tl-[53px] lg:rounded-tl-[103px] rounded-br-[43px] lg:rounded-br-[83px]"
              alt=""
            />
          </div>
        </div>

        <!-- ITEM -->
        <div class="item flex flex-wrap lg:flex-nowrap gap-4 items-center">
          <div class="w-full lg:w-1/2 flex items-baseline gap-4">
            <div
              class="h-10 flex-none w-10 rounded-full bg-white flex items-center justify-center font-extrabold text-[23px] lg:text-[28px]"
            >
              5
            </div>
            <div class="pr-10">
              <h5
                class="text-[23px] lg:text-[33px] text-[#002261] font-bold mb-4"
              >
                Multipurpose Hall
              </h5>
              <p class="text-[18px] lg:text-[22px] text-[#616060]">
                Our state-of-the-art Multipurpose Hall serves as the heart of
                our school community. This versatile space is designed to
                accommodate a wide range of activities, from assemblies and
                presentations to sports events and cultural performances.
                Equipped with modern audio-visual equipment and flexible seating
                arrangements, it provides an ideal setting for various school
                functions. The hall is a hub of creativity, where students
                showcase their talents and achievements. It also serves as a
                space for community events, reinforcing our commitment to
                inclusivity and shared experiences within and beyond the school.
              </p>
            </div>
          </div>
          <div class="w-full lg:w-1/2 flex justify-center">
            <img
              src="/img/mph.jpg"
              class="h-[364px] lg:h-[464px] aspect-square object-cover rounded rounded-tl-[53px] lg:rounded-tl-[103px] rounded-br-[43px] lg:rounded-br-[83px]"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>

    <div class="py-10 lg:py-20" id="gallery">
      <div
        class="container px-0 lg:px-20 mx-auto flex flex-col gap-10 lg:gap-40"
      >
        <div class="w-full px-4 flex items-center justify-center">
          <h4 class="text-3xl text-[#002261] mb- lg:text-5xl font-bold">
            GALLERY
          </h4>
        </div>

        <div class="w-full grid grid-cols-4 row-auto cols-1">
          <div class="1 row-span-3 flex">
            <img src="/img/781A5713.jpg" class="object-cover h-full w-full" />
          </div>
          <div class="flex w-full bg-black">
            <img src="/img/781A5728.jpg" class="object-cover h-full w-full" />
          </div>
          <div class="flex w-full bg-black">
            <img src="/img/781A5890.jpg" class="object-cover h-full w-full" />
          </div>
          <div class="row-span-2">
            <img src="/img/781A6109.jpg" class="object-cover h-full w-full" />
          </div>
          <div class="flex w-full bg-black">
            <img src="/img/781A6141.jpg" class="object-cover h-full w-full" />
          </div>
          <div class="flex w-full bg-black">
            <img src="/img/781A6167.jpg" class="object-cover h-full w-full" />
          </div>
          <div class="flex w-full bg-black">
            <img src="/img/781A6205.jpg" class="object-cover h-full w-full" />
          </div>
          <div class="flex w-full bg-black">
            <img src="/img/781A6210.jpg" class="object-cover h-full w-full" />
          </div>
          <div class="flex w-full bg-black">
            <img src="/img/781A6211.jpg" class="object-cover h-full w-full" />
          </div>

          <div class="col-span-2">
            <img src="/img/781A6212.jpg" class="object-cover h-full w-full" />
          </div>
          <div class="col-span-2">
            <img src="/img/781A6226.jpg" class="object-cover h-full w-full" />
          </div>
        </div>
      </div>
    </div>

    <div class="py-20 w-full bg-white" id="contact">
      <div class="container px-4 lg:px-20 mx-auto py-6">
        <h4
          class="text-[48px] text-[#002261] font-bold w-full text-center mb-10"
        >
          TALK TO US
        </h4>
        <div class="flex flex-wrap lg:flex-nowrap">
          <div class="w-full lg:w-1/2 flex flex-col gap-10">
            <div class="flex gap-4 items-center">
              <span class="flex gap-4 items-center">
                <svg
                  width="32"
                  height="32"
                  class="h-6 w-6"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_20_46)">
                    <path
                      d="M28.7378 5.33309C28.6166 5.32061 28.4945 5.32061 28.3733 5.33309H3.48442C3.3249 5.33555 3.16644 5.35947 3.01331 5.40421L15.8577 18.1953L28.7378 5.33309Z"
                      fill="black"
                    />
                    <path
                      d="M30.0534 6.56885L17.1111 19.4577C16.778 19.7888 16.3275 19.9747 15.8578 19.9747C15.3881 19.9747 14.9376 19.7888 14.6045 19.4577L1.7778 6.66663C1.73837 6.81155 1.71746 6.96089 1.71558 7.11107V24.8888C1.71558 25.3603 1.90288 25.8125 2.23628 26.1459C2.56967 26.4793 3.02186 26.6666 3.49335 26.6666H28.3822C28.8537 26.6666 29.3059 26.4793 29.6393 26.1459C29.9727 25.8125 30.16 25.3603 30.16 24.8888V7.11107C30.1529 6.92587 30.117 6.74292 30.0534 6.56885ZM4.71113 24.8888H3.47558V23.6177L9.9378 17.2088L11.1911 18.4622L4.71113 24.8888ZM28.3645 24.8888H27.12L20.64 18.4622L21.8934 17.2088L28.3556 23.6177L28.3645 24.8888Z"
                      fill="black"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_20_46">
                      <rect width="32" height="32" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </span>
              <span class="text-[#5A5A5A]">info@kabsabethighlands.com</span>
            </div>
            <div class="flex gap-4 items-center">
              <span>
                <svg
                  width="32"
                  height="32"
                  class="h-6 w-6"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_20_57)">
                    <path
                      d="M13.5289 18.3464C15.3844 20.2288 17.6296 21.6821 20.1067 22.6042L23.4578 19.9375C23.5571 19.8691 23.6749 19.8325 23.7956 19.8325C23.9162 19.8325 24.034 19.8691 24.1333 19.9375L30.3556 23.9464C30.5918 24.0885 30.7918 24.2835 30.9397 24.516C31.0876 24.7486 31.1794 25.0124 31.2078 25.2865C31.2363 25.5607 31.2006 25.8377 31.1036 26.0957C31.0066 26.3537 30.8509 26.5856 30.6489 26.7731L27.7333 29.6531C27.3158 30.0657 26.8026 30.3684 26.2396 30.5344C25.6766 30.7003 25.0812 30.7243 24.5067 30.6042C18.7753 29.4205 13.4926 26.6482 9.26224 22.6042C5.12578 18.52 2.26337 13.3232 1.02224 7.64421C0.89963 7.07856 0.92522 6.49082 1.09653 5.93797C1.26784 5.38511 1.57905 4.88588 2.00002 4.48866L5.02224 1.5731C5.20926 1.38091 5.43734 1.23352 5.68939 1.14197C5.94145 1.05042 6.21095 1.01707 6.47771 1.04443C6.74448 1.07179 7.0016 1.15915 7.22983 1.29996C7.45805 1.44078 7.65146 1.63139 7.79557 1.85755L11.9378 7.99977C12.0092 8.09622 12.0478 8.21307 12.0478 8.3331C12.0478 8.45313 12.0092 8.56999 11.9378 8.66644L9.2089 11.9464C10.1561 14.3739 11.6318 16.5601 13.5289 18.3464Z"
                      fill="black"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_20_57">
                      <rect width="32" height="32" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </span>
              <span class="text-[#5A5A5A]">0722000000</span>
            </div>
            <div class="flex gap-4 items-center">
              <svg
                width="32"
                height="32"
                class="h-6 w-6"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.6666 18.667H17.3333V14.667H21.3333V12.0003H17.3333V8.00033H14.6666V12.0003H10.6666V14.667H14.6666V18.667ZM16 29.3337C12.4222 26.2892 9.7502 23.4617 7.98398 20.851C6.21776 18.2403 5.3342 15.8234 5.33331 13.6003C5.33331 10.267 6.40576 7.61144 8.55065 5.63366C10.6955 3.65588 13.1786 2.66699 16 2.66699C18.8222 2.66699 21.3058 3.65588 23.4506 5.63366C25.5955 7.61144 26.6675 10.267 26.6666 13.6003C26.6666 15.8225 25.7831 18.2394 24.016 20.851C22.2489 23.4625 19.5769 26.2901 16 29.3337Z"
                  fill="black"
                />
              </svg>

              <span class="max-w-[16rem]">
                Chepterit Shopping Center, our serene location along
                Chepterit–Baraton Road, off Eldoret–Kapsabet Road</span
              >
            </div>
          </div>
          <div class="w-full lg:w-1/2">
            <div
              class="bg-[#FFF9F1] p-6 flex flex-col gap-10 rounded-xl max-w-[542px]"
            >
              <div class="group flex w-full">
                <input
                  type="text"
                  class="border flex w-full rounded border-[#FFA4A4] py-3 px-2"
                  placeholder="Your name"
                />
              </div>

              <div class="group flex w-full">
                <input
                  type="text"
                  class="border flex w-full rounded border-[#FFA4A4] py-3 px-2"
                  placeholder="Your phone"
                />
              </div>

              <div class="border flex w-full rounded border-[#FFA4A4]">
                <textarea
                  class="border-[#FFA4A4] w-full flex appearance-none p-2 h-[228px] rounded-sm"
                >
                </textarea>
              </div>

              <div class="flex justify-end">
                <button
                  class="px-3 py-2 rounded-xl text-white bg-[#FF5E5E] text-xl"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

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
