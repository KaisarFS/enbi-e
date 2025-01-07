import { defineStore } from 'pinia'
import axios from 'axios'
import { useToast } from "vue-toastification";
import { BalldontlieAPI } from "@balldontlie/sdk";

const nbaApi = new BalldontlieAPI({ apiKey: "4a4f84b5-29fc-4ca7-ac11-df8580f6f8da" });
// const baseUrl = 'http://localhost:3000'
const baseUrl = 'https://enbie-server-production.up.railway.app'

const toast = useToast();

export const usePlayerStore = defineStore('player', {
  state: () => ({
    players: [],
    following: [],
    onePlayer: {},
    userProfile: {},
    isPro: false,
    teams: [],
    loading: false,
  }),
  actions: {
    logout() {
      localStorage.clear()
      this.router.push('/login')
    },

    loginNavbar() {
      this.router.push('/login')
    },

    async login(formLogin) {
      try {
        const { data } = await axios({
          url: `${baseUrl}/users/login`,
          method: 'post',
          data: formLogin
        })

        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('username', data.username)
        toast.success("You're in mate");

        this.router.push('/')
      } catch (error) {
        toast.error(error.response.data.message);
      }
    },

    async loginGoogle(response) {
      try {
        const { data } = await axios({
          method: 'post',
          url: baseUrl + '/users/google-login',
          headers: { google_token: response }
        })
        console.log(data, '<--- data google login');
        localStorage.setItem('access_token', data.access_token)

        toast.success("You're in mate");


        this.router.push('/')
      } catch (error) {
        toast.error(error.response.data.message);
        // const msg = error.response.data.message
        // Swal.fire({
        //     icon: 'error',
        //     title: 'Oops...',
        //     text: `${error}`
        // })
      }
    },

    async register(formRegister) {
      try {
        const multerData = new FormData();
        multerData.append("imgProfile", formRegister.imgProfile);
        multerData.append("username", formRegister.username);
        multerData.append("email", formRegister.email);
        multerData.append("password", formRegister.password);

        const { data } = await axios({
          url: `${baseUrl}/users/register`,
          method: 'post',
          data: multerData
        })

        toast.success("Welcome to the gang!");

        this.router.push('/login');

      } catch (error) {
        toast.error(error.response.data.message);
      }
    },

    async fetchPlayers() {
      try {
        const { data } = await axios({
          url: `${baseUrl}/players`,
          method: 'get',
          headers: { access_token: localStorage.access_token }
        })

        this.players = data
      } catch (error) {
        if (error.response.data.message !== 'Invalid token') {
          toast.error(error.response.data.message);

        }
      }
    },

    async fetchOnePlayer(id) {
      try {
        const { data } = await axios({
          url: `${baseUrl}/players/${id}`,
          method: 'get',
          headers: { access_token: localStorage.access_token }
        })

        this.onePlayer = data
        this.router.push(`/players/${id}`)
      } catch (error) {
        if (error.response.data.message !== 'Invalid token') {
          toast.error(error.response.data.message);

        }
      }
    },

    async addFavorite(playerId) {
      console.log(playerId, '<---- playerId addFavorite');
      try {
        const { data } = await axios({
          url: `${baseUrl}/users/${playerId}`,
          method: 'post',
          headers: { access_token: localStorage.access_token }
        })

        toast.success("You followed this player");
        this.router.push('/users/user/following')
      } catch (error) {

        if (error.response.data.message !== 'Invalid token') {
          toast.error(error.response.data.message);

        }
      }
    },

    async changeStatusPro() {
      try {
        const { data } = await axios({
          url: `${baseUrl}/users/status`,
          method: 'patch',
          data: { status: 'Pro' },
          headers: { access_token: localStorage.access_token }
        })

        toast.success("You are a pro member now!");


        this.fetchUserProfile()
        this.router.push('/users/asd')
      } catch (error) {
        toast.error(error.response.data.message);
      }
    },

    async upgradeMemberPro() {
      try {
        // window.snap.pay('TRANSACTION_TOKEN_HERE', {
        //     onSuccess: function (result) {
        //         /* You may add your own implementation here */
        //         alert("payment success!"); console.log(result);
        //     },
        //     onPending: function (result) {
        //         /* You may add your own implementation here */
        //         alert("wating your payment!"); console.log(result);
        //     },
        //     onError: function (result) {
        //         /* You may add your own implementation here */
        //         alert("payment failed!"); console.log(result);
        //     },
        //     onClose: function () {
        //         /* You may add your own implementation here */
        //         alert('you closed the popup without finishing the payment');
        //     }
        // })

        const { data } = await axios({
          method: "post",
          url: baseUrl + "/users/MidtransToken",
          headers: {
            access_token: localStorage.access_token
          },
        })

        const cb = this.changeStatusPro;

        window.snap.pay(data.token, {
          onSuccess: function (result) {
            cb();
          },
        });
      } catch (error) {
        toast.error(error.response.data.message);
      }
    },

    async fetchFollowing(username) {
      console.log(username, '<---- username');
      try {
        const { data } = await axios({
          url: `${baseUrl}/users/following`,
          method: 'get',
          headers: { access_token: localStorage.access_token }
        })

        this.following = data
      } catch (error) {

        if (error.response.data.message !== 'Invalid token') {
          toast.error(error.response.data.message);

        }
      }
    },

    async fetchUserProfile(username) {
      try {
        const { data } = await axios({
          url: `${baseUrl}/users/${username}`,
          method: 'get',
          headers: { access_token: localStorage.access_token }
        })

        this.userProfile = data
      } catch (error) {
        if (error.response.data.message !== 'Invalid token') {
          toast.error(error.response.data.message);

        }
      }
    },

    // async fetchTeams() {
    //   try {
    //     const { data } = await axios({
    //       url: `https://www.balldontlie.io/api/v1/teams`,
    //       method: 'get',
    //     })

    //     console.log(data, '<----');
    //     this.teams = data
    //   } catch (error) {
    //     // console.log(error, '<---- error fetchTeams');
    //     // toast.error(error.response.data.message);
    //     if (error.response.data.message !== 'Invalid token') {
    //       toast.error(error.response.data.message);

    //     }
    //   }
    // }

    async fetchTeams() {
      try {
        this.loading = true;
        const teams = await nbaApi.nba.getTeams();
        this.teams = teams.data;
      } catch (error) {
        // if (error.response.data.message !== 'Invalid  token') {
        //   toast.error(error.response.data.message);
        // }
        console.error(error, "<=== error fetchTeams()");
      } finally {
        this.loading = false;
      }
    }
  },
})