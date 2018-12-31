<template>
  <div
    class="w-full h-10 bg-white border-grey-lighter border-t flex items-center px-6"
  >
    <div
      class="text-xs tracking-wide leading-wide flex items-center leading-none"
    >
      <span class="h-2 w-2 rounded-full mr-2" :class="statusDotBgColor"></span>
      <span v-if="filePath"> {{ filePath }} </span>
      <span v-else> No file. </span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { fileStatuses } from '@/store/editor/enums'

export default {
  name: 'StatusBar',
  computed: {
    ...mapGetters({
      filePath: 'editor/filePath',
      fileStatus: 'editor/fileStatus',
    }),

    statusDotBgColor() {
      return {
        'bg-grey-dark': this.fileStatus === fileStatuses.newFile,
        'bg-orange': this.fileStatus === fileStatuses.unSavedFile,
        'bg-green': this.fileStatus === fileStatuses.savedFile,
      }
    },
  },
}
</script>
