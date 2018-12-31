import fs from 'fs'
import electronStore from '@/electronStore'
import { editorViewMode } from '@/store/editor/enums'
import { getKeyByValue } from '@/utils/utils'

export default {
  onInput({ commit }, input) {
    commit('SET_INPUT', input)
  },

  newFile({ commit, dispatch }, filePath) {
    try {
      fs.writeFileSync(filePath, null)

      commit('SET_INPUT', null)
      commit('SET_LAST_SAVED_INPUT', null)
      dispatch('saveFilePath', filePath)
    } catch (e) {
      console.warn(e)
    }
  },

  openFile({ commit, dispatch, getters }, filePath) {
    try {
      let fileContent = fs.readFileSync(filePath, 'UTF8')

      commit('SET_INPUT', fileContent)
      commit('SET_LAST_SAVED_INPUT', getters.input)
      dispatch('saveFilePath', filePath)
    } catch (e) {
      console.warn(e)
    }
  },

  saveFile({ commit, getters, dispatch }, filePath) {
    try {
      fs.writeFileSync(filePath, getters.input ? getters.input : '')

      commit('SET_LAST_SAVED_INPUT', getters.input)
      dispatch('saveFilePath', filePath)
    } catch (e) {
      console.warn(e)
    }
  },

  saveFilePath({ commit }, filePath) {
    commit('SET_FILE_PATH', filePath)

    electronStore.set('active-file', filePath)
  },

  toggleViewMode({ commit, getters }) {
    const editorViewModeKeys = Object.keys(editorViewMode)

    let indexString = getKeyByValue(editorViewMode, getters.viewMode)
    let index = editorViewModeKeys.indexOf(indexString)

    if (editorViewModeKeys[index + 1]) {
      commit('SET_VIEW_MODE', editorViewMode[editorViewModeKeys[index + 1]])
      return
    }

    commit('SET_VIEW_MODE', editorViewMode[editorViewModeKeys[0]])
  },
}
