

/* -------------------- products.html --------------------*/

shirts.map(shirt => {
    let countColors = Object.keys(shirt.colors).length;
    let oneBlock = document.createElement('div');

    oneBlock.innerHTML = `
    <div class="shirt">
        <div><img class="shirt__image" src="${shirt.colors.white.front}" alt="футболка"></div>
        <p class="shirt__name">${shirt.name}</p>
        <p class="shirt__colors">Available in ${countColors} colors</p>
        <div class="shirt-btns">
            <button class="shirt-btns__btn">Quick View</button>
            <button class="shirt-btns__btn">See Page</button>
        </div>
    </div>
    `;
    
    document.querySelector('.t-shirts').append(oneBlock);
});


