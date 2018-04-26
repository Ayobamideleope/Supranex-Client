<template>
  <v-container class="pt-3 pb-0">
    <v-layout justify-center align-center>
      <v-flex class="secondary" style="height: 1px"></v-flex>
      <v-flex tag="h2" v-text="text" class="display-1 px-4 text-xs-center flex-none">
      </v-flex>
      <v-flex class="secondary" style="height: 1px"></v-flex>
    </v-layout>
  </v-container>
</template>


<script>
export default {
  name: 'PageSectionHeader',
  props: {
    text: {
      type: String,
      required: true
    }
  },
  components: {}
}
</script>
