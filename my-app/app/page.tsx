'use client';
import React, { memo, useEffect, useRef, useState } from 'react';

interface RainDrop {
  id: number
  x: number
  y: number
  speed: number
  text: string
  opacity: number
  lastMoveTime: number
  charHeight: number // 新增：每个字符的高度
}

export default memo(function CharacterRainPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rainDropsRef = useRef<RainDrop[]>([])
  const animationIdRef = useRef<number>(0)

  // 定义你想要掉落的所有字符串
  const stringOptions = [
    "我",
    "我自己",
    "QOAN",
    "翟秋阳",
    "DEEPSEEK",
    "千问大模型",
    "next.js"
  ];

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

    // 从字符串数组中随机选择一个字符串
    const getRandomString = () => {
      return stringOptions[Math.floor(Math.random() * stringOptions.length)]
    }

    // 创建新的雨滴
    const createRainDrop = (): RainDrop => {
      const text = getRandomString();
      return {
        id: Math.random(),
        x: Math.random() * canvas.width,
        y: -20,
        speed: Math.random() * 100 + 50,
        text: text,
        opacity: Math.random() * 0.6 + 0.4,
        lastMoveTime: Date.now(),
        charHeight: 20 // 每个字符的高度
      }
    }

    // 动画循环
    const animate = () => {
      ctx.fillStyle = "white"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const currentTime = Date.now()

      // 随机生成新的雨滴
      if (Math.random() < 0.02) {
        rainDropsRef.current.push(createRainDrop())
      }

      // 更新和绘制雨滴
      rainDropsRef.current = rainDropsRef.current.filter((drop) => {
        if (currentTime - drop.lastMoveTime > drop.speed) {
          drop.y += 3
          drop.lastMoveTime = currentTime
        }

        ctx.font = "18px 'SF Pro Display', system-ui, sans-serif"

        // 随机选择清新的颜色
        const colors = [
          `rgba(99, 179, 237, ${drop.opacity})`, // 天蓝色
          `rgba(129, 199, 132, ${drop.opacity})`, // 清新绿
          `rgba(156, 204, 101, ${drop.opacity})`, // 嫩绿色
          `rgba(100, 181, 246, ${drop.opacity})`, // 浅蓝色
          `rgba(174, 213, 129, ${drop.opacity})`, // 春绿色
        ]
        const colorIndex = Math.floor(drop.id * colors.length) % colors.length
        ctx.fillStyle = colors[colorIndex]

        // 竖排绘制字符串
        for (let i = 0; i < drop.text.length; i++) {
          const char = drop.text[i];
          ctx.fillText(
            char, 
            drop.x, 
            drop.y + i * drop.charHeight // 每个字符垂直排列
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
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
    }
  }, [stringOptions])

  return (
    <div className="fixed inset-0 bg-white overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ display: "block" }} />

      <div className="absolute top-8 left-8 z-10">
        <h1 className="text-slate-600 text-2xl font-light opacity-80">特别鸣谢</h1>
      </div>
    </div>
  )
})