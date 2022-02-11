let products;
fetch('/products').then(result=>result.json()).then(json=>console.log(json))
fetch('/products').then(result=>result.json()).then(json=>{
    products= json.payload;
    let container = document.getElementById('products-container');
    products.forEach(product => {
        let card =document.createElement('div');
        card.setAttribute('class','products-card');
        let title = document.createElement('p');
        title.setAttribute('class','products-text')
        title.innerHTML=product.title;
        let price =document.createElement('p');
        price.setAttribute('class','products-text');
        price.innerHTML = product.price;
        let img =document.createElement('img');
        img.src =product.thumbnail;
        card.append(title);
        card.append(price);
        card.append(img);
        container.append(card);
    })
})

let form = document.getElementById('productForm');
const handleSubmit = (evt,form,rout)=>{
    evt.preventDefault();
    let formData = new FormData(form);
    fetch(rout,{
        method:"POST",
        body:formData
    }).then(result=>result.json()).then(json=>console.log(json))
    form.reset(); 
}
form.addEventListener('submit',(e)=>handleSubmit(e,e.target,'/products')) 