let products = [];
let cart = [];

$.get('store.json').then(function (data) {
    products = data.products;

    data.products.forEach((a, i) => {
        $('.product').append(
            `
            <div class="card" style="width: 18rem;"
            draggable="true" ondragstart="drag(event)"
            data-id="${a.id}">
                <img src="${a.photo}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${a.title}</h5>
                    <p class="card-brand">${a.brand}</p>
                    <p class="card-text">가격 : <span class="card-price">${a.price}</span></p>
                    <button class="btn btn-primary add" data-id="${a.id}">담기</button>
            </div>
            </div> 
            `
        );
    })

    $('.add').click(function (e) {
        let productId = e.target.dataset.id;

        let productIndex = cart.findIndex((a) => {
            return a.id == productId
        })

        if (productIndex == -1) {
            let 현재상품 = products.find((a) => {
                return a.id == productId
            });
            현재상품.count = 1;
            cart.push(현재상품);
        } else {
            cart[productIndex].count++;
        }
        console.log(cart);

        $('.dropOverlay').html('');
        cart.forEach((a, i) => {
            $('.dropOverlay').append(
            `
            <div class="card" style="width: 18rem;">
                <img src="${a.photo}">
                <h4>${a.title}</h4>
                <h4>${a.brand}</h4>
                <p>${a.price}</p>
                <input type="number" value="${a.count}" class="item-count w-100">
            </div>
            `
            );
        });
    });
});

// 검색기능
$(document).ready(function () {
    $('#search').on('input', function () {
        var searchText = $(this).val()

        $('.card').each(function () {
            var productName = $(this).text()
            if (productName.includes(searchText)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });
})



// function allowDrop(ev) {
//     ev.preventDefault();
// }

// function drag(ev) {
//     // 드래그한 요소에 id 부여
//     ev.dataTransfer.setData("id", ev.target.id);
// }

// function drop(ev) {
//     ev.preventDefault();
//     var data = ev.dataTransfer.getData("id");
//     var original = document.getElementById(data);
//     var copy = original.cloneNode(true); // 복사본 생성
//     copy.id = ""; // 새로운 id 부여
//     document.querySelector('.textarea').style.display = 'none';

//     var existingItem = ev.target.querySelector('.card[id="' + copy.id + '"]');
//     if (existingItem) {
//         var quantityElement = existingItem.querySelector('.card-quantity');
//         var quantity = parseInt(quantityElement.textContent) + 1;
//         quantityElement.textContent = quantity;
//     } else {
//         // 중복된 요소가 없는 경우 요소를 추가
//         var quantityElement = document.createElement('span');
//         quantityElement.className = 'card-quantity';
//         quantityElement.textContent = 1;
//         copy.querySelector('.card-body').appendChild(quantityElement);
//         ev.target.appendChild(copy); // 새로운 요소를 추가
//     }


//     var productContainer = document.querySelector('.product');
//     productContainer.style.display = 'flex';
//     productContainer.style.flexWrap = 'wrap';
//     productContainer.style.justifyContent = 'space-around';
// }