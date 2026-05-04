// ============================================
// OMNIBOT — Main Application Logic (COMPLETE & FIXED)
// ============================================

import { GoogleGenerativeAI } from '@google/generative-ai';
import {
    getApiKey, setApiKey, getModel, setModel,
    getTheme, setTheme, getChats, saveChats,
    getCurrentChatId, setCurrentChatId
} from './config.js';
import { getMockResponse } from './mock-bot.js';

// ============================================
// STATE
// ============================================
let currentChatId = null;
let chats = {};
let isGenerating = false;

// ============================================
// DOM ELEMENTS
// ============================================
const elements = {
    sidebar: document.getElementById('sidebar'),
    sidebarToggle: document.getElementById('sidebarToggle'),
    sidebarOverlay: document.getElementById('sidebarOverlay'),
    chatHistory: document.getElementById('chatHistory'),
    newChatBtn: document.getElementById('newChatBtn'),
    clearAllBtn: document.getElementById('clearAllBtn'),
    settingsBtn: document.getElementById('settingsBtn'),
    messagesContainer: document.getElementById('messagesContainer'),
    welcomeScreen: document.getElementById('welcomeScreen'),
    messageInput: document.getElementById('messageInput'),
    sendBtn: document.getElementById('sendBtn'),
    charCount: document.getElementById('charCount'),
    currentChatTitle: document.getElementById('currentChatTitle'),
    exportBtn: document.getElementById('exportBtn'),
    themeToggle: document.getElementById('themeToggle'),
    settingsModal: document.getElementById('settingsModal'),
    closeSettings: document.getElementById('closeSettings'),
    cancelSettings: document.getElementById('cancelSettings'),
    saveSettings: document.getElementById('saveSettings'),
    apiKeyInput: document.getElementById('apiKeyInput'),
    toggleApiKey: document.getElementById('toggleApiKey'),
    modelSelect: document.getElementById('modelSelect'),
    toast: document.getElementById('toast')
};

// ============================================
// UTILITIES
// ============================================
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('Copied to clipboard!', 'success');
    }).catch(() => {
        showToast('Copy failed', 'error');
    });
}

function scrollToBottom() {
    elements.messagesContainer.scrollTop = elements.messagesContainer.scrollHeight;
}

function showToast(message, type = 'info') {
    if (!elements.toast) return;
    elements.toast.textContent = message;
    elements.toast.className = `toast show ${type}`;
    setTimeout(() => {
        elements.toast.classList.remove('show');
    }, 3000);
}

function updateCharCount() {
    if (!elements.messageInput || !elements.charCount) return;
    const length = elements.messageInput.value.length;
    elements.charCount.textContent = `${length}/4000`;
}

function updateSendButtonState() {
    if (!elements.sendBtn) return;
    const disabled = isGenerating || !elements.messageInput.value.trim();
    elements.sendBtn.disabled = disabled;
}

function updateChatTitle(title) {
    if (elements.currentChatTitle) {
        elements.currentChatTitle.textContent = title;
    }
}

// ============================================
// INITIALIZATION
// ============================================
function init() {
    loadTheme();
    loadChats();
    bindEvents();
    updateCharCount();
    if (elements.messageInput) {
        elements.messageInput.focus();
    }
// Auto-check API key (show info if using default key)
    const apiKey = getApiKey();
    if (!apiKey) {
        setTimeout(() => showToast('Set Gemini API key in Settings for AI replies', 'warning'), 1000);
    } else if (apiKey === 'AIzaSyBXcsPZEaCbfBIqq73-p0AocDjK8IQcL9Q') {
        setTimeout(() => showToast('Using default API key - change in Settings for your own key', 'info'), 1000);
    }
}


// ============================================
// THEME
// ============================================
function loadTheme() {
    const theme = getTheme();
    if (theme === 'light') {
        document.body.classList.add('light-theme');
        if (elements.themeToggle) elements.themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }
}

function toggleTheme() {
    const isLight = document.body.classList.toggle('light-theme');
    const newTheme = isLight ? 'light' : 'dark';
    setTheme(newTheme);
    if (elements.themeToggle) {
        elements.themeToggle.innerHTML = isLight ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    }
    showToast(`Theme switched to ${newTheme}`, 'success');
}

// ============================================
// CHAT HISTORY (localStorage)
// ============================================
function loadChats() {
    chats = getChats();
    const savedId = getCurrentChatId();
    renderChatHistory();

    if (savedId && chats[savedId]) {
        loadChat(savedId);
    } else {
        startNewChat(false);
    }
}

function saveCurrentChat() {
    if (!currentChatId) return;
    const chat = chats[currentChatId];
    if (chat && chat.messages.length > 0) {
        chat.title = generateChatTitle(chat.messages);
        chat.updatedAt = Date.now();
        saveChats(chats);
        renderChatHistory();
    }
}

function generateChatTitle(messages) {
    const firstUser = messages.find(m => m.role === 'user');
    if (firstUser) {
        let text = firstUser.text.replace(/[#*`]/g, '').trim();
        return text.length > 30 ? text.slice(0, 30) + '...' : text;
    }
    return 'New Chat';
}

// ============================================
// CHAT MANAGEMENT
// ============================================
function startNewChat(focus = true) {
    if (isGenerating) return;

    currentChatId = 'chat_' + Date.now();
    chats[currentChatId] = {
        id: currentChatId,
        title: 'New Chat',
        messages: [],
        createdAt: Date.now(),
        updatedAt: Date.now()
    };

    setCurrentChatId(currentChatId);
    saveChats(chats);

    renderChatHistory();
    renderMessages();
    updateChatTitle('New Chat');

    if (focus && elements.messageInput) {
        elements.messageInput.focus();
    }
    showToast('New chat started', 'success');
}

function loadChat(chatId) {
    if (isGenerating) return;

    currentChatId = chatId;
    setCurrentChatId(chatId);
    renderChatHistory();
    renderMessages();

    const chat = chats[chatId];
    updateChatTitle(chat ? chat.title : 'New Chat');
}

function deleteChat(chatId, event) {
    event.stopPropagation();
    if (!confirm('Delete this chat?')) return;

    delete chats[chatId];
    saveChats(chats);

    if (currentChatId === chatId) {
        const remaining = Object.keys(chats);
        if (remaining.length > 0) {
            loadChat(remaining[0]);
        } else {
            startNewChat(false);
        }
    } else {
        renderChatHistory();
    }
    showToast('Chat deleted', 'success');
}

function clearAllChats() {
    if (!confirm('Clear all chat history? This cannot be undone.')) return;
    chats = {};
    saveChats(chats);
    setCurrentChatId(null);
    startNewChat(false);
    showToast('All chats cleared', 'success');
}

// ============================================
// RENDERING
// ============================================
function renderChatHistory() {
    if (!elements.chatHistory) return;
    elements.chatHistory.innerHTML = '';

    const sorted = Object.values(chats).sort((a, b) => b.updatedAt - a.updatedAt);

    for (const chat of sorted) {
        const item = document.createElement('div');
        item.className = 'chat-history-item' + (chat.id === currentChatId ? ' active' : '');
        item.innerHTML = `
            <i class="fa-regular fa-message"></i>
            <span class="chat-title-text">${escapeHtml(chat.title)}</span>
            <button class="delete-chat" title="Delete"><i class="fa-solid fa-xmark"></i></button>
        `;
        item.addEventListener('click', () => loadChat(chat.id));
        item.querySelector('.delete-chat').addEventListener('click', (e) => deleteChat(chat.id, e));
        elements.chatHistory.appendChild(item);
    }
}

function renderMessages() {
    if (!elements.messagesContainer || !elements.welcomeScreen) return;

    const welcome = elements.welcomeScreen;
    elements.messagesContainer.innerHTML = '';
    elements.messagesContainer.appendChild(welcome);

    const chat = currentChatId ? chats[currentChatId] : null;
    if (!chat || chat.messages.length === 0) {
        welcome.style.display = 'flex';
        return;
    }

    welcome.style.display = 'none';

    for (const msg of chat.messages) {
        appendMessageBubble(msg.role, msg.text, false);
    }

    scrollToBottom();
}

function appendMessageBubble(role, text, animate = true) {
    if (!elements.messagesContainer) return null;

    const wrapper = document.createElement('div');
    wrapper.className = `message ${role}` + (animate ? '' : ' no-animate');
    wrapper.innerHTML = `
        <div class="message-avatar">
            <i class="fa-solid ${role === 'user' ? 'fa-user' : 'fa-robot'}"></i>
        </div>
        <div class="message-content">${renderMarkdown(text)}</div>
    `;

    if (role === 'bot') {
        const actions = document.createElement('div');
        actions.className = 'message-actions';
        actions.innerHTML = `<button class="message-action-btn"><i class="fa-regular fa-copy"></i> Copy</button>`;
        actions.querySelector('button').addEventListener('click', () => copyToClipboard(text));
        wrapper.querySelector('.message-content').appendChild(actions);
    }

    elements.messagesContainer.appendChild(wrapper);
    scrollToBottom();
    return wrapper;
}

function renderMarkdown(text) {
    if (!text) return '';

    if (typeof marked === 'undefined') {
        return escapeHtml(text).replace(/\n/g, '<br>');
    }

    try {
        marked.setOptions({
            breaks: true,
            gfm: true,
            headerIds: false,
            mangle: false
        });

        const renderer = new marked.Renderer();
        renderer.code = function(code, language) {
            const lang = language || 'text';
            let highlighted = escapeHtml(code);

            if (typeof hljs !== 'undefined') {
                try {
                    if (lang && hljs.getLanguage(lang)) {
                        highlighted = hljs.highlight(code, { language: lang }).value;
                    } else {
                        highlighted = hljs.highlightAuto(code).value;
                    }
                } catch (e) {}
            }

            return `
                <div class="code-block-wrapper">
                    <div class="code-block-header">
                        <span>${escapeHtml(lang)}</span>
                        <button class="copy-code-btn" onclick="window.copyCodeBlock(this)">Copy</button>
                    </div>
                    <pre><code class="hljs language-${escapeHtml(lang)}">${highlighted}</code></pre>
                </div>
            `;
        };

        return marked.parse(text, { renderer });
    } catch (e) {
        console.error('Markdown rendering error:', e);
        return escapeHtml(text).replace(/\n/g, '<br>');
    }
}

// Global function for inline copy buttons
window.copyCodeBlock = function(btn) {
    const codeEl = btn.closest('.code-block-wrapper').querySelector('code');
    if (codeEl) {
        copyToClipboard(codeEl.textContent);
    }
    const original = btn.textContent;
    btn.textContent = 'Copied!';
    setTimeout(() => btn.textContent = original, 1500);
};

// ============================================
// TYPING INDICATOR
// ============================================
function showTypingIndicator() {
    const wrapper = document.createElement('div');
    wrapper.className = 'message bot typing-indicator';
    wrapper.innerHTML = `
        <div class="message-avatar">
            <i class="fa-solid fa-robot"></i>
        </div>
        <div class="message-content">
            <div class="typing-dots">
                <span></span><span></span><span></span>
            </div>
        </div>
    `;
    elements.messagesContainer.appendChild(wrapper);
    scrollToBottom();
    return wrapper;
}

function removeTypingIndicator(typingEl) {
    if (typingEl && typingEl.parentNode) {
        typingEl.parentNode.removeChild(typingEl);
    }
}

// ============================================
// CHAT FUNCTIONS
// ============================================
function addMessageToChat(role, text) {
    if (!currentChatId) return;
    if (!chats[currentChatId]) chats[currentChatId] = { messages: [] };
    chats[currentChatId].messages.push({ role, text });
    chats[currentChatId].updatedAt = Date.now();
    saveCurrentChat();
}

function buildGeminiHistory() {
    if (!currentChatId || !chats[currentChatId]) return [];
    return chats[currentChatId].messages.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
    }));
}

// ============================================
// MESSAGE SENDING & STREAMING (FIXED)
// ============================================
async function sendMessage() {
    console.log('🔵 sendMessage() STARTED');
    if (!elements.messageInput || !elements.sendBtn) {
        console.log('🔴 No input/send elements');
        return;
    }

    const text = elements.messageInput.value.trim();
    if (!text || isGenerating) {
        console.log('🔴 EARLY EXIT: empty text or generating');
        return;
    }
    console.log('✅ User text:', `"${text}"`);

    // Always add/display user msg first
    addMessageToChat('user', text);
    appendMessageBubble('user', text);
    elements.messageInput.value = '';
    updateCharCount();

    const typingEl = showTypingIndicator();
    isGenerating = true;
    updateSendButtonState();

    const apiKey = getApiKey();
    console.log('🔑 API key:', apiKey ? `${apiKey.substring(0,10)}...` : 'MISSING → MOCK MODE');

    let botWrapper = null;

    if (!apiKey) {
        // ========== MOCK MODE (No API Key) ==========
        console.log('🚫 No API key - USING MOCK');
        removeTypingIndicator(typingEl);
        
        const mockReply = getMockResponse(text);
        console.log('🟢 MOCK REPLY:', mockReply);
        
        botWrapper = appendMessageBubble('bot', mockReply);
        addMessageToChat('bot', mockReply);
        showToast('🧪 Offline mock mode (set API key in Settings for real AI)', 'warning');
        
    } else {
        // ========== REAL GEMINI API MODE ==========
        console.log('🌐 Using real Gemini AI...');
        try {
            const genAI = new GoogleGenerativeAI(apiKey);
            const modelName = getModel();
            console.log('📡 Using model:', modelName);
            
            const model = genAI.getGenerativeModel({ model: modelName });

            const chat = model.startChat({
                history: buildGeminiHistory(),
                generationConfig: {
                    maxOutputTokens: 2048,
                    temperature: 0.7
                }
            });

            const result = await chat.sendMessageStream(text);
            
            // Stop generation capability
            window.stopGeneration = () => {
                isGenerating = false;
                showToast('Generation stopped', 'info');
            };

            removeTypingIndicator(typingEl);
            botWrapper = appendMessageBubble('bot', '', true);
            const botContent = botWrapper.querySelector('.message-content');
            let fullResponse = '';

            for await (const chunk of result.stream) {
                const chunkText = chunk.text();
                fullResponse += chunkText;
                botContent.innerHTML = renderMarkdown(fullResponse);
                scrollToBottom();
            }

            addMessageToChat('bot', fullResponse);
            saveCurrentChat();
            console.log('✅ AI response received');

        } catch (apiError) {
            console.error('🟠 GEMINI API FAILED:', apiError);
            removeTypingIndicator(typingEl);
            
            // Fallback to mock on error
            const mockReply = getMockResponse(text);
            botWrapper = appendMessageBubble('bot', mockReply);
            addMessageToChat('bot', mockReply);
            showToast('API failed - using offline mock', 'error');
        }
    }

    // Always clean up
    isGenerating = false;
    updateSendButtonState();
    console.log('🔵 sendMessage() FINISHED');
    
    if (botWrapper) scrollToBottom();
}

// ============================================
// SETTINGS MODAL
// ============================================
function openSettings() {
    if (elements.settingsModal) {
        elements.settingsModal.classList.add('active');
        const apiKey = getApiKey();
        if (elements.apiKeyInput) {
            elements.apiKeyInput.value = apiKey || '';
            elements.apiKeyInput.type = 'password';
        }
        if (elements.modelSelect) {
            elements.modelSelect.value = getModel();
        }
    }
}

function closeSettings() {
    if (elements.settingsModal) {
        elements.settingsModal.classList.remove('active');
    }
}

function saveSettings() {
    if (elements.apiKeyInput) {
        const apiKey = elements.apiKeyInput.value.trim();
        setApiKey(apiKey);
    }
    if (elements.modelSelect) {
        setModel(elements.modelSelect.value);
    }
    closeSettings();
    showToast('Settings saved!', 'success');
}

// ============================================
// EVENT BINDERS
// ============================================
function bindEvents() {
    // Input handling
    if (elements.messageInput) {
        elements.messageInput.addEventListener('input', () => {
            updateCharCount();
            updateSendButtonState();
        });
        elements.messageInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey && !isGenerating) {
                e.preventDefault();
                sendMessage();
            }
        });
    }

    // Send button
    if (elements.sendBtn) {
        elements.sendBtn.addEventListener('click', sendMessage);
    }

    // New chat
    if (elements.newChatBtn) {
        elements.newChatBtn.addEventListener('click', () => startNewChat(true));
    }

    // Sidebar
    if (elements.sidebarToggle) {
        elements.sidebarToggle.addEventListener('click', () => {
            document.body.classList.toggle('sidebar-open');
        });
    }
    if (elements.sidebarOverlay) {
        elements.sidebarOverlay.addEventListener('click', () => {
            document.body.classList.remove('sidebar-open');
        });
    }

    // Settings
    if (elements.settingsBtn) elements.settingsBtn.addEventListener('click', openSettings);
    if (elements.closeSettings) elements.closeSettings.addEventListener('click', closeSettings);
    if (elements.cancelSettings) elements.cancelSettings.addEventListener('click', closeSettings);
    if (elements.saveSettings) elements.saveSettings.addEventListener('click', saveSettings);

    // Theme toggle
    if (elements.themeToggle) elements.themeToggle.addEventListener('click', toggleTheme);

    // Clear all
    if (elements.clearAllBtn) elements.clearAllBtn.addEventListener('click', clearAllChats);

    // Suggestion chips
    document.querySelectorAll('.chip').forEach(chip => {
        chip.addEventListener('click', () => {
            if (elements.messageInput && !isGenerating) {
                elements.messageInput.value = chip.dataset.prompt;
                updateCharCount();
                updateSendButtonState();
                elements.messageInput.focus();
            }
        });
    });

    // Export (basic JSON download)
    if (elements.exportBtn) {
        elements.exportBtn.addEventListener('click', () => {
            if (currentChatId && chats[currentChatId]) {
                const dataStr = JSON.stringify(chats[currentChatId], null, 2);
                const blob = new Blob([dataStr], {type: 'application/json'});
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `omnibot-chat-${currentChatId}.json`;
                a.click();
            } else {
                showToast('No chat to export', 'warning');
            }
        });
    }

    // API key toggle visibility
    if (elements.toggleApiKey) {
        elements.toggleApiKey.addEventListener('click', () => {
            elements.apiKeyInput.type = elements.apiKeyInput.type === 'password' ? 'text' : 'password';
        });
    }
}

// ============================================
// AUTO-BIND ON LOAD (for chips etc.)
// ============================================
document.addEventListener('DOMContentLoaded', init);

// Global test function - run in console: window.testMock('hello')
window.testMock = async function(testQuery = 'test') {
    console.log('🧪 testMock START:', testQuery);
    const mockReply = getMockResponse(testQuery);
    console.log('🧪 testMock reply:', mockReply);
    appendMessageBubble('bot', mockReply, true);
    addMessageToChat('bot', mockReply);
    showToast(`🧪 Test reply added: "${testQuery}" → mock`, 'success');
    scrollToBottom();
};

// Make functions global for onclick handlers
window.copyCodeBlock = window.copyCodeBlock || function(btn) {
    const codeEl = btn.closest('.code-block-wrapper').querySelector('code');
    if (codeEl) copyToClipboard(codeEl.textContent);
};


