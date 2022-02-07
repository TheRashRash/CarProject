`use strict`

import * as DOM from './dom.js';

DOM.createGarageButton.onclick = () => createGarage();
DOM.readGarages.onclick = () => getGarage();
DOM.DelBtn.onclick = () => DeleteGarage();
DOM.UpdBtn.onclick = () => UpdateGarage();

// DOM.createCarButton.onclick = () => carCreate();

const getGarage = () => {
  DOM.garageOutput.innerHTML = ``;
  axios.get(`http://localhost:8080/garage/read`)
    .then((response) => {
      console.log(response);
      DOM.garageOutput.innerHTML = `${JSON.stringify(response.data)}`;
    }).catch((err) => {
      console.log(err);
    });
    
}

const createGarage = () => {
  axios.post(`http://localhost:8080/garage/create`, {name : DOM.garageName.value})
    .then((response) => {
      console.log(response);
      getGarage();
    }).catch((err) => {
      console.log(err);
    });
}

function DeleteGarage ()
{
    axios.delete(`http://localhost:8080/garage/delete/${DOM.DelGarageID.value}`)
  .then((response) => {
    console.log(response);
    DOM.DelGarageID.value = "";
    getGarage();
  }).catch((err) => {
    console.log(err);
  });
}

function UpdateGarage ()
{
    axios.put(`http://localhost:8080/garage/update/${DOM.DelGarageID.value}`, )
  .then((response) => {
    console.log(response);
    getGarage();
  }).catch((err) => {
    console.log(err);
  });
}


// const carCreate = () => {
//   axios.post(`http://localhost:8080/car/create`, {name : DOM.carName.value, garage : DOM.garageID.value})
//     .then((response) => {
//       console.log(response);
//       getGarage();
//     }).catch((err) => {
//       console.log(err);
//     });
// }