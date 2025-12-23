// ================================
// THE PYTHON SOULWEAVER - LEVELS
// All 10 Levels with Boss Encounters
// ================================

const LEVELS = [
    // ===== LEVEL 1 =====
    {
        number: 1,
        title: "Level 1: The Awakening",
        isBoss: false,
        atmosphere: "A desolate landscape smelling of ozone and burnt parchment. Binary code moss hangs from dead trees. The ground shifts between Integer-Solid Stone and Floating-Point Puddles.",
        challenge: {
            description: `The Python Soulweaver materializes from the void, its form flickering like corrupted data.

"Seeker... you have entered the Abyssal Compiler. To survive, you must first learn to forge a **Vessel**—a container for your essence."

**Your Task:** Create a variable called \`soul_name\` and assign it your name as a string. Then create another variable \`power_level\` and set it to any integer between 1-100.

Finally, use \`print()\` to display: "I am [your name], power level: [your level]"`,

            starterCode: `# The First Vessel - Variables\n# Create your identity in the void\n\n`,

            solution: `soul_name = "Seeker"\npower_level = 50\nprint(f"I am {soul_name}, power level: {power_level}")`,

            hints: [
                "Vessels (variables) are created using the = operator: vessel_name = value",
                "Strings must be wrapped in quotes: \"like this\"",
                "Use f-strings for formatting: f\"I am {soul_name}\""
            ],

            validate: function (code) {
                // Check if code contains required elements
                if (!code.includes('soul_name')) return { success: false, error: "You must create a variable called 'soul_name'" };
                if (!code.includes('power_level')) return { success: false, error: "You must create a variable called 'power_level'" };
                if (!code.includes('print')) return { success: false, error: "You must use print() to display your message" };
                return { success: true, message: "The Vessel is forged. Your essence lives within the code." };
            }
        }
    },

    // ===== LEVEL 2 =====
    {
        number: 2,
        title: "Level 2: The Lowlands of Declaration",
        isBoss: false,
        atmosphere: "Shadows of Uninitialized Variables flicker at the edge of vision. The air crackles with potential energy. You feel the weight of infinite possibilities.",
        challenge: {
            description: `The Soulweaver nods in approval.

"You have created your first Vessel. Now you must understand the **Types of Essence** that flow through this realm."

The four primal types materialize before you:
- **Integer** (whole numbers from the void)
- **Float** (fractured numbers with decimal souls)
- **String** (words bound by quotes)
- **Boolean** (the eternal duality of True and False)

**Your Task:** Create four variables demonstrating each type:
- \`dark_souls_collected\` = an integer
- \`essence_percentage\` = a float (use decimals)
- \`current_area\` = a string describing where you are
- \`is_alive\` = a boolean (True or False)

Print all four variables with labels.`,

            starterCode: `# The Four Primal Types\n# Master the essence of data\n\n`,

            solution: `dark_souls_collected = 42\nessence_percentage = 87.5\ncurrent_area = "The Lowlands"\nis_alive = True\n\nprint(f"Souls: {dark_souls_collected}")\nprint(f"Essence: {essence_percentage}%")\nprint(f"Area: {current_area}")\nprint(f"Alive: {is_alive}")`,

            hints: [
                "Integers are whole numbers: 42, 100, -7",
                "Floats have decimals: 3.14, 87.5, 0.001",
                "Booleans are either True or False (capitalized!)"
            ],

            validate: function (code) {
                if (!code.includes('dark_souls_collected')) return { success: false, error: "Create 'dark_souls_collected' as an integer" };
                if (!code.includes('essence_percentage')) return { success: false, error: "Create 'essence_percentage' as a float" };
                if (!code.includes('current_area')) return { success: false, error: "Create 'current_area' as a string" };
                if (!code.includes('is_alive')) return { success: false, error: "Create 'is_alive' as a boolean" };
                return { success: true, message: "The four primal essences flow through you. The path to the first trial opens..." };
            }
        }
    },

    // ===== LEVEL 3: BOSS - THE SYNTAX SENTINEL =====
    {
        number: 3,
        title: "Level 3: The Forked Ravine",
        isBoss: true,
        bossName: "The Syntax Sentinel",
        bossImage: "boss_syntax_sentinel.jpg", // Placeholder for AI-generated image
        atmosphere: "You stand at a junction between two jagged canyons. One glows with ethereal light, the other descends into obsidian darkness. The ground trembles with each of your thoughts.",
        bossDialogue: "TO PASS, YOU MUST CHOOSE. THERE IS NO MIDDLE GROUND. YIELD TO THE LOGIC, OR BE DELETED FROM THE SOURCE.",
        bossSoundtrack: "Rhythmic, booming war drums that mimic the start-stop nature of a Logical Gate. Heavy bass drops when conditions evaluate.",
        bossVisuals: "A headless colossus of rusted iron held together by glowing red indentation lines. Its chest features a vertical eye that pulses only on a 'True' condition. Each limb represents a comparison operator.",
        challenge: {
            description: `**BOSS BATTLE: THE SYNTAX SENTINEL**

The ground splits beneath you. The Sentinel's eye opens.

"Only through **Conditional Logic** will you survive. Make the wrong choice... and your soul is forfeit."

**Your Task:** 
Write code that checks a player's health. Create a variable \`player_health\` and set it to any number.

Then use if/elif/else statements to print:
- If health >= 75: "Soul intact. Press forward."
- If health >= 40: "Wounded, but alive. Consume an Ember."
- If health >= 1: "Near death. The abyss calls..."
- If health <= 0: "YOU DIED"

Test with different health values!`,

            starterCode: `# Boss Battle: The Syntax Sentinel\n# Master conditional logic or perish\n\nplayer_health = 50  # Change this value to test\n\n`,

            solution: `player_health = 60\n\nif player_health >= 75:\n    print("Soul intact. Press forward.")\nelif player_health >= 40:\n    print("Wounded, but alive. Consume an Ember.")\nelif player_health >= 1:\n    print("Near death. The abyss calls...")\nelse:\n    print("YOU DIED")`,

            hints: [
                "Use if, elif, and else for multiple conditions",
                "Comparison operators: >= (greater or equal), <= (less or equal)",
                "Indentation matters! Code inside if/elif/else must be indented"
            ],

            validate: function (code) {
                if (!code.includes('if')) return { success: false, error: "You must use an 'if' statement" };
                if (!code.includes('elif') && !code.includes('else if')) return { success: false, error: "You must use 'elif' for additional conditions" };
                if (!code.includes('else')) return { success: false, error: "You must use 'else' for the final condition" };
                if (!code.includes('>=') && !code.includes('>')) return { success: false, error: "You must use comparison operators (>=, >, <, <=)" };
                return { success: true, message: "⚔️ THE SYNTAX SENTINEL FALLS ⚔️\n\nThe colossus crumbles. Its eye dims. You have mastered the path of choice." };
            }
        }
    },

    // ===== LEVEL 4 =====
    {
        number: 4,
        title: "Level 4: The Labyrinth of Collections",
        isBoss: false,
        atmosphere: "An infinite underground vault of floating Dictionaries and Key/Value runes. Each wrong turn leads to a Null-Pointer abyss. Lists spiral into the darkness above.",
        challenge: {
            description: `The Soulweaver appears from the mist.

"You've survived the Sentinel. Now enter the **Labyrinth of Collections**."

"Here, single Vessels are not enough. You need **Lists**—ordered sequences of power."

**Your Task:**
Create a list called \`inventory\` containing at least 5 items (strings) like weapons, potions, or spells.

Then:
- Print the entire list
- Print the FIRST item (index 0)
- Print the LAST item (use negative indexing: -1)
- Add a new item using \`.append()\`
- Print the updated list`,

            starterCode: `# The Labyrinth of Collections - Lists\n# Master the art of ordered power\n\n`,

            solution: `inventory = ["Broken Sword", "Estus Flask", "Soul Arrow", "Dark Sign", "Ember"]\n\nprint("Full inventory:", inventory)\nprint("First item:", inventory[0])\nprint("Last item:", inventory[-1])\n\ninventory.append("Sunlight Medal")\nprint("Updated inventory:", inventory)`,

            hints: [
                "Create lists with square brackets: my_list = [item1, item2, item3]",
                "Access items by index: my_list[0] is the first item",
                "Negative indexing: my_list[-1] is the last item",
                "Add items with .append(): my_list.append('new_item')"
            ],

            validate: function (code) {
                if (!code.includes('inventory')) return { success: false, error: "Create a list called 'inventory'" };
                if (!code.includes('[')) return { success: false, error: "Lists use square brackets []" };
                if (!code.includes('[0]')) return { success: false, error: "Access the first item with [0]" };
                if (!code.includes('[-1]')) return { success: false, error: "Access the last item with [-1]" };
                if (!code.includes('.append')) return { success: false, error: "Add an item using .append()" };
                return { success: true, message: "You've navigated the Collection Labyrinth. Your inventory grows stronger." };
            }
        }
    },

    // ===== LEVEL 5 =====
    {
        number: 5,
        title: "Level 5: The Chamber of Key-Values",
        isBoss: false,
        atmosphere: "Ancient stone walls covered in glowing hieroglyphs. Each symbol is a Key that unlocks hidden Values. The air hums with the power of association.",
        challenge: {
            description: `"Lists are powerful, but limited," the Soulweaver intones.

"When you need to bind **meaning** to power, you need **Dictionaries**—key-value mappings."

**Your Task:**
Create a dictionary called \`player_stats\` with the following keys:
- \`"name"\`: your character name (string)
- \`"level"\`: your current level (integer)
- \`"health"\`: current HP (integer)
- \`"magic"\`: magic power (integer)

Then:
- Print the entire dictionary
- Print just your name using the key: \`player_stats["name"]\`
- Update your level by adding 1
- Add a new key \`"souls"\` with a value
- Print the updated dictionary`,

            starterCode: `# The Chamber of Key-Values - Dictionaries\n# Bind meaning to power\n\n`,

            solution: `player_stats = {\n    "name": "Ashen One",\n    "level": 10,\n    "health": 100,\n    "magic": 50\n}\n\nprint("Stats:", player_stats)\nprint("Name:", player_stats["name"])\n\nplayer_stats["level"] += 1\nplayer_stats["souls"] = 1500\n\nprint("Updated stats:", player_stats)`,

            hints: [
                "Dictionaries use curly braces: {key: value, key: value}",
                "Access values by key: my_dict['key']",
                "Update values: my_dict['key'] = new_value",
                "Add new pairs: my_dict['new_key'] = value"
            ],

            validate: function (code) {
                if (!code.includes('player_stats')) return { success: false, error: "Create a dictionary called 'player_stats'" };
                if (!code.includes('{') || !code.includes('}')) return { success: false, error: "Dictionaries use curly braces {}" };
                if (!code.includes('["name"]') && !code.includes("['name']")) return { success: false, error: "Access the 'name' value using player_stats['name']" };
                if (!code.includes('+=') && !code.includes('= player_stats')) return { success: false, error: "Update the level value" };
                return { success: true, message: "The Chamber recognizes your understanding. Key-Value binding achieved." };
            }
        }
    },

    // ===== LEVEL 6: BOSS - THE ITERATIVE HYDRA =====
    {
        number: 6,
        title: "Level 6: The Infinite Ouroboros",
        isBoss: true,
        bossName: "The Iterative Hydra",
        bossImage: "boss_iterative_hydra.jpg",
        atmosphere: "A vortex of swirling data streams. Reality loops upon itself. Time loses meaning. The serpent devours its own tail, repeating eternally.",
        bossDialogue: "AGAIN... AND AGAIN... AND AGAIN. YOUR STRUGGLE IS A CONSTANT; YOUR EXHAUSTION IS INEVITABLE. EMBRACE THE ETERNAL CYCLE.",
        bossSoundtrack: "Frantic, high-tempo violin layers that build into a chaotic wall of sound. Each loop adds another instrument, creating overwhelming complexity.",
        bossVisuals: "A serpent with heads made of fiber-optic cables. Each head represents a nested loop, constantly regenerating. The innermost head is the fastest and most venomous.",
        challenge: {
            description: `**BOSS BATTLE: THE ITERATIVE HYDRA**

The serpent's heads multiply before you. Each one chants in an endless loop.

"To defeat me, you must master the **Eternal Cycle**—the for loop."

**Your Task:**
1. Create a list of 5 enemy names (strings)
2. Use a **for loop** to iterate through the list and print: "Defeated: [enemy_name]"
3. Then use \`range()\` to print numbers 1 through 10
4. BONUS: Create a nested loop (loop inside a loop) that prints a 3x3 grid of stars (*):
\`\`\`
* * *
* * *
* * *
\`\`\``,

            starterCode: `# Boss Battle: The Iterative Hydra\n# Master the eternal cycle\n\n`,

            solution: `enemies = ["Hollow", "Skeleton", "Crystal Lizard", "Basilisk", "Mimic"]\n\nfor enemy in enemies:\n    print(f"Defeated: {enemy}")\n\nprint("\\nCounting souls...")\nfor i in range(1, 11):\n    print(i)\n\nprint("\\nGrid of the Abyss:")\nfor row in range(3):\n    for col in range(3):\n        print("*", end=" ")\n    print()`,

            hints: [
                "For loop syntax: for item in collection:",
                "range(1, 11) gives numbers 1-10 (11 is exclusive)",
                "Nested loops: place one for loop inside another",
                "Use print('text', end=' ') to print on the same line"
            ],

            validate: function (code) {
                if (!code.includes('for')) return { success: false, error: "You must use a 'for' loop" };
                if (!code.includes('in')) return { success: false, error: "For loop syntax: for item in collection" };
                if (!code.includes('range')) return { success: false, error: "Use range() to generate number sequences" };
                const forCount = (code.match(/for /g) || []).length;
                if (forCount < 2) return { success: false, error: "Use multiple for loops, including a nested loop" };
                return { success: true, message: "⚔️ THE ITERATIVE HYDRA COLLAPSES ⚔️\n\nThe serpent's heads cease their chanting. You have broken the eternal cycle." };
            }
        }
    },

    // ===== LEVEL 7 =====
    {
        number: 7,
        title: "Level 7: The Alchemist's Laboratory",
        isBoss: false,
        atmosphere: "Sulfur and old ink permeate the air. Sages practice Encapsulation in shadowed corners. Cauldrons of Try and Except bubble, catching spills of broken logic before they crash the world.",
        challenge: {
            description: `The Soulweaver gestures to glowing runes on the wall.

"You've mastered iteration. Now learn **Spellcasting**—the art of Functions."

"A Function is a reusable incantation. Define it once; invoke it infinitely."

**Your Task:**
Create a function called \`calculate_damage\` that:
- Takes two parameters: \`base_attack\` and \`multiplier\`
- Returns the result of base_attack * multiplier

Then:
- Call the function with different values (e.g., 50, 1.5)
- Print the returned damage value
- Create another function \`greet_hollow\` that takes a \`name\` parameter and prints a greeting`,

            starterCode: `# The Alchemist's Laboratory - Functions\n# Master the art of spellcasting\n\n`,

            solution: `def calculate_damage(base_attack, multiplier):\n    return base_attack * multiplier\n\ndef greet_hollow(name):\n    print(f"Greetings, {name}. The abyss awaits.")\n\n# Test the functions\ndamage = calculate_damage(50, 1.5)\nprint(f"Damage dealt: {damage}")\n\ngreet_hollow("Ashen One")`,

            hints: [
                "Define functions with: def function_name(parameters):",
                "Use 'return' to send back a value from a function",
                "Call functions by name: function_name(arguments)",
                "Parameters are placeholders; arguments are actual values"
            ],

            validate: function (code) {
                if (!code.includes('def calculate_damage')) return { success: false, error: "Define a function called 'calculate_damage'" };
                if (!code.includes('return')) return { success: false, error: "Your function must 'return' a value" };
                if (!code.includes('def greet_hollow')) return { success: false, error: "Create a second function 'greet_hollow'" };
                if (!code.includes('calculate_damage(')) return { success: false, error: "You must CALL the calculate_damage function" };
                return { success: true, message: "The spells are inscribed. You can now reuse your incantations across the realm." };
            }
        }
    },

    // ===== LEVEL 8 =====
    {
        number: 8,
        title: "Level 8: The Sanctuary of Error Handling",
        isBoss: false,
        atmosphere: "A sacred space where broken code is not punished but healed. Monks chant 'try...except...finally' in meditation. The walls absorb exceptions before they corrupt the soul.",
        challenge: {
            description: `"Even the strongest code can break," the Soulweaver warns.

"Master **Error Handling**—the shield against the void."

**Your Task:**
Write code that:
1. Uses a **try** block to attempt dividing a number by zero (this causes an error!)
2. Uses an **except** block to catch the \`ZeroDivisionError\` and print: "Cannot divide by the void!"
3. Uses a **finally** block to print: "Calculation attempted."

Then create a second try-except that:
- Tries to access a dictionary key that doesn't exist
- Catches the \`KeyError\` and handles it gracefully`,

            starterCode: `# The Sanctuary of Error Handling\n# Protect your code from the void\n\n`,

            solution: `# Handling division by zero\ntry:\n    result = 100 / 0\n    print(result)\nexcept ZeroDivisionError:\n    print("Cannot divide by the void!")\nfinally:\n    print("Calculation attempted.")\n\n# Handling missing dictionary keys\nstats = {"health": 100, "mana": 50}\ntry:\n    print(stats["strength"])  # This key doesn't exist\nexcept KeyError:\n    print("Stat not found. Returning default value.")\n    stats["strength"] = 10`,

            hints: [
                "try: block contains code that might fail",
                "except ErrorType: catches specific errors",
                "finally: always runs, whether error occurred or not",
                "Common errors: ZeroDivisionError, KeyError, ValueError"
            ],

            validate: function (code) {
                if (!code.includes('try:')) return { success: false, error: "Use a 'try:' block" };
                if (!code.includes('except')) return { success: false, error: "Use 'except' to catch errors" };
                if (!code.includes('finally')) return { success: false, error: "Use 'finally:' for code that always runs" };
                if (!code.includes('ZeroDivisionError') && !code.includes('KeyError')) return { success: false, error: "Catch specific error types like ZeroDivisionError or KeyError" };
                return { success: true, message: "Your code is now shielded. Errors bow before your try-except mastery." };
            }
        }
    },

    // ===== LEVEL 9: BOSS - THE OBJECT ARCHMAGE =====
    {
        number: 9,
        title: "Level 9: The Cathedral of Blueprints",
        isBoss: true,
        bossName: "The Object Archmage",
        bossImage: "boss_object_archmage.jpg",
        atmosphere: "A massive cathedral shaped by the architecture of Parent entities. Stained glass windows depict inheritance hierarchies. The very stones are instances of ancient classes.",
        bossDialogue: "YOU ARE BUT AN INSTANCE OF A FLAWED CLASS. I AM THE BLUEPRINT OF YOUR DESTRUCTION. BEHOLD THE POWER OF THE ANCESTORS!",
        bossSoundtrack: "A haunting pipe organ theme that evolves with complex layers (representing subclasses) as the battle progresses. Each inheritance adds another melodic line.",
        bossVisuals: "A spectral figure in robes of architectural parchment. Constantly summons instances of himself with inherited abilities and stats. Glows with the light of __init__ magic.",
        challenge: {
            description: `**BOSS BATTLE: THE OBJECT ARCHMAGE**

The Archmage materializes, surrounded by ghostly copies of himself.

"To defeat me, you must master **Object-Oriented Programming**—the art of creating Blueprints."

**Your Task:**
Create a class called \`Warrior\` with:
- An \`__init__\` method that takes \`name\` and \`health\` parameters
- A method called \`attack\` that prints: "[name] swings their blade!"
- A method called \`take_damage\` that reduces health by a given amount

Then:
- Create an instance (object) of the Warrior class
- Call both methods
- BONUS: Create a second class \`Mage\` that inherits from \`Warrior\` and adds a \`cast_spell\` method`,

            starterCode: `# Boss Battle: The Object Archmage\n# Master the art of blueprints\n\n`,

            solution: `class Warrior:\n    def __init__(self, name, health):\n        self.name = name\n        self.health = health\n    \n    def attack(self):\n        print(f"{self.name} swings their blade!")\n    \n    def take_damage(self, amount):\n        self.health -= amount\n        print(f"{self.name} takes {amount} damage! Health: {self.health}")\n\nclass Mage(Warrior):\n    def cast_spell(self, spell_name):\n        print(f"{self.name} casts {spell_name}!")\n\n# Create instances\nhero = Warrior("Knight Artorias", 150)\nhero.attack()\nhero.take_damage(30)\n\nwizard = Mage("Logan", 80)\nwizard.attack()\nwizard.cast_spell("Soul Spear")`,

            hints: [
                "Define classes with: class ClassName:",
                "__init__ is the constructor (runs when object is created)",
                "Use 'self' to refer to the instance itself",
                "Create objects: my_obj = ClassName(arguments)",
                "Inheritance: class Child(Parent):"
            ],

            validate: function (code) {
                if (!code.includes('class Warrior')) return { success: false, error: "Create a class called 'Warrior'" };
                if (!code.includes('def __init__')) return { success: false, error: "Define an __init__ method" };
                if (!code.includes('self')) return { success: false, error: "Use 'self' to refer to instance attributes" };
                if (!code.includes('def attack') || !code.includes('def take_damage')) return { success: false, error: "Create attack and take_damage methods" };
                if (!code.includes('= Warrior(')) return { success: false, error: "Create an instance of the Warrior class" };
                return { success: true, message: "⚔️ THE OBJECT ARCHMAGE DISSOLVES ⚔️\n\nHis instances fade. You've mastered the Blueprint. One trial remains..." };
            }
        }
    },

    // ===== LEVEL 10: FINAL BOSS - THE VOID COMPILER =====
    {
        number: 10,
        title: "Level 10: The Singularity",
        isBoss: true,
        bossName: "The Void Compiler",
        bossImage: "boss_void_compiler.jpg",
        atmosphere: "The edge of existence. Ground made of raw bytecode. Sky raining green instructions. Reality glitches and stutters. You stand at the source of all code.",
        bossDialogue: "I AM THE CODE THAT WRITES THE CODE. WHY FIGHT THE LOGIC WHEN I CAN SIMPLY... REWRITE YOU? WITNESS TRUE METAPROGRAMMING.",
        bossSoundtrack: "White noise, distorted digital screams, and a failing sub-bass heartbeat. Glitching sound effects that break the fourth wall of audio.",
        bossVisuals: "A constantly shifting silhouette flickering between human form and pure hexadecimal code. Manipulates the game's rules in real-time, changing player variables as you watch.",
        challenge: {
            description: `**⚡ FINAL BOSS: THE VOID COMPILER ⚡**

The fabric of reality tears open. The Void Compiler emerges.

"You've come far, Seeker. But can you comprehend **Metaprogramming**—code that manipulates code?"

**YOUR FINAL TRIAL:**

Create a **decorator** function called \`@soul_shield\` that:
1. Wraps another function
2. Prints "🛡️ Activating Soul Shield..." BEFORE the function runs
3. Executes the wrapped function
4. Prints "✨ Soul Shield fading..." AFTER the function runs

Then apply this decorator to a function called \`enter_abyss\` that prints: "Entering the Abyss..."

**BONUS CHALLENGE:** Create a **generator** function using \`yield\` that produces an infinite sequence of soul values.`,

            starterCode: `# FINAL BOSS: The Void Compiler\n# Master metaprogramming or cease to exist\n\n`,

            solution: `# Decorator implementation\ndef soul_shield(func):\n    def wrapper(*args, **kwargs):\n        print("🛡️ Activating Soul Shield...")\n        result = func(*args, **kwargs)\n        print("✨ Soul Shield fading...")\n        return result\n    return wrapper\n\n@soul_shield\ndef enter_abyss():\n    print("Entering the Abyss...")\n\n# Test the decorator\nenter_abyss()\n\nprint("\\n--- Bonus: Soul Generator ---")\n\n# Generator implementation\ndef soul_generator():\n    soul_value = 100\n    while True:\n        yield soul_value\n        soul_value += 50\n\n# Test the generator\ngen = soul_generator()\nfor _ in range(5):\n    print(f"Soul collected: {next(gen)}")`,

            hints: [
                "Decorators are functions that modify other functions",
                "Basic decorator pattern: def decorator(func): def wrapper(): ... return wrapper",
                "Apply decorators with @decorator_name above function definition",
                "Generators use 'yield' instead of 'return' and can be infinite",
                "Access generator values with next(generator_object)"
            ],

            validate: function (code) {
                if (!code.includes('def soul_shield')) return { success: false, error: "Create a decorator function called 'soul_shield'" };
                if (!code.includes('def wrapper') && !code.includes('def inner')) return { success: false, error: "Decorators need an inner wrapper function" };
                if (!code.includes('@soul_shield') && !code.includes('soul_shield(')) return { success: false, error: "Apply the decorator to enter_abyss using @soul_shield" };
                if (!code.includes('def enter_abyss')) return { success: false, error: "Create a function called 'enter_abyss'" };
                if (!code.includes('return wrapper') && !code.includes('return inner')) return { success: false, error: "The decorator must return the wrapper function" };

                return {
                    success: true,
                    message: "⚡ THE VOID COMPILER SHATTERS ⚡\n\n" +
                        "Reality stabilizes. The Abyssal Compiler bows to your will.\n\n" +
                        "You are now a TRUE PYTHON SOULWEAVER.\n\n" +
                        "The darkness is yours to command."
                };
            }
        }
    }
];

// Export for use in game.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LEVELS;
}
