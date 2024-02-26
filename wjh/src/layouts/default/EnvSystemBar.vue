<template>
  <v-system-bar id="test-env-bar" window class="development-striped-background" height="24"
    ><v-spacer /> <span class="text-overline text-white">DEV</span><v-spacer />
  </v-system-bar>
</template>

<style scoped>
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
