'use client';

import { Qoan } from "@/components/base";
import { Game } from "@/components/first_game";
import { Navigation } from "@/components/navigation";
import { SideBar } from "@/components/sidebar";
import { navigationItems, sidebarItems ,user } from "@/src/info";
import { updateSidebarItem } from "@/src/script/pg/home/sidebar";
import { homePageStyle } from "@/src/style";
import { useCallback, useEffect, useRef, useState } from "react";
import { BinaryFileHandler } from "@/src/script/file/src/compile/base"
import { redirect } from "next/navigation";
export default function Home() {
  if (!user.name) {
    // 未登录，重定向到登录页
    redirect('/login');
  }
  const [activeTab, setActiveTab] = useState('17000001');
  const [sideBarItems, setSidebarItems] = useState(sidebarItems)
  const [selectedSideBarItem, setSelectedSideBarItem] = useState<string>('18010001')
  return (

    <Qoan className={homePageStyle.base}>
      <Navigation items={navigationItems} selected={activeTab} onSelected={setActiveTab} />
      <Qoan className={homePageStyle.body}>

        {activeTab === '17000001' && sideBarItems.length > 0 && <SideBar items={sideBarItems}
          onPress={(id: string) => {
            setSelectedSideBarItem(id)
            setSidebarItems(updateSidebarItem(sideBarItems, id))
          }}
          selected={selectedSideBarItem}
        ></SideBar>}
        {activeTab === '17000001' && selectedSideBarItem === '18010001' && <Qoan>欢迎回来{user.name}</Qoan>}
        {activeTab === '17000001' && selectedSideBarItem === '18020101' && <Game />}
        {activeTab === '17000002' && <OtherPage />}
        {activeTab === '17000003' && <TestPage />}
      </Qoan>
    </Qoan>
  );
}
// type GameObject = {
//   x: number;
//   y: number;
//   width: number;
//   height: number;
//   color: string;
//   speed: number;
// };
// const HomePage = () => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   useEffect(() => {
//     // 1. 安全获取 Canvas 和 Context
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     // 2. 初始化游戏状态
//     let score = 0;
//     let isGameOver = false;
//     let animationFrameId: number;

//     // 3. 游戏对象定义
//     const player: GameObject = {
//       x: 50,
//       y: canvas.height / 2,
//       width: 50,
//       height: 50,
//       color: "blue",
//       speed: 5,
//     };

//     const enemies: GameObject[] = [];

//     // 4. 键盘控制
//     const keys: Record<string, boolean> = {};

//     // 5. 游戏主循环
//     const gameLoop = () => {
//       update();
//       draw();
//       if (!isGameOver) {
//         animationFrameId = requestAnimationFrame(gameLoop);
//       }
//     };

//     // 6. 核心函数
//     const spawnEnemy = () => {
//       enemies.push({
//         x: canvas.width,
//         y: Math.random() * (canvas.height - 30),
//         width: 30,
//         height: 30,
//         color: "red",
//         speed: 3,
//       });
//     };

//     const checkCollision = (rect1: GameObject, rect2: GameObject) => {
//       return (
//         rect1.x < rect2.x + rect2.width &&
//         rect1.x + rect1.width > rect2.x &&
//         rect1.y < rect2.y + rect2.height &&
//         rect1.y + rect1.height > rect2.y
//       );
//     };

//     const updatePlayer = () => {
//       if (keys["ArrowUp"] && player.y > 0) player.y -= player.speed;
//       if (keys["ArrowDown"] && player.y < canvas.height - player.height)
//         player.y += player.speed;
//       if (keys["ArrowLeft"] && player.x > 0) player.x -= player.speed;
//       if (keys["ArrowRight"] && player.x < canvas.width - player.width)
//         player.x += player.speed;
//     };

//     const update = () => {
//       updatePlayer();

//       if (Math.random() < 0.02) spawnEnemy();

//       enemies.forEach((enemy, index) => {
//         enemy.x -= enemy.speed;
//         if (checkCollision(player, enemy)) isGameOver = true;
//         if (enemy.x + enemy.width < 0) {
//           enemies.splice(index, 1);
//           score++;
//         }
//       });
//     };

//     const draw = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       // 绘制玩家
//       ctx.fillStyle = player.color;
//       ctx.fillRect(player.x, player.y, player.width, player.height);

//       // 绘制敌人
//       enemies.forEach(enemy => {
//         ctx.fillStyle = enemy.color;
//         ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
//       });

//       // 绘制分数
//       ctx.fillStyle = "black";
//       ctx.font = "24px Arial";
//       ctx.fillText(`Score: ${score}`, 20, 40);

//       // 游戏结束提示
//       if (isGameOver) {
//         ctx.fillStyle = "red";
//         ctx.font = "48px Arial";
//         ctx.textAlign = "center";
//         ctx.fillText("Game Over!", canvas.width / 2, canvas.height / 2);
//       }
//     };

//     // 7. 事件监听
//     const handleKeyDown = (e: KeyboardEvent) => {
//       keys[e.key] = true;
//     };

//     const handleKeyUp = (e: KeyboardEvent) => {
//       keys[e.key] = false;
//     };

//     window.addEventListener("keydown", handleKeyDown);
//     window.addEventListener("keyup", handleKeyUp);

//     // 8. 启动游戏
//     canvas.width = 800;
//     canvas.height = 500;
//     gameLoop();

//     // 9. 清理函数
//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//       window.removeEventListener("keyup", handleKeyUp);
//       cancelAnimationFrame(animationFrameId);
//     };
//   }, []);

//   return (
//     <canvas
//       ref={canvasRef}
//       style={{
//         display: "block",
//         backgroundColor: "#eee",
//         margin: "0 auto"
//       }}
//     />
//   );
// };
const OtherPage = () => {
  const [fileContent, setFileContent] = useState('');
  const [fileName, setFileName] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  // 处理拖放区域的高亮显示
  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  // 处理文件放置
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length) {
      handleFiles(files);
    }
  }, []);

  // 处理文件选择
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files:FileList | null = e.target.files;
    if(!files)
      return;
    if (files.length) {
      handleFiles(files);
    }
  };

  // 读取文件内容
  const handleFiles = async (files:FileList) => {
    const file = files[0];
    setFileName(file.name);
    const info = await BinaryFileHandler.readFile(file)
    console.log(info)
  };

  return (
    <div style={{ padding: '20px' }}>
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        style={{
          border: `2px dashed ${isDragging ? '#2196F3' : '#cccccc'}`,
          borderRadius: '5px',
          padding: '40px',
          textAlign: 'center',
          backgroundColor: isDragging ? '#f0f8ff' : '#fafafa',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
        }}
      >
        <p>将文件拖放到此处，或</p>
        <input
          type="file"
          id="fileInput"
          style={{ display: 'none' }}
          onChange={handleFileSelect}
        />
        <label
          htmlFor="fileInput"
          style={{
            display: 'inline-block',
            padding: '8px 16px',
            backgroundColor: '#2196F3',
            color: 'white',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          选择文件
        </label>
      </div>

      {fileName && (
        <div style={{ marginTop: '20px' }}>
          <h3>文件信息:</h3>
          <p>文件名: {fileName}</p>

          {fileContent && (
            <div style={{ marginTop: '10px' }}>
              <h4>文件内容:</h4>
              {fileContent.startsWith('data:image') ? (
                <img
                  src={fileContent}
                  alt="预览"
                  style={{ maxWidth: '100%', maxHeight: '300px' }}
                />
              ) : (
                <pre style={{
                  whiteSpace: 'pre-wrap',
                  wordWrap: 'break-word',
                  backgroundColor: '#f5f5f5',
                  padding: '10px',
                  borderRadius: '4px',
                  maxHeight: '300px',
                  overflow: 'auto',
                }}>
                  {fileContent}
                </pre>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const TestPage = () => {
  const handleDownload = () => {
    // 要保存的数据
    const data = {
      name: '测试用户',
      age: 30,
      notes: '这是一段测试数据，用于生成自定义二进制文件'
    };

    // 生成 Blob
    const blob = BinaryFileHandler.createFileBlob(data, 65536); // 64KB 分片

    // 创建下载链接
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.qoan'; // 文件名
    a.click();

    // 释放 URL 对象
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>💾 二进制文件生成器</h1>
      <p>点击按钮生成一个自定义格式的 .qoan 文件</p>
      <button onClick={handleDownload} style={{ fontSize: '18px', padding: '10px 20px' }}>
        生成并下载文件
      </button>
    </div>
  );
}