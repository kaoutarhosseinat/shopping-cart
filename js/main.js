


let cartIcon =document.querySelector("#cart-icon")
let cart =document.querySelector(".cart")
let closeCart =document.querySelector("#close-cart")

cartIcon.onclick = () =>{
    cart.classList.add("active")
};
closeCart.onclick = () =>{
    cart.classList.remove("active")
};

if(document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready )
}else{
    ready();
}
function ready(){
    let removeCartButtons = document.getElementsByClassName('cart-remove')
    console.log(
        removeCartButtons
    )
    for (let i = 0; i < removeCartButtons.length; i++){
        let button =removeCartButtons[i]
        button.addEventListener('click', removeCartItem)
    }
}
let quantityInputs = document.getElementsByClassName("cart-quantity");
for (let i = 0; i < quantityInputs.length; i++){
let input = quantityInputs[i];
input.addEventListener("change", quantityChanged);

}
let addCart = document.getElementsByClassName("add-cart")
for (let i = 0; i < addCart.length; i++){
    let button = addCart[i];
    button.addEventListener("click" , addCartClicked);
}


function removeCartItem(event){
    let buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();

}
function quantityChanged(event){
    let input = event.target
    if(isNaN(input.value) || input.value <= 0 ){
        input.value = 1;
    } 
    updatetotal()

}

function addCartClicked(event){
    let button = event.target;
    let shopProducts = button.parentElement;
    let title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    let price = shopProducts.getElementsByClassName("price")[0].innerText;
    let productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    addProductToCart(title , price , productImg);
    updatetotal();
}

function addProductToCart(title , price , productImg){
    let  cartShopBox = document.createElement("div");
     cartShopBox.classList.add("cart-box");
    let cartItems = document.getElementsByClassName("cart_content")[0];
    let cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
    for (let i = 0; i < cartItemsNames.length; i++){
        if (cartItemsNames[i].innerText == title)
        alert( "You have already add this item to cart");
        return;
    }
}
let cartBoxContent = `
<img
            src="res/0c18ca4340f4b045333a95e660a7f0f6.jpg"
            alt=""
            class="cart-img"
            width="70px"
            height="70px"
          />
          <div class="detail-box">
            <div class="cart-product-title">Table Lamp</div>
            <div class="cart-price">3000 DZD</div>
            <input type="number" value="1" class="cart-quantity" />
          </div>
          <i class="bx bx-trash cart-remove"></i>
`
let cartShopBox;
cartShopBox.innerHTML = cartBoxContent;
cartItems.append(cartShopBox);
cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCartItem);
cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener("change", quantityChanged);





function updatetotal(){
    let cartContent = document.getElementsByClassName("cart-content")[0];
    let cartBoxes = cartContent.getElementsByClassName("cart-box");
    total = 0;
    for (let i = 0; i < cartBoxes.length; i++){
        let cartBox = cartBoxes[i];
        let priceElement = cartBox.getElementsByClassName("cart-price")[0];
        let quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        let price = parseFloat(priceElement.innerText.replace("DZD",""));
        let quantity = quantityElement.value;
        total = total + price * quantity;
        total= Math.round(total * 100)/ 100;
        document.getElementsByClassName("total-price")[0].innerText =total+"DZD";
    }
}