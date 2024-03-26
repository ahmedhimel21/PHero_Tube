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
    <button onclick="loadCategoryData('${singleData.category}')" class="bg-secondary text-tertiary px-4 py-1 rounded-md visited:bg-primary">
    ${singleData.category}
    </button>
    `
    btnContainer.appendChild(div);

  })
}

const loadCategoryData = (data) => {
  console.log(data);
}

loadBtnData();