# Archived Ideas

## World map

// const renderMap = async () => {
//   const svgElement = await fetchMap();
//   // finalizing svg, adding an ID
//   const mapContainer = document.getElementById('map-container');
//   svgElement.id = 'svg-map';
//   svgElement.classList.add('draggable');
//   mapContainer.append(svgElement);
// }
//
// const renderMapZoom = (event) => {
//
// }
//
// const renderAllAreas = async () => {
//   const areasList = await fetchAllAreas();
//   const areasListUL = document.querySelector('ul#areas-list')
//   areasListUL.addEventListener('mouseover', renderMapZoom);
//   console.log(areasList);
//   for (const [index, area] of areasList.meals.entries()) {
//     const li = document.createElement('li');
//     li.id = index;
//     li.classList.add('area');
//     li.dataset.area = area.strArea;
//
//     const h2 = document.createElement('h2');
//     h2.textContent = area.strArea;
//
//     li.append(h2);
//     areasListUL.append(li);
//   }
// }

// let areasList = {}
// const fetchAllAreas = async () => {
//   try {
//     if (Object.keys(areasList).length !== 0) return areasList;
//     const response = await fetch(areasURL);
//     if (!response.ok) {
//       throw new Error(`Error code ${response.status}`);
//     }
//     areasList = await response.json();
//     console.log(areasList);
//     return areasList;
//   } catch (error) {
//     console.warn(error);
//     renderErrorToast(error);
//   }
// }

// const fetchMap = async () => {
//   try {
//     const response = await fetch(svgPath);
//     if (!response.ok) {
//       throw new Error(`Error code ${response.status}`);
//     }
//     const svgContent = await response.text();
//     const parser = new DOMParser();
//     const svgDocument = parser.parseFromString(svgContent, 'image/svg+xml');
//     return svgDocument.documentElement;
//   } catch (error) {
//     console.warn(error);
//     renderErrorToast(error);
//   }
// }

// renderMap();
// const areasList = await fetchAllAreas();
// console.log(areasList)
// renderAllAreas();
//
// const map = document.querySelector('svg');
// console.log(map);
// const xCenter = window.innerWidth / 2;
// const yCenter = window.innerHeight / 2;


/* testing css for svg */
path {
  fill: grey;
}

/*#US, #GB, #CA, #CN, #HR,*/
/*#NL, #EG, #PH, #FR, #GR,*/
/*#IN, #IE, #IT, #JM, #JP,*/
/*#KE, #MY, #MX, #MA, #PL,*/
/*#PT, #RU, #ES, #TH, #TN,*/
/*#UA, #VN, */

#unknown {
  fill: red;
}

div#floating-modal {
  border: 1px solid red;
  position: fixed;
  z-index: 9999;
  left: 2%;
  top: 10%;
  height: 80vh;
  width: 30vh;
}

div#floating-modal>ul {
  padding-left: 5%;
  height: 100%;
  overflow-y: scroll;
  direction: rtl;
}

div#floating-modal li {
  width: 100%;
  height: 10vh;
  border: 1px solid red;
}

div#map-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

