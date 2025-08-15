
export interface RainDrop {
  id: number
  x: number
  y: number
  speed: number
  text: string
  opacity: number
  lastMoveTime: number
  charHeight: number // 新增：每个字符的高度
}