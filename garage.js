`use strict`

import * as DOM from './dom.js';

const writeItem = item => {
  const child = document.createElement(`li`);
  child.id = item._id;
  child.innerHTML = `${JSON.stringify(item)}`;
  DOM.garageOutput.appendChild(child);
}

DOM.createGarageButton.onclick = () => createGarage();
DOM.readGarageButton.onclick = () => getGarage();
DOM.deleteGarageButton.onclick = () => deleteGarage();
DOM.updateGarageButton.onclick = () => updateGarage();
DOM.specificGarageButton.onclick = () => readIDGarage();


const getGarage = () => {
  DOM.garageOutput.innerHTML = ``;

  axios.get(`http://localhost:8080/garage/read`)
    .then((response) => {
      if (!Array.isArray(response.data)) {
        writeItem(response.data);
      } else {
        for (let item of response.data) {
          writeItem(item);
        }
      }
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

const deleteGarage = () => {
  axios.delete(`http://localhost:8080/garage/delete/${DOM.delGarageID.value}`)
    .then((response) => {
      console.log(response);
      DOM.delGarageID.value = "";
      getGarage();
    }).catch((err) => {
      console.log(err);
    });
}

const updateGarage = () => {
  axios.put(`http://localhost:8080/garage/update/${DOM.updateGarageID.value}`, {name : DOM.updateName.value})
    .then((response) => {
      console.log(response);
      getGarage();
      DOM.updateName.value = "";
      DOM.updateGarageID.value = "";
    }).catch((err) => {
      console.log(err);
    });
}

const readIDGarage = () => {

  DOM.garageOutput.innerHTML = ``;

  axios.get(`http://localhost:8080/garage/read/${DOM.getGarageID.value}`)
    .then((response) => {
      console.log(response);
      DOM.garageOutput.innerHTML = `${JSON.stringify(response.data)}`;
    }).catch((err) => {
      console.log(err);
    });
}
