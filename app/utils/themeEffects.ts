export const themeEffect = function () {
  console.log("themeEffect");
  if (!("theme" in localStorage)) {
    // localStorage에 theme가 없으면 시스템 설정을 따라감
    localStorage.setItem(
      "theme",
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
    );
  }

  if (localStorage.theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};
