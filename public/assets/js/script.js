const $animalForm = document.querySelector('#animal-form');
const $zookeeperForm = document.querySelector('#zookeeper-form');


const handleAnimalFormSubmit = event => {
  event.preventDefault();

  // get animal data and organize it
  const name = $animalForm.querySelector('[name="animal-name"]').value;
  const species = $animalForm.querySelector('[name="species"]').value;
  const dietRadioHTML = $animalForm.querySelectorAll('[name="diet"]');
  let diet;

  for (let i = 0; i < dietRadioHTML.length; i += 1) {
    if (dietRadioHTML[i].checked) {
      diet = dietRadioHTML[i].value;
    }
  }

  if (diet === undefined) {
    diet = '';
  }

  const selectedTraits = $animalForm.querySelector('[name="personality"').selectedOptions;
  const personalityTraits = [];
  for (let i = 0; i < selectedTraits.length; i += 1) {
    personalityTraits.push(selectedTraits[i].value);
  }
  const animalObject = { name, species, diet, personalityTraits };
  sendAnimal(animalObject);
};

const sendAnimal = async function(animalObject){
  // local call from server, since script is on server already
  let response = await fetch('/api/animals', { 
    method: 'POST',
    // Set header to know to receive json data
    headers: { 
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(animalObject) // Body of request (json object to send)
  });

  if(response.ok){
    let jsonResponse = await response.json();
    console.log(jsonResponse);
    alert('Thank you for adding an animal!!');
  }else{
    alert('Error: ' + response.statusText);
  }
}

const handleZookeeperFormSubmit = event => {
  event.preventDefault();

  // get animal data and organize it
  const name = $zookeeperForm.querySelector('[name="zookeeper-name"]').value;
  const age = parseInt($zookeeperForm.querySelector('[name="age"]').value);
  const favoriteAnimal = $zookeeperForm.querySelector('[name="favorite-animal"]').value;

  const zookeeperObject = { name, age, favoriteAnimal};
  sendZookeeper(zookeeperObject);
};

const sendZookeeper = async function(zookeeperObject){
  // local call from server, since script is on server already
  let response = await fetch('/api/zookeepers', { 
    method: 'POST',
    // Set header to know to receive json data
    headers: { 
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(zookeeperObject) // Body of request (json object to send)
  });

  if(response.ok){
    let jsonResponse = await response.json();
    console.log(jsonResponse);
    alert('Thank you for adding a Zookeeper!');
  }else{
    alert('Error: ' + response.statusText);
  }

}



$animalForm.addEventListener('submit', handleAnimalFormSubmit);
$zookeeperForm.addEventListener('submit', handleZookeeperFormSubmit);

