class Product {
    constructor ({id, title, price, description, category, image}){
        this.id = id;
        this.title = title;
        this.price = price;
        this.category = category;
        this.description = description;
        this.image = image;
    }

    async handleEvent (event) {
        if (event.target.nodeName == "IMG"){
            if (event.target.currentSrc == this.image) {
                category = this.category;
                const img = new Image ();
                img.src = this.image;
                const btn = document.createElement('button')
                btn.type = 'submit';
                btn.name = 'button';
                btn.innerHTML = 'Добавить в корзину'
                const card = document.createElement("div");
                card.classList.add("cardInfo");
                bigCard.innerHTML = `<h3>${this.title}</h3><div class="category"><p>Категория: ${this.category}</p><button id="catbtn" type="submit" name="button">Показать товары категории ${this.category}</button></div><p>${this.description}</p><p>Цена:${this.price}</p>`;
                bigCard.prepend(img);
                bigCard.append(btn);
                categoryRow.style.display = "none";
                bigCard.style.display = "flex";
                
                const categoryBtn = document.getElementById("catbtn");
                categoryBtn.onclick = async function (){
                    categoryRow.innerHTML = null;
                    let response = await fetch(`https://fakestoreapi.com/products/category/${category}`)
                    let data = await response.json();
                    data.forEach(item => {
                        const img = new Image ();
                        img.src = item.image;
                        const btn = document.createElement('button')
                        btn.type = 'submit';
                        btn.name = 'button';
                        btn.innerHTML = 'Добавить в корзину'
                        const card = document.createElement("div");
                        card.classList.add("card");
                        card.innerHTML = `<h4>${item.title}</h4> <p>Цена: ${item.price}</p>`;
                        card.prepend(img);
                        card.append(btn);
                        categoryRow.append(card);
                    })
                    categoryRow.style.display = "flex";
                }         
            }
        }

    }
}

const url = 'https://fakestoreapi.com/products/';
const bigCard = document.getElementById("bigCard");
const firstRow = document.getElementById("firstRow");
const secondRow = document.getElementById("secondRow");
const container = document.querySelector("#container");
const categoryRow = document.getElementById("categoryRow");
let category;
let num = 1;
let id = 1;




async function main (id){
    try {
        let prod;
        for (i = 0; i < 10; i++){
            let response = await fetch(`${url}${id}`);
            let data = await response.json();
            prod = new Product(data);
            cardCreator(prod);
            container.addEventListener('click', prod);
            num++;
            id++;
        }
        
    }
    catch(err) {
        console.log(err);
    }
   
}
function cardCreator(item){
    const img = new Image ();
    img.src = item.image;
    const btn = document.createElement('button')
    btn.type = 'submit';
    btn.name = 'button';
    btn.innerHTML = 'Добавить в корзину'
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `<h4>${item.title}</h4> <p>Цена: ${item.price}</p>`;
    card.prepend(img);
    card.append(btn);
    
    if (num <= 5) {
        firstRow.append(card);
    } else if (num <= 10) {
        secondRow.append(card);
    }

}


main(10);




