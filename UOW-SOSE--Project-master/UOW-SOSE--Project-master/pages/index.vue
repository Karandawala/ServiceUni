<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <v-carousel
        cycle
        height="400"
        hide-delimiter-background
        show-arrows="hover"
      >
        <!-- <v-carousel-item v-for="(slide, i) in slides" :key="i">
          <v-sheet :color="colors[i]" height="100%">
            <div class="d-flex fill-height justify-center align-center">
              <div class="text-h2">{{ slide }} Slide</div>
            </div>
          </v-sheet>
        </v-carousel-item> -->

        <v-carousel-item
          src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          cover
        ></v-carousel-item>

        <v-carousel-item
          src="https://images.unsplash.com/photo-1530099486328-e021101a494a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1894&q=80"
          cover
        ></v-carousel-item>
        <v-carousel-item
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
          cover
        ></v-carousel-item>
        <v-carousel-item
          src="https://plus.unsplash.com/premium_photo-1661301105151-fbe357bcfe02?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          cover
        ></v-carousel-item>
      </v-carousel>
    </v-col>

    <v-col>
      <v-row justify="center">
        <v-col v-for="(item, i2) in serviceList" :key="i2">
          <v-hover v-slot="{ hover }">
            <v-card
              :to="item.to"
              :color="hover ? item.color : undefined"
              :elevation="hover ? 16 : 2"
              class="text-center"
            >
              <div class="my-2 pt-4">
                <h3 class="headline mb-0">{{ item.name }}</h3>
              </div>
              <v-subheader
                ><div>{{ item.description }}</div></v-subheader
              >
              <v-card-actions>
                <v-icon class="mx-auto" large>{{ item.icon }}</v-icon>
              </v-card-actions>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "IndexPage",
  data() {
    return {
      serviceList: [
        {
          name: "Postal Service",
          description:
            " Fast and reliable mail and package delivery for all your university-related needs.",
          icon: "mdi-package-variant",
          color: "#EDE7F6",
          to: "/postoffice",
        },
        {
          name: "Scholarship Service",
          description:
            "Discover opportunities for financial aid and scholarships to support your education.",
          icon: "mdi-school-outline",
          color: "#E8EAF6",
          to: "/scholarship",
        },
        {
          name: "Peer Learning Service:",
          description:
            "Collaborate with peers and enhance your learning through workshops and study groups.",
          icon: "mdi-account-group",
          color: "#E3F2FD",
          to: "/peer-learning",
        },
      ],
      colors: [
        "indigo",
        "warning",
        "pink darken-2",
        "red lighten-1",
        "deep-purple accent-4",
      ],
      slides: ["First", "Second", "Third", "Fourth", "Fifth"],
    };
  },
};
</script>

<style lang="sass" scoped>
.v-card.on-hover.v-theme--dark
  background-color: rgba(#FFF, 0.8)
  >.v-card__text
    color: #000
</style>
