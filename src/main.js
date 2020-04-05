import data from './data/lol/lol.js';

import {
  orderData,
  searchChampions,
  // orderFilterTags,
} from './data.js';

const btnMostrar = document.getElementById('btnMostrar');
const firstScreen = document.getElementById('firstScreen');
const secondScreen = document.getElementById('secondScreen');
// const thirdScreen = document.getElementById('thirdScreen');
// const fourthScreen = document.getElementById('fourthScreen');

btnMostrar.addEventListener('click', () => {
  firstScreen.classList.add('hide');
  secondScreen.classList.remove('hide');
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
    <p class="info-champions">Difficulty ${champion.info.difficulty}</p>
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




// const contentListAsse = document.querySelector('#contentListAsse');
// const listOnScreenAs = (dataLol) => {
//   let result = '';
//   dataLol.forEach((champion) => {
//     const showChampions = `
//     <section>
//       <img src=${champion.splash} class="imgSplash">
//       <p class="name">${champion.name}</p><br><br>
//        <p class="tags">Tags:</span> ${champion.tags}</p><br>
//      </section> 
//       `;
//     result += showChampions;
//   });
//   contentListAsse.innerHTML = result;
// };
// listOnScreenAs(championArray);

// const btnRoles = document.getElementById('btnRoles');
// btnRoles.addEventListener('click', () => {
//   document.getElementById('secondScreen').style.display = 'none';
//   document.getElementById('fourthScreen').style.display = 'none';
//   document.getElementById('thirdScreen').style.display = 'block';
// });
// const mostrarAsesinos = document.getElementById('rolAssassin');
// mostrarAsesinos.addEventListener('click', () => {
//   document.getElementById('thirdScreen').style.display = 'none';
//   document.getElementById('fourthScreen').style.display = 'block';
// });
// const mostrarTiradores = document.getElementById('rolFighter');
// mostrarTiradores.addEventListener('click', () => {
//   document.getElementById('thirdScreen').style.display = 'none';
//   document.getElementById('fourthScreen').style.display = 'block';
// });
// const mostrarMagos = document.getElementById('rolMage');
// mostrarMagos.addEventListener('click', () => {
//   document.getElementById('thirdScreen').style.display = 'none';
//   document.getElementById('fourthScreen').style.display = 'block';
// });
// const mostrarTirador = document.getElementById('rolMarksman');
// mostrarTirador.addEventListener('click', () => {
//   document.getElementById('thirdScreen').style.display = 'none';
//   document.getElementById('fourthScreen').style.display = 'block';
// });
// const mostrarSoporte = document.getElementById('rolSupport');
// mostrarSoporte.addEventListener('click', () => {
//   document.getElementById('thirdScreen').style.display = 'none';
//   document.getElementById('fourthScreen').style.display = 'block';
// });
// const mostrarTank = document.getElementById('rolTank');
// mostrarTank.addEventListener('click', () => {
//   document.getElementById('thirdScreen').style.display = 'none';
//   document.getElementById('fourthScreen').style.display = 'block';
// });
// /* ORDENAR POR ROL ASESINO */
// const ordenarAsesinos = document.querySelector('#rolAssassin');
// ordenarAsesinos.addEventListener('click', () => {
//   const ordenar = ordenarAsesinos.value;
//   listOnScreenAs(orderFilterTags(championArray, 'tags', ordenar));
// });
// /* ORDENAR POR ROL LUCHADOR */
// const ordenarLuchador = document.querySelector('#rolFighter');
// ordenarLuchador.addEventListener('click', () => {
//   const ordenar = ordenarLuchador.value;
//   listOnScreenAs(orderFilterTags(championArray, 'tags', ordenar));
// });
// /* ORDENAR POR ROL MAGOS */
// const ordenarMago = document.querySelector('#rolMage');
// ordenarMago.addEventListener('click', () => {
//   const ordenar = ordenarMago.value;
//   listOnScreenAs(orderFilterTags(championArray, 'tags', ordenar));
// });
// /* ORDENAR POR ROL TIRADORES */
// const ordenarTirador = document.querySelector('#rolMarksman');
// ordenarTirador.addEventListener('click', () => {
//   const ordenar = ordenarTirador.value;
//   listOnScreenAs(orderFilterTags(championArray, 'tags', ordenar));
// });
// /* ORDENAR POR ROL SOPORTE */
// const ordenarSoporte = document.querySelector('#rolSupport');
// ordenarSoporte.addEventListener('click', () => {
//   const ordenar = ordenarSoporte.value;
//   listOnScreenAs(orderFilterTags(championArray, 'tags', ordenar));
// });
// const ordenarTank = document.querySelector('#rolTank');
// ordenarTank.addEventListener('click', () => {
//   const ordenar = ordenarTank.value;
//   listOnScreenAs(orderFilterTags(championArray, 'tags', ordenar));
// });

