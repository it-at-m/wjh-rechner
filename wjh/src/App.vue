<template>
  <router-view />
</template>

<script lang="ts" setup>
//
</script>

<style>
.main-router-link {
  text-decoration: none;
}

.main-router-link:hover {
  text-decoration: underline;
  cursor: pointer;
}

.pointer {
  cursor: pointer;
}

.rbs-red {
  color: #ff0000;
}

.rbs-yellow {
  color: #ffcc00;
}

.table-striped tbody tr:nth-of-type(odd) td {
  background-color: rgba(var(--v-theme-surface-variant), 0.035) !important;
}

.development-striped-background {
  background-image: repeating-linear-gradient(
    135deg,
    rgb(139, 139, 0),
    rgb(139, 139, 0) 25px,
    rgba(0, 0, 0, 1) 25px,
    rgba(0, 0, 0, 1) 50px
  );
}
</style>
