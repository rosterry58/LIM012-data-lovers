import data from './data/lol/lol.js';

import {
  orderData,
  searchChampions,
  orderFilterTags,
} from './data.js';

const btnMostrar = document.getElementById('btnMostrar');
const btnTop5 = document.getElementById('btnTop5');
const btnRoles = document.getElementById('btnRoles');

const firstScreen = document.getElementById('firstScreen');
const secondScreen = document.getElementById('secondScreen');
const calculationScreen = document.getElementById('calculationScreen');
const thirdScreen = document.getElementById('thirdScreen');
const fourthScreen = document.getElementById('fourthScreen');

btnMostrar.addEventListener('click', () => {
  firstScreen.classList.add('hide');
  secondScreen.classList.remove('hide');
});

btnTop5.addEventListener('click', () => {
  secondScreen.classList.add('hide');
  calculationScreen.classList.remove('hide');
});

btnRoles.addEventListener('click', () => {
  secondScreen.classList.add('hide');
  thirdScreen.classList.remove('hide');
});

const championList = data.data;
const contentList = document.querySelector('#contentList');
const contentStats = document.querySelector('#contentStats');
const championArray = Object.values(championList);

const listOnScreen = (dataLol) => {
  let result = '';
  dataLol.forEach((champion) => {
    const showChampions = `
    <div class="card-champions">
    <div><img src=${champion.splash} class="galeria-img"></div>
    <p class="name-champions">${champion.name}</p>
    <p class="info-champions">Difficulty: ${champion.info.attack}</p>
    <p class="info-champions">Difficulty: ${champion.info.defense}</p>
    <p class="info-champions">Difficulty: ${champion.info.magic}</p>
    <p class="info-champions">Difficulty: ${champion.info.difficulty}</p>
    </div>
      `;
    result += showChampions;
  });
  contentList.innerHTML = result;
};
listOnScreen(championArray);

/* PROMEDIOS DE ESTADÍSTICAS DEFENSIVAS */
const stastForChampions = (arr) => {
  let sumaStatsDefense = 0;
  let promedioDefense = 0;
const newArray = arr.map((ele) => {
    sumaStatsDefense = ele.stats.hp + ele.stats.armor + ele.stats.armorperlevel + 
    ele.stats.spellblock + ele.stats.spellblockperlevel;
    promedioDefense = Math.round(sumaStatsDefense / 5);  
    return {
      name : ele.name,
      splash : ele.splash,
      promedio : promedioDefense,
    }
  });
  return newArray;
};

const orderStats = stastForChampions(championArray).sort((a, b) => {
  return (b.promedio - a.promedio);
}).slice(0, 5);

const cortar = orderStats.slice(0, 5);

const averageChampions = (dataStats) => {
  let mostrar = '';
dataStats.forEach((ele) => {
  const showStats = `
  <div>
  <div><img src=${ele.splash} class=""></div>
  <p>${ele.name}</p>
  <p>Promedio ${ele.promedio}</p>
  </div>
    `;
    mostrar += showStats;
});
contentStats.innerHTML = mostrar;
};
averageChampions(cortar);

/* ORDENAR CAMPEONES ASCENDENTE - DESCENDENTE */
const orderChampions = document.querySelector('#order');
orderChampions.addEventListener('change', () => {
  const orderSelect = orderChampions.value;
  listOnScreen(orderData(championArray, 'name', orderSelect));
});

/* BUSCAR POR LETRA CADA CAMPEON */
const enterText = document.querySelector('#inputBuscar');
enterText.addEventListener('keyup', () => {
  const text = enterText.value.toLowerCase();
  listOnScreen(searchChampions(championArray, 'name', text));
  if (contentList.innerHTML === '') {
    contentList.innerHTML += `
      <p>No se encontraron resultados</p>
      `;
  }
});
listOnScreen(championArray);