import { promises as fs } from "fs";
import { fileURLToPath } from 'url';
import path from 'path';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function saveComponentToFile(componentCode, filePath) {
    try {
        await fs.writeFile( path.join(__dirname, filePath), componentCode, "utf-8");
        console.log(`✅ 组件已保存至 ${filePath}`);
    } catch (err) {
        console.error("❌ 保存失败:", err);
    }
}
async function getTsxCodeAsString(filePath) {
    try {
        const code = await fs.readFile(filePath, 'utf-8');
        return code;
    } catch (error) {
        console.error('Error reading file:', error);
        return ''; // 或 throw error
    }
}
export { saveComponentToFile, getTsxCodeAsString }