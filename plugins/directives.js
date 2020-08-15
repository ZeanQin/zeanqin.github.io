// https://tahazsh.com/detect-outside-click-in-vue
import Vue from 'vue'

// This variable will hold the reference to
// document's click handler
let handleOutsideClick

Vue.directive('closable', {
  bind(el, binding, vnode) {
    // Here's the click/touchstart handler
    // (it is registered below)
    handleOutsideClick = (e) => {
      e.stopPropagation()
      // Get the handler method name and the exclude array
      // from the object used in v-closable
      const { handler, exclude } = binding.value

      // This variable indicates if the clicked element is excluded
      let clickedOnExcludedEl = false
      if (exclude) {
        exclude.forEach((refName) => {
          // We only run this code if we haven't detected
          // any excluded element yet
          if (!clickedOnExcludedEl) {
            const excludedEl = vnode.context.$refs[refName]
            let excludedDomEl = null
            if (excludedEl) {
              // If it's a vue component grab the element, otherwise it is the element
              excludedDomEl = excludedEl.$el ? excludedEl.$el : excludedEl
              clickedOnExcludedEl = excludedDomEl.contains(e.target)
            }
          }
        })
      }

      // We check to see if the clicked element is not
      // the dialog element and not excluded
      if (!el.contains(e.target) && !clickedOnExcludedEl) {
        // If the clicked element is outside the dialog
        // and not the button, then call the outside-click handler
        // from the same component this directive is used in
        vnode.context[handler]()
      }
    }
    // Register click/touchstart event listeners on the whole page
    document.addEventListener('click', handleOutsideClick)
    document.addEventListener('touchstart', handleOutsideClick)
  },

  unbind() {
    // If the element that has v-closable is removed, then
    // unbind click/touchstart listeners from the whole page
    document.removeEventListener('click', handleOutsideClick)
    document.removeEventListener('touchstart', handleOutsideClick)
  },
})
