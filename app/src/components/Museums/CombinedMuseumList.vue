<template>
  <div><CooperHewittList /> <VictoriaAndAlbertList /></div>
</template>

<script>
import CooperHewittList from "@/components/Museums/CooperHewittList";
import VictoriaAndAlbertList from "@/components/Museums/VictoriaAndAlbertList";

export default {
  components: {
    CooperHewittList,
    VictoriaAndAlbertList,
  },
};
</script>