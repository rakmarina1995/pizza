'use strict'
new WOW({
    animateClass: 'animate__animated'
}).init();
let productInput = $('#product-input');
$('h1').html('Самая крутая пицца ждет <span>только в нашем ресторане</span>');
$('#products-title').css('color', '#000');
$('.btn').css(
    {
        backgroundColor: 'transparent',
        border: '1px solid rgb(255,175,24)',
        color: 'rgb(255,175,24)'
    }
);
productInput.attr('placeholder', 'Имя');
$('.rights span').text((new Date()).getFullYear());
let products = $('.product');
for (let i = 0; i < products.length; i++) {
    if (i % 2 === 1) {
        let element = products.eq(i).children().eq(1);
        element.text(element.text() + '*');
    }
}

$('#choose-pizza').click(function () {
    $('.products')[0].scrollIntoView({behavior: "smooth"});
});
let cart =[];
let cartArray=[];
$('.btn-add-to-cart').click((e) => {
    let prodTitle=$(e.target).parent().siblings('.product-title').text().trim();
    let cart=localStorage.getItem('cart');
    if (cart){
        cartArray=JSON.parse(cart);
    }
    cartArray.push(prodTitle);
    localStorage.setItem('cart',JSON.stringify(cartArray));
    console.log(localStorage.getItem('cart'));
    productInput.val(prodTitle);
    $('.order')[0].scrollIntoView({behavior: "smooth"});
});


let phoneInput = $('#phone-input');
let addressInput = $('#address-input');
phoneInput.inputmask({"mask": "375 (99) 9999999"}); //specifying options
// $('#create-order').click ( (e) => {
//
//     if (!productInput.val()) {
//         alert('Заполните пиццу');
//         return;
//     }
//     if (!addressInput.val()) {
//         alert('Заполните адрес');
//         return;
//     }
//     if (!phoneInput.val()) {
//         alert('Заполните телефон');
//         return;
//     }
//     $.ajax({
//         method:'GET',
//         url:'https://testologia.site/test-cookie&name=' +  productInput.value,
//         xhrFields:{
//             withCredentials: true
//         }
//     })
//     productInput.val('');
//     addressInput.val('');
//     phoneInput.val('');
// })
$('#create-order').click((e)=>{
    console.log(1);
   let hasError=false;
   $('.order-input').css('border-color','rgb(185, 145, 80)');
    if (!productInput.val().match(/^[А-Яа-я\s*]+[А-Яа-я*\s]+$/)){
        productInput.css('border-color','red');
        hasError=true;
    }
    if (!phoneInput.val().match(/^/)){
        phoneInput.css('border-color','red');
        hasError=true;
    }
    if (!addressInput.val().match(/^[а-яА-Я0-9\.,\s]+$/)){
        addressInput.css('border-color','red');
        hasError=true;
    }
    if (!hasError){
        $.ajax({
            method:'POST',
            url:'https://itlogia.site/checkout',
            xhrFields:{
                withCredentials:true
            },
            data:{
                product:productInput.val(),
                phone:phoneInput.val(),
                name:addressInput.val()
            }
        })
            .done((msg)=>{
                if (msg.success){
                    alert('Спасибо за заказ!')
                }else{
                    alert('Что-то не так!');
                    }

            })

    }
})


$('.open-popup-link').magnificPopup({
    type:'inline',
    midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
});
$('.product-image').magnificPopup({
    type: 'image',

});
if (!localStorage.getItem('cookie-accept')){
    $('.cookie').show();
}
$('.cookie-accept').click((e)=>{
    $('.cookie').hide();
    localStorage.setItem('cookie-accept','1');
})
let cookie={
    set:(name,value,options)=>{
        if (!name || !value) {
            return null;
        }
        let string = name+'='+value;
        if (options){
            string+=";"+options;
        }
        document.cookie=string;
        return cookie;
    },
    get:(name)=>{
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    },
    delete:(name)=>{
        document.cookie=name+'=;expires='+(new Date('12.03.2021').toUTCString());

    }
}
