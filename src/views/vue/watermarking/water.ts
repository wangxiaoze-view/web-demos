import {computed} from "vue";

export default function useWater(props: any) {
  return computed(() => {
    const canvas = document.createElement('canvas')
    // dpr
    const devicePixelRatio = window.devicePixelRatio || 1
    const fontSize = props.fontSize * devicePixelRatio;
    const font = fontSize + 'px serif'
    const ctx = canvas.getContext('2d')

    ctx!.font = font

    const {width} = ctx!.measureText(props.text)
    const canvasSize = Math.max(100, width) + props.gap * devicePixelRatio;
    canvas.width = canvasSize
    canvas.height = canvasSize

    ctx!.translate(canvas.width / 2, canvas.height / 2)
    ctx!.rotate(Math.PI / 180 * -45)

    ctx!.fillStyle = 'rgba(255, 255, 255, .6)'
    ctx!.font = font
    ctx!.textAlign = 'center'
    ctx!.textBaseline = 'middle'
    ctx!.fillText(props.text, 0, 0)

    return {
      base: canvas.toDataURL(),
      size: canvasSize,
      styleSize: canvasSize / devicePixelRatio
    }


  })
}
