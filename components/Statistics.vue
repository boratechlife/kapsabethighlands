<script setup>
const nuxtApp = useNuxtApp();
defineProps({
  isEdit: Boolean,
  isLoggedIn: Boolean,
});

const fetchCollectionData = nuxtApp.$fetchCollection;
const statisticData = ref(null);
onMounted(async () => {
  const collectionData = await fetchCollectionData('statistics', '');
  statisticData.value = collectionData;
});

const updatedData = useNuxtApp().$updateMenu;
async function handleChange(id, field, customId) {
  console.log('Statistics', customId);
  var editableParagraph = document.getElementById(customId);

  console.log('Content changed:', editableParagraph.innerText);
  if (editableParagraph.innerText && editableParagraph.innerText.length > 0) {
    if (field == 'title') {
      await updatedData('statistics', id, {
        title: editableParagraph.innerText,
      });
    }
    if (field == 'quantity') {
      await updatedData('statistics', id, {
        quantity: parseInt(editableParagraph.innerText),
      });
    }
  }
}

console.log('STATS', statisticData);
</script>

<template>
  <div
    class="w-full py-20 flex lg:h-[432px] items-center justify-center bg-white lg:rounded-tl-[152px] lg:rounded-br-[95px]"
    id="statistic"
    v-if="statisticData"
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
          :contenteditable="isEdit"
          @blur="
            () =>
              handleChange(
                statisticData[1].id,
                'quantity',
                statisticData[1].id + statisticData[1].data.quantity
              )
          "
          :id="statisticData[1].id + statisticData[1].data.quantity"
        >
          {{ statisticData[1].data.quantity }}
        </h4>
        <p
          class="text-[20px]"
          :contenteditable="isEdit"
          @blur="
            () =>
              handleChange(
                statisticData[1].id,
                'title',
                statisticData[1].id + statisticData[1].data.title
              )
          "
          :id="statisticData[1].id + statisticData[1].data.title"
        >
          {{ statisticData[1].data.title }}
        </p>
      </div>

      <!-- ITEM -->
      <div
        class="w-[290px] h-[186px] flex rounded-tl-[41px] rounded-bl-[77px] rounded-r flex-col items-center justify-center"
        style="box-shadow: 0px 4px 64px -12px rgba(0, 0, 0, 0.1)"
      >
        <h4
          class="font-extrabold text-[40px] mb-2 text-[#002261]"
          :contenteditable="isEdit"
          @blur="
            () =>
              handleChange(
                statisticData[3].id,
                'quantity',
                statisticData[3].id + statisticData[3].data.quantity
              )
          "
          :id="statisticData[3].id + statisticData[3].data.quantity"
        >
          {{ statisticData[3].data.quantity }}
        </h4>
        <p
          class="text-[20px]"
          :contenteditable="isEdit"
          @blur="
            () =>
              handleChange(
                statisticData[3].id,
                'title',
                statisticData[3].id + statisticData[3].data.title
              )
          "
          :id="statisticData[3].id + statisticData[3].data.title"
        >
          {{ statisticData[3].data.title }}
        </p>
      </div>

      <!-- ITEM -->
      <div
        class="w-[290px] h-[186px] flex rounded-tl-[41px] rounded-bl-[77px] rounded-r flex-col items-center justify-center"
        style="box-shadow: 0px 4px 64px -12px rgba(0, 0, 0, 0.1)"
      >
        <h4
          class="font-extrabold text-[40px] mb-2 text-[#002261]"
          :contenteditable="isEdit"
          @blur="
            () =>
              handleChange(
                statisticData[2].id,
                'quantity',
                statisticData[2].id + statisticData[2].data.quantity
              )
          "
          :id="statisticData[2].id + statisticData[2].data.quantity"
        >
          {{ statisticData[2].data.quantity }}
        </h4>
        <p
          class="text-[20px]"
          :contenteditable="isEdit"
          @blur="
            () =>
              handleChange(
                statisticData[2].id,
                'title',
                statisticData[2].id + statisticData[2].data.title
              )
          "
          :id="statisticData[2].id + statisticData[2].data.title"
        >
          {{ statisticData[2].data.title }}
        </p>
      </div>

      <!-- ITEM -->
      <div
        class="w-[290px] h-[186px] flex rounded-tl-[41px] rounded-bl-[77px] rounded-r flex-col items-center justify-center"
        style="box-shadow: 0px 4px 64px -12px rgba(0, 0, 0, 0.1)"
      >
        <h4
          class="font-extrabold text-[40px] mb-2 text-[#002261]"
          :contenteditable="isEdit"
          @blur="
            () =>
              handleChange(
                statisticData[0].id,
                'quantity',
                statisticData[0].id + statisticData[0].data.quantity
              )
          "
          :id="statisticData[0].id + statisticData[0].data.quantity"
        >
          {{ statisticData[0].data.quantity }}
        </h4>
        <p
          class="text-[20px]"
          :contenteditable="isEdit"
          @blur="
            () =>
              handleChange(
                statisticData[0].id,
                'title',
                statisticData[0].id + statisticData[0].data.title
              )
          "
          :id="statisticData[0].id + statisticData[0].data.title"
        >
          {{ statisticData[0].data.title }}
        </p>
      </div>
    </div>
  </div>
</template>
