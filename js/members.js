"use strict";

let members;

document.addEventListener("DOMContentLoaded", init);

function init() {
  membersData();
}

async function membersData() {
  let jsonData = await fetch(
    "http://midberg.com/wordpress/wp-json/wp/v2/pages/43"
  );

  members = await jsonData.json();

  showMembers();
}

function showMembers() {
  let dest = document.querySelector("#_members");

  dest.querySelector("[data-members=title]").textContent =
    members.title.rendered;
  dest.querySelector("[data-members=content]").innerHTML =
    members.content.rendered;
}
