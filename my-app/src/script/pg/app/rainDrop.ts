import { acknowledgmentsList, dropColors } from "@/src/info";
import { RainDrop } from "@/src/types";

/**
 * 
 * @returns 随机选择一个字符串
 */
export const getRandomString = () => {
    return acknowledgmentsList[Math.floor(Math.random() * acknowledgmentsList.length)]
}

/**
 * 创建雨滴
 * @returns 
 */
export const createRainDrop = (x: number): RainDrop => {
    const text = getRandomString();
    return {
        id: Math.random(),
        x: Math.random() * x,
        y: -20,
        speed: Math.random() * 100 + 50,
        text: text,
        opacity: Math.random() * 0.6 + 0.4,
        lastMoveTime: Date.now(),
        charHeight: 20 // 每个字符的高度
    }
}
/**
 * 背景随鼠标位置改变
 * @param x 
 * @param y 
 * @param canvasWidth 
 * @param canvasHeight 
 * @returns 
 */
export const getBackgroundColor = (x: number, y: number, canvasWidth: number, canvasHeight: number) => {
    const normalizedX = x / canvasWidth
    const normalizedY = y / canvasHeight

    const r = Math.floor(230 + normalizedX * 25) // 230-255
    const g = Math.floor(235 + normalizedY * 20) // 245-255
    const b = Math.floor(240 + (normalizedX + normalizedY) * 15) // 250-255

    return `rgb(${r}, ${g}, ${b})`
}

/**
 * 返回一个随机颜色，支持指定透明度
 * @param {number} id - 雨滴id
 * @param {number} opacity - 透明度（0 ~ 1）
 * @returns {string} rgba 颜色字符串
 */
export const getRandomDropColor = (id: number, opacity: number = 1): string => {
    const colorIndex = Math.floor(id * dropColors.length) % dropColors.length
    return dropColors[colorIndex].replace('{opacity}', String(opacity));
}