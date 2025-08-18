'use client';

import { BinaryFileHandler } from "@/src/script/file/src/compile/base";
import { useRouter } from 'next/navigation';
import { useState, useCallback } from "react";

export default function Login() {
  const [fileContent, setFileContent] = useState('');
  const [fileName, setFileName] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const router = useRouter();

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
    router.push('/home')
  }, []);

  // 处理文件选择
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = e.target.files;
    if (!files)
      return;
    if (files.length) {
      handleFiles(files);
    }
    router.push('/home')
  };

  // 读取文件内容
  const handleFiles = async (files: FileList) => {
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