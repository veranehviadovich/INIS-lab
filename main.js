/* ------------------------------Отрисовка маек------------------------------ */
shirts.map((shirt, count) => {
    let countColors = Object.keys(shirt.colors).length;
    let oneBlock = document.createElement('div');

    oneBlock.innerHTML = `
    <div class="shirt">
        <div><img class="shirt__image" src="${shirt.colors.white.front}" alt="футболка"></div>
        <p class="shirt__name">${shirt.name}</p>
        <p class="shirt__colors">Available in ${countColors} colors</p>
        <div class="shirt-btns">
            <a href="#quick-view" data-shirt=${count} class="btns-for__quickview shirt-btns__btn">Quick View</a>
            <a href="details.html" data-shirt=${count} class="btns-for__view shirt-btns__btn">See Page</a>
        </div>
    </div>
    `;
    
    document.querySelector('.t-shirts')?.append(oneBlock);
});
/* ------------------------------Отрисовка маек------------------------------ */



/* ------------------------------Отрисовка быстрого просмотра------------------------------ */
/*document.querySelectorAll('.btns-for__quickview').forEach(btn => {
    btn.onclick = () => {
        let quickViewBlock = document.createElement('div');
        if(document.querySelector('.quick-view__images')) document.querySelector('.quick-view .content').remove();

        quickViewBlock.innerHTML = createQuickView(btn.getAttribute('data-shirt'));
        document.querySelector('.quick-view').append(quickViewBlock);
    }
})

function createQuickView(shirtNumber){
    return `
    <div class="content">
      <div class="quick-view__images">
        <img src="${shirts[shirtNumber].colors.white.front}" alt="shirt front" class="first-image">
        <img src="${shirts[shirtNumber].colors.white.back}" alt="shirt back" class="second-image">
      </div>
      <div class="quick-view__about">
        <p class="quick-view__name">${shirts[shirtNumber].name}</p>
        <p class="quick-view__price">${shirts[shirtNumber].price}</p>
        <button onclick="document.querySelector('.quick-view .content').remove()" class="quick-view__btn shirt-btns__btn">Close</button>
      </div>
    </div>
    `;
}*/
/* ------------------------------Отрисовка быстрого просмотра------------------------------ */


/* ------------------------------Запись данных в localStorage для полного просмотра------------------------------ */
document.querySelectorAll('.btns-for__view').forEach(btn => {
    btn.onclick = () => {
        localStorage.setItem("key", JSON.stringify(shirts[btn.getAttribute('data-shirt')]));
    }
})
/* ------------------------------Запись данных в localStorage для полного просмотра------------------------------ */


/* ------------------------------Отрисовка полного просмотра------------------------------ */
function createFullView(obj){
  let currSide = "front";
  let currColor = "white";
  let allColors = Object.keys(obj.colors);
  let tshirtBlock = document.createElement('div');

  tshirtBlock.innerHTML = `
  <div class="tshirt-header">${obj.name}</div>
  <div class="tshirt-body">
    <img src="${obj.colors.white.front}" alt="майка картинка" class="tshirt__img">
    <div class="tshirt-about">
      <div class="tshirt-about__price">${obj.price}</div>
      <div class="tshirt-about__descr">${obj.description}</div>
      <div class="tshirt-btns">
        <div class="tshirt-btns-row">
          <span>Side: </span>
          <button class="btn_front active_side shirt-btns__btn">Front</button>
          <button class="btn_back shirt-btns__btn">Back</button>
        </div>
        <div class="tshirt-btns-row">
          <span>Color: </span>
          
        </div>
      </div>
    </div>
  </div>
  `;

  document.querySelector('.tshirt-container').append(tshirtBlock);

  document.querySelectorAll('.tshirt-btns-row button').forEach(btn => {
    btn.onclick = () => {
      if(!btn.classList.contains('active_side')){
        document.querySelectorAll('.tshirt-btns-row button').forEach(el => el.classList.remove('active_side'));
        btn.classList.add('active_side');
        btn.classList.forEach(el => {
          if(el === "btn_back") currSide = "back";
          if(el === "btn_front") currSide = "front";
          document.querySelector('.tshirt__img').src = obj.colors[currColor][currSide];
        });
      }
    }
  })

  allColors.forEach( el => {
    let button = document.createElement('button');
    button.innerHTML = `${el}`;
    button.classList.add(`shirt-btns__btn`);
    button.classList.add(`btn__color`);
    button.setAttribute('value', el);
    button.style.backgroundColor = el;
    button.style.color = "black";
    document.querySelectorAll('.tshirt-btns-row')[1].append(button);

    button.onmouseenter = () => {
      button.style.color = el;
      button.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
    }

    button.onmouseout = () => {
      button.style.color = "black";
      button.style.backgroundColor = el;
    }
  });

  document.querySelectorAll('.btn__color').forEach(button => {
    button.onclick = () => {
      if(!button.classList.contains('active_color')){
        document.querySelectorAll('.btn__color').forEach(elem => elem.classList.remove('active_color'));
        button.classList.add('active_color');
        currColor = button.value;
        document.querySelector('.tshirt__img').src = obj.colors[currColor][currSide];
      }
    }
  })
}

createFullView(JSON.parse(localStorage.getItem("key")));
