// ============================================
// OMNIBOT — Configuration
// ============================================

const CONFIG = {
    // Default model (user can change in settings)
    defaultModel: 'gemini-1.5-flash',
    
    // API key storage key in localStorage
    storageKeys: {
        apiKey: 'omnibot_api_key',
        model: 'omnibot_model',
        theme: 'omnibot_theme',
        chats: 'omnibot_chats',
        currentChat: 'omnibot_current_chat'
    },
    
    // App metadata
    appName: 'Omnibot',
    version: '1.0.0'
};

// Helper to get stored value
export function getStored(key) {
    try {
        return localStorage.getItem(key);
    } catch (e) {
        return null;
    }
}

// Helper to set stored value
export function setStored(key, value) {
    try {
        localStorage.setItem(key, value);
    } catch (e) {
        console.warn('Failed to save to localStorage:', e);
    }
}

// Default API key pre-configured for real Gemini AI
const DEFAULT_API_KEY = 'AIzaSyBXcsPZEaCbfBIqq73-p0AocDjK8IQcL9Q';

// Get API key - returns stored key or default key
export function getApiKey() {
    const storedKey = getStored(CONFIG.storageKeys.apiKey);
    // Return stored key if exists and valid, otherwise use default key
    if (storedKey && storedKey.trim().length > 0) {
        return storedKey;
    }
    // Use default API key - this enables real Gemini AI by default
    return DEFAULT_API_KEY;
}

// Set API key
export function setApiKey(key) {
    setStored(CONFIG.storageKeys.apiKey, key);
}

// Get selected model
export function getModel() {
    return getStored(CONFIG.storageKeys.model) || CONFIG.defaultModel;
}

// Set selected model
export function setModel(model) {
    setStored(CONFIG.storageKeys.model, model);
}

// Get theme
export function getTheme() {
    return getStored(CONFIG.storageKeys.theme) || 'dark';
}

// Set theme
export function setTheme(theme) {
    setStored(CONFIG.storageKeys.theme, theme);
}

// Get all chats
export function getChats() {
    try {
        const data = getStored(CONFIG.storageKeys.chats);
        return data ? JSON.parse(data) : {};
    } catch (e) {
        return {};
    }
}

// Save all chats
export function saveChats(chats) {
    setStored(CONFIG.storageKeys.chats, JSON.stringify(chats));
}

// Get current chat ID
export function getCurrentChatId() {
    return getStored(CONFIG.storageKeys.currentChat);
}

// Set current chat ID
export function setCurrentChatId(id) {
    if (id) {
        setStored(CONFIG.storageKeys.currentChat, id);
    } else {
        localStorage.removeItem(CONFIG.storageKeys.currentChat);
    }
}

export default CONFIG;
