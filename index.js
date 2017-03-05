require(`babel-register`)({
  presets: [ `react` ],
  plugins: [
    `transform-es2015-modules-commonjs`,
    `transform-async-to-generator`,
    `transform-object-rest-spread`,
    `transform-class-properties`,
  ],
})

require(`./server`)
