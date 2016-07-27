console.log('Hello world!!!');

// var card = {
//   id:0,
//   name:'cardname',
//   content:'cardcontent'
// };

var app = {
  isLoading : true,
  spinner: document.querySelector('.loader'),
  container: document.querySelector('.main'),
  template: document.querySelector('#card-template')
};

app.render = function(data) {
  if (app.isLoading) {
      app.spinner.setAttribute('hidden', true);
      app.container.removeAttribute('hidden');
      app.isLoading = false;
    }

  var cardArr = document.querySelector('.card') || [];

  for (var i = 0; i < cardArr.length; i++) {
    cardArr[i]
  }

  var isExisting = false;
  if(isExisting) {
    app.updateCard(data);
  } else {
    app.createCard(data);
  }
}

app.createCard = function(data) {
  var newCard = app.template.content.cloneNode(true);
  newCard.querySelector('.header').innerText = data.name;
  newCard.querySelector('.content').innerText = data.content;
  newCard.querySelector('.footer').innerText = data.id;
  app.container.appendChild(newCard);
}

app.updateCard = function(data) {
  var id = data.id;
  var tmpl = app.container.querySelector(id);
  tmpl.querySelector('.header').innerText = data.name;
  tmpl.querySelector('.content').innerText = data.content;
  tmpl.querySelector('.footer').innerText = data.id;
}


app.toggleLoading = function() {
  if (app.isLoading) {
      app.spinner.setAttribute('hidden', true);
      app.container.removeAttribute('hidden');
      app.isLoading = false;
  } else {
    app.spinner.setAttribute('hidden', false);
    app.container.addAttribute('hidden');
    app.isLoading = true;
  }
}

//===================================================================
alert('serviceWorker' in navigator);
if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js')
            .then(function() {alert('serviceWorker registered!')});
}

//===================================================================
var fakeData = [
  {id:1, name:'Name1', content:'Content1'},
  {id:2, name:'Name2', content:'Content2'},
  {id:3, name:'Name3', content:'Content3'}
];
var idx = 0;
var pollData = function() {
  setTimeout(function() {
    app.render(fakeData[idx++]);
    if(fakeData[idx]) pollData();
  }, 500);
}
pollData();
