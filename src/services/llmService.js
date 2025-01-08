import { debounce } from "lodash";

const API_URL = "https://api.openai.com/v1/chat/completions"; // 예시
const OPENAI_API_KEY = "YOUR_OPENAI_API_KEY"; // 실제 API 키로 교체

const cache = new Map(); // 동일 요청 캐시

// Debounced API 호출 함수
const debouncedFetch = debounce(async (inputText, entities) => {
    const cacheKey = `${inputText}-${entities.join(",")}`;

    // 캐시된 응답 반환
    if (cache.has(cacheKey)) {
        console.log("Returning cached response");
        return cache.get(cacheKey);
    }

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: "You are a helpful assistant." },
                    { role: "user", content: `User input: "${inputText}". Entities: ${entities.join(", ")}` },
                ],
            }),
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        const data = await response.json();
        const llmResponse = data.choices[0].message.content;

        cache.set(cacheKey, llmResponse); // 응답 캐시에 저장
        return llmResponse;
    } catch (error) {
        console.error("Error fetching LLM response:", error);
        throw new Error("Failed to get response from LLM.");
    }
}, 1000); // 1초 디바운스

export const getLLMResponse = async (inputText, entities) => {
    return debouncedFetch(inputText, entities);
};
