const baseUrl = "https://argo-workflows.readthedocs.io/";
const unreleasedVersionMessage =
  "You are viewing the docs for an unreleased version of Argo Workflows, <a href='" +
  baseUrl +
  "en/stable/'>click here to go to the latest stable version.</a>";

function setBanner() {
  let headerHeight =
    document.getElementsByClassName("md-header")[0].offsetHeight;
  const margin = 30;
  const bannerHeight =
    document.getElementById("announce-msg").offsetHeight + margin;
  document.querySelector("header.md-header").style.top = bannerHeight + "px";
  document.querySelector("style").textContent +=
    "@media screen and (min-width: 76.25em){ .md-sidebar { height: 0;  top:" +
    (bannerHeight + headerHeight) +
    "px !important; }}";
  document.querySelector("style").textContent +=
    "@media screen and (min-width: 60em){ .md-sidebar--secondary { height: 0;  top:" +
    (bannerHeight + headerHeight) +
    "px !important; }}";
};

function setVersionMessage(version) {
  const versionMessage = "You are viewing the docs for " +
  version +
  " version of Argo Workflows, <a href='" +
  baseUrl +
  "en/stable/'>click here to go to the latest stable version.</a>";
  document.querySelector("div[data-md-component=announce]").innerHTML = versionMessage;
};

setTimeout(function () {
  const callbackName = "callback_" + new Date().getTime();
  window[callbackName] = function (response) {
    const div = document.createElement("div");
    div.innerHTML = response.html;
    document
      .querySelector(".md-header__inner > .md-header__title")
      .appendChild(div);
    let caret = document.createElement("div");
    caret.innerHTML = "<i class='fa fa-caret-down dropdown-caret'></i>";
    caret.classList.add("dropdown-caret");
    div.querySelector(".rst-current-version").appendChild(caret);
  };

  let CSSLink = document.createElement("link");
  CSSLink.rel = "stylesheet";
  CSSLink.href = "/assets/versions.css";
  document.getElementsByTagName("head")[0].appendChild(CSSLink);

  let script = document.createElement("script");
  script.src =
    baseUrl +
    "_/api/v2/footer_html/?" +
    "callback=" +
    callbackName +
    "&project=argo-workflows&page=&theme=mkdocs&format=jsonp&docroot=docs&source_suffix=.md&version=" +
    (window["READTHEDOCS_DATA"] || { version: "latest" }).version;
  document.getElementsByTagName("head")[0].appendChild(script);
}, 0);

// VERSION WARNINGS
window.addEventListener("DOMContentLoaded", function () {
  const rtdData = window["READTHEDOCS_DATA"] || { version: "latest" };
  if (rtdData.version === "latest") {
    setVersionMessage('an unreleased');
  } else if (rtdData.version !== "stable") {
    setVersionMessage('a previous');
  }
  setBanner();
});
