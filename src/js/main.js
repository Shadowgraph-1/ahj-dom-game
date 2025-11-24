import '../styles/main.css';
import goblinImg from '../assets/goblin.png';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('game-container');
  
  const grid = document.createElement('div');
  grid.className = 'grid';
  for (let i = 0; i < 16; i++) { 
    const cell = document.createElement('div');
    cell.className = 'cell';
    grid.appendChild(cell);
  }
  container.appendChild(grid);
  
  // Создаём img
  const goblin = document.createElement('img');
  goblin.src = goblinImg; 
  goblin.className = 'goblin';
  goblin.alt = 'Goblin';
  
  function getRandomPosition(current) {
    let newPos;
    do {
      newPos = Math.floor(Math.random() * 16);
    } while (newPos === current);
    return newPos;
  }
  

  let currentPos = getRandomPosition(-1);
  grid.children[currentPos].appendChild(goblin);
  
  setInterval(() => {
    const newPos = getRandomPosition(currentPos);
    grid.children[newPos].appendChild(goblin);
    currentPos = newPos;
  }, 2000);
});

const movies = [
  {
    "id": 26,
    "title": "Побег из Шоушенка",
    "imdb": 9.30,
    "year": 1994
  },
  {
    "id": 25,
    "title": "Крёстный отец",
    "imdb": 9.20,
    "year": 1972
  },
  {
    "id": 27,
    "title": "Крёстный отец 2",
    "imdb": 9.00,
    "year": 1974
  },
  {
    "id": 1047,
    "title": "Тёмный рыцарь",
    "imdb": 9.00,
    "year": 2008
  },
  {
    "id": 223,
    "title": "Криминальное чтиво",
    "imdb": 8.90,
    "year": 1994
  }
];

function createTable() {
  const container = document.getElementById('table-container');
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  ['ID', 'Title', 'Year', 'IMDB'].forEach(col => {
    const th = document.createElement('th');
    th.textContent = col;
    th.dataset.col = col.toLowerCase(); 
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  movies.forEach(movie => {
    const tr = document.createElement('tr');
    Object.entries(movie).forEach(([key, val]) => {
      const td = document.createElement('td');
      if (key === 'id') td.textContent = `#${val}`;
      else if (key === 'title') td.textContent = val;
      else if (key === 'year') td.textContent = `(${val})`;
      else td.textContent = `imdb: ${val.toFixed(2)}`;
      tr.setAttribute(`data-${key}`, val);  
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  container.appendChild(table);
}

createTable(); 

let sortIndex = 0;
const sorts = [
  { col: 'id', asc: true }, { col: 'id', asc: false },
  { col: 'title', asc: true }, { col: 'title', asc: false },
  { col: 'imdb', asc: true }, { col: 'imdb', asc: false },
  { col: 'year', asc: true }, { col: 'year', asc: false },
];
setInterval(() => {
  const { col, asc } = sorts[sortIndex % sorts.length];
  sortIndex++;
  const rows = Array.from(document.querySelectorAll('#table-container tbody tr')); 
  rows.sort((a, b) => {
    let valA = a.dataset[col];
    let valB = b.dataset[col];
    if (['id', 'imdb', 'year'].includes(col)) {
      valA = parseFloat(valA); valB = parseFloat(valB);
    }
    return asc ? (valA > valB ? 1 : -1) : (valA < valB ? 1 : -1); 
  });
  const tbody = document.querySelector('#table-container tbody');
  rows.forEach(row => tbody.appendChild(row)); 

  document.querySelectorAll('th').forEach(th => th.innerHTML = th.dataset.col.toUpperCase().replace(/Id/, 'ID')); 
  const activeTh = document.querySelector(`th[data-col="${col}"]`);
  activeTh.innerHTML += asc ? ' ↑' : ' ↓';
}, 2000);