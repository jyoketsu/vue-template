const decoder = new TextDecoder("utf-8");

export function askAi(
  messages: { role: string; content: string }[],
  callback: (text: string) => void
) {
  const data = {
    messages,
  };

  // 创建一个 Fetch 请求
  const aiUrl = "https://soar.cn/chatbot/api/chat";

  fetch(aiUrl, {
    method: "POST", // 请求方法为 POST
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      // 处理流式数据
      if (!response || !response.body) return;
      const reader = response.body.getReader();

      reader.read().then(function pump({ done, value }): any {
        if (done) {
          // Do something with last chunk of data then exit reader
          console.log("流式数据传输完成");
          return;
        }
        // Otherwise do something here to process current chunk
        const text = decoder.decode(value);
        console.log("---text---", text);
        callback(text);
        // console.log("接收到数据块:", value);
        // Read some more, and call this function again
        return reader.read().then(pump);
      });
    })
    .catch((error) => {
      console.error("发生错误:", error);
    });
}
