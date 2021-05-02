"use strict";

let news;
let newsItem;

let urlParams = new URLSearchParams(window.location.search);
let urlSlug = urlParams.get("p");

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
  news.forEach(newsItem => {
    if (newsItem.slug == urlSlug) {
      if (newsItem.better_featured_image == null) {
        document.querySelector("[data-news=featured-image]").src =
          "images/post_error.jpg";
      } else {
        if (newsItem.better_featured_image.media_details.width < 768) {
          document.querySelector("[data-news=featured-image]").src =
            newsItem.better_featured_image.media_details.sizes.medium.source_url;
        } else {
          document.querySelector("[data-news=featured-image]").src =
            newsItem.better_featured_image.media_details.sizes.medium_large.source_url;
        }
        if (newsItem.better_featured_image.media_details.width < 300) {
          document.querySelector("[data-news=featured-image]").src =
            newsItem.better_featured_image.media_details.sizes.thumbnail.source_url;
        }
      }

      document.querySelector("[data-news=title]").textContent =
        newsItem.title.rendered;

      document.querySelector("[data-news=page-title]").textContent =
        newsItem.title.rendered;

      document.querySelector("[data-stirub]").textContent =
        newsItem.title.rendered;

      if (newsItem.acf.category == "Events") {
        document.querySelector("[data-news=caption]").innerHTML =
          newsItem.date.substr(0, 10) +
          "&#8195;|&#8195;" +
          newsItem.acf.category;
      } else {
        document.querySelector("[data-news=caption]").innerHTML =
          newsItem.date.substr(0, 10) + "&#8195;|&#8195;News";
      }
      document.querySelector("[data-news=article]").innerHTML =
        newsItem.content.rendered;
    }
  });
}
