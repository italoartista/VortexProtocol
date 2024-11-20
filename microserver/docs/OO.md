# MODELAGEM OO 

Vamos agora modelar as classes de forma simples, tanto em **TypeScript (TS)** quanto em **JavaScript Vanilla**. A modelagem vai refletir os principais recursos do seu jogo, como **Jogador (Player)**, **Atributos (Attributes)**, **Habilidades (Skill)**, e os métodos principais associados.

### **1. Versão TypeScript (TS)**

TypeScript oferece tipos e maior estruturação, o que facilita a validação de tipos e a organização do código.

#### **Player.ts**

```typescript
class Attributes {
  strength: number;
  dexterity: number;
  intelligence: number;
  constitution: number;
  charisma: number;

  constructor(strength = 10, dexterity = 10, intelligence = 10, constitution = 10, charisma = 10) {
    this.strength = strength;
    this.dexterity = dexterity;
    this.intelligence = intelligence;
    this.constitution = constitution;
    this.charisma = charisma;
  }

  updateAttributes(strength: number, dexterity: number, intelligence: number, constitution: number, charisma: number): void {
    this.strength = strength;
    this.dexterity = dexterity;
    this.intelligence = intelligence;
    this.constitution = constitution;
    this.charisma = charisma;
  }
}

class Skill {
  id: number;
  name: string;
  description: string;
  level: number;

  constructor(id: number, name: string, description: string, level = 1) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.level = level;
  }

  levelUp(): void {
    this.level++;
  }
}

class Player {
  id: number;
  name: string;
  level: number;
  attributes: Attributes;
  skills: Skill[];
  items: string[]; // Lista de itens
  guild: string | null;

  constructor(id: number, name: string, level: number) {
    this.id = id;
    this.name = name;
    this.level = level;
    this.attributes = new Attributes();
    this.skills = [];
    this.items = [];
    this.guild = null;
  }

  addSkill(skill: Skill): void {
    this.skills.push(skill);
  }

  removeSkill(skillId: number): void {
    this.skills = this.skills.filter(skill => skill.id !== skillId);
  }

  addItem(item: string): void {
    this.items.push(item);
  }

  removeItem(item: string): void {
    this.items = this.items.filter(i => i !== item);
  }

  joinGuild(guildName: string): void {
    this.guild = guildName;
  }

  leaveGuild(): void {
    this.guild = null;
  }
}
```

#### **Main.ts**

Aqui, podemos criar um exemplo de uso de nossas classes.

```typescript
// Criar um jogador
const player1 = new Player(1, 'Neo', 10);

// Criar uma habilidade e adicionar ao jogador
const hackingSkill = new Skill(1, 'Hacking', 'Hack into corporate systems', 3);
player1.addSkill(hackingSkill);

// Criar atributos personalizados
player1.attributes.updateAttributes(15, 12, 18, 14, 13);

// Adicionar itens ao jogador
player1.addItem('Cybernetic Arm');
player1.addItem('Neural Processor');

// Criar guilda e adicionar o jogador
player1.joinGuild('The Resistance');

console.log(player1);
```

---

### **2. Versão JavaScript Vanilla (Sem TypeScript)**

JavaScript vanilla é uma versão sem tipagem explícita, o que torna o código mais flexível, mas menos seguro.

#### **Player.js**

```javascript
class Attributes {
  constructor(strength = 10, dexterity = 10, intelligence = 10, constitution = 10, charisma = 10) {
    this.strength = strength;
    this.dexterity = dexterity;
    this.intelligence = intelligence;
    this.constitution = constitution;
    this.charisma = charisma;
  }

  updateAttributes(strength, dexterity, intelligence, constitution, charisma) {
    this.strength = strength;
    this.dexterity = dexterity;
    this.intelligence = intelligence;
    this.constitution = constitution;
    this.charisma = charisma;
  }
}

class Skill {
  constructor(id, name, description, level = 1) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.level = level;
  }

  levelUp() {
    this.level++;
  }
}

class Player {
  constructor(id, name, level) {
    this.id = id;
    this.name = name;
    this.level = level;
    this.attributes = new Attributes();
    this.skills = [];
    this.items = [];
    this.guild = null;
  }

  addSkill(skill) {
    this.skills.push(skill);
  }

  removeSkill(skillId) {
    this.skills = this.skills.filter(skill => skill.id !== skillId);
  }

  addItem(item) {
    this.items.push(item);
  }

  removeItem(item) {
    this.items = this.items.filter(i => i !== item);
  }

  joinGuild(guildName) {
    this.guild = guildName;
  }

  leaveGuild() {
    this.guild = null;
  }
}
```

#### **Main.js**

Aqui, a utilização das classes será semelhante à versão TypeScript, mas sem a validação de tipos.

```javascript
// Criar um jogador
const player1 = new Player(1, 'Neo', 10);

// Criar uma habilidade e adicionar ao jogador
const hackingSkill = new Skill(1, 'Hacking', 'Hack into corporate systems', 3);
player1.addSkill(hackingSkill);

// Criar atributos personalizados
player1.attributes.updateAttributes(15, 12, 18, 14, 13);

// Adicionar itens ao jogador
player1.addItem('Cybernetic Arm');
player1.addItem('Neural Processor');

// Criar guilda e adicionar o jogador
player1.joinGuild('The Resistance');

console.log(player1);
```

---

### **Explicações das Classes**

1. **`Attributes`**:
   - Esta classe representa os **atributos** do jogador, como força, destreza, inteligência, constituição e carisma. Esses atributos podem ser atualizados usando o método `updateAttributes`.

2. **`Skill`**:
   - A classe **Skill** contém informações sobre uma habilidade específica, como o nome, a descrição e o nível. A habilidade pode ser melhorada usando o método `levelUp`.

3. **`Player`**:
   - A classe **Player** representa um jogador do MMORPG. Ela contém os atributos do jogador, suas habilidades, itens, e a guilda à qual ele pertence. Além disso, ela tem métodos para adicionar/remover habilidades e itens, e para interagir com guildas.

---

### **Diferenças entre TypeScript e JavaScript**

- **TypeScript**:
  - Utiliza tipagem estática, ou seja, as variáveis têm tipos explícitos (como `string`, `number`, etc.). Isso ajuda a detectar erros mais cedo, já que o TypeScript verifica os tipos em tempo de compilação.
  - As classes e métodos são fortemente tipados, o que facilita a leitura e a manutenção do código.

- **JavaScript**:
  - Não utiliza tipagem estática. As variáveis podem ser de qualquer tipo, o que torna o JavaScript mais flexível, mas também mais propenso a erros em tempo de execução.
  - A modelagem é a mesma, mas sem a verificação de tipos.

---
