const menuItems = [

    {
        name: "Special Shiro",
        price: 0,
        category: "Shiro",
        description: "Traditional Ethiopian shiro prepared with our house spices.",
        image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80",
        vegan: true
    },

    {
        name: "Shiro with Butter",
        price: 0,
        category: "Shiro",
        description: "Rich traditional shiro served with Ethiopian butter.",
        image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80",
        vegan: false
    },

    {
        name: "Bozena Shiro",
        price: 0,
        category: "Shiro",
        description: "Traditional shiro prepared with meat.",
        image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80",
        vegan: false
    },

    {
        name: "Doro Wot",
        price: 0,
        category: "Main Dishes",
        description: "Traditional Ethiopian chicken stew with berbere.",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
        vegan: false
    },

    {
        name: "Kitfo",
        price: 0,
        category: "Main Dishes",
        description: "Traditional Ethiopian minced beef dish.",
        image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80",
        vegan: false
    },

    {
        name: "Tibs",
        price: 0,
        category: "Main Dishes",
        description: "Tender meat sautéed with Ethiopian spices.",
        image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80",
        vegan: false
    },

    {
        name: "Vegetarian Beyaynetu",
        price: 0,
        category: "Vegetarian",
        description: "A selection of Ethiopian fasting dishes served together.",
        image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80",
        vegan: true
    },

    {
        name: "Misir Wot",
        price: 0,
        category: "Vegetarian",
        description: "Spiced Ethiopian lentil stew.",
        image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80",
        vegan: true
    },

    {
        name: "Traditional Ethiopian Breakfast",
        price: 0,
        category: "Breakfast",
        description: "Traditional Ethiopian breakfast selection.",
        image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80",
        vegan: false
    },

    {
        name: "Fresh Juice",
        price: 0,
        category: "Juice",
        description: "Freshly prepared fruit juice.",
        image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80",
        vegan: true
    },

    {
        name: "Ethiopian Coffee",
        price: 0,
        category: "Coffee",
        description: "Traditional Ethiopian coffee.",
        image: "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?auto=format&fit=crop&w=800&q=80",
        vegan: true
    }

];


const menuGrid = document.getElementById("menuGrid");
const categoriesContainer = document.getElementById("categories");
const searchInput = document.getElementById("search");
const noResults = document.getElementById("noResults");

let currentCategory = "all";


function createCategories() {

    const categories = [
        "all",
        ...new Set(menuItems.map(item => item.category))
    ];

    categoriesContainer.innerHTML = "";

    categories.forEach(category => {

        const button = document.createElement("button");

        button.className =
            "category" +
            (category === "all" ? " active" : "");

        button.textContent =
            category === "all"
                ? "All"
                : category;

        button.addEventListener("click", () => {

            currentCategory = category;

            document
                .querySelectorAll(".category")
                .forEach(btn =>
                    btn.classList.remove("active")
                );

            button.classList.add("active");

            renderMenu();

        });

        categoriesContainer.appendChild(button);

    });
}


function renderMenu() {

    const search =
        searchInput.value.toLowerCase().trim();


    const filtered =
        menuItems.filter(item => {

            const categoryMatch =
                currentCategory === "all" ||
                item.category === currentCategory;

            const searchMatch =
                item.name.toLowerCase().includes(search) ||
                item.description.toLowerCase().includes(search);

            return categoryMatch && searchMatch;

        });


    menuGrid.innerHTML = "";


    if (filtered.length === 0) {

        noResults.style.display = "block";

        return;
    }


    noResults.style.display = "none";


    filtered.forEach(item => {

        const card =
            document.createElement("article");

        card.className = "menu-card";


        const price =
            item.price > 0
                ? `${item.price.toLocaleString()} ETB`
                : "Price coming soon";


        card.innerHTML = `

            <img
                class="menu-image"
                src="${item.image}"
                alt="${item.name}"
                loading="lazy"
            >

            <div class="menu-content">

                <div class="menu-top">

                    <h2 class="menu-name">
                        ${item.name}
                    </h2>

                    <span class="price">
                        ${price}
                    </span>

                </div>

                <p class="description">
                    ${item.description}
                </p>

                ${
                    item.vegan
                    ?
                    `<span class="tag">
                        🌱 Vegan
                    </span>`
                    :
                    ""
                }

            </div>
        `;

        menuGrid.appendChild(card);

    });
}


searchInput.addEventListener(
    "input",
    renderMenu
);


createCategories();

renderMenu();
