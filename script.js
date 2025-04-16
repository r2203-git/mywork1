const cars = [
  {
    make: 'BMW',
    model: 'M8',
    type: 'Coupe',
    image: 'https://images.carpages.ca/inventory/12297543.662695721?w=1280&h=960&q=75&fit=max&s=04b7bdb2efa0874bb883f74e5ab715b5',
    details: ['Price: $150,000', 'Transmission: Twin-turbo V8', '0-100kmph: 3.3 seconds', 'Adaptive suspension']
  },
  {
    make: 'Mercedes',
    model: 'S-Class',
    type: 'Sedan',
    image: 'https://images.carpages.ca/inventory/12221784.651470599?w=1280&h=960&q=75&fit=max&s=817643a7e34f6a2b3c37a13e55d9f079',
    details: ['Price: $120,000', 'MBUX Smart System', 'OLED Touchscreen', 'Advanced Driver Assists']
  },
  {
    make: 'Audi',
    model: 'Q5',
    type: 'SUV',
    image: 'https://images.carpages.ca/inventory/12264019.692198538?w=1280&h=960&q=75&fit=max&s=742a1d65b8c807920a99d9d0800a2486',
    details: ['Price: $50,000', 'Turbocharged 4-cylinder', 'Quattro AWD', 'MMI Touch Display']
  },
];

if (document.title === 'Inventory') {
  // Populate Inventory Page
  const inventoryGrid = document.getElementById('inventoryGrid');
  const makeFilter = document.getElementById('makeFilter');
  const typeFilter = document.getElementById('typeFilter');

  // Render Cars Function
  function renderCars(filteredCars) {
    inventoryGrid.innerHTML = '';
    filteredCars.forEach(car => {
      const carCard = document.createElement('div');
      carCard.className = 'car-card';
      carCard.innerHTML = `
        <img src="${car.image}" alt="${car.make} ${car.model}">
        <h4>${car.make} ${car.model}</h4>
        <p>Type: ${car.type}</p>
      `;
      carCard.addEventListener('click', () => {
        localStorage.setItem('selectedCar', JSON.stringify(car));
        window.location.href = 'cardetails.html';
      });
      inventoryGrid.appendChild(carCard);
    });
  }

  // Filters
  function filterCars() {
    const make = makeFilter.value;
    const type = typeFilter.value;

    const filteredCars = cars.filter(car => {
      return (make === 'all' || car.make === make) && (type === 'all' || car.type === type);
    });

    renderCars(filteredCars);
  }

  makeFilter.addEventListener('change', filterCars);
  typeFilter.addEventListener('change', filterCars);

  renderCars(cars); // Initial render
}

if (document.title === 'Car Details') {
  // Populate Car Details Page
  const carTitle = document.getElementById('car-title');
  const carImage = document.getElementById('car-image');
  const carSpecs = document.getElementById('car-specs');

  const selectedCar = JSON.parse(localStorage.getItem('selectedCar'));
  if (!selectedCar) {
    alert('No car selected! Redirecting to inventory.');
    window.location.href = 'inventory.html';
  } else {
    carTitle.textContent = `${selectedCar.make} ${selectedCar.model}`;
    carImage.src = selectedCar.image;

    selectedCar.details.forEach(detail => {
      const li = document.createElement('li');
      li.textContent = detail;
      carSpecs.appendChild(li);
    });
  }
}
