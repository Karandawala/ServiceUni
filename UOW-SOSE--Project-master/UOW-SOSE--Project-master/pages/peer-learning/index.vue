<template>
  <main>
    <v-row class="my-2" justify="center" align="center">
      <v-col cols="12">
        <v-card class="mb-3">
          <v-row>
            <v-col>
              <h2 class="ml-4">Peer Learning Sessions</h2>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="2">
              <v-btn @click="showDialog = !showDialog" small dark color="black">
                <v-icon>mdi-plus</v-icon>
                Add Session
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      <CourseCards :items="sessionList" :isLoadingData="isLoadingData" />
      <!-- <v-col>
      <div class="tasks">
        <Task v-for="(task, i) in $store.state.tasks" :key="i" :task="task" />
      </div>
     </v-col> -->
      <v-dialog v-model="showDialog" max-width="600">
        <v-card>
          <v-card-title>
            Event Details
            <v-spacer></v-spacer>
            <v-btn icon @click="closeDialog()">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-form ref="addSesForm" v-model="isvalidForm">
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12">
                    <v-text-field
                      v-model="formData.name"
                      label="Event Name"
                      required
                      :rules="[(v) => !!v || 'This Field is Required!']"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="12">
                    <v-text-field
                      v-model="formData.subname"
                      label="Subject Name"
                      required
                      :rules="[(v) => !!v || 'This Field is Required!']"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="formData.subCode"
                      label="Subject Code"
                      required
                      :rules="[(v) => !!v || 'This Field is Required!']"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="formData.location"
                      label="Location"
                      required
                      :rules="[(v) => !!v || 'This Field is Required!']"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-textarea
                      v-model="formData.description"
                      label="Description"
                      required
                      auto-grow
                      :rules="[(v) => !!v || 'This Field is Required!']"
                    ></v-textarea>
                  </v-col>
                </v-row>
                <v-row> </v-row>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="formData.Date"
                      label="Date"
                      type="date"
                      required
                      :rules="[(v) => !!v || 'This Field is Required!']"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="formData.Time"
                      label="Time"
                      type="time"
                      required
                      :rules="[(v) => !!v || 'This Field is Required!']"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-btn @click="addSess" dark color="black">Submit</v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
  </main>
</template>

<script>
export default {
  async mounted() {
    this.getData();
  },
  data() {
    return {
      isLoadingData: true,
      isvalidForm: null,
      newTask: "",
      showDialog: false,
      formData: {
        name: "",
        subCode: "",
        description: "",
        location: "",
        Date: "",
        Time: "",
      },
    };
  },
  computed: {
    sessionList() {
      return this.$store.getters["peer-learning/getSessionsList"];
    },
  },
  methods: {
    closeDialog() {
      this.$refs.addSesForm.reset();
      this.showDialog = false;
    },
    addSess() {
      this.$refs.addSesForm.validate();
      if (this.isvalidForm) {
        console.log(this.formData);
        this.$store
          .dispatch("peer-learning/addSession", this.formData)
          .then((response) => {
            console.log(response);
            this.showDialog = false;
            this.formData = {
              name: "",
              subCode: "",
              description: "",
              location: "",
              Date: "",
              Time: "",
            };
          });
      }
    },
    async getData() {
      await this.$store.dispatch("peer-learning/loadData");
      this.isLoadingData = false;
    },
  },
};
</script>
