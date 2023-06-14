const toggleBtn = document.querySelector(".sidebar-toggle");
const closeBtn = document.querySelectorAll(".close-btn");
const sidebar = document.querySelector(".sidebar");
const cartBtn = document.querySelector(".cart-icon")
const cartSidebar = document.querySelector(".cart-sidebar")
const searchInput = document.getElementById("search-bar") 
const orderPrice = document.querySelector(".order-price")
const checkout = document.querySelector("#checkout");

toggleBtn.addEventListener("click", function () {
        sidebar.classList.add("show-sidebar")
});
cartBtn.addEventListener("click", function () {
    cartSidebar.classList.add("show-sidebar")
});

closeBtn.forEach(function (closeBtn) {
    closeBtn.addEventListener("click",function (e) {
        let locate = e.currentTarget.classList
        if (locate.contains("sidebar-close")) {
            sidebar.classList.remove("show-sidebar")   
        }
        else if (locate.contains("cart-close")) {
            cartSidebar.classList.remove("show-sidebar") 
        }

    });
})

const menu = [{
    prevPrice: 15000,
    discount: 0.83333,
    currPrice:  "",
    id: 1,
    title: "multifunctional vegetable cutter and slicer",
    category: "slicer",
    img: "./images/vegetableslicer.jpg",
    desc: "A versatile kitchen tool designed to quickly and easily slice, chop and shred a wide range of vegetables and fruits"
},
{
    prevPrice: 65000,
    discount: 0.7,
    currPrice:  "",
    id: 2,
    title: "Defrosting aluminium box",
    category: "melter",
    img: "./images/hoseholddefrostbox.jpg",
    desc: "A kitchen tool designed to quickly defrost frozen food items, this tool is an efficient and eco-friendly alternative  to microwaves"
},
{
    prevPrice: 3000,
    discount: 0.76666,
    currPrice:  "",
    id: 3,
    title: " Mini sealing machine ",
    category: "sealer",
    img: "./images/minisealer.jpg",
    desc: "A portable kitchen used to seal plastic bags and other packaging materials, it helps to create airtight seals that preserve freshness and quality of food items"
},
{
    prevPrice: 25000,
    discount: 0.72,
    currPrice:  "₦3333",
    id: 4,
    title: "multi compartment storage",
    category: "slicer",
    img: "./images/TFYP4006.JPG",
    desc: "A specialized storage solution designed to help keep different types of food items seperated and organized"
}];
const displayMenu = menu.map((item)=>{
    return `<article class="menu-item">
    <div>    
        <div class = "photo"> 
    <img src= ${item.img} alt=${item.title} class="photo">
    <p class="discount"> ${((item.discount -1) * 100).toFixed()}%</p>
    </div>

    
        <div class="info-header">
            <h4 class ="cart-title">${item.title}</h4>
            <div>
            <h4 class="CurrPrice"> ₦${ (item.prevPrice* item.discount).toLocaleString('en',{maximumFractionDigits: 0})}</h4>
            
              <s class="prevPrice" >₦ ${item.prevPrice.toLocaleString('en',{maximumFractionDigits: 0})}</s>
            </div>
        </div>
        </div>
        <p class="item-text">
        ${item.desc}    
        </p>
    <button class="addCart"> Add to cart</button>
</article>` ;
});
const page = displayMenu.join("")
const sectionCenter = document.querySelector('.section-center')
window.addEventListener("load",function(event){ 
  var mainOrder1;
   sectionCenter.innerHTML= page;
   

   
    addCart = sectionCenter.querySelectorAll(".addCart")
    var orders = document.querySelector(".order")
    checkout.style.display= "none";
   addCart.forEach(function addCart(addCart) {
    addCart.addEventListener("click",function (event) {
        initialText = addCart.innerHTML;
        addCart.innerHTML = "ITEM ADDED";
        
        setTimeout(() => {
            addCart.innerHTML= initialText;
        }, 3000);
        const div =document.createElement("div")
        div.className= "order-container";
        clonedItem = addCart.parentElement.children[0].cloneNode(true);
        img = clonedItem.querySelectorAll(".photo")
        imgText = clonedItem.querySelectorAll(".info-header")
        img.forEach(function (imgAndText) {
            imgAndText.classList.remove("photo")
            imgAndText.classList.add("cloned-img")
        })
        imgText.forEach(function (imgText) {
            imgText.classList.remove("info-header")
            imgText.classList.add("cloned-text")
        });
        clonedItem.className = "clonedStyle";
        
        div.appendChild( clonedItem);
        alist = `<div class="Orders">
        <div class = "clone-header">  
        <button class="order-delete"><i class="fas fa-times"></i></button>
        </div>${div.innerHTML}</div>`;

        
        const listCart= document.createElement("div")
        listCart.innerHTML = alist;
        orders.appendChild(listCart);

        checkout.style.display= "block";
        var mainOrder = orders.querySelectorAll(".Orders")
        let totalPrice = 0;
        const orderLength = document.querySelector(".order-length");
        
        
        
        
        //calculate total price
        mainOrder.forEach(function calculateTotalPrice(mainOrder){
            const priceElement = mainOrder.querySelector('.CurrPrice');
            priceText = priceElement.textContent.trim().replace('₦','').replace(',','')
            price = parseFloat(priceText.replace(',',''))
            if (!isNaN(price)) {
                totalPrice+=price;
            }
        });
        priceComma = totalPrice.toLocaleString()
        orderPrice.innerHTML = "TOTAL:₦"+priceComma;        
        orderLength.style.display= 'block'
        orderLength.innerHTML = mainOrder.length
       
      console.log(price);

        // delete each order
        
const orderDelete = orders.querySelectorAll(".order-delete");
        orderDelete.forEach(function (orderDelete) {
            orderDelete.addEventListener("click", function (event) {
                let parent = orderDelete.parentElement.parentElement.parentElement;
                parent.remove()
                priceElement = parent.querySelector(".CurrPrice").innerHTML;
                priceText = priceElement.trim().replace('₦','').replace(',','');
                price = parseFloat(priceText.replace(',',''))
                priceComma = (totalPrice-=price).toLocaleString()
                orderPrice.innerHTML = "TOTAL:₦"+(priceComma);
                if (orders.innerHTML.trim() === '' ) {
                    checkout.style.display= "none";
                    orderPrice.innerHTML = "TOTAL: CART EMPTY";
                   }
                   var mainOrder1 = orders.querySelectorAll(".Orders")
                   orderLength.innerHTML = mainOrder1.length;
                   if (orderLength.innerHTML === '0') {
                    orderLength.style.display= 'none'
                   }


            })
            ;
        })
        
        orderLength.style.display= 'block'
        orderLength.innerHTML = mainOrder.length

    })});
  
})  

function locateToOrders() {
    window.location.href='/orders'
}
function locateToInbox() {
    window.location.href='/inbox'
}
function locateToReviews() {
    window.location.href='/reviews'
}
function locateToSaved() {
    window.location.href='/saved'
}

const paymentForm = document.getElementById('paymentForm');
    console.log(paymentForm);
    paymentForm.addEventListener("submit", payWithPaystack, false);
    function payWithPaystack(e) {
      e.preventDefault();

      let handler = PaystackPop.setup({
        key: 'pk_test_6b7e9fa059c45bdfcf58e4bf7d0081dc7e984ea0', // Replace with your public key
        email: document.getElementById("email-address").value,
        amount: document.getElementById("amount").value * 100,
        ref: ''+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
        // label: "Optional string that replaces customer email"
        onClose: function(){
          alert('Window closed.');
        },
        callback: function(response) {
            var orders = document.querySelector(".order").innerHTML
          fetch('/verify_transaction',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify({content:orders})
          })
          .then(response=>{
            if (response.ok) {
                console.log(orders);
            }
          })
        }
      });
    
      handler.openIframe();
    }
    const closepaymentForm = document.querySelector(".close-payment")
    let paymentContainer = document.querySelector('.payment')
    closepaymentForm.addEventListener('click',()=>{
        paymentContainer.style.display = "none";
    })
    checkout.addEventListener('click',function(){
       paymentContainer.style.display="block";
    })
