<!-- eslint-disable vue/no-unused-components -->
<!-- eslint-disable prettier/prettier -->

<template>
  <NavbarTwo />

  <section class="container">
    <div class="row justify-content-start mb-5" style="padding-top: 100px">
      <div class="col-md-8 section-heading">
        <span class="subheading">ENBI E</span>
        <h2 class="heading mb-3">Team list</h2>
        <p>
          The ENational BIsketball Essociation (ENBI E) was established in 2023
          and it quickly grew into one of the biggest sports organizations in
          the entire world. Today there are 30 ENBI E teams that each play 82
          games every regular season (the 2023-01 season was shortened to 72
          games).
        </p>
      </div>
    </div>

    <div v-if="loading" class="d-flex justify-content-center">
      <div class="custom-loader"></div>
    </div>

    <div v-else>

      <table class="table mb-5">
        <thead class="table-dark">
          <tr>
            <th scope="col">No</th>
            <th scope="col">Team</th>
            <th scope="col">Abbreviation</th>
            <th scope="col">City</th>
            <th scope="col">Conference</th>
            <th scope="col">Division</th>
          </tr>
        </thead>
        <tbody>
          <TableTeam v-for="(team, index) in paginatedTeams" :key="team.id" :team="team" :index="index" />

        </tbody>
      </table>
      <Paginator :rows="rowsPerPage" :totalRecords="totalTeams" :first="first" @page="onPageChange" />
    </div>

  </section>
</template>

<!-- <script>

import { mapActions, mapState } from 'pinia';
import { usePlayerStore } from '../stores/player';
import Navbar from '../components/Navbar.vue';
import NavbarTwo from '../components/NavbarTwo.vue';
import TableTeam from '../components/TableTeam.vue';
import Paginator from 'primevue/paginator';


export default {
  name: "TeamsPage",
  components: { TableTeam, Navbar, NavbarTwo },
  methods: {
    ...mapActions(usePlayerStore, ['fetchTeams'])
  },
  computed: {
    ...mapState(usePlayerStore, ['teams', 'loading'])
  },

  created() {
    this.fetchTeams()
  }
}
</script> -->

<script>
import { ref, computed, onMounted } from 'vue';
import { usePlayerStore } from '../stores/player';
import NavbarTwo from '../components/NavbarTwo.vue';
import TableTeam from '../components/TableTeam.vue';
import Paginator from 'primevue/paginator';
import Button from "primevue/button"

export default {
  name: 'TeamsPage',
  components: { NavbarTwo, TableTeam, Paginator },
  setup() {
    const store = usePlayerStore();
    const rowsPerPage = ref(10); // Number of teams per page
    const first = ref(0); // Current start index of the page

    const loading = computed(() => store.loading);
    const teams = computed(() => store.teams);
    const totalTeams = computed(() => teams.value.length);

    const paginatedTeams = computed(() => {
      const start = first.value;
      const end = start + rowsPerPage.value;
      return teams.value.slice(start, end);
    });

    const onPageChange = (event) => {
      first.value = event.first;
    };

    onMounted(() => {
      store.fetchTeams();
    });

    return {
      loading,
      paginatedTeams,
      rowsPerPage,
      totalTeams,
      first,
      onPageChange
    };
  }
};
</script>
