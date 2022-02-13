/*
使用模板创建原生应用菜单

1.  应用菜单（窗口菜单）
Windows、Linux和Mac OS X
2.  上下文菜单

1. 模板

2. 代码

electron-packager

npm install electron-packager -g

dmg、exe


 */
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
function createWindow() {
    win = new BrowserWindow({width:800,height:600});
    win.loadFile('index.html');

    //  定义菜单模板
    const template = [
        {label:'文件',
            submenu:[
                {
                    label:'关于',
                   // role:'about',  // Only Mac
                    click:()=>{
                        var aboutWin = new BrowserWindow({width:300,height:200,parent:win,modal:true});
                        aboutWin.loadURL('https://www.baidu.com');

                    }

                },
                {
                    type:'separator'
                },
                {
                    label:'关闭',
                    accelerator:'Command+Q',
                    click:()=>{win.close()}
                }

            ]},
        {label:'编辑',submenu:[
                {
                    label:'复制',
                    click:()=>{win.webContents.insertText('复制')}
                },
                {
                    label:'剪切',
                    click:()=>{win.webContents.insertText('剪切')}
                },
                {
                    type:'separator'
                },
                {
                    label:'查找',
                    accelerator: 'Command+F',
                    click:()=>{win.webContents.insertText('查找')}
                }
                ,
                {
                    label:'替换',
                    accelerator: 'Command+R',
                    click:()=>{win.webContents.insertText('替换')}
                }


            ]}

    ];
    if(process.platform == 'darwin') {
        //  添加Mac特有的菜单项
    }
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
    win.on('closed',()=> {
        console.log('closed');
        win = null;
    });
}

app.on('ready',createWindow);
app.on('window-all-closed',()=>{
    console.log('window-all-closed');
    if(process.platform != 'darwin') {
      app.quit();
    }
});

app.on('activate',() =>{
    console.log('activate');
    if(win == null) {
        createWindow();
    }
})

