fetch("quiz.html")
  .then((response) => response.text())
  .then((data) => {
    document.body.innerHTML += data;
    const script = document.createElement("script");
    script.src = "js/app.mjs";
    script.type = "module";
    document.head.appendChild(script);
  });
