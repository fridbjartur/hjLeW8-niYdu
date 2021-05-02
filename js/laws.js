"use strict";

let members;

document.addEventListener("DOMContentLoaded", init);

function init() {
  membersData();
}

// The Laws --------
async function membersData() {
  let jsonData = await fetch(
    "http://midberg.com/wordpress/wp-json/wp/v2/pages/57"
  );

  members = await jsonData.json();

  showMembers();
}

function showMembers() {
  let dest = document.querySelector("#the-laws");

  dest.querySelector("[data-laws=title]").textContent = members.title.rendered;
  dest.querySelector("[data-laws=content]").innerHTML =
    members.content.rendered;
}
