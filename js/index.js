"use strict";

let news;
let newsItem;

let newsTemplate = document.querySelector("[data-news=template]");
let newsContainer = document.querySelector(".news-container");

document.addEventListener("DOMContentLoaded", init);

function init() {
  newsData();
}

async function newsData() {
  let jsonData = await fetch(
    "http://midberg.com/wordpress/wp-json/wp/v2/posts?per_page=100"
  );

  news = await jsonData.json();

  showNews();
}

function showNews() {
  news.slice(0, 3).forEach(newsItem => {
    let clone = newsTemplate.cloneNode(true).content;
    let yourString = newsItem.excerpt.rendered;
    let maxLength = 130;
    let trimmedString = yourString.substr(0, maxLength);

    clone.querySelector(".news-thumbnail").addEventListener("click", () => {
      window.location.href = "article.html?p=" + newsItem.slug;
    });

    clone.querySelector("[data-news=more]").href =
      "article.html?p=" + newsItem.slug;

    if (newsItem.better_featured_image == null) {
      clone.querySelector("[data-news=thumbnail]").src =
        "images/post_error.jpg";
    } else {
      if (newsItem.better_featured_image.media_details.width < 768) {
        clone.querySelector("[data-news=thumbnail]").src =
          newsItem.better_featured_image.media_details.sizes.medium.source_url;
      } else {
        clone.querySelector("[data-news=thumbnail]").src =
          newsItem.better_featured_image.media_details.sizes.medium_large.source_url;
      }
      if (newsItem.better_featured_image.media_details.width < 300) {
        clone.querySelector("[data-news=thumbnail]").src =
          newsItem.better_featured_image.media_details.sizes.thumbnail.source_url;
      }
    }

    if (newsItem.title.rendered == "") {
      clone.querySelector("[data-news=title]").textContent = "";
    } else {
      clone.querySelector("[data-news=title]").textContent =
        newsItem.title.rendered;
    }

    if (newsItem.acf.category == "Events") {
      clone.querySelector("[data-news=caption]").innerHTML =
        newsItem.date.substr(0, 10) + "&#8195;|&#8195;" + newsItem.acf.category;
    } else {
      clone.querySelector("[data-news=caption]").innerHTML =
        newsItem.date.substr(0, 10) + "&#8195;|&#8195;News";
    }
    clone.querySelector("[data-news=intro]").innerHTML = trimmedString =
      trimmedString.substr(
        0,
        Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))
      ) + " ...";

    newsContainer.appendChild(clone);
  });
}
