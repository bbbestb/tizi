/*
菜单角色（role）



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
        {
            label:'编辑',
            submenu:[
                {
                    label:'撤销',
                    role:'undo'
                },
                {
                    label:'重做',
                    role:'redo'
                },
                {
                    label:'剪切',
                    role:'cut'
                },
                {
                    label:'复制',
                    role:'copy'
                },
                {
                    label:'粘贴',
                    role:'paste'
                }

            ]
        },
        {
            label:'调试',
            submenu:[
                {
                    label:'显示调试工具',
                    role:'toggleDevTools'
                }
            ]
        },
        {
            label:'窗口',
            submenu:[
                {
                    label:'全屏显示窗口',
                    role:'toggleFullScreen'
                },
                {
                    label:'窗口放大10%',
                    role:'zoomIn'
                },
                {
                    label:'窗口缩小10%',
                    role:'zoomOut'
                }
            ]

        }
    ];
    if(process.platform == 'darwin') {
        template.unshift({
            label:'Mac',
            submenu:[
                {
                    label:'关于',
                    role:'about'
                },
                {
                    label:'开始说话',
                    role:'startSpeaking'
                },{
                  label:'停止说话',
                    role:'stopSpeaking'
                }
            ]
        })
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

