const $displayArea = document.querySelector('#display-area');
const $zookeeperForm = document.querySelector('#zookeeper-form');


const printResults = resultArr => {
  console.log(resultArr);

  const animalHTML = resultArr.map(({ id, name, age, favoriteAnimal }) => {
    return `
  <div class="col-12 col-md-5 mb-3">
    <div class="card p-3" data-id=${id}>
      <h4 class="text-primary">${name}</h4>
      <p>Age: ${age}<br/>
      Favorite Animal: ${favoriteAnimal.substring(0, 1).toUpperCase() +
        favoriteAnimal.substring(1)}<br/>
      </p>
    </div>
  </div>
    `;
  });

  $displayArea.innerHTML = animalHTML.join('');
};

const getZookeepers = async (formData = {}) => {

  let queryUrl = '/api/zookeepers?';

  // Generate query string
  Object.entries(formData).forEach(([key, value]) => {
    queryUrl += `${key}=${value}&`;
  });
  console.log(queryUrl);

  let response = await fetch(queryUrl);
  if(response.ok){
    let zookeeperData = await response.json();
    printResults(zookeeperData);
  }else{
    alert('Error: ' + response.statusText);
  }
};

const handleGetZookeeperSubmit = event => {
  event.preventDefault();
  const nameHTML = $zookeeperForm.querySelector('[name = "name"]');
  const name = nameHTML.value;

  const ageHTML = $zookeeperForm.querySelector('[name = "age"]');
  const age = ageHTML.value;

  const zookeeperObject = {name, age};

  getZookeepers(zookeeperObject);
}

// Form submit listener
$zookeeperForm.addEventListener('submit', handleGetZookeeperSubmit);


getZookeepers();
