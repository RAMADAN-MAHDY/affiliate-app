"use client";
import { useEffect, useRef, useState } from "react";
import Markdown from 'react-markdown'
import ChatButton from './chatButtom'
import { image } from "d3";

export default function ChatBotWidget() {

    const url = process.env.NEXT_PUBLIC_URL_chatAi;

    const [showChat, setShowChat] = useState(false);
    const [input, setInput] = useState("");
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const chatEndRef = useRef(null);

    const handleShowChat = () => {
        setShowChat(v => !v);
    }

    useEffect(() => {
        if (showChat && history.length === 0) {
            const sendInitialMessage = async () => {
                let token = localStorage.getItem("token");
                try {
                    const res = await fetch(`${url}/chat`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            ...(token && { Authorization: `Bearer ${token}` })
                        },
                        body: JSON.stringify({ message: "ابدأ" }) // أو أي شيء بسيط
                    });

                    const data = await res.json();

                    if (data.token && !token) {
                        localStorage.setItem("token", data.token);
                    }

                    setHistory(h => [...h, { from: "bot", text: data.reply }]);
                } catch {
                    setHistory(h => [
                        ...h,
                        {
                            from: "bot",
                            text: "فيه مشكلة بالتواصل مع المساعد، تواصل معنا على 01021256768"
                        }
                    ]);
                }
            };

            sendInitialMessage();
        }
    }, [showChat]);



    useEffect(() => {
        if (showChat && chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [history, showChat]);

    const handleSend = async () => {
        let token = localStorage.getItem("token");
        if (!input.trim()) return;


        setHistory(h => [...h, { from: "user", text: input }]);
        setLoading(true);
        setInput("");
        try {
            const res = await fetch(`${url}/chat`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...(token && { Authorization: `Bearer ${token}` })
                }
                ,
                body: JSON.stringify({ message: input })
            });
            const data = await res.json();

            // Store the token in localStorage
            if (data.token && !token) {
                localStorage.setItem("token", data.token);
            }
            if (!data.token && token) {
                localStorage.removeItem("token");
            }
            setHistory(h => [...h, { from: "bot", text: data?.reply || " يوجد ضغط حاليا من فضلك التواصل علي هذا الرقم 0562790402 او حاول ثانيا" }]);
        } catch {
            setHistory(h => [...h, { from: "bot", text: "صارت مشكلة في الاتصال بالمساعد. يرجي التواصل عبر الجوال 01021256768" }]);
        }
        setLoading(false);
    };



    // Function to speak the given text
    const cleanText = (text) => {
        // إزالة الإيموجي والرموز الخاصة
        return text
            .replace(/[^\p{L}\p{N}\s]/gu, '') // يشيل الرموز غير الحروف والأرقام
            .replace(/[\u{1F600}-\u{1F6FF}]/gu, '') // يشيل بعض الإيموجي
            .replace(/\s+/g, ' ') // يشيل المسافات الزائدة
            .trim();
    };

    const speak = (text) => {
        const sentences = cleanText(text).split(/[.!؟]/).filter(Boolean);

        let index = 0;

        const speakSentence = () => {
            if (index < sentences.length) {
                const utterance = new SpeechSynthesisUtterance(sentences[index].trim());
                utterance.lang = "ar-SA";
                utterance.rate = 0.95;
                utterance.pitch = 1.2;
                utterance.volume = 1;

                utterance.onend = () => {
                    index++;
                    setTimeout(speakSentence, 300); // تأخير بسيط بين الجمل
                };

                speechSynthesis.speak(utterance);
            }
        };

        speakSentence();
    };

    const stopSpeak = () => {
        window.speechSynthesis.cancel();

    };


    return (
        <>    
               <ChatButton ShowChat = {handleShowChat} />
               
                {showChat && (      
                    <div className="fixed bottom-[20%] h-[70%] sm:right-6 right-0 flex flex-col items-end min-w-[200px] z-[1000]">
                    <div
                        className="bg-white shadow-2xl h-[100%] rounded-2xl p-4 max-w-xs w-[690px] border border-blue-200 mt-4 relative animate-fade-in flex flex-col"
                        style={{ minHeight: 380 }}
                    >
                        <button
                            className="absolute top-2 left-2 text-gray-400 hover:text-red-500 text-xl"
                            onClick={() => setShowChat(false)}
                            aria-label="إغلاق الشات"
                        >
                            ×
                        </button>

                        <div className="flex items-center mb-2">
                            <lottie-player
                                src="https://assets4.lottiefiles.com/packages/lf20_zyquagfl.json"
                                background="transparent"
                                speed="1"
                                style={{ width: "2rem", height: "2rem" }}
                                loop
                                autoplay
                            ></lottie-player>
                            <span className="font-bold text-blue-700 text-lg ml-2">المساعد الذكي</span>
                        </div>

                        <div className="flex-1 overflow-y-auto mb-2 pr-1" style={{ maxHeight: 620 }}>
                            {history.length === 0 && (
                                <div className="text-gray-400 text-center mt-8">ابدأ المحادثة</div>
                            )}
                            {history.map((msg, i) => (
                                <div
                                    key={i}
                                    className={`my-2 flex ${msg.from === "user" ? "justify-end" : "justify-start w-full"}`}
                                >
                                    <div
                                        className={`px-3 py-2 rounded-xl max-w-[100%] text-sm ${msg.from === "user"
                                            ? "bg-blue-100 text-blue-900"
                                            : "bg-blue-600 text-white"
                                            }`}
                                    >
                                        {msg.from === "user" ? (
                                            msg.text
                                        ) : (
                                            <>
                                            <p className="w-full">   
                                              
                                                <Markdown>{(msg.text || "").toString().trim()}</Markdown>
                                            </p>
                                          
                                                <button
                                                    className="mt-1 text-sm text-yellow-200  hover:text-white"
                                                    onClick={() => speak(msg.text)}
                                                    aria-label="تشغيل الصوت"
                                                >
                                                    🔊 استمع
                                                </button>
                                                <button
                                                    className="mt-1 text-sm text-red-200  hover:text-white"
                                                    onClick={stopSpeak}
                                                    aria-label="إيقاف الصوت"
                                                >
                                                    🔇 إيقاف
                                                </button>
                                            </>
                                        )}

                                    </div>
                                </div>
                            ))}
                            <div ref={chatEndRef} />
                        </div>

                        {loading && <img className="w-20 h-20" src="/animation/MetaAIlogo.gif" alt="..."/>}

                        <div className="flex gap-2 mt-2 items-center flex-wrap">

                            <input
                                className="flex-grow min-w-[150px] border border-blue-300 rounded-lg px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
                                type="text"
                                placeholder="اكتب رسالتك..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                disabled={loading}
                            />
                            <button
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 transition disabled:opacity-50 flex-shrink-0"
                                onClick={handleSend}
                                disabled={loading || !input.trim()}
                                aria-label="إرسال الرسالة"
                            >
                                {loading ? "..." : "إرسال"}
                            </button>
                        </div>

                    </div>

</div>

                )}
        </>
    );
}
