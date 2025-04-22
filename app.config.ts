export default defineAppConfig({
  ui: {
    carousel: {
      slots: {
        dot: [
          'cursor-pointer size-3 ring-1 ring-red-500 rounded-full bg-white',
          'transition'
        ]
      },
      variants: {
        active: {
          true: {
            dot: 'bg-red-500'
          }
        }
      }
    }
  }
})
