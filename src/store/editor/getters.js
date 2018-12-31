import marked from '../../utils/marked'
import { fileStatuses } from '@/store/editor/enums'

export default {
  input: ({ input }) => input,
  filePath: ({ filePath }) => filePath,
  parsedInput: ({ input }) => (input ? marked(input) : null),
  viewMode: ({ viewMode }) => viewMode,
  fileStatus: ({ input, lastSavedInput }) => {
    if (!lastSavedInput && !input) {
      return fileStatuses.newFile
    }

    return lastSavedInput !== input
      ? fileStatuses.unSavedFile
      : fileStatuses.savedFile
  },
}
