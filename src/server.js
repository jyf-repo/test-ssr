const Vue = require('vue');
const path = require("path");
const express = require('express');
const manifest = require('../dist/ssr-manifest.json');
const renderer = require('vue-server-renderer').createRenderer();

const server = express();

const appPath = path.join(__dirname, '../dist', manifest['app.js']);
const App = require(appPath).default;

server.use("/img", express.static(path.join(__dirname, '../dist', 'img')))
server.use("/js", express.static(path.join(__dirname, '../dist', 'js')))
server.use("/css", express.static(path.join(__dirname, '../dist', 'css')))
server.use("/favicon.ico", express.static(path.join(__dirname, '../dist', 'favicon.ico')))

server.get('*', async (req, res) => {
    const app = new Vue({
        render: h => h(App),
    });
    const appContent = await renderer.renderToString(app);

    const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>Hello</title>
        <link rel='stylesheet' href='${manifest['app.css']}' />
      </head>
      <body>
        ${appContent}
      </body>
    </html>
    `;
    res.end(html);
})

server.listen(8080)