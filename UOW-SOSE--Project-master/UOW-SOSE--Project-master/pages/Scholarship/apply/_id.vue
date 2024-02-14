<template>
  <v-container>
    <v-card>
      <v-card-title class="headline">Scholarship Application Form</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <!-- Basic Applicant Details -->
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="applicant.firstName"
                label="First Name"
                required
                :rules="[(v) => !!v || 'This Field is Required!']"
                dense
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="applicant.lastName"
                label="Last Name"
                :rules="[(v) => !!v || 'This Field is Required!']"
                required
                dense
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="applicant.email"
                label="Email"
                :rules="[(v) => !!v || 'This Field is Required!']"
                required
                dense
                outlined
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <v-file-input
                v-model="applicant.cvFile"
                :label="applicant.cvFile ? 'CV File Selected' : 'Upload CV'"
                accept=".pdf,.doc,.docx"
                :rules="[(v) => !!v || 'This Field is Required!']"
                required
                dense
                outlined
              ></v-file-input>
            </v-col>
            <v-col cols="6">
              <v-file-input
                v-model="applicant.recommendationLetterFile"
                :label="
                  applicant.recommendationLetterFile
                    ? 'Recommendation Letter Selected'
                    : 'Upload Recommendation Letter'
                "
                accept=".pdf,.doc"
                required
                :rules="[(v) => !!v || 'This Field is Required!']"
                dense
                outlined
              ></v-file-input>
            </v-col>
          </v-row>

          <!-- Additional Information -->
          <v-row>
            <v-col cols="12">
              <v-textarea
                v-model="applicant.additionalInfo"
                label="Additional Information"
                dense
                :rules="[(v) => !!v || 'This Field is Required!']"
                outlined
              ></v-textarea>
            </v-col>
          </v-row>

          <!-- Submit Button -->
          <v-row>
            <v-col cols="12">
              <v-btn
                :loading="isloading"
                @click="submitApplication"
                color="primary"
                >Submit</v-btn
              >
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
    <v-snackbar v-model="snackbar" :timeout="3000">
      Your Application Has been submited
    </v-snackbar>
  </v-container>
</template>

<!-- ... rest of the script -->
<script>
export default {
  data() {
    return {
      isloading: false,
      snackbar: false,
      valid: false,
      applicant: {
        scholId: this.$route.params.id,
        firstName: "",
        lastName: "",
        email: "",
        cvFile: null,
        recommendationLetterFile: null,
        additionalInfo: "",
      },
    };
  },
  methods: {
    handleFileUpload1(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          // this.base64Data[index] = reader.result.split(",")[1];
          this.applicant.cvFile = reader.result.split(",")[1];
        };
      }
      reader.readAsDataURL(file);
    },
    async submitApplication() {
      this.$refs.form.validate();
      if (this.valid) {
        console.log("valid");
        this.isloading = true;
        await this.$store.dispatch("scholarships/applySchol", this.applicant);
        this.$refs.form.resetValidation();
        this.applicant = {
          scholId: this.$route.params.id,
          firstName: "",
          lastName: "",
          email: "",
          cvFile: null,
          recommendationLetterFile: null,
          additionalInfo: "",
        };
        this.snackbar = true;
        this.isloading = false;
      }
    },
  },
};
</script>
