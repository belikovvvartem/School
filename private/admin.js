function convertImageToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// Функція для додавання нової новини
async function addNews() {
    const title = document.getElementById("news-title").value;
    const description = document.getElementById("news-description").value;
    const fullDescription = document.getElementById("news-full-description").value;
    const date = document.getElementById("news-date").value; // Дата, введена адміністратором

    const mainImageFile = document.getElementById("news-main-image").files[0];
    const additionalImagesFiles = document.getElementById("news-additional-images").files;

    // Конвертація головного зображення у Base64
    const mainImage = mainImageFile ? await convertImageToBase64(mainImageFile) : null;

    // Конвертація додаткових зображень у Base64
    const additionalImages = [];
    for (const file of additionalImagesFiles) {
        const base64Image = await convertImageToBase64(file);
        additionalImages.push(base64Image);
    }

    const newNews = { title, description, fullDescription, mainImage, additionalImages, date };
    const news = JSON.parse(localStorage.getItem("news")) || [];
    news.unshift(newNews); // Додаємо нову новину на початок масиву

    localStorage.setItem("news", JSON.stringify(news));

    alert("Новина додана!");
    document.getElementById("news-form").reset();
    displayNewsList(); // Оновлюємо список новин
}

// Функція для видалення новини
function deleteNews(index) {
    const password = prompt("Введіть пароль адміністратора для видалення новини:");
    
    const adminPassword = "admin123"; // Задайте пароль адміністратора

    if (password === adminPassword) {
        const news = JSON.parse(localStorage.getItem("news"));
        news.splice(index, 1); // Видаляємо новину з масиву
        localStorage.setItem("news", JSON.stringify(news)); // Оновлюємо localStorage
        displayNewsList(); // Оновлюємо відображення новин
        alert("Новина видалена!");
    } else {
        alert("Неправильний пароль!");
    }
}

// Функція для відображення списку новин в адмін-панелі
function displayNewsList() {
    const newsListContainer = document.getElementById("news-list");
    newsListContainer.innerHTML = "";

    const news = JSON.parse(localStorage.getItem("news")) || [];
    news.forEach((item, index) => {
        const newsItem = document.createElement("div");
        newsItem.className = "news-item";
        newsItem.innerHTML = `
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <p>${item.date}</p>
            <button onclick="deleteNews(${index})">Видалити</button>
        `;
        newsListContainer.appendChild(newsItem);
    });
}

// Викликаємо функцію для відображення списку новин при завантаженні
displayNewsList();

