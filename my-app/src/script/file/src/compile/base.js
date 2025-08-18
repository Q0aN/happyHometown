import crc32 from 'crc-32';
import { navigationItems, sidebarItems, user } from '@/src/info'

class BinaryFileHandler {
    static HEADER_SIZE = 4 + 1 + 1 + 8 + 4 + 4; // 22 字节
    static DEFAULT_CHUNK_SIZE = 1024 * 1024; // 1MB
    static MAGIC_NUMBER = new TextEncoder().encode('qoan'); // 'qoan'

    /**
     * 创建文件Blob，支持分片存储
     */
    static createFileBlob(data, chunkSize = BinaryFileHandler.DEFAULT_CHUNK_SIZE) {
        const dataStr = JSON.stringify(data);
        const encoder = new TextEncoder();
        const dataBytes = encoder.encode(dataStr);
        const dataLength = dataBytes.length;

        // 1. 创建 header
        const header = new Uint8Array(BinaryFileHandler.HEADER_SIZE);
        const headerView = new DataView(header.buffer);

        header.set(BinaryFileHandler.MAGIC_NUMBER, 0);
        headerView.setUint8(4, 0); // major
        headerView.setUint8(5, 1); // minor
        const timestamp = BigInt(Date.now());
        BinaryFileHandler.writeBigUInt64BE(headerView, timestamp, 6);
        headerView.setUint32(14, dataLength);
        headerView.setUint32(18, chunkSize);

        // 2. 分片处理
        const chunkCount = Math.ceil(dataLength / chunkSize);
        const chunkInfoSize = 4 + chunkCount * 8;
        const chunkInfo = new Uint8Array(chunkInfoSize);
        const chunkInfoView = new DataView(chunkInfo.buffer);

        chunkInfoView.setUint32(0, chunkCount);

        const chunks = [];
        let currentOffset = BinaryFileHandler.HEADER_SIZE + chunkInfoSize;

        for (let i = 0; i < chunkCount; i++) {
            const start = i * chunkSize;
            const end = Math.min(start + chunkSize, dataLength);
            const chunk = dataBytes.slice(start, end);
            const chunkCRC = crc32.buf(chunk) >>> 0;

            chunkInfoView.setUint32(4 + i * 8, currentOffset);
            chunkInfoView.setUint32(4 + i * 8 + 4, chunkCRC);

            chunks.push(chunk);
            currentOffset += chunk.length;
        }

        // 3. 合并所有部分
        const totalLength = BinaryFileHandler.HEADER_SIZE + chunkInfoSize + dataLength;
        const fileWithoutCRC = new Uint8Array(totalLength);
        let pos = 0;

        fileWithoutCRC.set(header, pos);
        pos += BinaryFileHandler.HEADER_SIZE;

        fileWithoutCRC.set(chunkInfo, pos);
        pos += chunkInfoSize;

        chunks.forEach(chunk => {
            fileWithoutCRC.set(chunk, pos);
            pos += chunk.length;
        });

        // 4. CRC Footer
        const fileCRC = crc32.buf(fileWithoutCRC) >>> 0;
        const footer = new Uint8Array(4);
        const footerView = new DataView(footer.buffer);
        footerView.setUint32(0, fileCRC);

        return new Blob([fileWithoutCRC, footer], { type: 'application/octet-stream' });
    }

    static writeBigUInt64BE(view, num, offset) {
        const high = Number(num >> 32n);
        const low = Number(num & 0xFFFFFFFFn);
        view.setUint32(offset, high);
        view.setUint32(offset + 4, low);
    }

    static async readFile(file) {
        const arrayBuffer = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsArrayBuffer(file);
        });

        const dataView = new DataView(arrayBuffer);
        const totalLength = arrayBuffer.byteLength;

        if (totalLength < BinaryFileHandler.HEADER_SIZE + 4) {
            throw new Error('文件已损坏: 长度不足');
        }

        const magic = new Uint8Array(arrayBuffer.slice(0, 4));
        if (!BinaryFileHandler.arrayEquals(magic, BinaryFileHandler.MAGIC_NUMBER)) {
            throw new Error('无效的文件格式');
        }

        const majorVersion = dataView.getUint8(4);
        const minorVersion = dataView.getUint8(5);

        const timestampHigh = dataView.getUint32(6);
        const timestampLow = dataView.getUint32(10);
        const timestamp = (BigInt(timestampHigh) << 32n) | BigInt(timestampLow);

        const dataLength = dataView.getUint32(14);
        const chunkSize = dataView.getUint32(18);

        const chunkCount = dataView.getUint32(22);
        const chunkInfoSize = 4 + chunkCount * 8;
        const fileDataEnd = BinaryFileHandler.HEADER_SIZE + chunkInfoSize + dataLength;
        const crcOffset = totalLength - 4;

        if (totalLength < fileDataEnd + 4) {
            throw new Error('文件已损坏: 数据长度不符');
        }

        const fileCrcExpected = dataView.getUint32(crcOffset);
        const fileCrcActual = crc32.buf(new Uint8Array(arrayBuffer.slice(0, crcOffset))) >>> 0;
        if (fileCrcExpected !== fileCrcActual) {
            throw new Error('文件校验失败: 文件可能已损坏');
        }

        const chunks = [];
        const chunkInfoStart = BinaryFileHandler.HEADER_SIZE;

        for (let i = 0; i < chunkCount; i++) {
            const chunkOffset = dataView.getUint32(chunkInfoStart + 4 + i * 8);
            const expectedChunkCRC = dataView.getUint32(chunkInfoStart + 4 + i * 8 + 4);

            const nextOffset =
                i === chunkCount - 1
                    ? fileDataEnd
                    : dataView.getUint32(chunkInfoStart + 4 + (i + 1) * 8);

            const chunkBytes = new Uint8Array(arrayBuffer.slice(chunkOffset, nextOffset));
            const actualChunkCRC = crc32.buf(chunkBytes) >>> 0;

            if (expectedChunkCRC !== actualChunkCRC) {
                throw new Error(`分片 ${i + 1}/${chunkCount} 校验失败`);
            }

            chunks.push(chunkBytes);
        }

        const totalData = BinaryFileHandler.concatUint8Arrays(chunks);
        if (totalData.length !== dataLength) {
            throw new Error('文件已损坏: 合并后的数据长度不符');
        }

        const decoder = new TextDecoder('utf-8');
        const dataStr = decoder.decode(totalData);
        let parsedData;
        try {
            parsedData = JSON.parse(dataStr);
        } catch (e) {
            throw new Error('数据解析失败: ' + e.message);
        }
        navigationItems.length = 0
        navigationItems.push(...parsedData.navigator)
        sidebarItems.length = 0
        sidebarItems.push(...parsedData.sidebar)
        user.name = parsedData.user.name
        // window.location.reload();
        return {
            version: `${majorVersion}.${minorVersion}`,
            createdAt: new Date(Number(timestamp)),
            data: parsedData,
        };
    }

    static arrayEquals(a, b) {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
        return true;
    }

    static concatUint8Arrays(arrays) {
        const totalLength = arrays.reduce((acc, arr) => acc + arr.length, 0);
        const result = new Uint8Array(totalLength);
        let offset = 0;
        arrays.forEach(arr => {
            result.set(arr, offset);
            offset += arr.length;
        });
        return result;
    }
}

export { BinaryFileHandler };