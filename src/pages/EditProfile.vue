<template>
  <q-page
    class="q-pa-md account-page"
    style="background-color: rgb(255, 255, 255)"
  >
    <div class="row">
      <div class="col-lg-6 col-md-6 col-xs-12 col-sm-12">
        <q-card-section class="text-h6">
          <div class="text-h6">Edit Profile</div>
          <div class="text-subtitle2">Complete your profile</div>
        </q-card-section>
        <q-list>
          <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12 items-center">
            <q-item-section side>
              <q-avatar size="100px">
                <!-- <img
                  v-if="this.userDetails.photo.formats.thumbnail.url !== null"
                  :src="this.userDetails.photo.formats.thumbnail.url"
                  :ratio="1"
                  class="q-mt-md"
                  style="width: 150px"
                  placeholder-src="https://cdn.quasar.dev/img/boy-avatar.png"
                >  -->
              </q-avatar>
            </q-item-section>
            <div>
              <input
                type="file"
                style="display: none"
                ref="fileInput"
                accept="image/*"
                @change="onFilePicked"
              />
              <q-btn
                label="Add Photo"
                padding="5px 10px"
                class="text-white icon-none"
                style="max-width: 90px; background-color: rgb(26, 140, 193)"
                no-caps
                @click="onPickFile"
              />
            </div>
          </q-item>
        </q-list>
      </div>

      <q-card-section
        class="text-h6 col-lg-6 col-md-6 col-xs-12 col-sm-12 self-end"
        v-if="$q.screen.gt.sm"
      >
        <div class="text-h6 q-pl-md">Change Password</div>
      </q-card-section>
    </div>
    <div class="row q-col-gutter-sm">
      <div class="col-lg-6 col-md-6 col-xs-12 col-sm-12">
        <div class="text-black">
          <q-card-section class="q-pa-sm">
            <q-list class="row">
              <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <q-item-section>
                  <div class="text-caption required-hint">Required*</div>
                  <q-input
                    @blur="handleBlur"
                    dense
                    outlined
                    round
                    v-model="username"
                    placeholder="Username"
                    name="username"
                    :rules="[(val) => !!val || 'User Name is required']"
                  />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <q-item-section>
                  <div class="text-caption required-hint">Required*</div>
                  <q-input
                    @blur="handleBlur"
                    dense
                    outlined
                    round
                    v-model="name"
                    placeholder="Name"
                    name="Name"
                    :rules="[(val) => !!val || 'Name is required']"
                    :class="name.length === 0 ? 'empty' : ''"
                  />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <q-item-section>
                  <div class="text-caption required-hint">Required*</div>
                  <q-input
                    @blur="handleBlur"
                    dense
                    outlined
                    round
                    v-model="email"
                    placeholder="Email Address"
                    name="email"
                    :rules="[(val) => !!val || 'Field is required']"
                  />
                </q-item-section>
              </q-item>

              <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <q-item-section>
                  <div class="text-caption optional-hint">Optional</div>
                  <q-input
                    @blur="handleBlur"
                    dense
                    outlined
                    round
                    v-model="phoneNumber"
                    type="tel"
                    placeholder="Phone number"
                    name="phoneNumber"
                    :class="phoneNumber.length === 0 ? 'empty' : ''"
                  />
                </q-item-section>
              </q-item>

              <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <q-item-section>
                  <div class="text-caption optional-hint">Optional</div>
                  <q-input
                    @blur="handleBlur"
                    dense
                    outlined
                    round
                    v-model="location"
                    placeholder="Location"
                    name="location"
                    :class="location.length === 0 ? 'empty' : ''"
                  />
                </q-item-section>
              </q-item>

              <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <q-item-section>
                  <div class="text-caption optional-hint">Optional</div>
                  <q-input
                    @blur="handleBlur"
                    dense
                    outlined
                    round
                    v-model="bio"
                    placeholder="Bio"
                    name="Bio"
                    :class="bio.length === 0 ? 'empty' : ''"
                  />
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>

          <q-card-actions align="right" class="q-mr-md">
            <q-btn
              label="Update User Info"
              padding="5px 10px"
              class="text-white icon-none"
              style="background-color: rgb(26, 140, 193)"
              no-caps
              @click="updateProfile"
            />
          </q-card-actions>
        </div>
      </div>

      <div class="col-lg-6 col-md-6 col-xs-12 col-sm-12">
        <div class="text-black">
          <q-card-section
            class="text-h6 col-lg-6 col-md-6 col-xs-12 col-sm-12 self-end"
            v-if="$q.screen.lt.md"
          >
            <div class="text-h6 q-pl-md">Change Password</div>
          </q-card-section>
          <q-card-section class="q-pa-sm row">
            <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <q-item-section>
                <div class="text-caption required-hint">Required*</div>
                <q-input
                  type="password"
                  dense
                  outlined
                  round
                  v-model="passwordDict.currentPassword"
                  placeholder="Current Password"
                  :rules="[(val) => !!val || 'Current Password is required']"
                  :class="
                    passwordDict.currentPassword.length === 0 ? 'empty' : ''
                  "
                />
              </q-item-section>
            </q-item>
            <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <q-item-section>
                <div class="text-caption required-hint">Required*</div>
                <q-input
                  type="password"
                  dense
                  outlined
                  round
                  v-model="passwordDict.newPassword"
                  placeholder="New Password"
                  :rules="[(val) => !!val || 'New Password is required']"
                  :class="passwordDict.newPassword.length === 0 ? 'empty' : ''"
                />
              </q-item-section>
            </q-item>

            <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <q-item-section>
                <div class="text-caption required-hint">Required*</div>
                <q-input
                  type="password"
                  dense
                  outlined
                  round
                  v-model="passwordDict.confirmNewPassword"
                  placeholder="Confirm New Password"
                  :rules="[
                    (val) => !!val || 'Confirm New Password is required',
                  ]"
                  :class="
                    passwordDict.confirmNewPassword.length === 0 ? 'empty' : ''
                  "
                />
              </q-item-section>
            </q-item>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn
              label="Change Password"
              padding="5px 10px"
              class="text-white icon-none q-mr-md"
              style="background-color: rgb(26, 140, 193)"
              no-caps
              @click="updatePassword"
            />
          </q-card-actions>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import db from "src/services/firebase/database";
import { formatDistance } from "date-fns";
import firebase from "firebase";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "UserProfile",
  data() {
    return {
      // settings: this.$store.state.app.settings,
      user: this.$store.state.user,
      userDetails: {},
      passwordDict: {
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      },
      componentKey: 0,
      username: "",
      name: "",
      email: "",
      phoneNumber: "",
      location: "",
      bio: "",
    };
  },
  methods: {
    handleBlur(e) {
      this.updateProfile();
    },
    updateProfile() {
      let newInfo = {
        name: this.name,
        email: this.email,
        phoneNumber: this.phoneNumber,
        location: this.location,
        date: Date.now(),
        uid: this.$store.state.auth.uid,
        username: this.username,
        bio: this.bio,
      };
      db.collection("users")
        .doc(this.$store.state.auth.uid)
        .set(newInfo)
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    },
    onPickFile() {
      this.$refs.fileInput.click();
    },
    onFilePicked(event) {
      const file = event.target.files[0];
      const formData = new FormData();

      formData.append("files", file);
      formData.append("ref", "user");
      formData.append("refId", this.userDetails.id);
      formData.append("field", "photo");
      formData.append("source", "users-permissions");

      this.$api
        .post(`${this.$store.state.system.api.base}/upload`, formData)
        .then((response) => {
          this.userDetails.photo = response.data[0];
          this.debug("DATA", response.data);
        })
        .catch((error) => {
          this.debug("error", error);
        });
    },
    updatePassword() {
      if (
        this.passwordDict.newPassword !== this.passwordDict.confirmNewPassword
      ) {
        return this.$q.notify({
          type: "negative",
          message: "Password confirmation does not match new password.",
        });
      } else if (!this.passwordDict.newPassword) {
        return this.$q.notify({
          type: "negative",
          message: "Please enter a new password",
        });
      }

      this.$api
        .post("user/password", {
          identifier: this.userDetails.username,
          password: this.passwordDict.currentPassword,
          newPassword: this.passwordDict.newPassword,
          confirmPassword: this.passwordDict.confirmNewPassword,
        })
        .then((response) => {
          this.passwordDict = {};

          this.$q.notify({
            type: "positive",
            message: "Password successfully changed",
          });
        })
        .catch((error) => {
          this.debug("json of error", JSON.parse(JSON.stringify(error)));
          this.$q.notify({
            type: "negative",
            message: error.response.data.data[0].messages[0].message,
          });
        });
    },
  },
  mounted() {},
  created() {
    console.log("FIREBASE AUTH USER uid", this.$store.state.auth.uid);
    var user = firebase.auth().currentUser;
    this.email = user.email;
    this.username = "@" + this.$store.state.auth.email.split("@")[0];
    // The user's ID, unique to the Firebase project. Do NOT use
    // this value to authenticate with your backend server, if
    // you have one. Use User.getToken() instead.
  },
  computed: {
    ...mapGetters("user", ["currentUser"]),
  },
  // beforeMount () {
  //   this.userDetails = (({ username, id, name, lastName, email, phoneNumber, address, apartmentNumber, city, state, country, zip, photo }) => ({ username, id, name, lastName, email, phoneNumber, address, apartmentNumber, city, state, country, zip, photo }))(this.$store.state.user)
  // }
};
</script>

<style lang="stylus" scoped>
.required-hint {
  color: #d3242a;
  text-align: right;
}

.optional-hint {
  color: #8c898a;
  text-align: right;
}

.account-page {
  .q-field__bottom {
    display: none;
  }

  .q-field--with-bottom {
    padding-bottom: 0;
  }

  /deep/.q-field__bottom.q-field__bottom--animated {
    display: none;
  }

  /deep/.q-field {
    background: #ffffff;
  }

  /deep/.q-field__control:before {
    border-color: #011924;
  }

  /deep/.empty {
    background-color: #f7f8f9;
    color: #c7cfd3;

    .q-field__control:before {
      border-color: #c7cfd3;
    }
  }
}
</style>
