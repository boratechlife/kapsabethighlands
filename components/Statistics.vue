<script setup>
const nuxtApp = useNuxtApp();
const updatedData = useNuxtApp().$updateMenu;
async function handleChange(id, field, customId) {
  console.log("Statistics", customId);
  var editableParagraph = document.getElementById(customId);

  console.log("Content changed:", editableParagraph.innerText);
  if (editableParagraph.innerText && editableParagraph.innerText.length > 0) {
    if (field == "title") {
      await updatedData("statistics", id, {
        title: editableParagraph.innerText,
      });
    }
    if (field == "quantity") {
      await updatedData("statistics", id, {
        quantity: parseInt(editableParagraph.innerText),
      });
    }
  }
}

console.log("STATS", nuxtApp.$statistics);
</script>

<template>
  <div
    class="w-full py-20 flex lg:h-[432px] items-center justify-center bg-white lg:rounded-tl-[152px] lg:rounded-br-[95px]"
    id="statistic"
    v-if="nuxtApp.$statistics"
  >
    <div
      class="container px-4 lg:px-20 mx-auto flex flex-wrap lg:flex-nowrap gap-4 justify-between"
    >
      <!-- ITEM -->
      <div
        class="w-[290px] h-[186px] flex rounded-tl-[41px] rounded-bl-[77px] rounded-r flex-col items-center justify-center"
        style="box-shadow: 0px 4px 64px -12px rgba(0, 0, 0, 0.1)"
      >
        <h4
          class="font-extrabold text-[40px] mb-2 text-[#002261]"
          contenteditable="true"
          @blur="
            () =>
              handleChange(
                nuxtApp.$statistics[1].id,
                'quantity',
                nuxtApp.$statistics[1].id + nuxtApp.$statistics[1].data.quantity
              )
          "
          :id="nuxtApp.$statistics[1].id + nuxtApp.$statistics[1].data.quantity"
        >
          {{ nuxtApp.$statistics[1].data.quantity }}
        </h4>
        <p
          class="text-[20px]"
          contenteditable="true"
          @blur="
            () =>
              handleChange(
                nuxtApp.$statistics[1].id,
                'title',
                nuxtApp.$statistics[1].id + nuxtApp.$statistics[1].data.title
              )
          "
          :id="nuxtApp.$statistics[1].id + nuxtApp.$statistics[1].data.title"
        >
          {{ nuxtApp.$statistics[1].data.title }}
        </p>
      </div>

      <!-- ITEM -->
      <div
        class="w-[290px] h-[186px] flex rounded-tl-[41px] rounded-bl-[77px] rounded-r flex-col items-center justify-center"
        style="box-shadow: 0px 4px 64px -12px rgba(0, 0, 0, 0.1)"
      >
        <h4
          class="font-extrabold text-[40px] mb-2 text-[#002261]"
          contenteditable="true"
          @blur="
            () =>
              handleChange(
                nuxtApp.$statistics[3].id,
                'quantity',
                nuxtApp.$statistics[3].id + nuxtApp.$statistics[3].data.quantity
              )
          "
          :id="nuxtApp.$statistics[3].id + nuxtApp.$statistics[3].data.quantity"
        >
          {{ nuxtApp.$statistics[3].data.quantity }}
        </h4>
        <p
          class="text-[20px]"
          contenteditable="true"
          @blur="
            () =>
              handleChange(
                nuxtApp.$statistics[3].id,
                'title',
                nuxtApp.$statistics[3].id + nuxtApp.$statistics[3].data.title
              )
          "
          :id="nuxtApp.$statistics[3].id + nuxtApp.$statistics[3].data.title"
        >
          {{ nuxtApp.$statistics[3].data.title }}
        </p>
      </div>

      <!-- ITEM -->
      <div
        class="w-[290px] h-[186px] flex rounded-tl-[41px] rounded-bl-[77px] rounded-r flex-col items-center justify-center"
        style="box-shadow: 0px 4px 64px -12px rgba(0, 0, 0, 0.1)"
      >
        <h4
          class="font-extrabold text-[40px] mb-2 text-[#002261]"
          contenteditable="true"
          @blur="
            () =>
              handleChange(
                nuxtApp.$statistics[2].id,
                'quantity',
                nuxtApp.$statistics[2].id + nuxtApp.$statistics[2].data.quantity
              )
          "
          :id="nuxtApp.$statistics[2].id + nuxtApp.$statistics[2].data.quantity"
        >
          {{ nuxtApp.$statistics[2].data.quantity }}
        </h4>
        <p
          class="text-[20px]"
          contenteditable="true"
          @blur="
            () =>
              handleChange(
                nuxtApp.$statistics[2].id,
                'title',
                nuxtApp.$statistics[2].id + nuxtApp.$statistics[2].data.title
              )
          "
          :id="nuxtApp.$statistics[2].id + nuxtApp.$statistics[2].data.title"
        >
          {{ nuxtApp.$statistics[2].data.title }}
        </p>
      </div>

      <!-- ITEM -->
      <div
        class="w-[290px] h-[186px] flex rounded-tl-[41px] rounded-bl-[77px] rounded-r flex-col items-center justify-center"
        style="box-shadow: 0px 4px 64px -12px rgba(0, 0, 0, 0.1)"
      >
        <h4
          class="font-extrabold text-[40px] mb-2 text-[#002261]"
          contenteditable="true"
          @blur="
            () =>
              handleChange(
                nuxtApp.$statistics[0].id,
                'quantity',
                nuxtApp.$statistics[0].id + nuxtApp.$statistics[0].data.quantity
              )
          "
          :id="nuxtApp.$statistics[0].id + nuxtApp.$statistics[0].data.quantity"
        >
          {{ nuxtApp.$statistics[0].data.quantity }}
        </h4>
        <p
          class="text-[20px]"
          contenteditable="true"
          @blur="
            () =>
              handleChange(
                nuxtApp.$statistics[0].id,
                'title',
                nuxtApp.$statistics[0].id + nuxtApp.$statistics[0].data.title
              )
          "
          :id="nuxtApp.$statistics[0].id + nuxtApp.$statistics[0].data.title"
        >
          {{ nuxtApp.$statistics[0].data.title }}
        </p>
      </div>
    </div>
  </div>
</template>
