`use strict`

import * as DOM from './dom.js';

const writeItem = item => {
  const child = document.createElement(`li`);
  child.id = item._id;
  child.innerHTML = `${JSON.stringify(item)}`;
  DOM.carOutput.appendChild(child);
}

DOM.readCarButton.onclick = () => carRead();
DOM.createCarButton.onclick = () => carCreate();
DOM.deleteCarButton.onclick = () => carDelete();
DOM.updateCarButton.onclick = () => carUpdate();
DOM.specificCarButton.onclick = () => carReadID();
DOM.getCarByNameButton.onclick = () => carFindByName();

const carRead = () => {
  DOM.carOutput.innerHTML = ``;

  axios.get(`http://localhost:8080/car/read`)
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

const carCreate = () => {
  axios.post(`http://localhost:8080/car/create`, {
    name : DOM.name.value,
    colour : DOM.colour.value,
    make : DOM.make.value,
    model : DOM.model.value,
    doors : DOM.doors.value,
    garage : {id : DOM.garageID.value}
  })
    .then((response) => {
      console.log(response);
      carRead();
    }).catch((err) => {
      console.log(err.response.data);
    });
}

const carDelete = () => {
  axios.delete(`http://localhost:8080/car/delete/${DOM.deleteCarID.value}`)
    .then((response) => {
      console.log(response);
      DOM.deleteCarID.value = "";
      carRead();
    }).catch((err) => {
      console.log(err);
    });
}

const carUpdate = () => {
  
  axios.put(`http://localhost:8080/car/update/${DOM.updateCarID.value}`, {
    name : DOM.updateCarName.value,
    colour : DOM.updateColour.value,
    make : DOM.updateMake.value,
    model : DOM.updateModel.value,
    doors : DOM.updateDoors.value
  })
    .then((response) => {
      console.log(response);
      carRead();
      DOM.updateCarName.value = "";
      DOM.updateColour.value = "";
      DOM.updateMake.value = "";
      DOM.updateModel.value = "";
      DOM.updateDoors.value = "";
      DOM.updateCarID.value = "";
    }).catch((err) => {
      console.log(err);
    });
}

const carReadID = () => {

  DOM.carOutput.innerHTML = ``;

  axios.get(`http://localhost:8080/car/read/${DOM.getCarID.value}`)
    .then((response) => {
      console.log(response);
      DOM.carOutput.innerHTML = `${JSON.stringify(response.data)}`;
    }).catch((err) => {
      console.log(err);
    });
}

const carFindByName = () => {

  DOM.carOutput.innerHTML = ``;

  axios.get(`http://localhost:8080/car/findByName/${DOM.getCarByName.value}`)
    .then((response) => {
      console.log(response);
      DOM.carOutput.innerHTML = `${JSON.stringify(response.data)}`;
    }).catch((err) => {
      console.log(err);
    });
}