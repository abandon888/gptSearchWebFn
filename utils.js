function parseJsonSafely(summaryRes) {
  try {
    // 尝试解析summaryRes
    return JSON.parse(summaryRes);
  } catch (e) {
    // 如果解析失败，则捕获错误并返回原始值
    return summaryRes;
  }
}

module.exports = {
  parseJsonSafely
}

