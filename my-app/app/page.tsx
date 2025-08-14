'use client';
import { Qoan } from '@/components/base';
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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  // 定义你想要掉落的所有字符串
  const stringOptions = [
    "我",
    "我自己",
    "QOAN",
    "翟秋阳",
    "DEEPSEEK",
    "千问大模型",
    "next.js",
    "REACT",
    "秋阳",
    "大帅哥翟秋阳"
  ];
  const getBackgroundColor = (x: number, y: number, canvasWidth: number, canvasHeight: number) => {
    const normalizedX = x / canvasWidth
    const normalizedY = y / canvasHeight

    // 基于鼠标位置生成柔和的渐变色
    const r = Math.floor(240 + normalizedX * 15) // 240-255
    const g = Math.floor(245 + normalizedY * 10) // 245-255
    const b = Math.floor(250 + (normalizedX + normalizedY) * 5) // 250-255

    return `rgb(${r}, ${g}, ${b})`
  }
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
      const bgColor = getBackgroundColor(mousePos.x, mousePos.y, canvas.width, canvas.height)
      ctx.fillStyle = bgColor
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
          `rgba(99, 179, 237, ${drop.opacity})`,   // 天蓝色
          `rgba(129, 199, 132, ${drop.opacity})`,  // 清新绿
          `rgba(255, 183, 77, ${drop.opacity})`,   // 晨曦橙
          `rgba(156, 204, 101, ${drop.opacity})`,  // 嫩绿色
          `rgba(236, 148, 150, ${drop.opacity})`,  // 豆沙粉
          `rgba(100, 181, 246, ${drop.opacity})`,  // 浅蓝色
          `rgba(174, 213, 129, ${drop.opacity})`,  // 春绿色
          `rgba(138, 90, 230, ${drop.opacity})`,   // 梦幻紫
          `rgba(245, 160, 120, ${drop.opacity})`,  // 杏黄色
          `rgba(87, 166, 129, ${drop.opacity})`,   // 森林绿
          `rgba(230, 120, 90, ${drop.opacity})`,   // 桃红色
          `rgba(160, 180, 165, ${drop.opacity})`,  // 灰青绿
          `rgba(190, 100, 230, ${drop.opacity})`,  // 霓虹紫
          `rgba(210, 180, 150, ${drop.opacity})`,  // 拿铁米白
          `rgba(60, 170, 180, ${drop.opacity})`,   // 青海蓝
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
      window.removeEventListener("mousemove", handleMouseMove)
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
    }
  }, [stringOptions, mousePos])

  return (
    <Qoan className="fixed inset-0 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ display: "block" }} />

      <Qoan className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10">
        <Qoan className="text-slate-600 text-2xl font-light opacity-80">特别鸣谢</Qoan>
      </Qoan>
    </Qoan>
  )
})