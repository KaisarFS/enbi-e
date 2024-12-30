<!-- eslint-disable prettier/prettier -->
<!-- eslint-disable prettier/prettier -->
<!-- eslint-disable vue/multi-word-component-names -->
<script>
export default {
  name: "Table Team",
  props: ["team"],

  created() {
    console.log(this.team, "<=== this team");
  }
};
</script>

<template>
  <tr>
    <th>{{ team.id }}</th>
    <td>{{ team.full_name }}</td>
    <td>{{ team.abbreviation }}</td>
    <td>{{ team.city }}</td>
    <td>{{ team.conference }}</td>
    <td>{{ team.division }}</td>
  </tr>
</template>
