<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <h3 class="ml-2">Project Source Code <v-icon>mdi-github</v-icon></h3>
          <v-list>
            <v-list-item
              v-for="(item, i) in items2"
              :key="i"
              :href="item.to"
              target="_blank"
              router
              exact
            >
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </div>
      </template>
    </v-navigation-drawer>
    <!-- <v-app-bar :clipped-left="clipped" fixed app>

      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-avatar class="mx-2" color="indigo">
        <v-icon dark>
          mdi-account-circle
        </v-icon>

      </v-avatar>
      <v-toolbar-title>{{ username }}</v-toolbar-title>
    </v-app-bar> -->

    <v-app-bar app>
      <!-- Title -->

      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>{{ title }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- Profile Avatar -->
      <v-btn icon>
        <v-avatar size="36" color="primary">
          <v-icon dark>mdi-account</v-icon>
        </v-avatar>
      </v-btn>
      <div>{{ userName }}</div>
      <!-- Logout Button -->
      <v-btn icon @click="logout">
        <v-icon dark>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",
  data() {
    return {
      userName: "Smith Wills",
      clipped: true,
      drawer: false,
      fixed: false,
      items2: [
        {
          icon: "mdi-monitor-screenshot",
          title: "Backend",
          to: "https://github.com/ncj1997/Backend-SOSE",
        },
        {
          icon: "mdi-cogs",
          title: "FrontEnd",
          to: "https://github.com/ncj1997/UOW-SOSE--Project",
        },
      ],
      items: [
        {
          icon: "mdi-apps",
          title: "Home",
          to: "/",
        },
        {
          icon: "mdi-email-seal-outline",
          title: "Postal Service",
          to: "/postoffice",
        },
        {
          icon: "mdi-school",
          title: "Scholarship",
          to: "/scholarship",
        },
        {
          icon: "mdi-account-supervisor-circle",
          title: "Peer Learning",
          to: "/peer-learning",
        },
      ],
      miniVariant: false,
      right: true,
      title: "Service Uni",
    };
  },
  methods: {
    logout() {
      console.log("logout called");
    },
  },
};
</script>
