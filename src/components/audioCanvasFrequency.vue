<template>
  <div class="audio-canvas-frequency">
    <canvas :ref="ref" />
  </div>
</template>

<script>
export default {
  name: 'audioCanvasFrequency',
  props: ['audio'],
  data () {
    return {
      // canvas ref
      ref: new Date().getTime(),
      // canvas dom
      canvas: '',
      // canvas context
      ctx: '',
      // canvas [width, height]
      canvasWH: [],
      // audio analyser
      audioAnalyser: '',
      // frequency data
      frequency: [],
      // last frequency data
      lastFrequency: [],
      // column num
      columnNum: 0,
      // animation start x pos
      animationStartXPos: 0,
      // analyserFFT
      analyserFFT: 2048,
      // swing scale
      swingScale: 1,
      // column width
      columnWidth: 10,
      // gap width
      gapWidth: 4,
      // column color hex data
      columnHexColor: ['#6ed4d3', '#f5738f', '#4bb7e4'],
      // column color rgb data
      columnRgbColor: [],
      // color transform index
      colorTransformIndex: 0,
      // color transform frame time
      colorTransformFrame: 1000,
      // cap height
      capHeight: 2,
      // animation status
      animationEndHandler: ''
    }
  },
  methods: {
    /**
     * @description             init
     * @return     {undefined}  no return
     */
    init () {
      const { initCanvas, initAudio, initColumnConfig, draw } = this

      initCanvas()

      initAudio()

      initColumnConfig()

      draw()
    },
    /**
     * @description             init canvas
     * @return     {undefined}  no return
     */
    initCanvas () {
      const { ref, $refs, canvasWH } = this

      const canvas = this.canvas = $refs[ref]

      this.ctx = canvas.getContext('2d')

      canvasWH[0] = canvas.clientWidth
      canvasWH[1] = canvas.clientHeight

      canvas.setAttribute('width', canvasWH[0])
      canvas.setAttribute('height', canvasWH[1])
    },
    /**
     * @description             init audio
     * @return     {undefined}  no return
     */
    initAudio () {
      const { audio, analyserFFT } = this

      const audioCtx = new (window.AudioContext || window.webkitAudioContext)()

      const audioSource = audioCtx.createMediaElementSource(audio)
      const audioAnalyser = this.audioAnalyser = audioCtx.createAnalyser()

      audioSource.connect(audioAnalyser)
      audioAnalyser.connect(audioCtx.destination)

      audioAnalyser.fftSize = analyserFFT

      this.frequency = new Uint8Array(audioAnalyser.frequencyBinCount)
    },
    /**
     * @description             init column config
     * @return     {undefined}  no return
     */
    initColumnConfig (a, b) {
      const { canvasWH, columnWidth, gapWidth, columnHexColor } = this

      const { color: { hexToRgb } } = this

      const columnItemWidth = columnWidth + gapWidth

      const columnNum = this.columnNum = Math.trunc(canvasWH[0] / columnItemWidth)

      this.swingScale = canvasWH[1] / 255

      this.animationStartXPos = Math.trunc((canvasWH[0] - (columnNum * columnItemWidth) + gapWidth) / 2)

      this.columnRgbColor = columnHexColor.map(c => [...hexToRgb(c).match(/\d+/g), 0].map(v => parseInt(v)))
    },
    /**
     * @description             draw animation
     * @return     {undefined}  no return
     */
    draw () {
      const { draw, audioAnalyser, frequency, ctx, canvasWH } = this

      audioAnalyser.getByteFrequencyData(frequency)

      ctx.clearRect(0, 0, ...canvasWH)

      const { columnWidth, gapWidth, columnNum, animationStartXPos, swingScale, lastFrequency } = this

      const { capHeight, getCurrentColumnColor } = this

      const columnItemWidth = columnWidth + gapWidth

      const [topColor, bottomColor] = [...getCurrentColumnColor()]

      for (let i = 0; i < columnNum; i++) {
        const currentHeight = frequency[i] * swingScale

        lastFrequency.length < i && lastFrequency.push(currentHeight)

        // draw cap
        ctx.fillStyle = `rgba(${topColor[0]},${topColor[1]},${topColor[2]},${currentHeight / canvasWH[1] * 0.8})`
        currentHeight < lastFrequency[i] ? --lastFrequency[i] : lastFrequency[i] = currentHeight
        ctx.fillRect(i * columnItemWidth + animationStartXPos, canvasWH[1] - lastFrequency[i], columnWidth, capHeight)

        const columnColor = ctx.createLinearGradient(0, 0, 0, canvasWH[1])

        columnColor.addColorStop(0, `rgba(${topColor[0]},${topColor[1]},${topColor[2]},${currentHeight / canvasWH[1] * 0.6})`)
        columnColor.addColorStop(1, `rgba(${bottomColor[0]},${bottomColor[1]},${bottomColor[2]},0.1)`)

        // draw column
        ctx.fillStyle = columnColor
        ctx.fillRect(i * columnItemWidth + animationStartXPos, canvasWH[1] - currentHeight + capHeight, columnWidth, currentHeight)
      }

      this.animationEndHandler = requestAnimationFrame(draw)
    },
    /**
     * @description             get current column color
     * @return     {undefined}  no return
     */
    getCurrentColumnColor (topOpacity) {
      const { columnRgbColor, colorTransformIndex, colorTransformFrame } = this

      const colorNum = columnRgbColor.length

      const topColor = columnRgbColor[colorTransformIndex % colorNum]
      const bottomColor = columnRgbColor[(colorTransformIndex + 1) % colorNum]
      const nextColor = columnRgbColor[(colorTransformIndex + 2) % colorNum]

      let currentFrame = topColor[3]

      const tranTopColor = topColor.map((v, i) => i < 3 && ((bottomColor[i] - v) / colorTransformFrame * currentFrame + v))
      const tranBottomColor = bottomColor.map((v, i) => i < 3 && ((nextColor[i] - v) / colorTransformFrame * currentFrame + v))

      ++topColor[3] === colorTransformFrame && (topColor[3] = 0)
      ++bottomColor[3] === colorTransformFrame && (bottomColor[3] = 0)
      ++currentFrame === colorTransformFrame && (this.colorTransformIndex++)

      return [tranTopColor, tranBottomColor]
    }
  },
  mounted () {
    const { init, $nextTick } = this

    $nextTick(init)
  },
  destroyed () {
    const { animationEndHandler } = this

    cancelAnimationFrame(animationEndHandler)
  }
}
</script>

<style lang="less">
.audio-canvas-frequency {
  width: 100%;
  height: 100%;

  canvas {
    width: 100%;
    height: 100%;
  }
}
</style>
