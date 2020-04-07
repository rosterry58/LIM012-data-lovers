import data from './data/lol/lol.js';

import {
  orderData,
  searchChampions,
  orderFilterTags,
  dataOrdenado,
} from './data.js';

const firstScreen = document.getElementById('firstScreen');
const secondScreen = document.getElementById('secondScreen');
const calculationScreen = document.getElementById('calculationScreen');
const thirdScreen = document.getElementById('thirdScreen');
const fourthScreen = document.getElementById('fourthScreen');

// BOTON PARA MOSTRAR CAMPEONES
const btnMostrar = document.getElementById('btnMostrar');
btnMostrar.addEventListener('click', () => {
  firstScreen.classList.add('hide');
  secondScreen.classList.remove('hide');
});

// VER LOS CAMPEONES
const championList = data.data;
const contentList = document.querySelector('#contentList');
const contentTop = document.querySelector('#contentTop');
const championArray = Object.values(championList);
const listOnScreen = (dataLol) => {
  let result = '';
  dataLol.forEach((champion) => {
    const showChampions = `
    <div class="card-champions">
    <img src=${champion.splash} class="galeria-img">
    <p class="name-champions">${champion.name}</p>
    <p class="info-champions">Attack: ${champion.info.attack}</p>
    <p class="info-champions">Defense: ${champion.info.defense}</p>
    <p class="info-champions">Magic: ${champion.info.magic}</p>
    <p class="info-champions">Difficulty: ${champion.info.difficulty}</p>
    </div>
      `;
    result += showChampions;
  });
  contentList.innerHTML = result;
};
listOnScreen(championArray);

// ORDENAR CAMPEONES ASCENDENTE - DESCENDENTE
const orderChampions = document.querySelector('#order');
orderChampions.addEventListener('change', () => {
  const orderSelect = orderChampions.value;
  listOnScreen(orderData(championArray, 'name', orderSelect));
});

// BUSCAR POR LETRA CADA CAMPEON
const enterText = document.querySelector('#inputBuscar');
enterText.addEventListener('keyup', () => {
  const text = enterText.value.toLowerCase();
  listOnScreen(searchChampions(championArray, 'name', text));
  if (contentList.innerHTML === '') {
    contentList.innerHTML += `
      <p>No results were found.</p>
      `;
  }
});

// PROMEDIOS DE ESTADÍSTICAS DEFENSIVAS
const obStats = (arr) => {
  const newArray = arr.map(ele => ({
    splash: ele.splash,
    name: ele.name,
    sumaHp: ele.stats.hp + ele.stats.armor + ele.stats.armorperlevel
      + ele.stats.spellblock + ele.stats.spellblockperlevel,
    promedio: ((ele.stats.hp + ele.stats.armor + ele.stats.armorperlevel
        + ele.stats.spellblock + ele.stats.spellblockperlevel) / 5).toFixed(2),
  }));
  return newArray;
};
obStats(championArray);

const fTop = (dataLol) => {
  let result = '';
  dataLol.forEach((champion) => {
    const showChampions = `
    <div class="card-top" id="top">
    <img src=${champion.splash} class="galeria-top">
    <p class="name-top">${champion.name}</p>
    <p class="promedio-top">Average: ${champion.promedio}</p>
    </div>    
      `;
    result += showChampions;
  });
  contentTop.innerHTML = result;
};
// necesita agregarle un identificador para llamarlo en CSS y llamar solo a ese elemento
// línea 80

// BOTON TOP 5
const btnTop5 = document.getElementById('btnTop5');
btnTop5.addEventListener('click', () => {
  secondScreen.classList.add('hide');
  calculationScreen.classList.remove('hide');
  fTop(dataOrdenado(obStats(championArray)));
});

// BOTON PARA MOSTRAR POR ROLES
const btnRoles = document.getElementById('btnRoles');
btnRoles.addEventListener('click', () => {
  secondScreen.classList.add('hide');
  thirdScreen.classList.remove('hide');
});

// CONTENEDOR DE ROLES
const contentListRol = document.querySelector('#contentListRol');
const listOnScreenRol = (dataLol) => {
  let result = '';
  dataLol.forEach((champion) => {
    const showChampions = `
    <div class="card-champions">
      <img src=${champion.splash} class="galeria-img">
      <p class="name-champions">${champion.name}</p>
      <p class="info-champions">Tags:</span> ${champion.tags}</p>
     </div> 
      `;
    result += showChampions;
  });
  contentListRol.innerHTML = result;
};
listOnScreenRol(championArray);

// ORDENAR CAMPEONES ASCENDENTE - DESCENDENTE - ROLES
const orderRoles = document.querySelector('#orderRoles');
orderRoles.addEventListener('change', () => {
  const orderSelect = orderRoles.value;
  listOnScreenRol(orderData(championArray, 'name', orderSelect));
});

// BUSCAR POR LETRA CADA CAMPEON - ROLES
const inputBuscarRoles = document.querySelector('#inputBuscarRoles');
inputBuscarRoles.addEventListener('keyup', () => {
  const text = inputBuscarRoles.value.toLowerCase();
  listOnScreenRol(searchChampions(championArray, 'name', text));
  if (contentListRol.innerHTML === '') {
    contentListRol.innerHTML += `
      <p>No results were found.</p>
      `;
  }
});

// ORDENAR POR ROL ASESINO
const video = document.getElementById('video');
const mostrarAsesinos = document.getElementById('rolAssassin');
mostrarAsesinos.addEventListener('click', () => {
  video.classList.add('hide');
  fourthScreen.classList.remove('hide');
  // if (contentListRol.innerHTML === 'Assassin') {
  //   contentListRol.innerHTML += `
  //     <h3>Assassin</h3>
  //     `;
  // }
});
const ordenarAsesinos = document.querySelector('#rolAssassin');
ordenarAsesinos.addEventListener('click', () => {
  const ordenar = ordenarAsesinos.value;
  if (contentListRol.innerHTML === ordenar) {
    // document.getElementById('title-fourthScreen').innerHTML = '';
    contentListRol.innerHTML += `
      <h3>Assassin</h3>
      `;
  }
  listOnScreenRol(orderFilterTags(championArray, 'tags', ordenar));
});
// traerme el h2 por el id e insertarle el texto
// const title = document.getElementById('title-fourthScreen');

// ORDENAR POR ROL LUCHADOR
const mostrarTiradores = document.getElementById('rolFighter');
mostrarTiradores.addEventListener('click', () => {
  thirdScreen.classList.remove('hide');
  fourthScreen.classList.remove('hide');
  // if (contentListRol.innerHTML === 'Assassin') {
  //   document.getElementById('title-fourthScreen').innerHTML = '';
  // }
});
const ordenarLuchador = document.querySelector('#rolFighter');
ordenarLuchador.addEventListener('click', () => {
  const ordenar = ordenarLuchador.value;
  listOnScreenRol(orderFilterTags(championArray, 'tags', ordenar));
});

// ORDENAR POR ROL MAGOS
const mostrarMagos = document.getElementById('rolMage');
mostrarMagos.addEventListener('click', () => {
  fourthScreen.classList.remove('hide');
});
const ordenarMago = document.querySelector('#rolMage');
ordenarMago.addEventListener('click', () => {
  const ordenar = ordenarMago.value;
  listOnScreenRol(orderFilterTags(championArray, 'tags', ordenar));
});

// ORDENAR POR ROL TIRADORES
const mostrarTirador = document.getElementById('rolMarksman');
mostrarTirador.addEventListener('click', () => {
  fourthScreen.classList.remove('hide');
});
const ordenarTirador = document.querySelector('#rolMarksman');
ordenarTirador.addEventListener('click', () => {
  const ordenar = ordenarTirador.value;
  listOnScreenRol(orderFilterTags(championArray, 'tags', ordenar));
});

// ORDENAR POR ROL SOPORTE
const mostrarSoporte = document.getElementById('rolSupport');
mostrarSoporte.addEventListener('click', () => {
  fourthScreen.classList.remove('hide');
});
const ordenarSoporte = document.querySelector('#rolSupport');
ordenarSoporte.addEventListener('click', () => {
  const ordenar = ordenarSoporte.value;
  listOnScreenRol(orderFilterTags(championArray, 'tags', ordenar));
});

// ORDENAR POR ROL TANQUE
const mostrarTank = document.getElementById('rolTank');
mostrarTank.addEventListener('click', () => {
  fourthScreen.classList.remove('hide');
});
const ordenarTank = document.querySelector('#rolTank');
ordenarTank.addEventListener('click', () => {
  const ordenar = ordenarTank.value;
  listOnScreenRol(orderFilterTags(championArray, 'tags', ordenar));
});
