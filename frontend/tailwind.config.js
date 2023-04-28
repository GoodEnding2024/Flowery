/** @type {import('tailwindcss').Config} */
module.exports = {
  // 템플릿 파일의 경로 설정 👀
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sub: "#FFFAF5",
        b_bottom: "#EADED0",
      },
    },
  },
  plugins: [],
};
