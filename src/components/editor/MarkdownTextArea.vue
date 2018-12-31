<template>
  <div class="flex h-full border-r border-grey-lighter bg-grey-lightest">
    <div class="w-16 bg-white border-r border-grey-lighter"></div>
    <div :style="{ maxWidth: '960px' }" class="mx-auto w-full">
      <textarea
        class="w-full h-full resize-none outline-none p-6 pt-10 text-grey-darkest block bg-grey-lightest"
        :value="input"
        @input="onInput($event.target.value)"
        autofocus
      ></textarea>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'MarkdownTextArea',
  computed: {
    ...mapGetters({
      input: 'editor/input',
    }),
  },
  methods: {
    ...mapActions({
      onInput: 'editor/onInput',
    }),
  },
}
</script>
