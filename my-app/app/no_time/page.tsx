"use client"

import { useState, useEffect, useRef } from "react"


export default function PomodoroTimer() {
    const [pomodoroTime, setPomodoroTime] = useState(25) // 番茄钟时间（分钟）
    const [currentSeconds, setCurrentSeconds] = useState(0) // 当前显示的秒数
    const [isRunning, setIsRunning] = useState(false)
    const [timerType, setTimerType] = useState<"pomodoro" | "stopwatch" | null>(null) // 当前计时器类型
    const [pomodoroProgress, setPomodoroProgress] = useState(0)

    // 定时器引用
    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    // 时间选项
    const timeOptions = [1, 7, 15, 25, 45]

    useEffect(() => {
        if (isRunning && timerType) {
            intervalRef.current = setInterval(() => {
                setCurrentSeconds((prev) => {
                    if (timerType === "pomodoro") {
                        // 倒计时逻辑
                        const newSeconds = prev - 1
                        const totalSeconds = pomodoroTime * 60
                        const progress = ((totalSeconds - newSeconds) / totalSeconds) * 100
                        setPomodoroProgress(progress)

                        if (newSeconds <= 0) {
                            setIsRunning(false)
                            setTimerType(null)
                            return 0
                        }
                        return newSeconds
                    } else {
                        // 正向计时逻辑
                        return prev + 1
                    }
                })
            }, 1000)
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
        }
    }, [isRunning, timerType, pomodoroTime])

    const startPomodoro = () => {
        if (timerType === "stopwatch") {
            // setIsRunning(false)
            return
        }

        if (timerType !== "pomodoro") {
            setCurrentSeconds(pomodoroTime * 60)
            setPomodoroProgress(0)
        }
        setTimerType("pomodoro")
        setIsRunning(true)
    }

    const pauseTimer = () => {
        setIsRunning(false)
    }

    const resetPomodoro = () => {
        setIsRunning(false)
        setCurrentSeconds(0)
        setPomodoroProgress(0)
        setTimerType(null)
    }

    const toggleStopwatch = () => {
        if (timerType === "pomodoro") {
            // setIsRunning(false)
            // setPomodoroProgress(0)
            return
        }

        if (timerType !== "stopwatch") {
            setCurrentSeconds(0)
            setTimerType("stopwatch")
            setIsRunning(true)
        } else {
            setIsRunning(!isRunning)
        }
    }

    const resetStopwatch = () => {
        setIsRunning(false)
        setCurrentSeconds(0)
        setTimerType(null)
    }

    // 切换番茄钟时间
    const changePomodoroTime = (minutes: number) => {
        if (!isRunning || timerType !== "pomodoro") {
            setPomodoroTime(minutes)
            setCurrentSeconds(0)
            setPomodoroProgress(0)
            setTimerType(null)
        }
    }

    // 格式化时间显示
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }

    const formatCurrentDisplay = () => {
        if (timerType && (isRunning || currentSeconds > 0)) {
            return formatTime(currentSeconds)
        }
        return `${pomodoroTime}:00`
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 flex items-center justify-center p-8">
            <div className="max-w-2xl w-full space-y-8">
                <div className="text-center">
                    <div className="text-sm text-gray-500 mb-2 mb-4">{timerType === "pomodoro" ? "吴时钟倒计时" : timerType === "stopwatch" ? "正向计时" : "准备中"}</div>
                    <div
                        className={`text-6xl font-mono font-bold ${timerType === "pomodoro" ? "text-pink-600" : timerType === "stopwatch" ? "text-blue-600" : "text-gray-600"}`}
                    >
                        {formatCurrentDisplay()}
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="bg-gray-200 rounded-full h-8 relative overflow-hidden">
                        {timerType === "pomodoro" ? (
                            <div
                                className="bg-gradient-to-r from-pink-400 to-rose-400 h-full rounded-full transition-all duration-1000 ease-out"
                                style={{ width: `${pomodoroProgress}%` }}
                            ></div>
                        ) : timerType === "stopwatch" ? (
                            <div
                                className="w-full h-full rounded-full animate-pulse"
                                style={{
                                    background:
                                        "linear-gradient(-45deg, #3b82f6, #8b5cf6, #ec4899, #ef4444, #f97316, #eab308, #22c55e, #3b82f6)",
                                    backgroundSize: "400% 400%",
                                    animation: "gradient 3s ease infinite",
                                }}
                            ></div>
                        ) : null}
                        <div className="absolute inset-0 flex items-center justify-center text-sm font-medium text-gray-600">
                            {timerType === "pomodoro"
                                ? `${Math.round(pomodoroProgress)}%`
                                : timerType === "stopwatch"
                                    ? "计时中..."
                                    : "0%"}
                        </div>
                    </div>
                </div>

                <div className="flex justify-center gap-8">
                    {/* 番茄钟控制 */}
                    <div className="text-center space-y-4">
                        <div className="space-x-2">
                            {!(isRunning && timerType === "pomodoro") ? (
                                <button
                                    onClick={startPomodoro}
                                    className={`${timerType !== 'stopwatch' ? 'bg-pink-500 hover:bg-pink-600 ' : 'bg-gray-500'}  text-white px-6 py-3 rounded-full`}
                                >
                                    {timerType !== "pomodoro" ? `开始${pomodoroTime}分钟` : '继续'}

                                </button>
                            ) : (
                                <button
                                    onClick={pauseTimer}
                                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full"
                                >
                                    {/* <Pause className="w-4 h-4 mr-2" /> */}
                                    暂停
                                </button>
                            )}
                            {timerType === "pomodoro" && (
                                <button onClick={resetPomodoro} className="px-3 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white hover:text-black">
                                    {/* <RotateCcw className="w-4 h-4" /> */}
                                    结束
                                </button>
                            )}
                        </div>
                    </div>

                    {/* 正向计时控制 */}
                    <div className="text-center space-y-4">
                        <div className="space-x-2">
                            <button
                                onClick={toggleStopwatch}
                                className={`${timerType !== 'pomodoro' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-500'}  text-white px-6 py-3 rounded-full`}
                            >
                                {isRunning && timerType === "stopwatch" ? (
                                    <>
                                        {/* <Pause className="w-4 h-4 mr-2" /> */}
                                        暂停计时
                                    </>
                                ) : (
                                    <>
                                        {/* <Play className="w-4 h-4 mr-2" /> */}
                                        开始正向计时
                                    </>
                                )}
                            </button>
                            {timerType === "stopwatch" && (
                                <button onClick={resetStopwatch} className="px-3 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white hover:text-black">
                                    {/* <Square className="w-4 h-4" /> */}
                                    结束
                                </button>)}
                        </div>
                    </div>
                </div>

                {/* 时间选择按钮 */}
                <div className="flex justify-center space-x-4">
                    {timeOptions.map((time) => (
                        <button
                            key={time}
                            onClick={() => changePomodoroTime(time)}
                            className={`w-16 h-16 rounded-full text-lg font-semibold ${pomodoroTime === time ? "bg-pink-500 hover:bg-pink-600 text-white" : "hover:bg-pink-50"
                                }`}
                            disabled={isRunning}
                        >
                            {time}
                        </button>
                    ))}
                </div>

            </div>
        </div>
    )
}
