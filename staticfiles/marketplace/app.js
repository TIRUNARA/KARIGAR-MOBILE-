console.log("KARIGAR app.js loaded with Saathi Gemini AI Copilot");

/* =========================================================
   SAATHI DRAWER CONTROL
   ========================================================= */

function openSaathi() {
    const panel = document.getElementById("saathiPanel");
    const overlay = document.getElementById("saathiOverlay");

    if (!panel || !overlay) {
        console.error("Saathi elements not found.");
        return;
    }

    panel.classList.add("is-open");
    overlay.classList.add("is-open");
    panel.setAttribute("aria-hidden", "false");
    document.body.classList.add("saathi-open");

    // Initialize welcome greeting if empty
    const chat = document.getElementById("saathiChatMessages");
    if (chat && chat.children.length === 0) {
        appendSaathiMessage(
            "saathi",
            "Namaste! I am **Saathi**, your AI craft companion powered by Google Gemini.\n\n" +
            "How may I support your art today? You can choose a guided action above, speak by tapping the microphone below, or type your question directly."
        );
    }

    // Focus input field
    const input = document.getElementById("saathiInput");
    if (input) setTimeout(() => input.focus(), 300);
}

function closeSaathi() {
    const panel = document.getElementById("saathiPanel");
    const overlay = document.getElementById("saathiOverlay");

    if (!panel || !overlay) return;

    panel.classList.remove("is-open");
    overlay.classList.remove("is-open");
    panel.setAttribute("aria-hidden", "true");
    document.body.classList.remove("saathi-open");
}


/* =========================================================
   SAATHI CHAT & GEMINI API INTEGRATION
   ========================================================= */

function formatMarkdown(text) {
    if (!text) return "";
    let html = text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    // Italics
    html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");
    // Line breaks
    html = html.replace(/\n\n/g, "<br><br>").replace(/\n/g, "<br>");
    return html;
}

function appendSaathiMessage(sender, text, meta) {
    const container = document.getElementById("saathiChatMessages");
    if (!container) return;

    const msgDiv = document.createElement("div");
    msgDiv.style.borderRadius = "12px";
    msgDiv.style.padding = "10px 14px";
    msgDiv.style.fontSize = "13px";
    msgDiv.style.lineHeight = "1.5";
    msgDiv.style.maxWidth = "92%";
    msgDiv.style.wordBreak = "break-word";

    if (sender === "user") {
        msgDiv.style.alignSelf = "flex-end";
        msgDiv.style.background = "#b85b35";
        msgDiv.style.color = "#ffffff";
        msgDiv.textContent = text;
    } else {
        msgDiv.style.alignSelf = "flex-start";
        msgDiv.style.background = "#fffdf9";
        msgDiv.style.border = "1px solid rgba(36, 27, 23, 0.12)";
        msgDiv.style.color = "#241b17";
        msgDiv.innerHTML = formatMarkdown(text);

        // Add action toolbar for copy / use in form
        const actionsBar = document.createElement("div");
        actionsBar.style.marginTop = "8px";
        actionsBar.style.display = "flex";
        actionsBar.style.gap = "8px";
        actionsBar.style.fontSize = "10px";

        const copyBtn = document.createElement("button");
        copyBtn.type = "button";
        copyBtn.textContent = "📋 Copy text";
        copyBtn.style.padding = "3px 8px";
        copyBtn.style.background = "rgba(36, 27, 23, 0.06)";
        copyBtn.style.border = "0";
        copyBtn.style.borderRadius = "6px";
        copyBtn.style.cursor = "pointer";
        copyBtn.style.color = "#55433b";
        copyBtn.onclick = function () {
            navigator.clipboard.writeText(text);
            copyBtn.textContent = "✓ Copied!";
            setTimeout(() => copyBtn.textContent = "📋 Copy text", 2000);
        };
        actionsBar.appendChild(copyBtn);

        // If on add_craft form, allow applying to description or story
        const storyInput = document.getElementById("id_story") || document.getElementById("id_description");
        if (storyInput) {
            const applyBtn = document.createElement("button");
            applyBtn.type = "button";
            applyBtn.textContent = "✍️ Use in Form";
            applyBtn.style.padding = "3px 8px";
            applyBtn.style.background = "#415a44";
            applyBtn.style.color = "#fff";
            applyBtn.style.border = "0";
            applyBtn.style.borderRadius = "6px";
            applyBtn.style.cursor = "pointer";
            applyBtn.onclick = function () {
                storyInput.value = text;
                applyBtn.textContent = "✓ Added to Form!";
                closeSaathi();
            };
            actionsBar.appendChild(applyBtn);
        }

        msgDiv.appendChild(actionsBar);
    }

    container.appendChild(msgDiv);
    container.scrollTop = container.scrollHeight;
}

const SHIVA_GEMINI_API_KEY = window.KARIGAR_GEMINI_KEY || "AIzaSyAr_sl9biCX4CUj4HHJ_WnPNsW1luJHVQk";

async function callDirectGeminiAI(query, action, lang) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${SHIVA_GEMINI_API_KEY}`;
    const systemPrompt = "You are Saathi (साथी), the AI companion, cultural advisor, and co-creator for Indian artisans on KARIGAR. You champion authentic Indian handmade heritage (Bankura terracotta, Varanasi silk, Channapatna toys, Madhubani art, Dhokra bell metal, etc.) and fair living wages. Provide warm, concise, and empowering answers in the requested language.";

    const requestBody = {
        contents: [
            {
                role: "user",
                parts: [
                    {
                        text: `Language: ${lang}\nArtisan Action: ${action}\nQuery / Spoken Note: ${query}\nProvide helpful, culturally grounded advice.`
                    }
                ]
            }
        ],
        systemInstruction: {
            parts: [{ text: systemPrompt }]
        }
    };

    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody)
    });

    if (!response.ok) throw new Error(`Gemini API error: ${response.status}`);
    const result = await response.json();
    const replyText = result?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!replyText) throw new Error("Empty candidate from Gemini API");
    return replyText;
}

async function querySaathiAI(query, action = "general") {
    const loader = document.getElementById("saathiLoading");
    if (loader) loader.style.display = "block";

    // Tactile haptic feedback on Android
    if (window.KarigarNative && typeof window.KarigarNative.vibrate === "function") {
        try { window.KarigarNative.vibrate(30); } catch (e) { }
    }

    const currentLang = window.CURRENT_LANG || localStorage.getItem("karigar_lang") || "en";

    try {
        // 1. Try Backend API
        try {
            const response = await fetch("/saathi/api/chat/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    query: query,
                    action: action,
                    language: currentLang,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data && data.reply) {
                    appendSaathiMessage("saathi", data.reply, data);
                    return;
                }
            }
        } catch (err) {
            console.warn("Backend /saathi/api/chat/ unreachable, switching to Direct Gemini 2.5 Flash:", err);
        }

        // 2. Direct Gemini 2.5 Flash Fallback
        try {
            const geminiReply = await callDirectGeminiAI(query, action, currentLang);
            appendSaathiMessage("saathi", geminiReply, { engine: "gemini-2.5-flash-direct" });
            return;
        } catch (geminiErr) {
            console.warn("Direct Gemini invocation failed or offline, falling back to offline knowledge base:", geminiErr);
        }

        // 3. Cultural Knowledge Base Fallback
        appendSaathiMessage(
            "saathi",
            "Namaste! Here is fair living guidance from your heritage knowledge copilot:\n\n" +
            "Under the Fair Craft living wage charter, authentic handmade crafts guarantee dignity of manual labor. " +
            "100% of your listed earnings settle directly with 0% platform commission."
        );
    } finally {
        if (loader) loader.style.display = "none";
    }
}

function handleSaathiSubmit(event) {
    if (event) event.preventDefault();
    const input = document.getElementById("saathiInput");
    if (!input) return;

    const message = input.value.trim();
    if (!message) return;

    appendSaathiMessage("user", message);
    input.value = "";

    querySaathiAI(message, "chat");
}

function saathiAction(actionName) {
    openSaathi();

    const actionMap = {
        "Tell my story": "tell_story",
        "Price my work": "price_work",
        "Show my work": "show_work",
        "Find buyers": "find_buyers"
    };

    const actionKey = actionMap[actionName] || "general";
    appendSaathiMessage("user", actionName);
    querySaathiAI(actionName, actionKey);
}


/* =========================================================
   SAATHI VOICE STREAMING
   ========================================================= */

function startSaathiVoice() {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!Recognition) {
        alert("Voice interaction requires a browser with Web Speech API (Google Chrome, Edge, Safari).");
        return;
    }

    const statusEl = document.getElementById("saathiVoiceStatus");
    const voiceBtn = document.getElementById("saathiVoiceBtn");

    const recognition = new Recognition();
    const langMap = {
        "en": "en-IN",
        "hi": "hi-IN",
        "bn": "bn-IN",
        "te": "te-IN"
    };
    const activeLang = window.CURRENT_LANG || localStorage.getItem("karigar_lang") || "en";
    recognition.lang = langMap[activeLang] || "en-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = function () {
        document.body.classList.add("saathi-listening");
        if (statusEl) statusEl.textContent = "Listening... Speak your craft details";
        if (voiceBtn) voiceBtn.style.background = "#b85b35";
    };

    recognition.onresult = function (event) {
        document.body.classList.remove("saathi-listening");
        const transcript = event.results[0][0].transcript;

        if (statusEl) statusEl.textContent = "Tap to speak · English / Hindi";
        if (voiceBtn) voiceBtn.style.background = "var(--green, #415a44)";

        openSaathi();
        appendSaathiMessage("user", `🎙️ "${transcript}"`);
        querySaathiAI(transcript, "voice");
    };

    recognition.onerror = function (event) {
        document.body.classList.remove("saathi-listening");
        if (statusEl) statusEl.textContent = "Tap to speak · English / Hindi";
        if (voiceBtn) voiceBtn.style.background = "var(--green, #415a44)";
        console.warn("Speech recognition error:", event.error);
    };

    recognition.onend = function () {
        document.body.classList.remove("saathi-listening");
        if (statusEl) statusEl.textContent = "Tap to speak · English / Hindi";
        if (voiceBtn) voiceBtn.style.background = "var(--green, #415a44)";
    };

    try {
        recognition.start();
    } catch (e) {
        console.error("Speech start error:", e);
    }
}


/* =========================================================
   GLOBAL KEYBOARD SHORTCUTS
   ========================================================= */

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeSaathi();
    }
});
