'use client';
import { Qoan } from '@/components/base';
import { acknowledgmentsList } from '@/src/info';
import { createRainDrop, getBackgroundColor, getRandomDropColor } from '@/src/script/pg/app/rainDrop';
import { appPageStyle } from '@/src/style';
import { RainDrop } from '@/src/types/page.type';
import React, { memo, useEffect, useRef, useState } from 'react';


export default memo(function CharacterRainPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rainDropsRef = useRef<RainDrop[]>([])
  const animationIdRef = useRef<number>(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // 设置画布大小
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    // 动画循环
    const animate = () => {
      const bgColor = getBackgroundColor(mousePos.x, mousePos.y, canvas.width, canvas.height)
      ctx.fillStyle = bgColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const currentTime = Date.now()

      // 随机生成新的雨滴
      if (Math.random() < 0.02) {
        rainDropsRef.current.push(createRainDrop(canvas.width))
      }

      // 更新和绘制雨滴
      rainDropsRef.current = rainDropsRef.current.filter((drop) => {
        if (currentTime - drop.lastMoveTime > drop.speed) {
          drop.y += 3
          drop.lastMoveTime = currentTime
        }

        ctx.font = "18px 'SF Pro Display', system-ui, sans-serif"

        ctx.fillStyle = getRandomDropColor(drop.id, drop.opacity)

        // 竖排绘制字符串
        for (let i = 0; i < drop.text.length; i++) {
          const char = drop.text[i];
          ctx.fillText(
            char,
            drop.x,
            drop.y + i * drop.charHeight
          );
        }

        // 移除超出屏幕的雨滴
        return drop.y - (drop.text.length * drop.charHeight) < canvas.height
      })

      animationIdRef.current = requestAnimationFrame(animate)
    }

    // 开始动画
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
    }
  }, [mousePos])

  return (
    <Qoan className={appPageStyle.base}>
      <canvas ref={canvasRef} className={appPageStyle.canvas} />

      <Qoan className={appPageStyle.board}>
        <Qoan className={appPageStyle.boardText}>特别鸣谢</Qoan>
      </Qoan>
    </Qoan>
  )
})