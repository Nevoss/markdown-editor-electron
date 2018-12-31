<template>
  <div class="w-full flex flex-col">
    <div class="w-full flex flex-1">
      <div
        v-show="viewMode !== editorViewMode.fullPreview"
        :class="{
          'w-1/2': viewMode === editorViewMode.splitMode,
          'w-full': viewMode === editorViewMode.fullEditor,
        }"
      >
        <markdown-text-area />
      </div>
      <div
        v-show="viewMode !== editorViewMode.fullEditor"
        :class="{
          'w-1/2': viewMode === editorViewMode.splitMode,
          'w-full': viewMode === editorViewMode.fullPreview,
        }"
      >
        <parsed-markdown />
      </div>
    </div>
    <status-bar />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { editorViewMode } from '@/store/editor/enums'
import MarkdownTextArea from '@/components/editor/MarkdownTextArea'
import ParsedMarkdown from '@/components/editor/ParsedMarkdown'
import StatusBar from '@/components/editor/StatusBar'

export default {
  name: 'Editor',
  components: {
    MarkdownTextArea,
    ParsedMarkdown,
    StatusBar,
  },
  data() {
    return {
      editorViewMode,
    }
  },
  computed: {
    ...mapGetters({
      viewMode: 'editor/viewMode',
    }),
  },
}
</script>
