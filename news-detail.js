function getNewsDetails() {
    // Отримання заголовка новини з URL
    const urlParams = new URLSearchParams(window.location.search);
    const title = urlParams.get('title');

    if (!title) {
        document.getElementById("news-detail-container").innerHTML = "<p>Новину не знайдено.</p>";
        return;
    }

    // Отримання новин з localStorage
    const news = JSON.parse(localStorage.getItem("news")) || [];
    const newsItem = news.find(item => item.title === decodeURIComponent(title)); // Знаходимо новину за заголовком

    if (!newsItem) {
        document.getElementById("news-detail-container").innerHTML = "<p>Новину не знайдено.</p>";
        return;
    }

    // Відображення деталей новини
    const newsDetailContainer = document.getElementById("news-detail-container");
    newsDetailContainer.innerHTML = `
        <h1 class="news-title">${newsItem.title}</h1>
        <img src="${newsItem.mainImage}" alt="${newsItem.title}" style="width: 100%; height: auto;">
        <p class="news-description">${newsItem.fullDescription}</p>
        <p class="news-date"><strong>Дата:</strong> ${newsItem.date}</p>
    `;
}

// Виклик функції для отримання деталей новини при завантаженні сторінки
document.addEventListener("DOMContentLoaded", getNewsDetails);
