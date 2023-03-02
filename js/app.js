

const loadData = () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayData(data.data));
};

const displayData = (datas) => {
  const newData = datas.news_category;
  const containerSection = document.getElementById("catagory");

  for (const data of newData) {
    containerSection.innerHTML += `<a href='#' onclick="newsCata('${data.category_id}','${data.category_name}')">${data?.category_name}</a>`;
    // console.log(data);
  }
};
const newsCata = (id,name) => {
  const url = ` https://openapi.programming-hero.com/api/news/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => loadDataCata(data.data,name));
};

const loadDataCata = (datas,name) => {
  const dataContainer = document.getElementById("news_cata");

  dataContainer.innerHTML = "";

  for (const data of datas) {
    const div = document.createElement("div");
    const alertNumber = (document.getElementById(
      "alert_number"
    ).innerText = `${datas.length}`);
    const alertText = document.getElementById("alert_text").innerHTML = `${name}`;

    div.innerHTML = `
        <div class="card card-side bg-base-100 shadow-xl my-12">
        <figure class="w-[35%]"><img class="" src="${data.image_url}" alt="Movie"/></figure>
        <div class="card-body w-[65%]">
          <h2 class="card-title">${data.title}</h2>
          <p class="py-2">${data.details.slice(0,150)}........</p>
          <div class="flex gap-14 items-center pt-3">
            <div class="flex gap-2 justify-center items-center">
              <div class="avatar">
                 <div class="w-16 rounded-full">
                    <img class="" src="${data.author.img}" />
                 </div>
               </div>
               <div>
                    <p>${data.author.name}</p>
                    <p>${data.author.published_date}</p>
               </div>
              </div>
              <div>
                <p><i class="fa-regular fa-eye pr-2"></i>${data.total_view}</p>
              </div>
              <div class="flex items-center gap-2">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star-half-stroke"></i>
                <p>${data.rating.number}</p>
              </div>
              <label onclick="modalDetails('${data._id}')" for="my-modal-6" class="btn btn-outline btn-error"><i class="fa-solid fa-arrow-right"></i></label>
          </div>
        </div>
      </div>
        `;
    dataContainer.appendChild(div);
    
    // console.log(data)
  }
  // console.log(datas)
};

const modalDetails = (id) =>{

  const url = `https://openapi.programming-hero.com/api/news/${id}`;
  fetch(url)
  .then(res => res.json())
  .then(data => displayModal(data.data))
}
const displayModal =(datas) =>{
  document.getElementById('modal-title').innerText=`${datas[0].title}`;
  document.getElementById('modal-details').innerText=`${datas[0].details}`;
  
  console.log(datas[0])
}