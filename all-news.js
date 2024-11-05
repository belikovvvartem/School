// Функція для відображення всіх новин
function displayAllNews() {
    const allNewsContainer = document.getElementById("all-news-container");
    allNewsContainer.innerHTML = ""; // Очищення контейнера

    const news = JSON.parse(localStorage.getItem("news")) || []; // Отримання новин

    if (news.length === 0) {
        allNewsContainer.innerHTML = "<p>Немає доступних новин.</p>"; // Показати повідомлення, якщо новин немає
        return; // Вихід з функції, якщо немає новин
    }

    news.forEach(item => {
        const newsItem = document.createElement("div");
        newsItem.className = "news-item";
        newsItem.innerHTML = `
            <h3 class="news-title">${item.title}</h3>
            <img src="${item.mainImage}" alt="${item.title}" style="width: 100%; height: auto;">
            <p class="news-description">${item.fullDescription}</p>
            <p class="news-date"><strong>Дата:</strong> ${item.date}</p>
        `;
        allNewsContainer.appendChild(newsItem);
    });
}

// Виклик функції для відображення всіх новин при завантаженні сторінки
document.addEventListener("DOMContentLoaded", displayAllNews);
