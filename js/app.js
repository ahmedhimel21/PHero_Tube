const loadBtnData = async () => {
  const res = await fetch('https://openapi.programming-hero.com/api/videos/categories')
  const data = await res.json()
  displayBtnData(data.data);
}

const displayBtnData = (data) => {
  const btnContainer = document.getElementById('btn-container');
  data.forEach(singleData => {
    const div = document.createElement('div');
    div.innerHTML = `
    <button onclick="loadCategoryData('${singleData.category_id}')" class="bg-secondary text-tertiary px-4 py-1 rounded-md visited:bg-primary">
    ${singleData.category}
    </button>
    `
    btnContainer.appendChild(div);

  })
}

const loadCategoryData = async (id) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
  const data = await res.json()
  displayCategoryData(data.data);
}

const displayCategoryData = (data) => {
  // console.log(typeof data.length);
  const container = document.getElementById('card-container');
  container.textContent = '';
  data.forEach(singleCard => {
    const { category_id, thumbnail, title } = singleCard;
    const { posted_date, views } = singleCard?.others;
    const { profile_name, profile_picture, verified } = singleCard?.authors[0];

    const hours = Math.floor(posted_date / 3600);
    const minutes = Math.floor((posted_date % 3600) / 60);

    const div = document.createElement('div');
    div.classList = `lg:max-w-sm bg-white border border-gray-200 rounded-lg shadow`;
    div.innerHTML = `
    <a href="#" class='relative'>
    <img
    class = 'h-[200px] w-full'
      src="${thumbnail}"
      alt="image"
    />
    <div>
      ${hours > 0 && minutes > 0 ? (`<p class='absolute bottom-3 rounded-md right-3 bg-black p-1 text-white'>${hours} hours ${minutes} minutes</p>`) : ('')}
    </div>
    </a>
    <div class="p-5">
    <div class="flex items-center gap-3">
      <img class="rounded-full w-10 h-10" src="${profile_picture}" alt="logo">
      <h5
      class="mb-2 text-2xl font-bold tracking-tight text-gray-900"
      >
        ${title}
      </h5>
    </div>
    <p class="mb-3 font-normal text-gray-700">
      ${profile_name} 
      <span>${verified ? "<i class='bx bxs-check-circle text-blue-500'></i>" : ""}</span>
    </p>
    <p class="mb-3 font-normal text-gray-700">
      ${views} views
    </p>
    </div>
    `
    container.appendChild(div);
  })
  const noDataContainer = document.getElementById('no-data-container');
  noDataContainer.textContent = '';
  if(data.length === 0){
    const div = document.createElement('div');
    div.classList = `text-center`
    div.innerHTML = `
    <img src='Icon.png' alt='icon'>
    <h2>Oops!! Sorry, There is no <br> content here</h2>
    `
    noDataContainer.appendChild(div);
  }
}

loadBtnData();