# Tất Cả Các Bước Set Up Dự Án ReactJs

# 1. Tạo project bằng create-react-app 
```
npx create-react-app <your-app-name>
```
# 2. Cài đặt customize-cra
- khi sử dụng công cụ ["create-react-app"]() đã được thư viện này xây dựng sẵn cấu hình web pack rồi 
- trong tương lai muốn custome cấu hình của web pack thi làm như thế nào 
    - chỉ có lựa chọn chạy câu lệnh: ["npm eject"]() (bung hết cấu trúc web pack ra ngoài) 
    - bất đắc dĩ mới làm cách này 
- <kbd>Solution</kbd>: sử dụng công cụ Custome-cra    
    - công cụ này giúp override các config của thư viện webpack bằng cách export những function được override 
- ["1. cài hai thư viện"]()
```
npm i customize-cra react-app-rewired --dev
```
- ["2. tạo file config-overrides.js trong thư mục gốc"]()
```js
// dán vào trong file đó, hiện tại chưa có custome cấu hình gì của webpack 
module.exports = function override(config, env) {
    //do stuff with the webpack config...
    return config;
}
```
- ["3. thay đổi câu lệnh"]()
```js
/* package.json */
thay react-scripts -> react-app-rewired -> trong file package.json 

```
- ["4. chạy lại project "]()
```
npm start
```
# 3. Setting babel-plugin-module-resolver
- giúp import các đường dẫn nhanh hơn, gọn gàng hơn 
```js
// Use this:
import MyUtilFn from 'utils/MyUtilFn';
// Instead of that:
import MyUtilFn from '../../../../utils/MyUtilFn';
```
```
npm install --save-dev babel-plugin-module-resolver
```
- ["1. tạo .babelrc tại thư mục gốc "]()
```js
// phải ngang cấp với src 
// nguyên lý của cấu hình này là:
// khi import như này 
import MyUtilFn from 'utils/MyUtilFn';
// thì vẫn hiểu tìm được file như này 
import MyUtilFn from '../../../../utils/MyUtilFn';

{
  "plugins": [
    ["module-resolver", {
      "alias": {
        "~": "./src"
      }
    }]
  ]
}
```
- ["2. tự động gợi ý đường dẫn"]()
- tạo file jsconfig.json trong root 
```js
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "~/*": ["src/*"]
    }
  }
}
```
- ["3. tùy chỉnh chỉnh cấu hình webpack để nạp file .baelrc vào project"]()
```js
const {
    override
} = require("customize-cra");

module.exports = override(

);
```

# 4. Cài đặt và cấu hình Prettier trên VS Code
1. cài đặt extension prettier
2. .prettierrc -> thư mục root 
```js
{
    "arrowParens": "always",
    "bracketSameLine": false,
    "bracketSpacing": true,
    "embeddedLanguageFormatting": "auto",
    "htmlWhitespaceSensitivity": "css",
    "insertPragma": false,
    "jsxSingleQuote": false,
    "printWidth": 120,
    "proseWrap": "preserve",
    "quoteProps": "as-needed",
    "requirePragma": false,
    "semi": true,
    "singleQuote": true,
    "tabWidth": 4,
    "trailingComma": "all",
    "useTabs": false,
    "vueIndentScriptAndStyle": false
}
```
3. .vscode/settings.json
```js
{
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

# 4. Cấu hình sử dụng CSS, SASS 
- ["1. Tạo Global StyleComponent"]()
- ["2. Cài đặt thư viện Scss"]()
```js
npm i -D sass
```
- xóa App.css
- xóa index.css
- xóa logo.svg 
- ["3. Reset Css"]()
  - cài thư viện normalize 
```js
npm i --save normalize.css
```
- ["4. Set font-family, font-size, line-height"]()
- ["5. cài đặt thư viện clsx"]()
```js
npm i clsx  

// cách dùng 
// truyền class vào hàm clsx, các class cách nhau bằng dấu cách 
<button className={clsx(styles.btn, styles.active)}>Click me</button>

// clsx còn giúp sử lý class động - (nghĩa là class lúc có lúc không)
<button className={clsx(styles.btn, {
  [styles.active]: false
})}>Click me</button>

```


# 5. Cấu hình Router và xây dựng cơ chế tải Layout cho dự án Tiktok tại F8
- Phân tích layout 
- cài đặt react-router-dom
- đưa cấu hình routes ra bên ngoài
- xây dựng cơ chế tải layout 
    - mỗi <Route/> sẽ ở Layout chính, <Route/> nào không có layout chính sẽ được xử lý khác  


