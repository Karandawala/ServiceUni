<template>
  <span>
    <div class="mt-10"
      v-if="isLoadingData"
    >
      <!-- <PeerCard class="mb-6" :cardData="n" /> -->
      <v-progress-circular
        :size="70"
        :width="7"
        color="blue"
        indeterminate
      ></v-progress-circular>
    </div>
    <v-container v-else class="grey lighten-5">
      <v-row class="mb-6">
        <v-col cols="4" v-for="n in items" :key="n.id">
          <PeerCard class="mb-6 mr-8" :cardData="n" />
        </v-col>
      </v-row>
    </v-container>
  </span>

  <!-- <main>

        <div>
            
                <PeerCard v-for="item in items" :key="item.id">
                    {{ item.name }}
                </PeerCard>
            
        </div>

    </main> -->
</template>

<script>
export default {
  props: {
    items: Array,
    isLoadingData: Boolean, // Define the prop and its type
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
