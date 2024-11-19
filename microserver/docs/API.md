#### Atributos
Os **atributos** de um jogador geralmente incluem características como:
- **Força (Strength)**
- **Destreza (Dexterity)**
- **Inteligência (Intelligence)**
- **Constituição (Constitution)**
- **Carisma (Charisma)**

Esses atributos podem influenciar as habilidades, o desempenho em combate, as interações com NPCs, entre outros fatores.

#### Habilidades
As **habilidades** de um jogador podem incluir ataques, magias, capacidades específicas de classes, entre outros. Elas podem ser associadas ao nível do jogador, ao uso de itens ou até a progressão na história do jogo.

---

## Novos Endpoints e Recursos

Agora vamos adicionar os endpoints para manipular as **habilidades** e **atributos** dos jogadores.

### Jogadores (Players) - Atributos e Habilidades

1. **GET /players/{id}/attributes**  
   Listar os atributos de um jogador específico.
   
2. **PUT /players/{id}/attributes**  
   Atualizar os atributos de um jogador específico.

3. **GET /players/{id}/skills**  
   Listar todas as habilidades de um jogador.

4. **POST /players/{id}/skills**  
   Adicionar uma nova habilidade a um jogador.

5. **PUT /players/{id}/skills/{skillId}**  
   Atualizar uma habilidade de um jogador.

6. **DELETE /players/{id}/skills/{skillId}**  
   Remover uma habilidade de um jogador.

---

### Exemplo de Implementação

Agora vamos adaptar o exemplo de implementação da API REST para incluir **atributos** e **habilidades**.

```javascript
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Dados fictícios
let players = [
  { 
    id: 1, 
    name: 'Jogador1', 
    level: 10, 
    attributes: { strength: 10, dexterity: 8, intelligence: 12, constitution: 9, charisma: 7 }, 
    skills: [{ id: 1, name: 'Golpe Forte', level: 5 }]
  }
];
let guilds = [{ id: 1, name: 'Guilda1', members: [1] }];
let items = [{ playerId: 1, id: 1, name: 'Espada' }];
let goals = [{ id: 1, name: 'Objetivo de Coleta', description: 'Coletar 100 pedras' }];

// Endpoints de Jogadores
app.get('/players', (req, res) => {
  res.json(players);
});

app.get('/players/:id', (req, res) => {
  const player = players.find(p => p.id === parseInt(req.params.id));
  if (player) {
    res.json(player);
  } else {
    res.status(404).send('Jogador não encontrado');
  }
});

app.post('/players', (req, res) => {
  const { name, level } = req.body;
  const newPlayer = { 
    id: players.length + 1, 
    name, 
    level, 
    attributes: { strength: 10, dexterity: 10, intelligence: 10, constitution: 10, charisma: 10 }, 
    skills: [] 
  };
  players.push(newPlayer);
  res.status(201).json(newPlayer);
});

app.put('/players/:id', (req, res) => {
  const player = players.find(p => p.id === parseInt(req.params.id));
  if (player) {
    player.name = req.body.name;
    player.level = req.body.level;
    res.json(player);
  } else {
    res.status(404).send('Jogador não encontrado');
  }
});

app.delete('/players/:id', (req, res) => {
  players = players.filter(p => p.id !== parseInt(req.params.id));
  res.status(204).send();
});

// Endpoints de Atributos
app.get('/players/:id/attributes', (req, res) => {
  const player = players.find(p => p.id === parseInt(req.params.id));
  if (player) {
    res.json(player.attributes);
  } else {
    res.status(404).send('Jogador não encontrado');
  }
});

app.put('/players/:id/attributes', (req, res) => {
  const { strength, dexterity, intelligence, constitution, charisma } = req.body;
  const player = players.find(p => p.id === parseInt(req.params.id));
  if (player) {
    player.attributes = { strength, dexterity, intelligence, constitution, charisma };
    res.json(player.attributes);
  } else {
    res.status(404).send('Jogador não encontrado');
  }
});

// Endpoints de Habilidades
app.get('/players/:id/skills', (req, res) => {
  const player = players.find(p => p.id === parseInt(req.params.id));
  if (player) {
    res.json(player.skills);
  } else {
    res.status(404).send('Jogador não encontrado');
  }
});

app.post('/players/:id/skills', (req, res) => {
  const { name, level } = req.body;
  const player = players.find(p => p.id === parseInt(req.params.id));
  if (player) {
    const newSkill = { id: player.skills.length + 1, name, level };
    player.skills.push(newSkill);
    res.status(201).json(newSkill);
  } else {
    res.status(404).send('Jogador não encontrado');
  }
});

app.put('/players/:id/skills/:skillId', (req, res) => {
  const { name, level } = req.body;
  const player = players.find(p => p.id === parseInt(req.params.id));
  if (player) {
    const skill = player.skills.find(s => s.id === parseInt(req.params.skillId));
    if (skill) {
      skill.name = name;
      skill.level = level;
      res.json(skill);
    } else {
      res.status(404).send('Habilidade não encontrada');
    }
  } else {
    res.status(404).send('Jogador não encontrado');
  }
});

app.delete('/players/:id/skills/:skillId', (req, res) => {
  const player = players.find(p => p.id === parseInt(req.params.id));
  if (player) {
    player.skills = player.skills.filter(s => s.id !== parseInt(req.params.skillId));
    res.status(204).send();
  } else {
    res.status(404).send('Jogador não encontrado');
  }
});

// Endpoints de Guildas
app.get('/guilds', (req, res) => {
  res.json(guilds);
});

app.get('/guilds/:id', (req, res) => {
  const guild = guilds.find(g => g.id === parseInt(req.params.id));
  if (guild) {
    res.json(guild);
  } else {
    res.status(404).send('Guilda não encontrada');
  }
});

app.post('/guilds', (req, res) => {
  const { name } = req.body;
  const newGuild = { id: guilds.length + 1, name, members: [] };
  guilds.push(newGuild);
  res.status(201).json(newGuild);
});

app.put('/guilds/:id', (req, res) => {
  const guild = guilds.find(g => g.id === parseInt(req.params.id));
  if (guild) {
    guild.name = req.body.name;
    res.json(guild);
  } else {
    res.status(404).send('Guilda não encontrada');
  }
});

app.delete('/guilds/:id', (req, res) => {
  guilds = guilds.filter(g => g.id !== parseInt(req.params.id));
  res.status(204).send();
});

// Endpoints de Itens
app.get('/players/:playerId/items', (req, res) => {
  const playerItems = items.filter(i => i.playerId === parseInt(req.params.playerId));
  res.json(playerItems);
});

app.get('/players/:playerId/items/:itemId', (req, res) => {
  const item = items.find(i => i.playerId === parseInt(req.params.playerId) && i.id === parseInt(req.params.itemId));
  if (item) {
    res.json(item);
  } else {
    res.status(404).send('Item não encontrado');
  }
});

app.post('/players/:playerId/items', (req, res) => {
  const { name } = req.body;
  const newItem = { playerId: parseInt(req.params.playerId), id: items.length + 1, name };
  items.push(newItem);
  res.status(201).json(newItem);
});

app.put('/players/:playerId/items/:itemId', (req, res) => {
  const item = items.find(i => i.playerId === parseInt(req.params.playerId) && i.id === parseInt(req.params.itemId));
  if (item) {
    item.name = req.body.name;
    res.json(item);
  } else {
    res.status(

404).send('Item não encontrado');
  }
});

app.delete('/players/:playerId/items/:itemId', (req, res) => {
  items = items.filter(i => !(i.playerId === parseInt(req.params.playerId) && i.id === parseInt(req.params.itemId)));
  res.status(204).send();
});

// Endpoints de Objetivos Coletivos
app.get('/goals', (req, res) => {
  res.json(goals);
});

app.get('/goals/:id', (req, res) => {
  const goal = goals.find(g => g.id === parseInt(req.params.id));
  if (goal) {
    res.json(goal);
  } else {
    res.status(404).send('Objetivo não encontrado');
  }
});

app.post('/goals', (req, res) => {
  const { name, description } = req.body;
  const newGoal = { id: goals.length + 1, name, description };
  goals.push(newGoal);
  res.status(201).json(newGoal);
});

app.put('/goals/:id', (req, res) => {
  const goal = goals.find(g => g.id === parseInt(req.params.id));
  if (goal) {
    goal.name = req.body.name;
    goal.description = req.body.description;
    res.json(goal);
  } else {
    res.status(404).send('Objetivo não encontrado');
  }
});

app.delete('/goals/:id', (req, res) => {
  goals = goals.filter(g => g.id !== parseInt(req.params.id));
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`API rodando na porta ${port}`);
});
```

---

### Explicações

1. **Atributos**: Agora, cada jogador possui um conjunto de atributos (`strength`, `dexterity`, `intelligence`, `constitution`, `charisma`), que podem ser atualizados com o método `PUT /players/{id}/attributes`.
   
2. **Habilidades**: As habilidades de um jogador são representadas como um array de objetos. Cada habilidade tem um nome e um nível, e elas podem ser manipuladas com métodos como `GET /players/{id}/skills`, `POST /players/{id}/skills`, `PUT /players/{id}/skills/{skillId}`, e `DELETE /players/{id}/skills/{skillId}`.

