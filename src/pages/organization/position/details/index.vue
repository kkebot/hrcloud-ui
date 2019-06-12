<template>
  <Details :key="$route.params.id"></Details>
</template>
<script>
  import Details from "./Details";

  export default {
    components: {Details}
  }
</script>

<style>

</style>