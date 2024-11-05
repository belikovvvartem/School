const news = JSON.parse(localStorage.getItem("news")) || [];
const adminPassword = "admin123"; // Задайте пароль адміністратора

// Функція для відображення новин на головній сторінці (до 8 новин)
function displayNews() {
  const newsContainer = document.getElementById("news-container");
  newsContainer.innerHTML = "";

  news.slice(0, 8).forEach((item, index) => {
    const newsItem = document.createElement("div");
    newsItem.className = "news-item";
    newsItem.innerHTML = `
      <img src="${item.mainImage}" alt="${item.title}">
      <h2>${item.title}</h2>
      <p>${item.description}</p>
      <p><strong></strong> ${item.date}</p>
      <button onclick="viewNewsDetail(${index})">Детальніше</button>
    `;
    newsContainer.appendChild(newsItem);
  });
}

// Функція для видалення новини
function deleteNews(index) {
  const password = prompt("Введіть пароль адміністратора для видалення новини:");
  
  if (password === adminPassword) {
    const news = JSON.parse(localStorage.getItem("news"));
    news.splice(index, 1); // Видаляємо новину з масиву
    localStorage.setItem("news", JSON.stringify(news)); // Оновлюємо localStorage
    displayNews(); // Оновлюємо відображення новин
    alert("Новина видалена!");
  } else {
    alert("Неправильний пароль!");
  }
}

// Функція для відображення всіх новин на сторінці all-news.html
function displayAllNews() {
  const allNewsContainer = document.getElementById("all-news-container");
  allNewsContainer.innerHTML = "";

  news.forEach((item, index) => {
    const newsItem = document.createElement("div");
    newsItem.className = "news-item";
    newsItem.innerHTML = `
      <img src="${item.mainImage}" alt="${item.title}">
      <h2>${item.title}</h2>
      <p>${item.description}</p>
      <p>${item.date}</p>
      <button onclick="viewNewsDetail(${index})">Детальніше</button>
    `;
    allNewsContainer.appendChild(newsItem);
  });
}

// Функція для переходу на сторінку детальної новини
function viewNewsDetail(index) {
  localStorage.setItem("currentNews", JSON.stringify(news[index]));
  window.location.href = "news-detail.html";
}

// Функція для перегляду всіх новин
function viewAllNews() {
    window.location.href = "all-news.html"; // Перехід на сторінку всіх новин
}

// Функція для відображення новин на головній сторінці
function displayNews() {
    const newsContainer = document.getElementById("news-container");
    newsContainer.innerHTML = ""; // Очищення контейнера

    const news = JSON.parse(localStorage.getItem("news")) || [];
    const maxNewsToShow = 9; // Максимальна кількість новин для відображення
    const recentNews = news.slice(0, maxNewsToShow); // Вибір останніх новин

    recentNews.forEach(item => {
        const newsItem = document.createElement("div");
        newsItem.className = "news-item";
        newsItem.innerHTML = `
            
            <img src="${item.mainImage}" alt="${item.title}" style="width: 390px; height: 230px;">
            <p>${item.date}</p>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <button><a href="news-detail.html?title=${encodeURIComponent(item.title)}">Детальніше</a></button>
        `;
        newsContainer.appendChild(newsItem);
    });
}

// Виклик функції для відображення новин при завантаженні сторінки
displayNews();



