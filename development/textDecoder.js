// 文本编码处理工具 - 修复GB2312编码TXT文件乱码问题
// 依赖: 需要引入iconv-lite库 (npm install iconv-lite)
import iconv from 'iconv-lite';

/**
 * 增强的文本解码函数，支持多种编码自动检测和转换
 * @param {Uint8Array} content - 二进制内容
 * @param {string} contentType - 内容类型，默认'text/plain'
 * @returns {string} 解码后的文本
 */
async function decodeText(content, contentType = 'text/plain') {
    try {
        // 针对TXT文件进行特殊编码处理
        if (contentType.includes('text/plain')) {
            // 优先尝试UTF-8严格解码
            try {
                // 使用fatal: true确保任何UTF-8无效序列都会抛出错误
                return new TextDecoder('utf-8', { fatal: true }).decode(content);
            } catch (e) {
                // UTF-8解码失败，尝试GB2312（中文常见编码）
                try {
                    return iconv.decode(content, 'gb2312');
                } catch (e) {
                    // GB2312失败，尝试其他可能的编码
                    const encodings = ['gbk', 'big5', 'iso-8859-1', 'shift-jis'];
                    for (const encoding of encodings) {
                        try {
                            return iconv.decode(content, encoding);
                        } catch (e) {
                            continue; // 尝试下一种编码
                        }
                    }
                    // 所有编码尝试失败，使用UTF-8替代模式
                    return new TextDecoder('utf-8', { fatal: false }).decode(content);
                }
            }
        }
        
        // 非TXT文件使用默认UTF-8解码
        return new TextDecoder('utf-8').decode(content);
    } catch (error) {
        console.error('文本解码错误:', error);
        // 最终容错处理
        return new TextDecoder('utf-8', { fatal: false }).decode(content);
    }
}

/**
 * 加载文章内容并正确处理编码
 * @param {string} articleId - 文章ID
 */
async function loadArticleContent(articleId) {
    try {
        // 显示加载状态
        showDetailLoading();
        
        // 发起请求
        const response = await fetch(`${config.baseUrl}/api/articles/${articleId}`);
        if (!response.ok) {
            throw new Error(`HTTP错误: ${response.status}`);
        }
        
        // 以二进制形式获取内容，避免提前解码导致的问题
        const arrayBuffer = await response.arrayBuffer();
        const contentType = response.headers.get('content-type') || '';
        
        // 解码处理
        const content = decodeText(new Uint8Array(arrayBuffer), contentType);
        
        // 缓存处理后的内容
        state.articleCache.set(articleId, {
            ...state.allArticles.find(a => a.id === articleId),
            content: content
        });
        
        // 渲染文章内容
        renderArticleDetail(articleId);
    } catch (error) {
        console.error('加载文章内容失败:', error);
        showDetailError(`加载失败: ${error.message}`);
    }
}

/**
 * 检测文本可能的编码格式
 * @param {string} content - 待检测的文本
 * @returns {string} 推测的编码名称
 */
function detectEncoding(content) {
    // 包含替代字符或无效UTF-8序列，可能是GB2312编码
    if (content.includes('�') || hasInvalidUtf8(content)) {
        return 'gb2312';
    }
    return 'utf-8';
}

/**
 * 检测字符串是否包含无效的UTF-8序列
 * @param {string} str - 待检测字符串
 * @returns {boolean} 存在无效序列返回true，否则返回false
 */
function hasInvalidUtf8(str) {
    try {
        // 严格编码解码测试
        new TextDecoder('utf-8', { fatal: true }).decode(new TextEncoder().encode(str));
        return false;
    } catch {
        return true;
    }
}

// 导出供外部使用
export { decodeText, loadArticleContent, detectEncoding, hasInvalidUtf8 };
