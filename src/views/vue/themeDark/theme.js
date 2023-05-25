

import {ref, watchEffect} from 'vue'

const theme = ref('light')

watchEffect(() => {
  document.querySelector('.theme-container').dataset.theme = theme.value;
})

export function useTheme() {
  return {
    theme
  }
}
