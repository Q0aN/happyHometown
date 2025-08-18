import { useRef, useEffect, memo } from "react";

interface GameObject {
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
    speed: number;
};

export const Game = memo(function Game() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        // 1. 安全获取 Canvas 和 Context
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // 2. 初始化游戏状态
        let score = 0;
        let isGameOver = false;
        let animationFrameId: number;

        // 3. 游戏对象定义
        const player: GameObject = {
            x: 50,
            y: canvas.height / 2,
            width: 50,
            height: 50,
            color: "blue",
            speed: 5,
        };

        const enemies: GameObject[] = [];

        // 4. 键盘控制
        const keys: Record<string, boolean> = {};

        // 5. 游戏主循环
        const gameLoop = () => {
            update();
            draw();
            if (!isGameOver) {
                animationFrameId = requestAnimationFrame(gameLoop);
            }
        };

        // 6. 核心函数
        const spawnEnemy = () => {
            enemies.push({
                x: canvas.width,
                y: Math.random() * (canvas.height - 30),
                width: 30,
                height: 30,
                color: "red",
                speed: 3,
            });
        };

        const checkCollision = (rect1: GameObject, rect2: GameObject) => {
            return (
                rect1.x < rect2.x + rect2.width &&
                rect1.x + rect1.width > rect2.x &&
                rect1.y < rect2.y + rect2.height &&
                rect1.y + rect1.height > rect2.y
            );
        };

        const updatePlayer = () => {
            if (keys["ArrowUp"] && player.y > 0) player.y -= player.speed;
            if (keys["ArrowDown"] && player.y < canvas.height - player.height)
                player.y += player.speed;
            if (keys["ArrowLeft"] && player.x > 0) player.x -= player.speed;
            if (keys["ArrowRight"] && player.x < canvas.width - player.width)
                player.x += player.speed;
        };

        const update = () => {
            updatePlayer();

            if (Math.random() < 0.02) spawnEnemy();

            enemies.forEach((enemy, index) => {
                enemy.x -= enemy.speed;
                if (checkCollision(player, enemy)) isGameOver = true;
                if (enemy.x + enemy.width < 0) {
                    enemies.splice(index, 1);
                    score++;
                }
            });
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // 绘制玩家
            ctx.fillStyle = player.color;
            ctx.fillRect(player.x, player.y, player.width, player.height);

            // 绘制敌人
            enemies.forEach(enemy => {
                ctx.fillStyle = enemy.color;
                ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
            });

            // 绘制分数
            ctx.fillStyle = "black";
            ctx.font = "24px Arial";
            ctx.fillText(`Score: ${score}`, 20, 40);

            // 游戏结束提示
            if (isGameOver) {
                ctx.fillStyle = "red";
                ctx.font = "48px Arial";
                ctx.textAlign = "center";
                ctx.fillText("Game Over!", canvas.width / 2, canvas.height / 2);
            }
        };

        // 7. 事件监听
        const handleKeyDown = (e: KeyboardEvent) => {
            keys[e.key] = true;
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            keys[e.key] = false;
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        // 8. 启动游戏
        canvas.width = 800;
        canvas.height = 500;
        gameLoop();

        // 9. 清理函数
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="w-[calc(100%-256px)]"
        />
    );
})