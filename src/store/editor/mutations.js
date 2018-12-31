export default {
  SET_FILE_PATH: (state, path) => (state.filePath = path),
  SET_INPUT: (state, input) => (state.input = input),
  SET_LAST_SAVED_INPUT: (state, input) => (state.lastSavedInput = input),
  SET_VIEW_MODE: (state, viewMode) => (state.viewMode = viewMode),
}
