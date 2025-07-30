export const clickOut = {
  mounted (el, binding) {
    function documentHandler (event) {
      if (el.contains(event.target)) return false;
      if (typeof binding.value === 'function' ) {
        binding.value(event);
      }
    }
    el.clickOut = documentHandler;
    document.addEventListener('click', documentHandler, true);
  },
  unmounted (el) {
    document.removeEventListener('click', el.clickOut, true);
    delete el.clickOut;
  }
}