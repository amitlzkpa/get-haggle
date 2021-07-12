<template>
  <div>
    <h1>Square Store Plugin</h1>
    <div id="square-store-snippet-container"></div>
  </div>
</template>

<script>
let BASE_PATH =
  process.env.NODE_ENV === "development" ? "/" : "https://get-haggle.web.app/";

export default {
  data() {
    return {};
  },
  async mounted() {
    let c = document.getElementById("square-store-snippet-container");

    let script = document.createElement("script");
    script.onload = function() {
      // console.log("Script loaded---------------------");
    };

    let scriptUrl = `${BASE_PATH}square-snippet.js`;
    console.log(scriptUrl);
    script.src = scriptUrl;
    c.appendChild(script);
  }
};
</script>