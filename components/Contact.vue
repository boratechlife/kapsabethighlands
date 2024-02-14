<script setup>
const nuxtApp = useNuxtApp();
defineProps({
  isEdit: Boolean,
});

const contactus = nuxtApp.$contactus;

const updatedData = useNuxtApp().$updateMenu;

async function handleChange(id, field, customId) {
  console.log('Statistics', customId);
  var editableParagraph = document.getElementById(customId);

  console.log('Content changed:', editableParagraph.innerText);
  if (editableParagraph.innerText && editableParagraph.innerText.length > 0) {
    if (field == 'email') {
      await updatedData('contactus', id, {
        email: editableParagraph.innerText,
      });
    }
    if (field == 'phone') {
      await updatedData('contactus', id, {
        phone: editableParagraph.innerText,
      });
    }
    if (field == 'location') {
      await updatedData('contactus', id, {
        location: editableParagraph.innerText,
      });
    }
  }
}

console.log('COMPO-CONTACT', contactus);
</script>

<template>
  <div class="py-20 w-full bg-white" id="contact" v-if="contactus">
    <div class="container px-4 lg:px-20 mx-auto py-6">
      <h4 class="text-[48px] text-[#002261] font-bold w-full text-center mb-10">
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
            <span
              class="text-[#5A5A5A]"
              :contenteditable="isEdit"
              :id="contactus[0].id + 'contactus'"
              @blur="
                () =>
                  handleChange(
                    contactus[0].id,
                    'email',
                    contactus[0].id + 'contactus'
                  )
              "
              >{{ contactus[0].data.email }}</span
            >
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
            <span
              class="text-[#5A5A5A]"
              :contenteditable="isEdit"
              :id="contactus[0].id + 'phone'"
              @blur="
                () =>
                  handleChange(
                    contactus[0].id,
                    'phone',
                    contactus[0].id + 'phone'
                  )
              "
              >{{ contactus[0].data.phone }}</span
            >
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

            <span
              class="max-w-[16rem]"
              :contenteditable="isEdit"
              :id="contactus[0].id + 'location'"
              @blur="
                () =>
                  handleChange(
                    contactus[0].id,
                    'location',
                    contactus[0].id + 'location'
                  )
              "
            >
              {{ contactus[0].data.location }}</span
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
</template>
