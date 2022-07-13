export const title = {
  created() {
    if (this.$route != void 0) {
      const { title } = this.$route.meta
      window.document.title = title == undefined ? '' : title
    }
  }
}
