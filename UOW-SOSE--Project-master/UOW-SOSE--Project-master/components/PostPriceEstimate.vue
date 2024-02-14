<template>
  <div>
    <v-card class="mb-3">
      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0">Postal Service for University</h3>
        </div>
      </v-card-title>
    </v-card>
    <v-card>
      <v-card-title primary-title>
        <div>
          <div>Parcel mail cost calculator</div>
        </div>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" @submit.prevent="calculatePrice">
          <v-row>
            <v-col cols="3">
              <v-text-field
                outlined
                dense
                v-model="length"
                label="Length (cm)"
                type="number"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                outlined
                dense
                v-model="width"
                label="Width (cm)"
                type="number"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                outlined
                dense
                v-model="height"
                label="Height (cm)"
                type="number"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                outlined
                dense
                v-model="weight"
                label="Weight (in grams)"
                type="number"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-select
                outlined
                dense
                v-model="destination"
                :items="states"
                label="Destination"
                required
              ></v-select>
            </v-col>
            <v-col>
              <v-row class="mt-1">
                <v-btn outlined @click="calculatePrice" color="primary"
                  >Calculate</v-btn
                >
                <v-btn color="error" outlined class="mx-4" @click="reset">
                  Reset Form
                </v-btn>
              </v-row>
            </v-col>
            <v-col>
              <v-card color="#E1F5FE" v-if="price" class="mb-2">
                <v-card-text>
                  <div class="d-flex justify-space-between">
                    <!-- <div><h4>Estimated Price:</h4></div> -->
                    <div>
                      <h4>{{ price }}</h4>
                    </div>
                  </div>
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    class="mx-auto"
                    @click="reset"
                    outlined
                    color="primary"
                  >
                    <v-icon>mdi-close</v-icon>
                    Close
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col cols="1"></v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
    <v-card class="mt-4">
      <v-card-title primary-title>
        <div>
          <div>Parcel Tracker</div>
        </div>
      </v-card-title>
      <v-card-text>
        <v-form ref="form2">
          <v-row>
            <v-col cols="5">
              <v-text-field
                outlined
                dense
                clearable
                v-model="trackingNumberSP"
                label="Tracking Number"
                required
              ></v-text-field
            ></v-col>
            <v-col>
              <v-btn @click="getDeliveryInfo()" dark color="blue">Track</v-btn>
            </v-col>
          </v-row></v-form
        ><v-row>
          <v-col class="mb-6" cols="6" v-if="errorTracking">
            <v-card>
              <v-card>
                <v-row  class="pt-2 pb-3 pr-4">
                  <h4 class="ml-4 mt-2">
                    <v-icon color="red">mdi-alert-circle</v-icon>
                    The tracking number provided is invalid
                  </h4>
                  <v-spacer></v-spacer>
                  <v-btn @click="errorTracking = false" icon color="error">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-row>
              
              </v-card>
            </v-card></v-col
          >
          <v-col v-if="showTracking" cols="12">
            <!-- <v-timeline v-for="item in postTrack" align-top dense>
              <v-timeline-item color="pink" small>
                <v-row class="pt-1">
                  <v-col cols="3">
                    <strong>{{ item.time }}</strong>
                    <div class="text-caption">{{ item.date }}</div>
                  </v-col>
                  <v-col>
                    <strong>{{ item.orderStatus }}</strong>
                  </v-col>
                </v-row>
              </v-timeline-item></v-timeline
            > -->

            <div>
              <v-card>
                <v-row class="pt-2 pr-4">
                  <h4 class="ml-4 mt-2">
                    Estimated Delivery Date : {{ deliveryDate }}
                  </h4>
                  <v-spacer></v-spacer>
                  <v-btn @click="showTracking = false" icon color="error">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-row>

                <v-stepper class="mt-3" v-model="e1">
                  <v-stepper-header>
                    <v-stepper-step :complete="e1 > 1" step="1">
                      Order Confirmed<br />
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step :complete="e1 > 2" step="2">
                      On the way
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step :complete="e1 > 3" step="3">
                      Delivered
                    </v-stepper-step>
                  </v-stepper-header>
                </v-stepper>
              </v-card>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      price: "",
      errorTracking: false,
      trackingNumberSP: "",
      showTracking: false,
      weight: null,
      length: null,
      width: null,
      height: null,
      destination: null,
      e1: "3",
      deliveryDate: "11/11/2023",
      states: [
        "New South Wales",
        "Victoria",
        "Queensland",
        "South Australia",
        "Western Australia",
        "Tasmania",
        "Northern Territory",
        "Australian Capital Territory",
      ],
      price: null,
    };
  },
  methods: {
    reset() {
      this.price = "";
      this.$refs.form.reset();
    },
    async getDeliveryInfo() {
      try {
        const response = await this.$axios.get(
          `/postal/${this.trackingNumberSP}`
        );
        // Process the response data here
        console.log(response.data);
        var status = response.data["status"];
        switch (status) {
          case "confirmed":
            this.e1 = 1;
            break;
          case "onway":
            this.e1 = 2;
            break;
          case "delivered":
            this.e1 = 3;
            break;
          default:
            break;
        }
        this.deliveryDate = response.data["delieveryDate"];
        this.showTracking = true;
        this.errorTracking = false
      } catch (error) {
        // Handle errors here
        this.errorTracking = true;
        this.showTracking = false;

        console.error("Error fetching data:", error);
      }
    },
    async calculatePrice() {
      var payload = {
        weight: this.weight,
        length: this.length,
        width: this.width,
        height: this.height,
        destination: this.destination,
      };
      console.log(payload);

      try {
        const response = await this.$axios.post("/postal/checkcost", payload);
        // Process the response data here
        console.log(response.data);
        this.price = response.data;
      } catch (error) {
        // Handle errors here
        this.errorTracking = true;
        console.error("Error fetching data:", error);
      }
    },
  },
};
</script>
