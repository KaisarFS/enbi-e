<!-- eslint-disable vue/require-v-for-key -->
<!-- eslint-disable prettier/prettier -->
<script>
import { mapActions, mapState } from 'pinia';
import NavbarTwo from '../components/NavbarTwo.vue';
import { usePlayerStore } from '../stores/player';
import moment from 'moment'

export default {
  name: "UserProfile",
  components: { NavbarTwo },
  methods: {
    ...mapActions(usePlayerStore, ['fetchUserProfile', 'changeStatusPro', 'upgradeMemberPro']),
    moment: function () {
      return moment();
    }
  },
  computed: {
    ...mapState(usePlayerStore, ['userProfile', 'isPro'])
  },
  created() {
    this.fetchUserProfile()
  }
}
</script>

<template>
  <NavbarTwo />

  <div class="container" style="padding-top: 200px;">
    <div class="row d-flex justify-content-center">
      <div class="col-md-10">
        <div class="card p-3 py-4 shadow-lg" style="background-color: black;">
          <div class="d-flex justify-content-end">
            <button class="btn btn-danger" @click="upgradeMemberPro" v-if="userProfile.status === 'Regular'">Become pro
              member</button>
          </div>
          <div class="text-center">
            <img :src="userProfile.imgProfile" width="100" class="rounded-circle">
          </div>

          <div class="text-center mt-3">
            <span class="bg-danger p-1 px-4 rounded text-white" v-if="userProfile.status === 'Pro'">
              {{
                userProfile.status
              }}
            </span>
            <span class="bg-light p-1 px-4 rounded text-black" v-if="userProfile.status === 'Regular'">{{
              userProfile.status
            }}</span>
            <h3 class="mt-2 mb-0" style="text-transform: uppercase; font-style: italic; color: white;">
              <strong>{{ userProfile.username }}</strong>
            </h3>
            <span></span>

            <div class="px-4 mt-1">

              <strong>Member since: {{ moment(userProfile.createdAt).format('YYYY-MM-DD') }}</strong>

            </div>

            <ul class="social-list">
              <li><i class="fa fa-facebook"></i></li>
              <li><i class="fa fa-dribbble"></i></li>
              <li><i class="fa fa-instagram"></i></li>
              <li><i class="fa fa-linkedin"></i></li>
              <li><i class="fa fa-google"></i></li>
            </ul>

            <p style="font-weight: bold; color: white;">Followed Player</p>
            
            <div class="row buttons">
              <div class="col d-flex justify-content-center" v-for="favorite in userProfile.Favorites">
                <div>
                  <img :src="favorite.Player.imgUrl" width="100" class="rounded-circle">
                  <h6 style="color: white;">{{ favorite.Player.name }}</h6>
                </div>
              </div>
            </div>
          
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
body {
  background: #eee;
}

.card {
  border: none;

  position: relative;
  overflow: hidden;
  border-radius: 8px;
  cursor: pointer;
}

.card:before {

  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 4px;
  height: 100%;
  background-color: #000000;
  transform: scaleY(1);
  transition: all 0.5s;
  transform-origin: bottom
}

.card:after {

  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 13px;
  height: 100%;
  background-color: #aa2438;
  transform: scaleY(0);
  transition: all 0.5s;
  transform-origin: bottom
}

.card:hover::after {
  transform: scaleY(1);
}


.fonts {
  font-size: 11px;
}

.social-list {
  display: flex;
  list-style: none;
  justify-content: center;
  padding: 0;
}

.social-list li {
  padding: 10px;
  color: #8E24AA;
  font-size: 19px;
}


.buttons button:nth-child(1) {
  border: 1px solid #8E24AA !important;
  color: #8E24AA;
  height: 40px;
}

.buttons button:nth-child(1):hover {
  border: 1px solid #8E24AA !important;
  color: #fff;
  height: 40px;
  background-color: #8E24AA;
}

.buttons button:nth-child(2) {
  border: 1px solid #8E24AA !important;
  background-color: #8E24AA;
  color: #fff;
  height: 40px;
}
</style>