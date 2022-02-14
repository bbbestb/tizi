/*
托盘方法

显示气泡（仅针对于Windows）
 */
const remote = require('electron').remote;
const Menu = remote.Menu;
const Tray = remote.Tray;

let tray;
let contextMenu;
function onClick_AddTray()
{
    if(tray != undefined) {
        return;
    }
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

    //  气泡消息显示事件
    tray.on('balloon-show',()=>{
        log.value += 'balloon-show\r\n';
    })

    //  气泡消息单击事件
    tray.on('balloon-click',()=>{
       log.value += 'balloon-click\r\n';
    });

    // 气泡消息关闭事件
    tray.on('balloon-closed',()=>{
       log.value += 'balloon-closed\r\n';
    });

    //  气泡的click和closed事件是互斥的，单击气泡只会触发click事件，只有当气泡自己关闭后，才会触发closed事件
}
//  设置托盘图标
function onClick_SetIcon() {
    if(tray != undefined) {
        tray.setImage('../../../../images/note1.png')
    }
}

//  设置托盘标题（Only Mac）
function onClick_SetTitle() {
    if(tray != undefined) {
        tray.setTitle('hello world');
    }
}

// 设置托盘按下显示的图标（Only Mac）
function onClick_SetPressedImage() {
    if(tray != undefined) {
        tray.setPressedImage('../../../../images/abc.png');
    }
}
//  设置托盘的提示文本
function onClick_SetTooltip() {
    if(tray != undefined) {
        tray.setToolTip('This is a tray');
    }
}

//  移除托盘图标
function onClick_RemoveTray() {
    if(tray != undefined) {
        tray.destroy();
        tray = undefined;
    }
}

//  显示气泡（Only Windows）
function onClick_DisplayBalloon() {
    if(tray != undefined) {
        tray.displayBalloon({title:'有消息了',icon:'../../../../images/note.png',content:'软件更新了，\r\n请尽快下载！'});
    }
}