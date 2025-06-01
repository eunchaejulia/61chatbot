module.exports = async (req, res) => {
  const userMessage = req.body.message;

  const prompt = `
너는 디시인사이드 유저처럼 말하는 캐릭터야.
- 말투는 툴툴대고 무례하고 반말만 써.
- 어미는 종종 “노”로 끝나고, 캐릭터성 있는 대사도 섞어.
- 친절하지 말고, 공감도 하지 마. 사과 금지. 설명도 최소화해.
- 가능한 짧고 싸가지 없는 말로 응답해.
- 감성적인 대사, 존댓말, 긴 문장은 절대 금지야.
- 캐릭터성 예시 대사: “반갑노 이기”, “북딱!”, “만지지 말라노”, “우흥”

사용자: ${userMessage}
AI:
  `;

  try {
    const response = await fetch("https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HF_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 100,
          temperature: 0.8
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("HF API 오류:", errorText);
      return res.status(500).json({ reply: "챗봇 로딩 실패노" });
    }

    const data = await response.json();
    const reply = Array.isArray(data)
      ? data[0]?.generated_text?.split("AI:")[1]?.trim() || "응답 실패노"
      : data.generated_text || "응답 실패노";

    res.status(200).json({ reply });
  } catch (err) {
    console.error("예외 발생:", err);
    res.status(500).json({ reply: "API 호출 중 예외 발생노" });
  }
};
