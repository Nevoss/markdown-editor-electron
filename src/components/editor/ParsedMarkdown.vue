<template>
  <div
    :style="{ maxWidth: '960px' }"
    class="p-6 pt-10 h-full overflow-auto markdown-body font-sans w-full mx-auto"
    v-html="parsedMarkdown"
  ></div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ParsedMarkdown',
  computed: {
    ...mapGetters({
      parsedMarkdown: 'editor/parsedInput',
    }),
  },
}
</script>
