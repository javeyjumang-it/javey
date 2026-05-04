// Mock AI Bot - Works offline (Expanded: 20+ topic responses)
const mockResponses = {
  'hello': '👋 Hello! Omnibot offline AI ready for coding, math, Q&A! 😊',
  'hi': 'Hey! Offline mode ON. Gemini API key → real AI power ✨',
  'test': '✅ Test passed! Omnibot 100% working offline 🎉',
  'code': `\`\`\`javascript
console.log('Omnibot rocks! 🚀');
\`\`\` JS help? Ask away! 👨‍💻`,
  'python': `\`\`\`python
print("Hello Omnibot!")
\`\`\` Python pro mode 🐍`,
  'javascript': '⚡ JS: Use async/await! `async () => await fetch(...)`',
  'js': '⚡ JS tip: Arrow funcs `const add = (a,b) => a+b;`',
  'css': '💅 Flexbox: `display:flex; justify:center; align:center;`',
  'html': '🏗️ `<main><section>content</section></main>` semantic!',
  'react': '⚛️ `useState`: const [count, setCount] = useState(0);',
  'vue': '🟢 Vue: `ref(0)` + `reactive({})` composition API',
  'angular': '🔧 Angular: `@Component` decorators + services',
  'help': '**Offline:** Code snippets/math/tips. API key → Gemini Pro!',
  'api': '🆓 Key: https://aistudio.google.com/app/apikey → Settings!',
  'key': '📋 Settings > API Key > Paste > Save!',
  'error': '🔧 Fixes: 1.Internet 2.Valid key 3.Clear cache/localStorage',
  'math': '🧮 Pythagoras: a²+b²=c². Solve: ?',
  'weather': '🌤️ Offline: Use app. Sunny vibes ☀️',
  'time': `⏰ Now: ${new Date().toLocaleTimeString()}`,
  'news': '📰 Tech boom! Check BBC/CNN',
  'recipe': '🍳 Pasta: Boil 10min → sauce → cheese!',
  'fitness': '💪 Pushups 3x10 + walk 30min daily!',
  'music': '🎵 Lo-fi beats → focus mode 🎧',
  'movie': '🎬 "Inception" mind-bender 🍿',
  'book': '📚 "Atomic Habits" - game changer!',
  'travel': '✈️ Bali beaches or Japan tech!',
  'job': '💼 Resume + LinkedIn + network 🚀',
  'money': '💰 Save 20% invest S&P500 compound magic',
  'health': '🥗 Veggies/sleep/walk = win!',
  'food': '🍔 Balance: Protein/carbs/veggies',
  'game': '🎮 Offline: Sudoku/Tetris brain gym 🧠',
  default: [
    "🤖 Omnibot offline expert! Code/math/life hacks. API→Pro 🚀",
    "Great Q! Mock AI solid. Real Gemini: Settings key 💪",
    "Ask anything! Offline covers basics perfectly ✨",
    "Omnibot ready! What's your question? 😎"
  ][Math.floor(Math.random() * 4)]
};

function getMockResponse(query) {
  query = query.toLowerCase().trim();
  
  // Match keywords
  for (let key in mockResponses) {
    if (Array.isArray(mockResponses[key])) continue;
    if (query.includes(key)) return mockResponses[key];
  }
  
  return Array.isArray(mockResponses.default) 
    ? mockResponses.default[Math.floor(Math.random() * mockResponses.default.length)]
    : 'Omnibot offline - upgrade API key!';
}

export { getMockResponse };

