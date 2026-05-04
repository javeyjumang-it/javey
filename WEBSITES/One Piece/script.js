
// One Piece Character Encyclopedia - Complete JavaScript
// Complete Character Database

const characterImages = {};

const characters = [
    // ====== FOUR EMPERORS ======
    { id: 1, name: "Shanks", pirateName: '"Red-Haired" Shanks', role: "Emperor", crew: "Red-Haired Pirates", group: "four-emperors", subgroup: "four-emperors", rank: "Captain", bounty: "4,048,900,000", devilFruit: "None", ability: "Haki Mastery", description: "One of the Four Emperors ruling the New World. He gave his straw hat to Luffy.", firstAppearance: "Chapter 1", flipContent: { reason: "Why He's Emperor", icon: "fa-crown", details: "One of the Four Emperors. His crew is known for their immense power." } },
    { id: 2, name: "Big Mom", pirateName: '"Big Mom" Charlotte Lincle', role: "Emperor", crew: "Big Mom Pirates", group: "four-emperors", subgroup: "four-emperors", rank: "Captain", bounty: "4,388,000,000", devilFruit: "Soul Soul no Mi", ability: "Soul Manipulation", description: "Rules Totto Land. Has 85 children and consumes other souls.", firstAppearance: "Chapter 651", flipContent: { reason: "Why She's Emperor", icon: "fa-crown", details: "Rules Totto Land with 85 children." } },
    { id: 3, name: "Kaido", pirateName: '"Beast" Kaido', role: "Emperor", crew: "Beast Pirates", group: "four-emperors", subgroup: "four-emperors", rank: "Captain", bounty: "4,611,100,000", devilFruit: "Uo Uo no Mi (Fish-Fish)", ability: "Dragon Transformation", description: "Known as the strongest creature in the world.", firstAppearance: "Chapter 920", flipContent: { reason: "Why He's Emperor", icon: "fa-dragon", details: "Known as the strongest creature." } },
    { id: 4, name: "Marshall D. Teach", pirateName: '"Blackbeard" Teach', role: "Emperor", crew: "Blackbeard Pirates", group: "four-emperors", subgroup: "four-emperors", rank: "Captain", bounty: "2,247,600,000", devilFruit: "Yami Yami + Gura Gura", ability: "Darkness & Quake", description: "The only person known to wield two Devil Fruits.", firstAppearance: "Chapter 223", flipContent: { reason: "Why He's Emperor", icon: "fa-skull", details: "Only person with two Devil Fruits." } },

    // ====== STRAW HAT PIRATES ======
    { id: 5, name: "Monkey D. Luffy", pirateName: '"Straw Hat" Luffy', role: "Captain", crew: "Straw Hat Pirates", group: "straw-hat", subgroup: "straw-hat", rank: "Captain", bounty: "3,000,000,000", devilFruit: "Gomu Gomu no Mi", ability: "Rubber Body", description: "Captain of the Straw Hats. Aims to become Pirate King.", firstAppearance: "Chapter 1" },
    { id: 6, name: "Roronoa Zoro", pirateName: '"Pirate Hunter" Zoro', role: "Combatant", crew: "Straw Hat Pirates", group: "straw-hat", subgroup: "straw-hat", rank: "Combatant", bounty: "1,111,000,000", devilFruit: "None", ability: "Three-Sword Style", description: "Master swordsman.", firstAppearance: "Chapter 5" },
    { id: 7, name: "Nami", pirateName: '"Cat Burglar" Nami', role: "Navigator", crew: "Straw Hat Pirates", group: "straw-hat", subgroup: "straw-hat", rank: "Navigator", bounty: "366,000,000", devilFruit: "None", ability: "Climate Tactics", description: "Expert navigator.", firstAppearance: "Chapter 8" },
    { id: 8, name: "Usopp", pirateName: '"God" Usopp', role: "Sniper", crew: "Straw Hat Pirates", group: "straw-hat", subgroup: "straw-hat", rank: "Sniper", bounty: "500,000,000", devilFruit: "None", ability: "Pop Green", description: "Expert sniper.", firstAppearance: "Chapter 23" },
    { id: 9, name: "Sanji", pirateName: '"Black Leg" Sanji', role: "Chef", crew: "Straw Hat Pirates", group: "straw-hat", subgroup: "straw-hat", rank: "Chef", bounty: "1,032,000,000", devilFruit: "None", ability: "Black Leg Style", description: "Master chef.", firstAppearance: "Chapter 43" },
    { id: 10, name: "Tony Tony Chopper", pirateName: '"Cotton Candy Lover"', role: "Doctor", crew: "Straw Hat Pirates", group: "straw-hat", subgroup: "straw-hat", rank: "Doctor", bounty: "1,000", devilFruit: "Hito Hito no Mi", ability: "Rumble Ball", description: "Doctor.", firstAppearance: "Chapter 134" },
    { id: 11, name: "Nico Robin", pirateName: '"Devil Child" Robin', role: "Archaeologist", crew: "Straw Hat Pirates", group: "straw-hat", subgroup: "straw-hat", rank: "Archaeologist", bounty: "930,000,000", devilFruit: "Hana Hana no Mi", ability: "Read Poneglyphs", description: "Archaeologist.", firstAppearance: "Chapter 114" },
    { id: 12, name: "Franky", pirateName: '"Cyborg" Franky', role: "Shipwright", crew: "Straw Hat Pirates", group: "straw-hat", subgroup: "straw-hat", rank: "Shipwright", bounty: "394,000,000", devilFruit: "None", ability: "Ship Building", description: "Cyborg shipwright.", firstAppearance: "Chapter 329" },
    { id: 13, name: "Brook", pirateName: '"Soul King" Brook', role: "Musician", crew: "Straw Hat Pirates", group: "straw-hat", subgroup: "straw-hat", rank: "Musician", bounty: "383,000,000", devilFruit: "Yomi Yomi no Mi", ability: "Soul Powers", description: "Skeleton musician.", firstAppearance: "Chapter 442" },
    { id: 14, name: "Jinbe", pirateName: '"Knight of the Sea" Jinbe', role: "Helmsman", crew: "Straw Hat Pirates", group: "straw-hat", subgroup: "straw-hat", rank: "Helmsman", bounty: "1,100,000,000", devilFruit: "None", ability: "Fish-Man Karate", description: "Expert helmsman.", firstAppearance: "Chapter 69" },

    // ====== RED-HAIRED PIRATES ======
    { id: 15, name: "Shanks", pirateName: '"Red-Haired" Shanks', role: "Captain", crew: "Red-Haired Pirates", group: "red-hair", subgroup: "red-hair", rank: "Captain", bounty: "4,048,900,000", devilFruit: "None", ability: "Haki Mastery", description: "Captain of Red-Haired Pirates.", firstAppearance: "Chapter 1" },
    { id: 16, name: "Ben Beckmann", pirateName: '"Ben" Beckmann', role: "First Mate", crew: "Red-Haired Pirates", group: "red-hair", subgroup: "red-hair", rank: "First Mate", bounty: "Unknown", devilFruit: "None", ability: "Haki Mastery", description: "First Mate.", firstAppearance: "Chapter 1" },
    { id: 17, name: "Yasopp", pirateName: '"Yasopp"', role: "Sniper", crew: "Red-Haired Pirates", group: "red-hair", subgroup: "red-hair", rank: "Sniper", bounty: "Unknown", devilFruit: "None", ability: "Marksmanship", description: "Sniper.", firstAppearance: "Chapter 1" },
    { id: 18, name: "Lucky Roux", pirateName: '"Lucky Roux"', role: "Crew Member", crew: "Red-Haired Pirates", group: "red-hair", subgroup: "red-hair", rank: "Crew Member", bounty: "Unknown", devilFruit: "None", ability: "Fighting Skill", description: "Crew member.", firstAppearance: "Chapter 1" },
    { id: 19, name: "Bartholomew Kuma", pirateName: '"The Tyrant" Kuma', role: "Crew Member", crew: "Red-Haired Pirates", group: "red-hair", subgroup: "red-hair", rank: "Crew Member", bounty: "296,000,000", devilFruit: "Paw Paw no Mi", ability: "Repel Forces", description: "Former Warlord.", firstAppearance: "Chapter 1" },

    // ====== BIG MOM PIRATES ======
    { id: 20, name: "Charlotte Lincle", pirateName: '"Big Mom"', role: "Captain", crew: "Big Mom Pirates", group: "big-mom", subgroup: "big-mom", rank: "Captain", bounty: "4,388,000,000", devilFruit: "Soul Soul no Mi", ability: "Soul Manipulation", description: "Captain of Big Mom Pirates.", firstAppearance: "Chapter 651" },
    { id: 21, name: "Charlotte Katakuri", pirateName: '"Sweet Commander" Katakuri', role: "1st Commander", crew: "Big Mom Pirates", group: "big-mom", subgroup: "big-mom", rank: "1st Commander", bounty: "1,057,000,000", devilFruit: "Mochi Mochi no Mi", ability: "Mochi Manipulation", description: "First son and strongest commander.", firstAppearance: "Chapter 860" },
    { id: 22, name: "Charlotte Smoothie", pirateName: '"Smoothie"', role: "2nd Commander", crew: "Big Mom Pirates", group: "big-mom", subgroup: "big-mom", rank: "2nd Commander", bounty: "930,000,000", devilFruit: "Shiro Shiro no Mi", ability: "Whole Cake Manipulation", description: "Second daughter.", firstAppearance: "Chapter 860" },
    { id: 23, name: "Charlotte Cracker", pirateName: '"Biscuit Knight" Cracker', role: "3rd Commander", crew: "Big Mom Pirates", group: "big-mom", subgroup: "big-mom", rank: "3rd Commander", bounty: "860,000,000", devilFruit: "Bisu Bisu no Mi", ability: "Biscuit Soldiers", description: "Can create unlimited biscuit soldiers.", firstAppearance: "Chapter 840" },
    { id: 24, name: "Charlotte Perospero", pirateName: '"Minister of Candy"', role: "Minister", crew: "Big Mom Pirates", group: "big-mom", subgroup: "big-mom", rank: "Minister", bounty: "700,000,000", devilFruit: "Pero Pero no Mi", ability: "Candy Manipulation", description: "Minister of Candy.", firstAppearance: "Chapter 860" },
    { id: 25, name: "Charlotte Daifuku", pirateName: '"Minister of Flour"', role: "Minister", crew: "Big Mom Pirates", group: "big-mom", subgroup: "big-mom", rank: "Minister", bounty: "300,000,000", devilFruit: "Fuku Fuku no Mi", ability: "Clothing Summoning", description: "Minister of Flour.", firstAppearance: "Chapter 860" },
    { id: 26, name: "Charlotte Oven", pirateName: '"Minister of Liquor"', role: "Minister", crew: "Big Mom Pirates", group: "big-mom", subgroup: "big-mom", rank: "Minister", bounty: "300,000,000", devilFruit: "None", ability: "Heat Abilities", description: "Minister of Liquor.", firstAppearance: "Chapter 860" },
    { id: 27, name: "Charlotte Pudding", pirateName: '"3rd Daughter" Pudding', role: "Princess", crew: "Big Mom Pirates", group: "big-mom", subgroup: "big-mom", rank: "Daughter", bounty: "Unknown", devilFruit: "None", ability: "Memory Manipulation", description: "Third daughter.", firstAppearance: "Chapter 860" },

    // ====== BEAST PIRATES ======
    { id: 28, name: "Kaido", pirateName: '"Beast" Kaido', role: "Captain", crew: "Beast Pirates", group: "beast", subgroup: "beast", rank: "Captain", bounty: "4,611,100,000", devilFruit: "Uo Uo no Mi (Fish-Fish)", ability: "Dragon Transformation", description: "Captain of Beast Pirates.", firstAppearance: "Chapter 920" },
    { id: 29, name: "King", pirateName: '"King"', role: "All-Star", crew: "Beast Pirates", group: "beast", subgroup: "beast", rank: "All-Star", bounty: "1,390,000,000", devilFruit: "Ryu Ryu no Mi (Pteranodon)", ability: "Dinosaur Transformation", description: "All-Star. A Lunarian.", firstAppearance: "Chapter 925" },
    { id: 30, name: "Queen", pirateName: '"Queen"', role: "All-Star", crew: "Beast Pirates", group: "beast", subgroup: "beast", rank: "All-Star", bounty: "1,320,000,000", devilFruit: "Zai Zai no Mi", ability: "Ice Abilities", description: "All-Star.", firstAppearance: "Chapter 925" },
    { id: 31, name: "Jack", pirateName: '"Jack"', role: "All-Star", crew: "Beast Pirates", group: "beast", subgroup: "beast", rank: "All-Star", bounty: "1,000,000,000", devilFruit: "Zou Zou no Mi (Mammoth)", ability: "Mammoth Transformation", description: "All-Star.", firstAppearance: "Chapter 925" },
    { id: 32, name: "Ulti", pirateName: '"Ulti"', role: "Tobiroppo", crew: "Beast Pirates", group: "beast", subgroup: "beast", rank: "Tobiroppo", bounty: "400,000,000", devilFruit: "Ryu Ryu no Mi (Spinosaurus)", ability: "Dinosaur Transformation", description: "Tobiroppo member.", firstAppearance: "Chapter 965" },
    { id: 33, name: "Page One", pirateName: '"Page One"', role: "Tobiroppo", crew: "Beast Pirates", group: "beast", subgroup: "beast", rank: "Tobiroppo", bounty: "350,000,000", devilFruit: "Ryu Ryu no Mi (Spinosaurus)", ability: "Dinosaur Transformation", description: "Tobiroppo member.", firstAppearance: "Chapter 965" },
    { id: 34, name: "Black Maria", pirateName: '"Black Maria"', role: "Tobiroppo", crew: "Beast Pirates", group: "beast", subgroup: "beast", rank: "Tobiroppo", bounty: "330,000,000", devilFruit: "Kumo Kumo no Mi", ability: "Spider Transformation", description: "Tobiroppo member.", firstAppearance: "Chapter 965" },
    { id: 35, name: "Sasaki", pirateName: '"Sasaki"', role: "Tobiroppo", crew: "Beast Pirates", group: "beast", subgroup: "beast", rank: "Tobiroppo", bounty: "287,000,000", devilFruit: "Ryu Ryu no Mi (Triceratops)", ability: "Dinosaur Transformation", description: "Tobiroppo member.", firstAppearance: "Chapter 965" },
    { id: 36, name: "X Drake", pirateName: '"Red Flag" Drake', role: "Tobiroppo", crew: "Beast Pirates", group: "beast", subgroup: "beast", rank: "Tobiroppo", bounty: "222,000,000", devilFruit: "Ryu Ryu no Mi (Allosaurus)", ability: "Dinosaur Transformation", description: "Tobiroppo.", firstAppearance: "Chapter 925" },

    // ====== BLACKBEARD PIRATES ======
    { id: 37, name: "Marshall D. Teach", pirateName: '"Blackbeard" Teach', role: "Captain", crew: "Blackbeard Pirates", group: "blackbeard", subgroup: "blackbeard", rank: "Captain", bounty: "2,247,600,000", devilFruit: "Yami Yami + Gura Gura", ability: "Darkness & Quake", description: "Captain.", firstAppearance: "Chapter 223" },
    { id: 38, name: "Jesus Burgess", pirateName: '"Champion" Burgess', role: "Captain", crew: "Blackbeard Pirates", group: "blackbeard", subgroup: "blackbeard", rank: "Captain", bounty: "500,000,000", devilFruit: "Jiki Jiki no Mi", ability: "Magnetism", description: "Captain of 1st ship.", firstAppearance: "Chapter 225" },
    { id: 39, name: "Shiliew", pirateName: '"Supernova" Shiliew', role: "Captain", crew: "Blackbeard Pirates", group: "blackbeard", subgroup: "blackbeard", rank: "Captain", bounty: "422,000,000", devilFruit: "Sui Sui no Mi", ability: "Swimming", description: "Captain of 2nd ship.", firstAppearance: "Chapter 225" },
    { id: 40, name: "Van Augur", pirateName: '"Demon" Van Augur', role: "Captain", crew: "Blackbeard Pirates", group: "blackbeard", subgroup: "blackbeard", rank: "Captain", bounty: "350,000,000", devilFruit: "Uma Uma no Mi (Pegasus)", ability: "Pegasus Transformation", description: "Captain of 3rd ship.", firstAppearance: "Chapter 225" },
    { id: 41, name: "Doc Q", pirateName: '"Doc Q"', role: "Captain", crew: "Blackbeard Pirates", group: "blackbeard", subgroup: "blackbeard", rank: "Captain", bounty: "300,000,000", devilFruit: "Chiki Chiki no Mi", ability: "Disease Spreading", description: "Captain of 4th ship.", firstAppearance: "Chapter 225" },
    { id: 42, name: "Katarina Devon", pirateName: '"Avenger" Devon', role: "Captain", crew: "Blackbeard Pirates", group: "blackbeard", subgroup: "blackbeard", rank: "Captain", bounty: "290,000,000", devilFruit: "Inu Inu no Mi (Nine-Tails)", ability: "Fox Transformation", description: "Captain of 5th ship.", firstAppearance: "Chapter 225" },
    { id: 43, name: "San Juan Wolf", pirateName: '"Colossus" Wolf', role: "Captain", crew: "Blackbeard Pirates", group: "blackbeard", subgroup: "blackbeard", rank: "Captain", bounty: "260,000,000", devilFruit: "Zou Zou no Mi", ability: "Giant Size", description: "Captain of 6th ship.", firstAppearance: "Chapter 225" },
    { id: 44, name: "Vasco Shot", pirateName: '"Sparkling" Shot', role: "Captain", crew: "Blackbeard Pirates", group: "blackbeard", subgroup: "blackbeard", rank: "Captain", bounty: "210,000,000", devilFruit: "Beri Beri no Mi", ability: "Grape Manipulation", description: "Captain of 7th ship.", firstAppearance: "Chapter 225" },

    // ====== KID PIRATES ======
    { id: 45, name: "Eustass Kid", pirateName: '"Captain" Kid', role: "Captain", crew: "Kid Pirates", group: "kid", subgroup: "kid", rank: "Captain", bounty: "3,000,000,000", devilFruit: "Jiki Jiki no Mi", ability: "Magnetism", description: "Captain of Kid Pirates.", firstAppearance: "Chapter 498" },
    { id: 46, name: "Killer", pirateName: '"Killer"', role: "Combatant", crew: "Kid Pirates", group: "kid", subgroup: "kid", rank: "Combatant", bounty: "200,000,000", devilFruit: "None", ability: "Haki Mastery", description: "Known as the 'God of Execution'.", firstAppearance: "Chapter 498" },
    { id: 47, name: "Heat", pirateName: '"Heat"', role: "Crew Member", crew: "Kid Pirates", group: "kid", subgroup: "kid", rank: "Crew Member", bounty: "Unknown", devilFruit: "None", ability: "Fire Attacks", description: "Crew member.", firstAppearance: "Chapter 498" },
    { id: 48, name: "Wire", pirateName: '"Wire"', role: "Crew Member", crew: "Kid Pirates", group: "kid", subgroup: "kid", rank: "Crew Member", bounty: "Unknown", devilFruit: "None", ability: "Fighting Skill", description: "Crew member.", firstAppearance: "Chapter 498" },

    // ====== HEART PIRATES ======
    { id: 49, name: "Trafalgar D. Water Law", pirateName: '"Surgeon of Death" Law', role: "Captain", crew: "Heart Pirates", group: "heart", subgroup: "heart", rank: "Captain", bounty: "3,000,000,000", devilFruit: "Ope Ope no Mi", ability: "Room Surgery", description: "Captain of Heart Pirates.", firstAppearance: "Chapter 498" },
    { id: 50, name: "Bepo", pirateName: '"Bepo"', role: "Navigator", crew: "Heart Pirates", group: "heart", subgroup: "heart", rank: "Navigator", bounty: "500", devilFruit: "None", ability: "Sulong", description: "Crew's bear.", firstAppearance: "Chapter 498" },
    { id: 51, name: "Penguin", pirateName: '"Penguin"', role: "Crew Member", crew: "Heart Pirates", group: "heart", subgroup: "heart", rank: "Crew Member", bounty: "Unknown", devilFruit: "None", ability: "Fighting Skill", description: "Crew member.", firstAppearance: "Chapter 498" },
    { id: 52, name: "Shachi", pirateName: '"Shachi"', role: "Crew Member", crew: "Heart Pirates", group: "heart", subgroup: "heart", rank: "Crew Member", bounty: "Unknown", devilFruit: "None", ability: "Fighting Skill", description: "Crew member.", firstAppearance: "Chapter 498" },

    // ====== ROGER PIRATES ======
    { id: 53, name: "Gol D. Roger", pirateName: '"Gold Roger"', role: "Captain", crew: "Roger Pirates", group: "roger", subgroup: "roger", rank: "Captain", bounty: "5,564,800,000", devilFruit: "None", ability: "Haki Mastery", description: "The Pirate King.", firstAppearance: "Chapter 1" },
    { id: 54, name: "Silvers Rayleigh", pirateName: '"Dark King" Rayleigh', role: "First Mate", crew: "Roger Pirates", group: "roger", subgroup: "roger", rank: "First Mate", bounty: "Unknown", devilFruit: "None", ability: "Haki Mastery", description: "First Mate.", firstAppearance: "Chapter 1" },
    { id: 55, name: "Kozuki Oden", pirateName: '"Lord Oden"', role: "Samurai", crew: "Roger Pirates", group: "roger", subgroup: "roger", rank: "Crew Member", bounty: "Unknown", devilFruit: "None", ability: "Two-Sword Style", description: "Legendary samurai.", firstAppearance: "Chapter 920" },
    { id: 56, name: "Portgas D. Ace", pirateName: '"Fire Fist" Ace', role: "Crew Member", crew: "Roger Pirates", group: "roger", subgroup: "roger", rank: "Crew Member", bounty: "550,000,000", devilFruit: "Mera Mera no Mi", ability: "Fire Manipulation", description: "Roger's son.", firstAppearance: "Chapter 1" },
    { id: 57, name: "Scopper Gaban", pirateName: '"Scopper Gaban"', role: "Crew Member", crew: "Roger Pirates", group: "roger", subgroup: "roger", rank: "Crew Member", bounty: "Unknown", devilFruit: "None", ability: "Fighting Skill", description: "Crew member.", firstAppearance: "Chapter 0" },

    // ====== WHITEBEARD PIRATES ======
    { id: 58, name: "Edward Newgate", pirateName: '"Whitebeard"', role: "Captain", crew: "Whitebeard Pirates", group: "whitebeard", subgroup: "whitebeard", rank: "Captain", bounty: "5,046,000,000", devilFruit: "Gura Gura no Mi", ability: "Quake Power", description: "The strongest man.", firstAppearance: "Chapter 234" },
    { id: 59, name: "Marco", pirateName: '"Marco the Phoenix"', role: "1st Commander", crew: "Whitebeard Pirates", group: "whitebeard", subgroup: "whitebeard", rank: "1st Commander", bounty: "1,374,000,000", devilFruit: "Tori Tori no Mi (Phoenix)", ability: "Regeneration", description: "First Commander.", firstAppearance: "Chapter 234" },
    { id: 60, name: "Jozu", pirateName: '"Jozu"', role: "2nd Commander", crew: "Whitebeard Pirates", group: "whitebeard", subgroup: "whitebeard", rank: "2nd Commander", bounty: "Unknown", devilFruit: "Mira Mira no Mi", ability: "Diamond Body", description: "Second Commander.", firstAppearance: "Chapter 234" },
    { id: 61, name: "Vista", pirateName: '"Vista"', role: "3rd Commander", crew: "Whitebeard Pirates", group: "whitebeard", subgroup: "whitebeard", rank: "3rd Commander", bounty: "Unknown", devilFruit: "None", ability: "Swordsmanship", description: "Third Commander.", firstAppearance: "Chapter 234" },
    { id: 62, name: "Rakuyo", pirateName: '"Rakuyo"', role: "Commander", crew: "Whitebeard Pirates", group: "whitebeard", subgroup: "whitebeard", rank: "Commander", bounty: "Unknown", devilFruit: "None", ability: "Fighting Skill", description: "Division Commander.", firstAppearance: "Chapter 234" },
    { id: 63, name: "Thatch", pirateName: '"Thatch"', role: "4th Commander", crew: "Whitebeard Pirates", group: "whitebeard", subgroup: "whitebeard", rank: "4th Commander", bounty: "Unknown", devilFruit: "Ame Ame no Mi", ability: "Candy Creation", description: "4th Division Commander.", firstAppearance: "Chapter 234" },

    // ====== SEVEN WARLORDS ======
    { id: 64, name: "Dracule Mihawk", pirateName: '"Hawk-Eye" Mihawk', role: "Warlord", crew: "None", group: "seven-warlords", subgroup: "seven-warlords", rank: "Warlord", bounty: "3,590,000,000", devilFruit: "None", ability: "Swordsmanship", description: "The strongest swordsman.", firstAppearance: "Chapter 49" },
    { id: 65, name: "Boa Hancock", pirateName: '"Snake Princess" Hancock', role: "Warlord", crew: "Kuja Pirates", group: "seven-warlords", subgroup: "seven-warlords", rank: "Warlord", bounty: "1,659,000,000", devilFruit: "Mero Mero no Mi", ability: "Love Powers", description: "Empress of Amazon Lily.", firstAppearance: "Chapter 516" },
    { id: 66, name: "Buggy", pirateName: '"The Star Clown" Buggy', role: "Warlord", crew: "Buggy Pirates", group: "seven-warlords", subgroup: "seven-warlords", rank: "Warlord", bounty: "3,150,000,000", devilFruit: "Bara Bara no Mi", ability: "Body Division", description: "Clown.", firstAppearance: "Chapter 9" },
    { id: 67, name: "Crocodile", pirateName: '"Mr. 0" Crocodile', role: "Warlord", crew: "Baroque Works", group: "seven-warlords", subgroup: "seven-warlords", rank: "Warlord", bounty: "1,967,000,000", devilFruit: "Suna Suna no Mi", ability: "Sand Manipulation", description: "Former Warlord.", firstAppearance: "Chapter 155" },
    { id: 68, name: "Donquixote Doflamingo", pirateName: '"Heavenly Yaksha" Doflamingo', role: "Warlord", crew: "Donquixote Pirates", group: "seven-warlords", subgroup: "seven-warlords", rank: "Warlord", bounty: "1,770,000,000", devilFruit: "Ito Ito no Mi", ability: "String Manipulation", description: "Former Warlord.", firstAppearance: "Chapter 233" },
    { id: 69, name: "Gecko Moria", pirateName: '"Shadow" Moria', role: "Warlord", crew: "Moria Pirates", group: "seven-warlords", subgroup: "seven-warlords", rank: "Warlord", bounty: "620,000,000", devilFruit: "Kage Kage no Mi", ability: "Shadow Manipulation", description: "Former Warlord.", firstAppearance: "Chapter 319" },
    { id: 70, name: "Bartholomew Kuma", pirateName: '"The Tyrant" Kuma', role: "Warlord", crew: "Revolutionaries", group: "seven-warlords", subgroup: "seven-warlords", rank: "Warlord", bounty: "296,000,000", devilFruit: "Paw Paw no Mi", ability: "Repel Forces", description: "Former Warlord.", firstAppearance: "Chapter 319" },

    // ====== SUPER NOVAS ======
    { id: 71, name: "Basil Hawkins", pirateName: '"The Magician" Hawkins', role: "Super Nova", crew: "Hawkins Pirates", group: "super-novas", subgroup: "super-novas", rank: "Captain", bounty: "320,000,000", devilFruit: "Wara Wara no Mi", ability: "Straw Dolls", description: "One of the Super Novas.", firstAppearance: "Chapter 498" },
    { id: 72, name: "Scratchmen Apoo", pirateName: '"Roar" Apoo', role: "Super Nova", crew: "On Air Pirates", group: "super-novas", subgroup: "super-novas", rank: "Captain", bounty: "350,000,000", devilFruit: "Guru Guru no Mi", ability: "Sound Attacks", description: "One of the Super Novas.", firstAppearance: "Chapter 498" },
    { id: 73, name: "Jewelry Bonney", pirateName: '"Big News" Bonney', role: "Super Nova", crew: "Bonney Pirates", group: "super-novas", subgroup: "super-novas", rank: "Captain", bounty: "320,000,000", devilFruit: "Tama Tama no Mi", ability: "Age Manipulation", description: "One of the Super Novas.", firstAppearance: "Chapter 498" },
    { id: 74, name: "Capone Bege", pirateName: '"Captain" Bege', role: "Super Nova", crew: "Fire Tank Pirates", group: "super-novas", subgroup: "super-novas", rank: "Captain", bounty: "350,000,000", devilFruit: "Shiro Shiro no Mi", ability: "Castle Body", description: "One of the Super Novas.", firstAppearance: "Chapter 498" },

    // ====== MARINES ======
    { id: 75, name: "Kong", pirateName: '"Kong"', role: "Fleet Admiral", crew: "Marines", group: "fleet-admiral", subgroup: "fleet-admiral", rank: "Fleet Admiral", bounty: "N/A", devilFruit: "None", ability: "Haki Mastery", description: "Supreme Commander.", firstAppearance: "Chapter 432" },
    { id: 76, name: "Akainu", pirateName: '"Akainu"', role: "Admiral", crew: "Marines", group: "admirals", subgroup: "admirals", rank: "Admiral", bounty: "N/A", devilFruit: "Magu Magu no Mi", ability: "Magma Manipulation", description: "Current Fleet Admiral.", firstAppearance: "Chapter 318" },
    { id: 77, name: "Kizaru", pirateName: '"Kizaru"', role: "Admiral", crew: "Marines", group: "admirals", subgroup: "admirals", rank: "Admiral", bounty: "N/A", devilFruit: "Pika Pika no Mi", ability: "Light Manipulation", description: "One of the Three Admirals.", firstAppearance: "Chapter 318" },
    { id: 78, name: "Fujitora", pirateName: '"Fujitora"', role: "Admiral", crew: "Marines", group: "admirals", subgroup: "admirals", rank: "Admiral", bounty: "N/A", devilFruit: "Zushi Zushi no Mi", ability: "Gravity Manipulation", description: "One of the Three Admirals.", firstAppearance: "Chapter 701" },
    { id: 79, name: "Aokiji", pirateName: '"Aokiji"', role: "Former Admiral", crew: "Marines", group: "former-admirals", subgroup: "former-admirals", rank: "Former Admiral", bounty: "N/A", devilFruit: "Hie Hie no Mi", ability: "Ice Manipulation", description: "Former Admiral.", firstAppearance: "Chapter 318" },
    { id: 80, name: "Ryokugyu", pirateName: '"Ryokugyu"', role: "Admiral", crew: "Marines", group: "admirals", subgroup: "admirals", rank: "Admiral", bounty: "N/A", devilFruit: "Mori Mori no Mi", ability: "Plant Manipulation", description: "One of the Three Admirals.", firstAppearance: "Chapter 1057" },
    { id: 81, name: "Sengoku", pirateName: '"Sengoku"', role: "Former Fleet Admiral", crew: "Marines", group: "former-admirals", subgroup: "former-admirals", rank: "Former Fleet Admiral", bounty: "N/A", devilFruit: "Hito Hito no Mi (Buddha)", ability: "Buddha Transformation", description: "Former Fleet Admiral.", firstAppearance: "Chapter 234" },
    { id: 82, name: "Monkey D. Garp", pirateName: '"Garp"', role: "Vice Admiral", crew: "Marines", group: "vice-admirals", subgroup: "vice-admirals", rank: "Vice Admiral", bounty: "N/A", devilFruit: "None", ability: "Haki Mastery", description: "Legendary Vice Admiral.", firstAppearance: "Chapter 1" },
    { id: 83, name: "Smoker", pirateName: '"Smoker"', role: "Vice Admiral", crew: "Marines", group: "vice-admirals", subgroup: "vice-admirals", rank: "Vice Admiral", bounty: "N/A", devilFruit: "Moku Moku no Mi", ability: "Smoke Manipulation", description: "First major Marine antagonist.", firstAppearance: "Chapter 98" },
    { id: 84, name: "Tashigi", pirateName: '"Tashigi"', role: "Captain", crew: "Marines", group: "captains", subgroup: "captains", rank: "Captain", bounty: "N/A", devilFruit: "None", ability: "Swordsmanship", description: "Captain.", firstAppearance: "Chapter 100" },
    { id: 85, name: "Koby", pirateName: '"Koby"', role: "Captain", crew: "Marines", group: "captains", subgroup: "captains", rank: "Captain", bounty: "N/A", devilFruit: "None", ability: "Haki Mastery", description: "Captain.", firstAppearance: "Chapter 2" },

    // ====== FIVE ELDERS ======
    { id: 86, name: "Saturn", pirateName: '"Saint" Saturn', role: "Five Elder", crew: "World Government", group: "five-elders", subgroup: "five-elders", rank: "Elder", bounty: "N/A", devilFruit: "Kumo Kumo no Mi", ability: "Spider Transformation", description: "One of the Five Elders.", firstAppearance: "Chapter 1066" },
    { id: 87, name: "Mars", pirateName: '"Saint" Mars', role: "Five Elder", crew: "World Government", group: "five-elders", subgroup: "five-elders", rank: "Elder", bounty: "N/A", devilFruit: "Inu Inu no Mi", ability: "Invisibility", description: "One of the Five Elders.", firstAppearance: "Chapter 1066" },
    { id: 88, name: "Venus", pirateName: '"Saint" Venus', role: "Five Elder", crew: "World Government", group: "five-elders", subgroup: "five-elders", rank: "Elder", bounty: "N/A", devilFruit: "Torri Torri no Mi", ability: "Barrier", description: "One of the Five Elders.", firstAppearance: "Chapter 1066" },
    { id: 89, name: "Warcury", pirateName: '"Saint" Warcury', role: "Five Elder", crew: "World Government", group: "five-elders", subgroup: "five-elders", rank: "Elder", bounty: "N/A", devilFruit: "Riki Riki no Mi", ability: "Strength", description: "One of the Five Elders.", firstAppearance: "Chapter 1066" },
    { id: 90, name: "Topman", pirateName: '"Saint" Topman', role: "Five Elder", crew: "World Government", group: "five-elders", subgroup: "five-elders", rank: "Elder", bounty: "N/A", devilFruit: "Kemo Kemo no Mi", ability: "Absorption", description: "One of the Five Elders.", firstAppearance: "Chapter 1066" },

    // ====== REVOLUTIONARIES ======
    { id: 91, name: "Monkey D. Dragon", pirateName: '"Dragon"', role: "Commander-in-Chief", crew: "Revolutionary Army", group: "revolutionaries", subgroup: "revolutionaries", rank: "Leader", bounty: "Unknown", devilFruit: "Unknown", ability: "Unknown", description: "Leader of the Revolutionary Army.", firstAppearance: "Chapter 100" },
    { id: 92, name: "Sabo", pirateName: '"Sabo"', role: "Chief of Staff", crew: "Revolutionary Army", group: "revolutionaries", subgroup: "revolutionaries", rank: "Chief", bounty: "602,000,000", devilFruit: "Mera Mera no Mi", ability: "Fire Manipulation", description: "Chief of Staff.", firstAppearance: "Chapter 484" },
    { id: 93, name: "Ivankov", pirateName: '"Emporio" Ivankov', role: "Revolutionary", crew: "Revolutionary Army", group: "revolutionaries", subgroup: "revolutionaries", rank: "Commander", bounty: "487,000,000", devilFruit: "Horu Horu no Mi", ability: "Hormone Manipulation", description: "Revolutionary Commander.", firstAppearance: "Chapter 537" },
    { id: 94, name: "Karasu", pirateName: '"Karasu"', role: "Revolutionary", crew: "Revolutionary Army", group: "revolutionaries", subgroup: "revolutionaries", rank: "Commander", bounty: "400,000,000", devilFruit: "Suke Suke no Mi", ability: "Invisibility", description: "Revolutionary Commander.", firstAppearance: "Chapter 537" },
    { id: 95, name: "Belo Betty", pirateName: '"Belo Betty"', role: "Revolutionary", crew: "Revolutionary Army", group: "revolutionaries", subgroup: "revolutionaries", rank: "Commander", bounty: "357,000,000", devilFruit: "Awa Awa no Mi", ability: "Bubble Manipulation", description: "Revolutionary Commander.", firstAppearance: "Chapter 537" },

    // ====== WORLD GOVERNMENT ======
    { id: 96, name: "Im", pirateName: '"Im"', role: "Leader", crew: "World Government", group: "world-government", subgroup: "world-government", rank: "Leader", bounty: "N/A", devilFruit: "Unknown", ability: "Unknown", description: "The true ruler.", firstAppearance: "Chapter 903" },
    { id: 97, name: "St. Charlos", pirateName: '"St. Charlos"', role: "Celestial Dragon", crew: "World Government", group: "world-government", subgroup: "world-government", rank: "Dragon", bounty: "N/A", devilFruit: "None", ability: "Wealth Power", description: "Celestial Dragon.", firstAppearance: "Chapter 499" },

    // ====== ROYALTY ======
    { id: 98, name: "Nefertari Vivi", pirateName: '"Vivi"', role: "Princess", crew: "Alabasta Kingdom", group: "royalty", subgroup: "royalty", rank: "Princess", bounty: "N/A", devilFruit: "None", ability: "Negotiation", description: "Princess of Alabasta.", firstAppearance: "Chapter 101" },
    { id: 99, name: "Shirahoshi", pirateName: '"Mermaid Princess" Shirahoshi', role: "Princess", crew: "Fish-Man Kingdom", group: "royalty", subgroup: "royalty", rank: "Princess", bounty: "N/A", devilFruit: "None", ability: "Poseidon", description: "Princess of Fish-Man Island.", firstAppearance: "Chapter 612" },
    { id: 100, name: "King Neptune", pirateName: '"King Neptune"', role: "King", crew: "Fish-Man Kingdom", group: "royalty", subgroup: "royalty", rank: "King", bounty: "N/A", devilFruit: "None", ability: "Sea King Summoning", description: "King of Fish-Man Island.", firstAppearance: "Chapter 612" },
    { id: 101, name: "Rebecca", pirateName: '"Rebecca"', role: "Princess", crew: "Dressrosa Kingdom", group: "royalty", subgroup: "royalty", rank: "Princess", bounty: "N/A", devilFruit: "None", ability: "Swordsmanship", description: "Princess of Dressrosa.", firstAppearance: "Chapter 701" },

    // ====== OTHER NOTABLE CHARACTERS ======
    { id: 102, name: "Yamato", pirateName: '"Yamato"', role: "Samurai", crew: "Wano", group: "others", subgroup: "others", rank: "Samurai", bounty: "N/A", devilFruit: "Inu Inu no Mi", ability: "Tiger Transformation", description: "Kaido's daughter.", firstAppearance: "Chapter 984" },
    { id: 103, name: "Carrot", pirateName: '"Carrot"', role: "Mink", crew: "Minks", group: "others", subgroup: "others", rank: "Mink", bounty: "N/A", devilFruit: "None", ability: "Sulong", description: "Mink from Zou.", firstAppearance: "Chapter 801" },
    { id: 104, name: "Pekoms", pirateName: '"Pekoms"', role: "Mink", crew: "Minks", group: "others", subgroup: "others", rank: "Mink", bounty: "N/A", devilFruit: "None", ability: "Electro", description: "Mink from Zou.", firstAppearance: "Chapter 801" },
    { id: 105, name: "Pedro", pirateName: '"Pedro"', role: "Mink", crew: "Minks", group: "others", subgroup: "others", rank: "Mink", bounty: "N/A", devilFruit: "None", ability: "Sulong", description: "Mink from Zou.", firstAppearance: "Chapter 801" },
    { id: 106, name: "Inuarashi", pirateName: '"Inuarashi"', role: "Ruler", crew: "Minks", group: "others", subgroup: "others", rank: "Ruler", bounty: "N/A", devilFruit: "None", ability: "Electro", description: "Ruler of the Day.", firstAppearance: "Chapter 801" },
    { id: 107, name: "Nekomamushi", pirateName: '"Nekomamushi"', role: "Ruler", crew: "Minks", group: "others", subgroup: "others", rank: "Ruler", bounty: "N/A", devilFruit: "None", ability: "Electro", description: "Ruler of the Night.", firstAppearance: "Chapter 801" },
    { id: 108, name: "Kawamatsu", pirateName: '"Kawamatsu"', role: "Samurai", crew: "Wano", group: "others", subgroup: "others", rank: "Samurai", bounty: "N/A", devilFruit: "Wani Wani no Mi", ability: "Crocodile Transformation", description: "One of the Nine Red Scabbards.", firstAppearance: "Chapter 951" },
    { id: 109, name: "Denjiro", pirateName: '"Denjiro"', role: "Samurai", crew: "Wano", group: "others", subgroup: "others", rank: "Samurai", bounty: "N/A", devilFruit: "None", ability: "Haki Mastery", description: "One of the Nine Red Scabbards.", firstAppearance: "Chapter 951" },
    { id: 110, name: "Ashura Doji", pirateName: '"Ashura Doji"', role: "Samurai", crew: "Wano", group: "others", subgroup: "others", rank: "Samurai", bounty: "N/A", devilFruit: "None", ability: "Swordsmanship", description: "One of the Nine Red Scabbards.", firstAppearance: "Chapter 951" },
    { id: 111, name: "Raizo", pirateName: '"Raizo"', role: "Samurai", crew: "Wano", group: "others", subgroup: "others", rank: "Samurai", bounty: "N/A", devilFruit: "None", ability: "Ninja Arts", description: "One of the Nine Red Scabbards.", firstAppearance: "Chapter 951" },
    { id: 112, name: "Kozuki Momonosuke", pirateName: '"Momonosuke"', role: "Shogun", crew: "Wano", group: "others", subgroup: "others", rank: "Shogun", bounty: "N/A", devilFruit: "Uo Uo no Mi (Artificial)", ability: "Dragon Summoning", description: "Shogun of Wano.", firstAppearance: "Chapter 820" },
    { id: 113, name: "Kozuki Hiyori", pirateName: '"Hiyori"', role: "Princess", crew: "Wano", group: "others", subgroup: "others", rank: "Princess", bounty: "N/A", devilFruit: "None", ability: "Oden's Sword", description: "Princess of Wano.", firstAppearance: "Chapter 951" },
    { id: 114, name: "Toki", pirateName: '"Toki"', role: "Time Traveler", crew: "Wano", group: "others", subgroup: "others", rank: "Unknown", bounty: "N/A", devilFruit: "Toki Toki no Mi", ability: "Time Travel", description: "Oden's wife.", firstAppearance: "Chapter 920" },
    { id: 115, name: "Kozuki Oden", pirateName: '"Oden"', role: "Samurai", crew: "Wano", group: "ancient", subgroup: "ancient", rank: "Lord", bounty: "N/A", devilFruit: "None", ability: "Two-Sword Style", description: "Legendary samurai.", firstAppearance: "Chapter 920" },

    // ====== ANCIENT GODS & MYTHICAL ======
    { id: 116, name: "Zunesha", pirateName: '"Zunesha"', role: "Ancient Elephant", crew: "Minks", group: "gods", subgroup: "gods", rank: "Ancient", bounty: "N/A", devilFruit: "None", ability: "Elephant Powers", description: "Giant elephant.", firstAppearance: "Chapter 951" },
    { id: 117, name: "Poseidon", pirateName: '"Poseidon"', role: "Ancient Weapon", crew: "Sea Kings", group: "gods", subgroup: "gods", rank: "Weapon", bounty: "N/A", devilFruit: "None", ability: "Sea King Command", description: "One of the Ancient Weapons.", firstAppearance: "Chapter 648" },
    { id: 118, name: "Joyboy", pirateName: '"Joyboy"', role: "Ancient Hero", crew: "Ancient Kingdom", group: "ancient", subgroup: "ancient", rank: "Hero", bounty: "N/A", devilFruit: "Unknown", ability: "Haki Mastery", description: "Ancient hero.", firstAppearance: "Chapter 648" },

    // ====== CIPHER POL ======
    { id: 119, name: "Rob Lucci", pirateName: '"Rob Lucci"', role: "CP0 Agent", crew: "Cipher Pol", group: "cipher-pol", subgroup: "cipher-pol", rank: "Agent", bounty: "N/A", devilFruit: "Neko Neko no Mi (Leopard)", ability: "Leopard Transformation", description: "CP0 agent.", firstAppearance: "Chapter 303" },
    { id: 120, name: "Kaku", pirateName: '"Kaku"', role: "CP9 Agent", crew: "Cipher Pol", group: "cipher-pol", subgroup: "cipher-pol", rank: "Agent", bounty: "N/A", devilFruit: "Ushi Ushi no Mi (Giraffe)", ability: "Giraffe Transformation", description: "CP9 agent.", firstAppearance: "Chapter 303" },

    // ====== HOLY KNIGHTS ======
    { id: 121, name: "Figarland Garling", pirateName: '"Figarland Garling"', role: "Holy Knight", crew: "Holy Knights", group: "holy-knights", subgroup: "holy-knights", rank: "Knight", bounty: "N/A", devilFruit: "Unknown", ability: "Haki Mastery", description: "Commander of the Holy Knights.", firstAppearance: "Chapter 1066" },
    { id: 122, name: "S-Hawk", pirateName: '"S-Hawk"', role: "Holy Knight", crew: "Holy Knights", group: "holy-knights", subgroup: "holy-knights", rank: "Knight", bounty: "N/A", devilFruit: "Unknown", ability: "Swordsmanship", description: "One of the Holy Knights.", firstAppearance: "Chapter 1066" },
    { id: 123, name: "S-Snake", pirateName: '"S-Snake"', role: "Holy Knight", crew: "Holy Knights", group: "holy-knights", subgroup: "holy-knights", rank: "Knight", bounty: "N/A", devilFruit: "Unknown", ability: "Snake Powers", description: "One of the Holy Knights.", firstAppearance: "Chapter 1066" },
    { id: 124, name: "S-Bear", pirateName: '"S-Bear"', role: "Holy Knight", crew: "Holy Knights", group: "holy-knights", subgroup: "holy-knights", rank: "Knight", bounty: "N/A", devilFruit: "Unknown", ability: "Bear Powers", description: "One of the Holy Knights.", firstAppearance: "Chapter 1066" },

    // ====== OTHER PIRATES ======
    { id: 125, name: "Cavendish", pirateName: '"Cavendish"', role: "Pirate", crew: "Beautiful Pirates", group: "other-pirates", subgroup: "other-pirates", rank: "Captain", bounty: "280,000,000", devilFruit: "None", ability: "Haki Mastery", description: "Captain of Beautiful Pirates.", firstAppearance: "Chapter 701" },
    { id: 126, name: "Bartolomeo", pirateName: '"Bartolomeo"', role: "Pirate", crew: "Barto Club", group: "other-pirates", subgroup: "other-pirates", rank: "Captain", bounty: "220,000,000", devilFruit: "Bari Bari no Mi", ability: "Barrier Creation", description: "Captain of Barto Club.", firstAppearance: "Chapter 701" },

    // ====== SCIENTISTS ======
    { id: 127, name: "Vegapunk", pirateName: '"Vegapunk"', role: "Scientist", crew: "Scientific", group: "others", subgroup: "others", rank: "Scientist", bounty: "N/A", devilFruit: "None", ability: "Genius Intelligence", description: "The greatest scientist.", firstAppearance: "Chapter 351" },
    { id: 128, name: "Judge", pirateName: '"Judge"', role: "Scientist", crew: "Germa 66", group: "others", subgroup: "others", rank: "Scientist", bounty: "N/A", devilFruit: "None", ability: "Genetic Engineering", description: "King of Germa 66.", firstAppearance: "Chapter 840" },
    { id: 129, name: "Caesar", pirateName: '"Caesar"', role: "Scientist", crew: "Scientific", group: "others", subgroup: "others", rank: "Scientist", bounty: "300,000,000", devilFruit: "Gas Gas no Mi", ability: "Gas Manipulation", description: "Former MADS member.", firstAppearance: "Chapter 654" },

    // ====== VEGAPUNK SATELLITES (EGGHEAD ARC) ======
    { id: 130, name: "Shaka", pirateName: '"Shaka"', role: "Vegapunk Satellite", crew: "Egghead Lab", group: "others", subgroup: "others", rank: "Satellite", bounty: "N/A", devilFruit: "None", ability: "Advanced Tech", description: "Vegapunk's 'Good' satellite representing logic and rationality.", firstAppearance: "Chapter 1065" },
    { id: 131, name: "Lilith", pirateName: '"Lilith"', role: "Vegapunk Satellite", crew: "Egghead Lab", group: "others", subgroup: "others", rank: "Satellite", bounty: "N/A", devilFruit: "None", ability: "Advanced Tech", description: "Vegapunk's 'Evil' satellite representing aggression.", firstAppearance: "Chapter 1065" },
    { id: 132, name: "Edison", pirateName: '"Edison"', role: "Vegapunk Satellite", crew: "Egghead Lab", group: "others", subgroup: "others", rank: "Satellite", bounty: "N/A", devilFruit: "None", ability: "Advanced Tech", description: "Vegapunk's 'Thinking' satellite representing creativity.", firstAppearance: "Chapter 1065" },
    { id: 133, name: "Pythagoras", pirateName: '"Pythagoras"', role: "Vegapunk Satellite", crew: "Egghead Lab", group: "others", subgroup: "others", rank: "Satellite", bounty: "N/A", devilFruit: "None", ability: "Advanced Tech", description: "Vegapunk's 'Wisdom' satellite representing knowledge.", firstAppearance: "Chapter 1065" },
    { id: 134, name: "Atlas", pirateName: '"Atlas"', role: "Vegapunk Satellite", crew: "Egghead Lab", group: "others", subgroup: "others", rank: "Satellite", bounty: "N/A", devilFruit: "None", ability: "Advanced Tech", description: "Vegapunk's 'Violence' satellite representing strength.", firstAppearance: "Chapter 1065" },
    { id: 135, name: "York", pirateName: '"York"', role: "Vegapunk Satellite", crew: "Egghead Lab", group: "others", subgroup: "others", rank: "Satellite", bounty: "N/A", devilFruit: "None", ability: "Advanced Tech", description: "Vegapunk's 'Greed' satellite representing desire.", firstAppearance: "Chapter 1065" },

    // ====== ELBAF / NEW WORLD CHARACTERS ======
    { id: 136, name: "Loki", pirateName: '"Prince Loki"', role: "Prince", crew: "Elbaf", group: "others", subgroup: "others", rank: "Prince", bounty: "2,600,000,000", devilFruit: "Unknown", ability: "Giant Strength", description: "The accursed prince of Elbaf, known as the 'Cursed Prince'.", firstAppearance: "Chapter 1130" },
    { id: 137, name: "Hajrudin", pirateName: '"Hajrudin"', role: "Giant Warrior", crew: "New Giant Warrior Pirates", group: "others", subgroup: "others", rank: "Captain", bounty: "Unknown", devilFruit: "None", ability: "Giant Strength", description: "Giant warrior from Elbaf.", firstAppearance: "Chapter 706" },
    { id: 138, name: "Goldberg", pirateName: '"Goldberg"', role: "Giant Warrior", crew: "New Giant Warrior Pirates", group: "others", subgroup: "others", rank: "Crew Member", bounty: "Unknown", devilFruit: "None", ability: "Giant Strength", description: "Giant warrior from Elbaf.", firstAppearance: "Chapter 1130" },
    { id: 139, name: "Gerd", pirateName: '"Gerd"', role: "Giant Warrior", crew: "New Giant Warrior Pirates", group: "others", subgroup: "others", rank: "Crew Member", bounty: "Unknown", devilFruit: "None", ability: "Giant Strength", description: "Giant warrior from Elbaf.", firstAppearance: "Chapter 1130" },
    { id: 140, name: "Stansen", pirateName: '"Stansen"', role: "Giant Warrior", crew: "New Giant Warrior Pirates", group: "others", subgroup: "others", rank: "Crew Member", bounty: "Unknown", devilFruit: "None", ability: "Giant Strength", description: "Giant warrior from Elbaf.", firstAppearance: "Chapter 1130" },
    { id: 141, name: "Road", pirateName: '"Road"', role: "Giant Warrior", crew: "New Giant Warrior Pirates", group: "others", subgroup: "others", rank: "Crew Member", bounty: "Unknown", devilFruit: "None", ability: "Giant Strength", description: "Giant warrior from Elbaf.", firstAppearance: "Chapter 1130" },

    // ====== CROSS GUILD ======
    { id: 142, name: "Crocodile", pirateName: '"Mr. 0" Crocodile', role: "Founder", crew: "Cross Guild", group: "other-pirates", subgroup: "other-pirates", rank: "Founder", bounty: "1,965,000,000", devilFruit: "Suna Suna no Mi", ability: "Sand Manipulation", description: "Co-founder of Cross Guild.", firstAppearance: "Chapter 1058" },
    { id: 143, name: "Dracule Mihawk", pirateName: '"Hawk-Eye" Mihawk', role: "Founder", crew: "Cross Guild", group: "other-pirates", subgroup: "other-pirates", rank: "Founder", bounty: "3,590,000,000", devilFruit: "None", ability: "Swordsmanship", description: "Co-founder of Cross Guild.", firstAppearance: "Chapter 1058" },
    { id: 144, name: "Buggy", pirateName: '"The Star Clown" Buggy', role: "Figurehead", crew: "Cross Guild", group: "other-pirates", subgroup: "other-pirates", rank: "Leader", bounty: "3,189,000,000", devilFruit: "Bara Bara no Mi", ability: "Body Division", description: "Figurehead leader of Cross Guild.", firstAppearance: "Chapter 1058" },

    // ====== SERAPHIM (PACIFISTA) ======
    { id: 145, name: "S-Hawk", pirateName: '"S-Hawk"', role: "Seraphim", crew: "World Government", group: "holy-knights", subgroup: "holy-knights", rank: "Seraphim", bounty: "N/A", devilFruit: "Unknown", ability: "Lunarian Powers", description: "Mihawk-based Seraphim.", firstAppearance: "Chapter 1059" },
    { id: 146, name: "S-Snake", pirateName: '"S-Snake"', role: "Seraphim", crew: "World Government", group: "holy-knights", subgroup: "holy-knights", rank: "Seraphim", bounty: "N/A", devilFruit: "Unknown", ability: "Lunarian Powers", description: "Hancock-based Seraphim.", firstAppearance: "Chapter 1059" },
    { id: 147, name: "S-Shark", pirateName: '"S-Shark"', role: "Seraphim", crew: "World Government", group: "holy-knights", subgroup: "holy-knights", rank: "Seraphim", bounty: "N/A", devilFruit: "Unknown", ability: "Lunarian Powers", description: "Jinbe-based Seraphim.", firstAppearance: "Chapter 1059" },
    { id: 148, name: "S-Bear", pirateName: '"S-Bear"', role: "Seraphim", crew: "World Government", group: "holy-knights", subgroup: "holy-knights", rank: "Seraphim", bounty: "N/A", devilFruit: "Unknown", ability: "Lunarian Powers", description: "Kuma-based Seraphim.", firstAppearance: "Chapter 1059" },

    // ====== ROCKS PIRATES ======
    { id: 149, name: "Rocks D. Xebec", pirateName: '"Rocks" Xebec', role: "Captain", crew: "Rocks Pirates", group: "other-pirates", subgroup: "other-pirates", rank: "Captain", bounty: "Unknown", devilFruit: "Unknown", ability: "Unknown", description: "Captain of the legendary Rocks Pirates.", firstAppearance: "Chapter 957" },
    { id: 150, name: "Whitebeard", pirateName: '"Whitebeard" Newgate', role: "Crew Member", crew: "Rocks Pirates", group: "other-pirates", subgroup: "other-pirates", rank: "Crew Member", bounty: "Unknown", devilFruit: "None", ability: "Haki Mastery", description: "Former member of Rocks Pirates.", firstAppearance: "Chapter 957" },
    { id: 151, name: "Big Mom", pirateName: '"Big Mom" Lincle', role: "Crew Member", crew: "Rocks Pirates", group: "other-pirates", subgroup: "other-pirates", rank: "Crew Member", bounty: "Unknown", devilFruit: "Soul Soul no Mi", ability: "Soul Manipulation", description: "Former member of Rocks Pirates.", firstAppearance: "Chapter 957" },
    { id: 152, name: "Kaido", pirateName: '"Beast" Kaido', role: "Crew Member", crew: "Rocks Pirates", group: "other-pirates", subgroup: "other-pirates", rank: "Crew Member", bounty: "Unknown", devilFruit: "Uo Uo no Mi", ability: "Dragon Transformation", description: "Former member of Rocks Pirates.", firstAppearance: "Chapter 957" },
    { id: 153, name: "Shiki", pirateName: '"Golden Lion" Shiki', role: "Crew Member", crew: "Rocks Pirates", group: "other-pirates", subgroup: "other-pirates", rank: "Crew Member", bounty: "Unknown", devilFruit: "Fuwa Fuwa no Mi", ability: "Levitation", description: "Former member of Rocks Pirates.", firstAppearance: "Chapter 0" },
    { id: 154, name: "John", pirateName: '"Captain John"', role: "Crew Member", crew: "Rocks Pirates", group: "other-pirates", subgroup: "other-pirates", rank: "Crew Member", bounty: "Unknown", devilFruit: "None", ability: "Swordsmanship", description: "Former member of Rocks Pirates.", firstAppearance: "Chapter 957" },
    { id: 155, name: "Silver Axe", pirateName: '"Silver Axe"', role: "Crew Member", crew: "Rocks Pirates", group: "other-pirates", subgroup: "other-pirates", rank: "Crew Member", bounty: "Unknown", devilFruit: "None", ability: "Axe Fighting", description: "Former member of Rocks Pirates.", firstAppearance: "Chapter 957" },
    { id: 156, name: "Ochoku", pirateName: '"Ochoku"', role: "Crew Member", crew: "Rocks Pirates", group: "other-pirates", subgroup: "other-pirates", rank: "Crew Member", bounty: "Unknown", devilFruit: "None", ability: "Fighting Skill", description: "Former member of Rocks Pirates.", firstAppearance: "Chapter 957" }
];

// ============================================
// LOCALSTORAGE INTEGRATION
// ============================================

function initLocalStorage() {
    if (!localStorage.getItem('onePieceCharacters')) {
        localStorage.setItem('onePieceCharacters', JSON.stringify(characters));
    }
}

function getCharacters() {
    const stored = localStorage.getItem('onePieceCharacters');
    if (stored) {
        return JSON.parse(stored);
    }
    return characters;
}

// ============================================
// RENDER FUNCTIONS
// ============================================

// Get character image or return placeholder
function getCharacterImage(character) {
    // Check for direct image property first (new way)
    if (character.image && character.image.trim() !== '') {
        return character.image;
    }
    // Fallback to characterImages mapping (legacy way)
    if (characterImages[character.name]) {
        return characterImages[character.name];
    }
    // Try alternative names
    if (characterImages[character.pirateName]) {
        return characterImages[character.pirateName];
    }
    // Generate dynamic avatar based on character name and group
    return generateCharacterAvatar(character);
}

// Generate a dynamic SVG avatar for a character
function generateCharacterAvatar(character) {
    const initials = getInitials(character.name);
    const colors = getGroupColors(character.group);
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
            <defs>
                <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:${colors[0]};stop-opacity:1" />
                    <stop offset="100%" style="stop-color:${colors[1]};stop-opacity:1" />
                </linearGradient>
                <filter id="shadow">
                    <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000" flood-opacity="0.3"/>
                </filter>
            </defs>
            <rect width="400" height="400" fill="url(#bg)" rx="20" ry="20"/>
            <circle cx="200" cy="200" r="140" fill="rgba(255,255,255,0.12)" filter="url(#shadow)"/>
            <circle cx="200" cy="200" r="110" fill="rgba(255,255,255,0.08)"/>
            <text x="200" y="230" font-family="'Outfit', 'Segoe UI', sans-serif" font-size="90" font-weight="800" fill="#ffffff" text-anchor="middle" dominant-baseline="middle" letter-spacing="2">${initials}</text>
            <text x="200" y="340" font-family="'Outfit', 'Segoe UI', sans-serif" font-size="22" font-weight="500" fill="rgba(255,255,255,0.7)" text-anchor="middle">${escapeXml(character.name)}</text>
        </svg>
    `;
    return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg.trim())));
}

// Get up to 2 initials from a name
function getInitials(name) {
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) {
        return parts[0].substring(0, 2).toUpperCase();
    }
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// Get gradient colors based on character group/crew
function getGroupColors(group) {
    const colorMap = {
        'four-emperors': ['#d4af37', '#b8860b'],
        'straw-hat': ['#c41e3a', '#8b0000'],
        'big-mom': ['#ff69b4', '#db7093'],
        'beast': ['#8b4513', '#654321'],
        'red-hair': ['#dc143c', '#b22222'],
        'blackbeard': ['#1a1a2e', '#16213e'],
        'kid': ['#dd6b20', '#c05621'],
        'heart': ['#e53e3e', '#c53030'],
        'roger': ['#6b46c1', '#553c9a'],
        'whitebeard': ['#4a5568', '#2d3748'],
        'seven-warlords': ['#e53e3e', '#c53030'],
        'super-novas': ['#dd6b20', '#c05621'],
        'other-pirates': ['#4a5568', '#2d3748'],
        'fleet-admiral': ['#1e3a5f', '#2c5282'],
        'admirals': ['#1e3a5f', '#2c5282'],
        'former-admirals': ['#2c5282', '#1a365d'],
        'vice-admirals': ['#2c5282', '#1a365d'],
        'captains': ['#1a365d', '#0f2942'],
        'marine-others': ['#1a365d', '#0f2942'],
        'five-elders': ['#ffd700', '#b8860b'],
        'revolutionaries': ['#6b46c1', '#553c9a'],
        'gods': ['#9f7aea', '#6b46c1'],
        'ancient': ['#f6e05e', '#d69e2e'],
        'holy-knights': ['#e2e8f0', '#a0aec0'],
        'world-government': ['#1e3a5f', '#2c5282'],
        'cipher-pol': ['#1a1a1a', '#333333'],
        'royalty': ['#d4af37', '#b8860b'],
        'bounty-hunters': ['#e53e3e', '#c53030'],
        'others': ['#4a5568', '#2d3748']
    };
    return colorMap[group] || ['#4a5568', '#2d3748'];
}

// Escape XML special characters for SVG text
function escapeXml(str) {
    return str.replace(/&/g, '&amp;')
              .replace(/</g, '<')
              .replace(/>/g, '>')
              .replace(/"/g, '"')
              .replace(/'/g, '&apos;');
}

// Create character card HTML
function createCharacterCard(character, isFlipCard = false) {
    const imgUrl = getCharacterImage(character);
    
    // Determine badge class
    let badgeClass = 'badge-member';
    if (character.rank === 'Captain' || character.rank === 'Emperor') badgeClass = 'badge-captain';
    else if (character.rank && character.rank.includes('Commander')) badgeClass = 'badge-commander';
    else if (character.rank && character.rank.includes('Officer')) badgeClass = 'badge-officer';

    // Create card HTML
    let cardHTML = '';
    
    if (isFlipCard && character.flipContent) {
        // Flip card for Four Emperors
        cardHTML = `
            <div class="character-card flip-card" onclick="openModal(${character.id})">
                <div class="card-inner">
                    <div class="card-front">
                        <div class="character-image">
                            ${imgUrl ? `<img src="${imgUrl}" alt="${character.name}" onerror="this.style.display='none'; this.parentElement.innerHTML='<i class=\\'fas fa-user placeholder\\'></i>'">` : `<i class="fas fa-user placeholder"></i>`}
                            <span class="character-badge ${badgeClass}">${character.role}</span>
                        </div>
                        <div class="character-info">
                            <h3 class="character-name">${character.name}</h3>
                            <p class="pirate-name">${character.pirateName}</p>
                            <p class="character-role">${character.crew}</p>
                            <div class="character-details">
                                ${character.bounty !== 'N/A' ? `<div class="detail-item bounty"><i class="fas fa-coins"></i> ${character.bounty}</div>` : ''}
                                ${character.devilFruit !== 'None' ? `<div class="detail-item devil-fruit"><i class="fas fa-apple-alt"></i> ${character.devilFruit}</div>` : ''}
                            </div>
                        </div>
                    </div>
                    <div class="card-back">
                        <div class="emperor-reason">
                            <i class="fas ${character.flipContent.icon} reason-icon"></i>
                            <h4>${character.flipContent.reason}</h4>
                            <p>${character.flipContent.details}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    } else {
        // Regular card
        cardHTML = `
            <div class="character-card" onclick="openModal(${character.id})">
                <div class="character-image">
                    ${imgUrl ? `<img src="${imgUrl}" alt="${character.name}" onerror="this.style.display='none'; this.parentElement.innerHTML='<i class=\\'fas fa-user placeholder\\'></i>'">` : `<i class="fas fa-user placeholder"></i>`}
                    <span class="character-badge ${badgeClass}">${character.role}</span>
                </div>
                <div class="character-info">
                    <h3 class="character-name">${character.name}</h3>
                    <p class="pirate-name">${character.pirateName}</p>
                    <p class="character-role">${character.crew}</p>
                    <div class="character-details">
                        ${character.bounty !== 'N/A' ? `<div class="detail-item bounty"><i class="fas fa-coins"></i> ${character.bounty}</div>` : ''}
                        ${character.devilFruit !== 'None' ? `<div class="detail-item devil-fruit"><i class="fas fa-apple-alt"></i> ${character.devilFruit}</div>` : ''}
                    </div>
                </div>
            </div>
        `;
    }
    
    return cardHTML;
}

// Render characters to a specific grid
function renderCharactersToGrid(gridId, characterList, isFlipCard = false) {
    const grid = document.getElementById(gridId);
    if (!grid) return;
    
    grid.innerHTML = characterList.map(char => createCharacterCard(char, isFlipCard)).join('');
}

// Main render function - renders all character groups
function renderAllCharacters() {
    const chars = getCharacters();
    // Four Emperors (with flip cards)
    const emperors = chars.filter(c => c.group === 'four-emperors');
    renderCharactersToGrid('emperorsGrid', emperors, true);
    
    // Straw Hat Pirates
    const strawHats = chars.filter(c => c.group === 'straw-hat');
    renderCharactersToGrid('strawHatGrid', strawHats, false);
    
    // Big Mom Pirates
    const bigMoms = chars.filter(c => c.group === 'big-mom');
    renderCharactersToGrid('bigMomGrid', bigMoms, false);
    
    // Beast Pirates
    const beastPirates = chars.filter(c => c.group === 'beast');
    renderCharactersToGrid('beastPiratesGrid', beastPirates, false);
    
    // Red-Haired Pirates
    const redHair = chars.filter(c => c.group === 'red-hair');
    renderCharactersToGrid('redHairGrid', redHair, false);
    
    // Blackbeard Pirates
    const blackbeard = chars.filter(c => c.group === 'blackbeard');
    renderCharactersToGrid('blackbeardGrid', blackbeard, false);
    
    // Kid Pirates
    const kid = chars.filter(c => c.group === 'kid');
    renderCharactersToGrid('kidPiratesGrid', kid, false);
    
    // Heart Pirates
    const heart = chars.filter(c => c.group === 'heart');
    renderCharactersToGrid('heartPiratesGrid', heart, false);
    
    // Roger Pirates
    const roger = chars.filter(c => c.group === 'roger');
    renderCharactersToGrid('rogerPiratesGrid', roger, false);
    
    // Whitebeard Pirates
    const whitebeard = chars.filter(c => c.group === 'whitebeard');
    renderCharactersToGrid('whitebeardPiratesGrid', whitebeard, false);
    
    // Seven Warlords
    const warlords = chars.filter(c => c.group === 'seven-warlords');
    renderCharactersToGrid('warlordsGrid', warlords, false);
    
    // Super Novas
    const novas = chars.filter(c => c.group === 'super-novas');
    renderCharactersToGrid('novasGrid', novas, false);
    
    // Other Pirates
    const otherPirates = chars.filter(c => c.group === 'other-pirates');
    renderCharactersToGrid('otherPiratesGrid', otherPirates, false);
    
    // Marines
    const fleetAdmiral = chars.filter(c => c.group === 'fleet-admiral');
    renderCharactersToGrid('fleetAdmiralGrid', fleetAdmiral, false);
    
    const admirals = chars.filter(c => c.group === 'admirals');
    renderCharactersToGrid('admiralsGrid', admirals, false);
    
    const formerAdmirals = chars.filter(c => c.group === 'former-admirals');
    renderCharactersToGrid('formerAdmiralsGrid', formerAdmirals, false);
    
    const viceAdmirals = chars.filter(c => c.group === 'vice-admirals');
    renderCharactersToGrid('viceAdmiralsGrid', viceAdmirals, false);
    
    const captains = chars.filter(c => c.group === 'captains');
    renderCharactersToGrid('captainsGrid', captains, false);
    
    const marineOthers = chars.filter(c => c.group === 'marine-others');
    renderCharactersToGrid('marineOthersGrid', marineOthers, false);
    
    // Others Section
    const elders = chars.filter(c => c.group === 'five-elders');
    renderCharactersToGrid('eldersGrid', elders, false);
    
    const revolutionaries = chars.filter(c => c.group === 'revolutionaries');
    renderCharactersToGrid('revolutionariesGrid', revolutionaries, false);
    
    const gods = chars.filter(c => c.group === 'gods');
    renderCharactersToGrid('godsGrid', gods, false);
    
    const ancient = chars.filter(c => c.group === 'ancient');
    renderCharactersToGrid('ancientGrid', ancient, false);
    
    const knights = chars.filter(c => c.group === 'holy-knights');
    renderCharactersToGrid('knightsGrid', knights, false);
    
    const worldGov = chars.filter(c => c.group === 'world-government');
    renderCharactersToGrid('worldGovGrid', worldGov, false);
    
    const cipherPol = chars.filter(c => c.group === 'cipher-pol');
    renderCharactersToGrid('cipherPolGrid', cipherPol, false);
    
    const royalty = chars.filter(c => c.group === 'royalty');
    renderCharactersToGrid('royaltyGrid', royalty, false);
    
    const bountyHunters = chars.filter(c => c.group === 'bounty-hunters');
    renderCharactersToGrid('bountyHuntersGrid', bountyHunters, false);
    
    const others = chars.filter(c => c.group === 'others');
    renderCharactersToGrid('othersGrid', others, false);
}

// Show/hide crew members
function showCrewMembers(crew) {
    const membersDiv = document.getElementById(`${crew}-members`);
    const header = document.querySelector(`[data-crew="${crew}"] .crew-group-header`);
    
    if (membersDiv.style.display === 'none') {
        membersDiv.style.display = 'block';
        if (header) {
            header.classList.add('expanded');
        }
    } else {
        membersDiv.style.display = 'none';
        if (header) {
            header.classList.remove('expanded');
        }
    }
}

// ============================================
// MODAL FUNCTIONS
// ============================================

function openModal(characterId) {
    const character = getCharacters().find(c => c.id === characterId);
    if (!character) return;
    
    const modal = document.getElementById('characterModal');
    const modalBody = document.getElementById('modalBody');
    const imgUrl = getCharacterImage(character);
    
    modalBody.innerHTML = `
        <div class="modal-header">
            ${imgUrl ? `<img src="${imgUrl}" alt="${character.name}" class="modal-header-bg" onerror="this.style.display='none'; this.parentElement.innerHTML='<i class=\\'fas fa-user placeholder\\'></i>'">` : `<i class="fas fa-user placeholder"></i>`}
            <div class="modal-header-content">
                <h2 class="modal-character-name">${character.name}</h2>
                <p class="modal-pirate-name">${character.pirateName}</p>
                <p class="modal-character-role">${character.role} - ${character.crew}</p>
            </div>
        </div>
        <div class="modal-details">
            <div class="detail-row">
                <div class="detail-box">
                    <div class="detail-box-label">Rank/Role</div>
                    <div class="detail-box-value">${character.rank}</div>
                </div>
                <div class="detail-box">
                    <div class="detail-box-label">Bounty</div>
                    <div class="detail-box-value">${character.bounty !== 'N/A' ? character.bounty : 'N/A'}</div>
                </div>
            </div>
            <div class="detail-row">
                <div class="detail-box">
                    <div class="detail-box-label">Devil Fruit</div>
                    <div class="detail-box-value">${character.devilFruit}</div>
                </div>
                <div class="detail-box">
                    <div class="detail-box-label">Ability</div>
                    <div class="detail-box-value">${character.ability}</div>
                </div>
            </div>
            <div class="detail-row">
                <div class="detail-box">
                    <div class="detail-box-label">First Appearance</div>
                    <div class="detail-box-value">${character.firstAppearance}</div>
                </div>
            </div>
            <div class="modal-description">
                <h4>Description</h4>
                <p>${character.description}</p>
            </div>
            ${character.ability !== 'Unknown' ? `
            <div class="modal-description">
                <h4>Special Abilities</h4>
                <div class="abilities-list">
                    <span class="ability-tag">${character.ability}</span>
                </div>
            </div>
            ` : ''}
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('characterModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal on overlay click
document.getElementById('modalOverlay').addEventListener('click', closeModal);
document.getElementById('modalClose').addEventListener('click', closeModal);

// Close modal on escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// ============================================
// SEARCH FUNCTIONS
// ============================================

let searchTimeout;
function handleSearch() {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const clearBtn = document.getElementById('clearSearch');
        
        if (searchTerm.length > 0) {
            clearBtn.classList.add('visible');
        } else {
            clearBtn.classList.remove('visible');
        }
        
        filterCharacters(searchTerm);
    }, 300);
}

function filterCharacters(searchTerm) {
    // If search is empty, render all and return
    if (!searchTerm) {
        renderAllCharacters();
        document.getElementById('resultCount').textContent = 'Showing all characters';
        return;
    }
    
    // Filter characters
    const filtered = getCharacters().filter(char => {
        return char.name.toLowerCase().includes(searchTerm) ||
               char.pirateName.toLowerCase().includes(searchTerm) ||
               char.crew.toLowerCase().includes(searchTerm) ||
               char.ability.toLowerCase().includes(searchTerm) ||
               char.devilFruit.toLowerCase().includes(searchTerm) ||
               char.role.toLowerCase().includes(searchTerm);
    });
    
    // Update result count
    document.getElementById('resultCount').textContent = `Found ${filtered.length} character${filtered.length !== 1 ? 's' : ''}`;
    
    // Hide all grids first
    const allGrids = document.querySelectorAll('.characters-grid');
    allGrids.forEach(grid => grid.innerHTML = '');
    
    // Show filtered results in emperors grid (as a combined view)
    const mainGrid = document.getElementById('emperorsGrid');
    if (mainGrid) {
        mainGrid.innerHTML = filtered.map(char => createCharacterCard(char, char.flipContent ? true : false)).join('');
    }
}

function clearSearch() {
    document.getElementById('searchInput').value = '';
    document.getElementById('clearSearch').classList.remove('visible');
    renderAllCharacters();
    document.getElementById('resultCount').textContent = 'Showing all characters';
}

// ============================================
// PRELOADER
// ============================================

window.addEventListener('load', function() {
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        preloader.classList.add('hidden');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 2000);
});

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================

window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ============================================
// MOBILE MENU TOGGLE
// ============================================

document.getElementById('menuToggle').addEventListener('click', function() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.remove('active');
    });
});

// ============================================
// SMOOTH SCROLL FOR NAV LINKS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Update active nav link on scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ============================================
// ANIMATE ON SCROLL
// ============================================

function animateOnScroll() {
    const cards = document.querySelectorAll('.character-card');
    cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            card.style.animationDelay = `${index * 0.05}s`;
            card.classList.add('fade-in');
        }
    });
}

window.addEventListener('scroll', animateOnScroll);

// ============================================
// ADDITIONAL FUNCTIONS & ANIMATIONS
// ============================================

// Add character to favorites
function addToFavorites(characterId) {
    let favorites = JSON.parse(localStorage.getItem('onePieceFavorites')) || [];
    if (!favorites.includes(characterId)) {
        favorites.push(characterId);
        localStorage.setItem('onePieceFavorites', JSON.stringify(favorites));
        showNotification('Added to favorites!', 'success');
    } else {
        showNotification('Already in favorites!', 'info');
    }
}

// Remove from favorites
function removeFromFavorites(characterId) {
    let favorites = JSON.parse(localStorage.getItem('onePieceFavorites')) || [];
    favorites = favorites.filter(id => id !== characterId);
    localStorage.setItem('onePieceFavorites', JSON.stringify(favorites));
}

// Check if in favorites
function isFavorite(characterId) {
    let favorites = JSON.parse(localStorage.getItem('onePieceFavorites')) || [];
    return favorites.includes(characterId);
}

// Show notification toast
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Sort characters
function sortCharacters(sortBy) {
    const sorted = [...characters].sort((a, b) => {
        if (sortBy === 'name') {
            return a.name.localeCompare(b.name);
        } else if (sortBy === 'bounty') {
            const aBounty = parseInt(a.bounty.replace(/,/g, '')) || 0;
            const bBounty = parseInt(b.bounty.replace(/,/g, '')) || 0;
            return bBounty - aBounty;
        } else if (sortBy === 'id') {
            return a.id - b.id;
        }
        return 0;
    });
    return sorted;
}

// Filter by category quick access
function filterByCategory(category) {
    const searchInput = document.getElementById('searchInput');
    searchInput.value = category;
    handleSearch();
}

// Toggle view mode (grid/list)
let viewMode = 'grid';
function toggleViewMode() {
    viewMode = viewMode === 'grid' ? 'list' : 'grid';
    document.querySelectorAll('.characters-grid').forEach(grid => {
        grid.classList.toggle('list-view', viewMode === 'list');
    });
    document.querySelectorAll('.character-card').forEach(card => {
        card.classList.toggle('list-card', viewMode === 'list');
    });
}

// Character comparison
let compareList = [];
function toggleCompare(characterId) {
    const index = compareList.indexOf(characterId);
    if (index > -1) {
        compareList.splice(index, 1);
    } else if (compareList.length < 3) {
        compareList.push(characterId);
    } else {
        showNotification('Maximum 3 characters can be compared!', 'error');
        return;
    }
    updateCompareButton(characterId);
}

function updateCompareButton(characterId) {
    const btn = document.querySelector(`[data-compare="${characterId}"]`);
    if (btn) {
        const isIn = compareList.includes(characterId);
        btn.classList.toggle('active', isIn);
        btn.innerHTML = `<i class="fas fa-${isIn ? 'check' : 'balance-scale'}"></i>`;
    }
}

function showCompareModal() {
    if (compareList.length < 2) {
        showNotification('Select at least 2 characters to compare!', 'error');
        return;
    }
    
    const compareChars = compareList.map(id => characters.find(c => c.id === id));
    const modal = document.getElementById('characterModal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        <div class="compare-container">
            <h2 class="compare-title"><i class="fas fa-balance-scale"></i> Character Comparison</h2>
            <div class="compare-grid">
                ${compareChars.map(char => `
                    <div class="compare-card">
                        <img src="${getCharacterImage(char) || ''}" alt="${char.name}" class="compare-img" onerror="this.style.display='none'">
                        <h3>${char.name}</h3>
                        <div class="compare-stats">
                            <div class="compare-stat">
                                <span class="stat-label">Bounty</span>
                                <span class="stat-value">${char.bounty}</span>
                            </div>
                            <div class="compare-stat">
                                <span class="stat-label">Devil Fruit</span>
                                <span class="stat-value">${char.devilFruit}</span>
                            </div>
                            <div class="compare-stat">
                                <span class="stat-label">Ability</span>
                                <span class="stat-value">${char.ability}</span>
                            </div>
                            <div class="compare-stat">
                                <span class="stat-label">Crew</span>
                                <span class="stat-value">${char.crew}</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
            <button class="btn btn-secondary" onclick="closeModal(); compareList=[];">
                <i class="fas fa-times"></i> Close
            </button>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Shuffle characters (fun feature)
function shuffleCharacters() {
    const shuffled = [...characters].sort(() => Math.random() - 0.5);
    const grid = document.getElementById('emperorsGrid');
    if (grid) {
        grid.innerHTML = shuffled.slice(0, 20).map(char => createCharacterCard(char, char.flipContent ? true : false)).join('');
        document.getElementById('resultCount').textContent = 'Random 20 characters (shuffled)';
    }
}

// Random character spotlight
function randomSpotlight() {
    const randomChar = characters[Math.floor(Math.random() * characters.length)];
    openModal(randomChar.id);
}

// Add CSS for new features
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* Notification Styles */
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 15px 25px;
            border-radius: 10px;
            background: var(--card-bg);
            color: white;
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 9999;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            box-shadow: var(--shadow-card);
        }
        .notification.show {
            transform: translateX(0);
        }
        .notification-success { border-left: 4px solid #10b981; }
        .notification-error { border-left: 4px solid #ef4444; }
        .notification-info { border-left: 4px solid #3b82f6; }
        
        /* List View */
        .characters-grid.list-view {
            display: flex;
            flex-direction: column;
        }
        .characters-grid.list-view .character-card {
            flex-direction: row;
            height: auto;
        }
        .list-view .character-image {
            width: 150px;
            height: 150px;
        }
        
        /* Compare Modal */
        .compare-container {
            padding: 30px;
        }
        .compare-title {
            text-align: center;
            color: var(--primary-gold);
            margin-bottom: 30px;
            font-family: 'Pirata One', cursive;
        }
        .compare-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        .compare-card {
            background: var(--dark-bg);
            padding: 20px;
            border-radius: 15px;
            text-align: center;
        }
        .compare-img {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            object-fit: cover;
            margin-bottom: 15px;
            border: 3px solid var(--primary-gold);
        }
        .compare-stats {
            text-align: left;
        }
        .compare-stat {
            padding: 10px 0;
            border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .stat-label {
            display: block;
            font-size: 12px;
            color: var(--text-muted);
            margin-bottom: 5px;
        }
        .stat-value {
            color: var(--primary-gold);
            font-weight: 600;
        }
        
        /* Floating Action Button */
        .fab-container {
            position: fixed;
            bottom: 30px;
            right: 30px;
            display: flex;
            flex-direction: column;
            gap: 15px;
            z-index: 100;
        }
        .fab {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: var(--gradient-gold);
            color: var(--dark-bg);
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            box-shadow: var(--shadow-card);
            transition: var(--transition);
        }
        .fab:hover {
            transform: scale(1.1);
            box-shadow: var(--shadow-glow);
        }
        
        /* Loading Animation */
        .card-loading {
            animation: pulse 1.5s infinite;
        }
        
        /* Hover Effects */
        .character-card:hover {
            transform: translateY(-10px) scale(1.02);
        }
        
        /* Character Card Shine Effect */
        .character-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
            transition: 0.5s;
        }
        .character-card:hover::before {
            left: 100%;
        }
    `;
    document.head.appendChild(style);
}

// Initialize FAB buttons
function initFAB() {
    const fabContainer = document.createElement('div');
    fabContainer.className = 'fab-container';
    fabContainer.innerHTML = `
        <button class="fab" onclick="randomSpotlight()" title="Random Character">
            <i class="fas fa-dice"></i>
        </button>
        <button class="fab" onclick="shuffleCharacters()" title="Shuffle">
            <i class="fas fa-random"></i>
        </button>
        <button class="fab" onclick="toggleViewMode()" title="Toggle View">
            <i class="fas fa-th"></i>
        </button>
        <button class="fab" onclick="showCompareModal()" title="Compare">
            <i class="fas fa-balance-scale"></i>
        </button>
    `;
    document.body.appendChild(fabContainer);
}

// Add keyboard shortcuts
function initKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
            compareList = [];
        }
        if (e.key === 'r' && e.ctrlKey) {
            e.preventDefault();
            shuffleCharacters();
        }
    });
}

// Enhanced card click animation
function addCardClickEffects() {
    document.querySelectorAll('.character-card').forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// Particle background effect
function initParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 5 + 2}px;
            height: ${Math.random() * 5 + 2}px;
            background: rgba(212, 175, 55, ${Math.random() * 0.5});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 5}s linear infinite;
        `;
        hero.appendChild(particle);
    }
}

// Add animation keyframes
function addAnimationKeyframes() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// INITIALIZE
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initLocalStorage();
    renderAllCharacters();
    addDynamicStyles();
    addAnimationKeyframes();
    initFAB();
    initKeyboardShortcuts();
    initParticles();
    document.getElementById('searchInput').addEventListener('input', handleSearch);
    document.getElementById('clearSearch').addEventListener('click', clearSearch);
    window.showCrewMembers = showCrewMembers;
    window.openModal = openModal;
    window.closeModal = closeModal;
    window.addToFavorites = addToFavorites;
    window.removeFromFavorites = removeFromFavorites;
    window.toggleCompare = toggleCompare;
    window.showCompareModal = showCompareModal;
    window.shuffleCharacters = shuffleCharacters;
    window.randomSpotlight = randomSpotlight;
});
