const remote = require('electron').remote;
const Menu = remote.Menu;
const Tray = remote.Tray;

let tray;
let contextMenu;
function onClick_AddTray()
{

    //  添加托盘图标
    tray = new Tray('../../../../images/open.png');
    // 为托盘图标添加上下文菜单
    contextMenu = Menu.buildFromTemplate([
        {label:'复制',role:'copy'},
        {label:'粘贴',role:'paste'},
        {label:'剪切',role:'cut'}
    ])
    tray.setToolTip('这是一个托盘应用');
    //  tray.setContextMenu(contextMenu);
    /*
    altKey：Alt键
    shiftKey：Shift键
    ctrlKey：Ctrl键
    metaKey：Meta键，在Mac OS X下是Command键，如果在Windows下，是窗口键
     */
    tray.on('right-click',(event)=>{
        textarea.value += '\r\n' + 'right-click';
        if(event.shiftKey) {
            window.open('https://geekori.com','right-click','width=300,height=200');
        } else {
            tray.popUpContextMenu(contextMenu);
        }


    })

    //  单击事件
    tray.on('click',(event)=>{
       textarea.value += '\r\n' + 'click';
       if(event.shiftKey) {
           window.open('https://www.jd.com','click','width=600,height=300');
       } else {
           tray.popUpContextMenu(contextMenu);
       }
    });

    //  Only Mac

    //  将任何东西拖动到拖动到托盘图标上是触发，例如，在word中将文字拖动到托盘图标上会触发。
    tray.on('drop',() => {
        textarea.value += '\r\n' + 'drop';
    })
    // 拖动文件
    tray.on('drop-files',(event,files)=>{
        textarea.value += '\r\n' + 'drop-files';
        for(var i = 0; i < files.length;i++) {
            textarea.value += files[i] + '\r\n';
        }
    })

    //  拖动文本
    tray.on('drop-text',(event,text)=>{
        textarea.value += '\r\n' + 'drop-text\r\n';
        textarea.value += text;
    })
}

