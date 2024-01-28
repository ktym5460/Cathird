
//初期化
var objectDataArray = [];
var objectTempSaveArray = [];

var holeDataArray = [];
holeDataArray.push({ type: "penUp" });

var holeTempSaveArray = [];


var circuitDataArray = [];
circuitDataArray.push({ type: "penUp" });
var circuitTempSaveArray = [];

var selectedPoint = null; // 選択された点
var selectedPointType = null;
var selectedDistance;

modeMove1 = document.getElementById('move1');
modeStraight = document.getElementById('straight1');
modeCurve = document.getElementById('curve1');
modePicture = document.getElementById('picture');
modeParts = null;

modeMove2 = document.getElementById('move2');
modeHoleStraight = document.getElementById('straight2');
modeHoleCurve = document.getElementById('curve2');

modeMove3 = document.getElementById('move3');
modeWireStraight = document.getElementById('straight3');
modeWireCurve = document.getElementById('curve3');

partsAngleDisplayFlug = true;

let checkedTabNum = "1";
let changeRate = "1"

//キャンバスエリアの設定
const canvas0 = document.getElementById("canvas0-area");
const ctx0 = canvas0.getContext('2d');
const canvas1 = document.getElementById("canvas1-area");
const ctx1 = canvas1.getContext('2d');
const canvas2 = document.getElementById("canvas2-area");
const ctx2 = canvas2.getContext('2d');
const canvas3 = document.getElementById("canvas3-area");
const ctx3 = canvas3.getContext('2d');


ctx1.lineWidth = 2;
ctx3.lineWidth = 2;

cursorColor = "#2c2300";
CursorSize = "4";

controlPointColor = "#326EFF";
controlPointSize = "3";

surfaceColor = "#FFD13180"
holeColor = "#ffffff80";
surfaceHoleColor = "#ffffff";
dentColor = "#7E630080";

markPointColor = "red";
markPointSize = "4";

lineColor = "#2c2300";
lineWidth = "2.5";
holeLineWidth = "1";
dentLineWidth = "1";

straightPointColor = "#2c2300";
straightPointSize = "45";

curvePointColor = "#2c2300";
curvePointSize = "4";

partsPointColor = "#2c2300";
partsPointSize = "4";

snapPointColor = "#2c2300";
snapPointSize = "1";

//パーツ設定
var parts = {
    resistance: {
        type: "resistance",
        picSource: "PicSource/Parts/resistance.png",
        width: 71,
        height: 23,
        hole: {
            1: {
                holeLength: 48,
                holeAngle: 0,
                holeR: 10,
                holeType: true,

                snapLength: 80,
                snapAngle: 0,
                snapWidth: 50,
                snapHeight: 20

            },
            2: {
                holeLength: 48,
                holeAngle: 180,
                holeR: 10,
                holeType: true,

                snapLength: 80,
                snapAngle: 180,
                snapWidth: 50,
                snapHeight: 20
            }
        },
        modelSource: `translate([0,0,-t])
        union(){
        linear_extrude(height = t )
            polygon([[-2.1,1.5],[2.1,1.5],[2.1,-1.5],[-2.1,-1.5]]);
        translate([-2.6,0,0])
        cylinder(h = t, r=1.6);
        translate([2.6,0,0])
        cylinder(h = t, r=1.6);
        }`

    },
    led: {
        type: "led",
        picSource: "PicSource/Parts/led.png",
        width: 50,
        height: 50,
        hole: {
            1: {
                holeLength: 22.5,
                holeAngle: 0,
                holeR: 10,
                holeType: true,

                snapLength: 80,
                snapAngle: 0,
                snapWidth: 50,
                snapHeight: 20
            },
            2: {
                holeLength: 22.5,
                holeAngle: 180,
                holeR: 10,
                holeType: true,

                snapLength: 80,
                snapAngle: 180,
                snapWidth: 50,
                snapHeight: 20
            }
        },
        modelSource: `translate([0,0,-t])
        cylinder(h = t, r=3.1);
        `
    },
    tactSwitch: {
        type: "tactSwitch",
        picSource: "PicSource/Parts/tactSwitch.png",
        width: 60,
        height: 60,
        hole: {
            1: {
                holeLength: 30,
                holeAngle: 0,
                holeR: 10,
                holeType: true,

                snapLength: 60,
                snapAngle: 0,
                snapWidth: 50,
                snapHeight: 20
            },
            2: {
                holeLength: 30,
                holeAngle: 180,
                holeR: 10,
                holeType: true,

                snapLength: 60,
                snapAngle: 180,
                snapWidth: 50,
                snapHeight: 20
            }
        },
        modelSource: `translate([0,0,-t])
        linear_extrude(height = t )
            polygon([[2.1,3.6],[3.6,2.1],[3.6,-2.1],[2.1,-3.6],[-2.1,-3.6],[-3.6,-2.1],[-3.6,2.1],[-2.1,3.6]]);`
    },

    slideSwitch: {
        type: "slideSwitch",
        picSource: "PicSource/Parts/slideSwitch.png",
        width: 85,
        height: 37,
        hole: {
            1: {
                holeLength: 25,
                holeAngle: 0,
                holeR: 10,
                holeType: true,

                snapLength: 50,
                snapAngle: 90,
                snapWidth: 50,
                snapHeight: 20
            },
            2: {
                holeLength: 25,
                holeAngle: 180,
                holeR: 10,
                holeType: true,

                snapLength: 50,
                snapAngle: 90,
                snapWidth: 50,
                snapHeight: 20
            },
            3: {
                holeLength: 0,
                holeAngle: 0,
                holeR: 10,
                holeType: true,

                snapLength: 50,
                snapAngle: 90,
                snapWidth: 50,
                snapHeight: 20
            }

        },
        modelSource: `translate([0,0,-t])
        linear_extrude(height = t )
            polygon([[4.85,2.35],[4.85,-2.35],[-4.85,-2.35],[-4.85,2.35]]);`
    },

    batteryBox: {
        type: "batteryBox",
        picSource: "PicSource/Parts/batteryBox.png",
        width: 275,
        height: 220,
        hole: {
            1: {
                holeLength: 110,
                holeAngle: 0,
                holeR: 10,
                holeType: true,

                snapLength: 60,
                snapAngle: 0,
                snapWidth: 50,
                snapHeight: 20
            },
            2: {
                holeLength: 90,
                holeAngle: 180,
                holeR: 10,
                holeType: true,

                snapLength: 60,
                snapAngle: 180,
                snapWidth: 50,
                snapHeight: 20
            }
        },
        modelSource: `translate([-1.5,0,-t-2.1])

        union(){
            union(){
                cylinder(h = t, r=11);
                translate([10,0,0])
                    linear_extrude(height = t+1.9 )
                        polygon([[0,3],[6,3],[6,-3],[0,-3]]);
                
                translate([8,5,t])
                cylinder(h = 2.1, r=1);
                translate([-8,5,t])
                cylinder(h = 2.1, r=1);
                translate([0,-9,t])
                cylinder(h = 2.1, r=1);
                translate([-8,0,0])
                    linear_extrude(height = t+1.9 )
                        polygon([[0,3],[3,3],[3,-3],[0,-3]]);
            };
            
        };`
    },
    batteryBox2: {
        type: "batteryBox2",
        picSource: "PicSource/Parts/batteryBox2.png",
        width: 302,
        height: 385,
        hole: {
            1: {
                holeLength: 198,
                holeAngle: 75.3,
                holeR: 10,
                holeType: false,

                snapLength: 60,
                snapAngle: 45,
                snapWidth: 50,
                snapHeight: 20
            },
            2: {
                holeLength: 198,
                holeAngle: 104.7,
                holeR: 10,
                holeType: true,

                snapLength: 60,
                snapAngle: 135,
                snapWidth: 50,
                snapHeight: 20
            }
        },
        modelSource: `
        translate([0,0,-t + partsBaseThin+t/2]){
            rotate([0,0,180])
            union(){
            difference(){
                    translate([0,-14.5,-t/2]){
                    linear_extrude(height = t )
                        polygon([[15,15],[15,-4],[-15,-4],[-15,15]]);
                     translate([0,15,0])
                         linear_extrude(height = t )
                            circle(r=15);
                        translate([0,30,0])
                            linear_extrude(height = t )
                                circle(r=4);
                       
                    }
                    
                    translate([0,-14.5,-0.8])
                    linear_extrude(height = 1.6 )
                       polygon([[15,4],[15,-4],[-15,-4],[-15,4]]);
                }
                
              
                translate([10,-14.5,-t/2])
                            linear_extrude(height = t)
                            circle(r=1);
                
                translate([-10,-14.5,-t/2])
                            linear_extrude(height = t)
                            circle(r=1);
                }
          }`
    },

    joint: {
        type: "joint",
        picSource: "",
        width: 0,
        height: 0,
        hole: {
            1: {
                holeLength: 0,
                holeAngle: 0,
                holeR: 10,
                holeType: false,

                snapLength: 50,
                snapAngle: 0,
                snapWidth: 50,
                snapHeight: 20
            },
            2: {
                holeLength: 0,
                holeAngle: 180,
                holeR: 10,
                holeType: false,

                snapLength: 50,
                snapAngle: 180,
                snapWidth: 50,
                snapHeight: 20
            },
            3: {
                holeLength: 0,
                holeAngle: 90,
                holeR: 10,
                holeType: false,

                snapLength: 50,
                snapAngle: 90,
                snapWidth: 50,
                snapHeight: 20
            }

        },
        modelSource: ""
    }

}

//Canvasの大きさを設定する
let w, h, scale;
function setCanvasSize() {
    w = $('.wrapper').width();
    h = $('.wrapper').height();
    $('#canvas0-area').attr('width', w);
    $('#canvas0-area').attr('height', h);
    $('#canvas1-area').attr('width', w);
    $('#canvas1-area').attr('height', h);
    $('#canvas2-area').attr('width', w);
    $('#canvas2-area').attr('height', h);
    $('#canvas3-area').attr('width', w);
    $('#canvas3-area').attr('height', h);

    scale = h / 800;
    ctx0.scale(scale, scale);
    ctx1.scale(scale, scale);
    ctx2.scale(scale, scale);
    ctx3.scale(scale, scale);
}




var images = {};

//回路部品の画像を事前にロードする
function imgLoad(parts) {
    // プロパティ名を取得し、配列として保持
    const keys = Object.keys(parts);

    // 配列keysをループ処理して、プロパティ名を取り出し、それに基づいて値にアクセスする
    for (let i = 0; i < keys.length; i++) {
        const propertyName = keys[i];
        images["img" + parts[propertyName].type] = new Image();
        images["img" + parts[propertyName].type].src = parts[propertyName].picSource;
    }
}

let wrapperFirstWidth, wrapperFirstHeight;
//ページがロードされたとき動く
window.onload = function () {
    tabChange("tab1");
    pushTools();
    buttonCSS(objectDataArray, objectTempSaveArray);
    setCanvasSize();
    imgLoad(parts);
    wrapperFirstWidth = w;
    wrapperFirstHeight = h;
};

//ページサイズが変更されたときに動く
window.onresize = function () {
    if (layerData) {
        imgLayer.src = layerData;
    }
    setCanvasSize();
    allReDraw();
};


//タブが押された場合動く
function tabChange(tabNumber) {
    document.getElementById("tab1tools").style.display = "none";
    document.getElementById("tab2tools").style.display = "none";
    document.getElementById("tab3tools").style.display = "none";
    document.getElementById(tabNumber + "tools").style.display = "block";

    //detail_menuを非表示にする。
    document.getElementById("detail_display").checked = true;
    detail_display('detail_menu1');

    // 描画Canvasを非表示にする
    canvas1.style.display = "none";
    canvas2.style.display = "none";
    canvas3.style.display = "none";

    //outPutボタンを非表示にする
    document.getElementById("button_outPut").style.display = "none";

    if (tabNumber == "tab1") {
        modeMove1.checked = true;
        canvas1.style.display = "block";
    }

    //タブ2が選択されていたらキャンバス1,2を描画しオブジェクトの幅、高さをinputに入れる
    if (tabNumber == "tab2") {
        modeMove2.checked = true;
        canvas1.style.display = "block";
        canvas2.style.display = "block";
    }

    if (tabNumber == "tab3") {
        modeMove3.checked = true;
        canvas1.style.display = "block";
        canvas2.style.display = "block";
        canvas3.style.display = "block";
        document.getElementById("button_outPut").style.display = "block";   //outPutボタンを表示する
    }

    allReDraw();
}

//picture_displayが押されたら動く
function picture_display() {
    if (document.getElementById("picture_display").checked) {
        canvas0.style.display = "none";
    }

    else {
        canvas0.style.display = "block";
    }
}

//detail_displayが押されたら動く
function detail_display(id) {
    if (document.getElementById("detail_display").checked) {
        document.getElementById(id).style.display = "none";

    }
    else {
        document.getElementById(id).style.display = "block";
        reloadSize();
    }

}

// 画像選択後に呼ばれるイベント
let layerData;
let imgLayer = new Image();
let imgLayerScale, imgLayerWPosition, imgLayerHPosition, imgLayerW, imgLayerH;

//背景画像を読み込む
function layerPicLoad(input) {
    console.log(input);
    const file = input.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            console.log("DrawPic");
            let imgLayerLayerCounter = 0;

            imgLayer.onload = function () {
                if (imgLayerLayerCounter == 0) {
                    imgLayerScale = 720 / imgLayer.height;

                    imgLayerW = imgLayerScale * imgLayer.width;
                    imgLayerH = imgLayerScale * imgLayer.height;


                    imgLayerWPosition = (wrapperFirstWidth / scale - imgLayerW) / 2;
                    imgLayerHPosition = (wrapperFirstHeight / scale - imgLayerH) / 2;

                    imgLayerLayerCounter = 1;
                    ctx0.clearRect(0, 0, canvas0.width / scale, canvas0.height / scale);

                }
                ctx0.globalAlpha = 0.5;
                ctx0.drawImage(imgLayer, imgLayerWPosition, imgLayerHPosition, imgLayerW, imgLayerH);
                document.getElementById("picture_display").checked = false;
            };

            imgLayer.src = e.target.result;
            layerData = imgLayer.src;
        };

        reader.readAsDataURL(file);
    }
}

//ゴミ箱ボタンが押されたら動く
function allClear() {
    if (document.getElementById("tab1").checked) {
        canvas = canvas1;
        ctx = ctx1;
        array = objectDataArray;
    }
    if (document.getElementById("tab2").checked) {
        canvas = canvas2;
        ctx = ctx2;
        array = holeDataArray;
    }
    if (document.getElementById("tab3").checked) {
        canvas = canvas3;
        ctx = ctx3;
        array = circuitDataArray;
    }

    var clearConfirmAns = window.confirm('このボタンを実行するとこのエリアに描いたすべてのデータが削除されます。\n本当に削除しますか？');

    if (array && clearConfirmAns) {
        array.splice(0);
        ctx.clearRect(0, 0, canvas.width / scale, canvas.height / scale);
    }
    if (array == holeDataArray || array == circuitDataArray) {
        array.push({ type: "penUp" });
    }
}

//戻るボタンが押されたら動く
function back() {

    if (document.getElementById("tab1").checked) {
        if (objectDataArray[1]) {
            objectTempSaveArray.push(objectDataArray.slice());
            objectDataArray.pop();

            reDraw();
        }
        buttonCSS(objectDataArray, objectTempSaveArray);
    }

    if (document.getElementById("tab2").checked) {
        if (holeDataArray[1]) {
            console.log(holeDataArray);
            holeTempSaveArray.push(holeDataArray.slice());
            if (holeDataArray[holeDataArray.length - 1].type === "penUp") {
                holeDataArray.splice(-2);
            }
            else {
                holeDataArray.pop();
            }

            reDraw();

        }
        buttonCSS(holeDataArray, holeTempSaveArray);
    }

    if (document.getElementById("tab3").checked) {

        if (circuitDataArray[1]) {
            circuitTempSaveArray.push(circuitDataArray.slice());
            if (circuitDataArray[circuitDataArray.length - 1].type == "penUp") {
                circuitDataArray.pop();
            }
            while (circuitDataArray[circuitDataArray.length - 1].type === "snapPoint" ||
                circuitDataArray[circuitDataArray.length - 1].type === "holePoint" ||
                circuitDataArray[circuitDataArray.length - 1].type === "partsAngle") {

                circuitDataArray.pop();
            }
            circuitDataArray.pop();
            console.log(circuitDataArray);

            reDraw();
        }
        buttonCSS(circuitDataArray, circuitTempSaveArray);
    }

}

//進むボタンが押されたら動く
function next() {
    if (document.getElementById("tab1").checked) {

        if (objectTempSaveArray[0]) {
            objectDataArray = objectTempSaveArray.pop();
            ctx1.clearRect(0, 0, canvas1.width / scale, canvas1.height / scale);

        }
        reDraw();
        buttonCSS(objectDataArray, objectTempSaveArray);
    }
    if (document.getElementById("tab2").checked) {

        if (holeTempSaveArray[0]) {
            holeDataArray = holeTempSaveArray.pop();
            ctx2.clearRect(0, 0, canvas2.width / scale, canvas2.height / scale);

        }
        reDraw();
        buttonCSS(holeDataArray, holeTempSaveArray);
    }
    if (document.getElementById("tab3").checked) {
        if (circuitTempSaveArray[0]) {
            circuitDataArray = circuitTempSaveArray.pop();
            ctx3.clearRect(0, 0, canvas3.width / scale, canvas3.height / scale);

        }
        reDraw();
        buttonCSS(circuitDataArray, circuitTempSaveArray);
    }

}

let partsId;
let partsData;
//toolsが押された場合場合動く
function pushTools(id) {

    // 点の初期位置   
    let x = canvas1.width / scale / 2; let y = canvas1.height / scale / 2;
    partsId = "";
    partsData = [];

    if (id) {
        console.log(id + "モードが選択されました");
        if (parts[id]) {    //partの中に一致するidの要素があるとき
            partsId = id;
            partsData = parts[partsId];
        }
    }
}

// キャンバス要素を取得してイベントリスナーを追加する
const canvasList = document.querySelectorAll('.canvas-area');
canvasList.forEach((canvas, index) => {
    canvas.addEventListener('click', handleLeftClick);
    canvas.addEventListener('contextmenu', handleRightClick);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('touchend', handleMouseUp);

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('touchstart', handleMouseDown);

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchmove', handleMouseMove);
});

//チェックされているタブを数字（1～3）で返す
function checkedTab() {
    let tabs = ["tab1", "tab2", "tab3"];
    let checkedTabIndex = tabs.findIndex(tab => document.getElementById(tab).checked) + 1;
    let dataArray = "";

    if (checkedTabIndex == 1) {
        dataArray = objectDataArray;
    }

    else if (checkedTabIndex == 2) {
        dataArray = holeDataArray;
    }

    else if (checkedTabIndex == 3) {
        dataArray = circuitDataArray;
    }

    return [Number(checkedTabIndex), dataArray];
}

//マウスが動いているときに動く関数
function handleMouseMove(event) {
    let [checkedTabNum, dataArray] = checkedTab();
    let canvas = document.getElementById("canvas" + checkedTabNum + "-area");
    let ctx = canvas.getContext('2d');
    canvas.style.cursor = 'default';//カーソルを変更

    // イベントがタッチイベントの場合
    if (event.touches && event.touches.length === 1) {
        clientX = event.touches[0].clientX;
        clientY = event.touches[0].clientY;
    } else { // タッチイベントでない場合はマウスイベントの座標を使用する
        clientX = event.clientX;
        clientY = event.clientY;
    }
    // タッチイベントの場合も考慮した座標の取得
    x = (clientX - (canvas.getBoundingClientRect().left)) / scale;
    y = (clientY - canvas.getBoundingClientRect().top) / scale;


    reDraw();
    cursorDraw(x, y);

    if (document.getElementById('move' + checkedTabNum).checked) {
        canvas.style.cursor = 'move';
    }

    //Partsが選択されているとき
    else if (document.getElementById(partsId) && document.getElementById(partsId).checked) {
        drawParts(ctx, x, y, 0, partsData);
    }

    else {
        //マウスの位置に点を表示     
        drawPoint(x, y, cursorColor, CursorSize, ctx);
    }

    //カーソルが点に近いとき点の色を変える
    if (dataArray[1]) {
        for (point of dataArray) {
            if (document.getElementById('move' + checkedTabNum).checked || dataArray[dataArray.length - 1].type == "penUp") {//ペンupされているとき、またはmoveモードのとき
                let distance = distancePoints(x, y, point.x, point.y);

                if (distance < 10 && point.type != "holePoint") {

                    if (point.type == "partsAngle") {   //回転ポイントにカーソルが当たったときは画像を赤いものに差し替えれる
                        if (partsAngleDisplayFlug == true && parts[point.partsType].width != 0 && parts[point.partsType].height != 0) {
                            var img = new Image();
                            img.src = "PicSource/rotateHighlight.png";
                            // 画像を描画

                            ctx.beginPath();
                            ctx.save();
                            ctx.translate(point.x, point.y);
                            ctx.rotate(Number(pointPrevious.angle) * Math.PI / 180);

                            ctx.drawImage(img, 0 - 10, 0 - 10, 20, 20);
                            ctx.restore();
                        }
                    }
                    else {
                        drawPoint(point.x, point.y, markPointColor, markPointSize, ctx);
                    }
                    if (document.getElementById('move' + checkedTabNum).checked) {
                        canvas.style.cursor = 'grab'
                    }

                }

                else if (point.type == "curve") {
                    let distance = distancePoints(x, y, point.cx, point.cy);

                    if (distance < 10) {
                        drawPoint(point.cx, point.cy, markPointColor, markPointSize, ctx);
                        ctx.beginPath();
                        ctx.strokeStyle = controlPointColor;
                        ctx.lineWidth = lineWidth;
                        curve(pointPrevious.x, pointPrevious.y, point.x, point.y, point.cx, point.cy, ctx);
                        if (document.getElementById('move' + checkedTabNum).checked) {
                            canvas.style.cursor = 'grab'
                        }
                    }
                }

                else if (point.type == "parts") {
                    markParts(x, y, point);
                }
            }

            else if (point.x != dataArray[dataArray.length - 1].x && point.y != dataArray[dataArray.length - 1].y) {
                let distance = distancePoints(x, y, point.x, point.y);

                if (distance < 10) {
                    drawPoint(point.x, point.y, markPointColor, markPointSize, ctx);
                }
            }
            pointPrevious = point;
        }
    }

    //selectedPointにデータがあるとき座標を置き換える
    if (selectedPoint) {
        canvas.style.cursor = 'grabbing';//カーソルを変更


        if (selectedPointType == "Control") {
            selectedPoint.cx = x;
            selectedPoint.cy = y;
        }
        else if (selectedPointType == "rotateParts" && selectedPoint.x && selectedPoint.y) {
            partsAngleDisplayFlug = false;

            selectedPoint.angle = calcAngle(selectedPoint.x, selectedPoint.y, x, y) + 90;

            if (parts[selectedPoint.partsType].width != 0 && parts[selectedPoint.partsType].height != 0) {
                var img = new Image();
                img.src = "PicSource/rotateHighlight.png";
                // 画像を描画

                ctx.beginPath();
                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(Number(selectedPoint.angle) * Math.PI / 180);

                ctx.drawImage(img, 0 - 10, 0 - 10, 20, 20);
                ctx.restore();

            }
        }

        else if (selectedPointType == "rotateSnap") {
            selectedPoint.angle = calcAngle(selectedPoint.x, selectedPoint.y, x, y);
        }
        else if (selectedPointType == "parts") {
            selectedPoint.x = x + selectedDistance[0];
            selectedPoint.y = y + selectedDistance[1];
        }
        else {
            selectedPoint.x = x;
            selectedPoint.y = y;
        }
    }

    else {
        partsAngleDisplayFlug = true;
    }

}

//ショートカットを設定
document.addEventListener('keydown', event => {
    if (event.key === "Tab") {
        console.log("ODA:", objectDataArray, "\nHDA:", holeDataArray, "\nCDA:", circuitDataArray);
    }

    if (event.ctrlKey && event.key === 'z') {
        back();
    }
    if (event.ctrlKey && event.key === 'y') {
        next();
    }
    if (event.ctrlKey && event.key === 's') {
        arrayExport();
    }
    if (event.ctrlKey && event.key === 'o') {
        outPut();
    }

});


//マウスダウンしたときに動く関数
function handleMouseDown(event) {
    let [checkedTabNum, dataArray] = checkedTab();
    // イベントがタッチイベントの場合
    if (event.touches && event.touches.length === 1) {
        clientX = event.touches[0].clientX;
        clientY = event.touches[0].clientY;
    } else { // タッチイベントでない場合はマウスイベントの座標を使用する
        clientX = event.clientX;
        clientY = event.clientY;
    }

    // タッチイベントの場合も考慮した座標の取得

    x = ((clientX - document.getElementById("canvas" + checkedTabNum + "-area").getBoundingClientRect().left)) / scale;
    y = ((clientY - document.getElementById("canvas" + checkedTabNum + "-area").getBoundingClientRect().top)) / scale;

    if (document.getElementById('move' + checkedTabNum).checked) {
        [selectedPoint, selectedDistance] = findNearestPoint(x, y, dataArray);
    }
}

//マウスアップしてドラッグが終了したときに動く関数
function handleMouseUp(event) {
    let [checkedTabNum, dataArray] = checkedTab();
    if (!dataArray) {
        return;
    }

    if (document.getElementById('move' + checkedTabNum).checked) {
        if (dataArray[1]) {
            for (point of dataArray) {
                if (point.type != "penUp" && point.type != "holePoint") {
                    let distance = distancePoints(x, y, point.x, point.y);
                    if (distance < 10 && selectedPointType != "rotateParts" && selectedPointType != "rotateSnap") {
                        selectedPoint.x = point.x;
                        selectedPoint.y = point.y;
                    }
                }
            }
        }
        selectedPoint = null;
    }
    reDraw();
}

//左クリックで動く関数
function handleLeftClick(event) {
    let [checkedTabNum, dataArray] = checkedTab();
    let tempSaveArray;

    if (checkedTabNum == 1) {
        tempSaveArray = objectTempSaveArray;
    }
    else if (checkedTabNum == 2) {
        tempSaveArray = holeTempSaveArray;
    }
    else if (checkedTabNum == 3) {
        tempSaveArray = circuitTempSaveArray;
    }
    else {
        return;
    }

    // イベントがタッチイベントの場合
    if (event.touches && event.touches.length === 1) {
        clientX = event.touches[0].clientX;
        clientY = event.touches[0].clientY;
    } else { // タッチイベントでない場合はマウスイベントの座標を使用する
        clientX = event.clientX;
        clientY = event.clientY;
    }
    // タッチイベントの場合も考慮した座標の取得
    x = (clientX - document.getElementById("canvas" + checkedTabNum + "-area").getBoundingClientRect().left) / scale;
    y = (clientY - document.getElementById("canvas" + checkedTabNum + "-area").getBoundingClientRect().top) / scale;


    if (document.getElementById('straight' + checkedTabNum).checked) {  //直線モードが選ばれているとき
        dataArray.push({ type: "straight", x: x, y: y });
    }

    else if (document.getElementById('curve' + checkedTabNum).checked) {    //曲線モードが選ばれているとき
        if (dataArray[0]) {
            var controlx = (x + dataArray[dataArray.length - 1].x) / 2;
            var controly = (y + dataArray[dataArray.length - 1].y) / 2;
        }
        dataArray.push({ type: "curve", x: x, y: y, cx: controlx, cy: controly });
    }

    else if (partsId && document.getElementById(partsId).checked) {  //パーツモードが選ばれているとき

        pushParts(dataArray, x, y, partsData);
        handleRightClick();
    }


    //最後の点と最初の点の距離が20以下だと最後の点の座標を最初の点のものに置き換える。
    if (objectDataArray[1] && x != objectDataArray[0].x && y != objectDataArray[0].y) {
        let distance = distancePoints(x, y, objectDataArray[0].x, objectDataArray[0].y);
        if (distance < 10) {
            objectDataArray[objectDataArray.length - 1].x = objectDataArray[0].x;
            objectDataArray[objectDataArray.length - 1].y = objectDataArray[0].y;
            document.getElementById('move' + checkedTabNum).checked = true;
        }
    }

    // クリック点が配列内の点と近いとき最後の値をその値に置き換える
    if (dataArray[1] && document.getElementById('move' + checkedTabNum).checked != true) {
        for (point of dataArray) {
            let distance = distancePoints(x, y, point.x, point.y);
            if (distance < 10) {
                dataArray[dataArray.length - 1].x = point.x;
                dataArray[dataArray.length - 1].y = point.y;
                // document.getElementById('move' + checkedTabNum).checked = true;
            }
        }
    }

    // TempSaveDataを消す
    if (tempSaveArray) {
        tempSaveArray.splice(0);
        buttonCSS(dataArray, tempSaveArray);
    }

    reDraw();
}

//右クリックで動く関数
function handleRightClick(event) {
    let [checkedTabNum, dataArray] = checkedTab();
    if (checkedTabNum) {
        document.getElementById('move' + checkedTabNum).checked = true;
        pushTools('move' + checkedTabNum);
    }
    if (checkedTabNum == 3) {
        if (dataArray[dataArray.length - 1].type !== "penUp") {
            dataArray.push({ type: "penUp" });
        }
    }
}

//点描画する関数
function drawPoint(x, y, pointColor, pointSize, ctx) {
    ctx.beginPath();
    ctx.strokeStyle = pointColor;
    ctx.lineWidth = lineWidth;
    ctx.moveTo(x + Number(pointSize), y);
    ctx.arc(x, y, pointSize, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = pointColor;
    ctx.fill();
    ctx.moveTo(x, y);
}

//二次ベジェ曲線を描画する関数
function curve(x0, y0, x1, y1, x_c, y_c, ctx) {

    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    var curvePoints = [];
    for (var t = 0; t < 1; t = t + 0.025) {
        var xt = (1 - t) ** 2 * x0 + 2 * (1 - t) * t * x_c + t ** 2 * x1;
        var yt = (1 - t) ** 2 * y0 + 2 * (1 - t) * t * y_c + t ** 2 * y1;
        curvePoints.push({ x: xt, y: yt });
    }
    curvePoints.push({ x: x1, y: y1 });

    for (var i = 0; i < curvePoints.length; i++) {
        ctx.lineTo(curvePoints[i].x, curvePoints[i].y);
    }

    ctx.stroke();
}

// キャンバス上のクリック位置から最も近い点を探す関数
function findNearestPoint(x, y, array) {
    let minDistance = Infinity;
    let nearestPoint = null;
    let nearestPointI = null;
    let selectedDistance = null;

    for (let i = 0; i < array.length; i++) {
        if (array[i].type != "penUp" && array[i].type != "holePoint") {
            let distance = distancePoints(x, y, array[i].x, array[i].y);
            if (distance < minDistance) {
                minDistance = distance;
                nearestPoint = array[i];
                nearestPointI = i;
                selectedPointType = null;
            }
        }

        if (array[i].type == "curve") {
            let distance = distancePoints(x, y, array[i].cx, array[i].cy);
            if (distance < minDistance) {
                minDistance = distance;
                nearestPoint = array[i];
                nearestPointI = i;
                selectedPointType = "Control";
            }
        }
    }
    if (minDistance > 10) {
        for (var i = 0; i < array.length; i++) {
            if (array[i].type == "parts") {
                let partsWidth = parts[array[i].partsType].width;
                let partsHeight = parts[array[i].partsType].height;
                if (x > array[i].x - (partsWidth / 2) &&
                    x < array[i].x + (partsWidth / 2) &&
                    y > array[i].y - (partsHeight / 2) &&
                    y < array[i].y + (partsHeight / 2)) {

                    nearestPoint = array[i];

                    selectedDistance = [array[i].x - x, array[i].y - y];

                    nearestPointI = i;
                    selectedPointType = "parts";
                }
            }
        }
    }

    if (nearestPoint) {

        if (nearestPoint.type == "partsAngle") {
            selectedPointType = "rotateParts";
            nearestPoint = array[nearestPointI - 1];
        }

        if (nearestPoint.type == "snapPoint") {

            selectedPointType = "rotateSnap";

            nearestPoint = array[nearestPointI - array[nearestPointI].holeNum];
        }
    }
    console.log([nearestPoint, selectedDistance]);
    return [nearestPoint, selectedDistance];
}

// 与えられた二点間の距離を返す関数
function distancePoints(x1, y1, x2, y2) {
    distance = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
    return distance;
}


//現在のタブの描画を再描画する
function reDraw() {
    if (document.getElementById("detail_display").checked == false) {
        reloadSize();
    }


    let [checkedTabNum, dataArray] = checkedTab();

    let canvas = document.getElementById("canvas" + checkedTabNum + "-area")
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width / scale, canvas.height / scale);
    reDrawData(ctx, dataArray);
}

//全てのタブの描画を再描画する
function allReDraw() {
    ctx1.clearRect(0, 0, canvas1.width / scale, canvas1.height / scale);
    ctx2.clearRect(0, 0, canvas2.width / scale, canvas2.height / scale);
    ctx3.clearRect(0, 0, canvas3.width / scale, canvas3.height / scale);
    reDrawData(ctx1, objectDataArray);
    reDrawData(ctx2, holeDataArray);
    reDrawData(ctx3, circuitDataArray);
}

//再描画を司る関数
function reDrawData(ctx, array) {

    if (!array[0] || !ctx) {
        return;
    }

    ctx.beginPath();
    ctx.moveTo(array[0].x, array[0].y); // 最初の座標点へ移動       

    for (var i = 0; i < array.length; i++) {

        if (array[i].type == 'straight') { //点が直線であれば
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = lineWidth;
            ctx.lineTo(array[i].x, array[i].y);
            ctx.stroke();
        }

        if (array[i].type == 'curve') { //点が曲線であれば
            if (i != 0) {
                ctx.lineWidth = lineWidth;
                ctx.strokeStyle = lineColor;
                curve(array[i - 1].x, array[i - 1].y, array[i].x, array[i].y, array[i].cx, array[i].cy, ctx);
            }
        }

        if (array[i].type == 'penUp') {//点がpenUpであれば
            if (array[i + 1]) {
                ctx.moveTo(array[i + 1].x, array[i + 1].y);
            }

            if (array == holeDataArray) {
                penUpI = i;
                ctx2.closePath();
                ctx2.fillStyle = surfaceHoleColor;
                ctx2.fill();
                ctx2.lineWidth = lineWidth;
                ctx2.strokeStyle = lineColor;
                ctx2.stroke();
            }
        }

        if (array[i].type == 'parts') { //点がパーツであれば
            resetHoleSnap(array, i, parts[array[i].partsType]);
            drawParts(ctx, array[i].x, array[i].y, array[i].angle, parts[array[i].partsType]);

        }

        if (array[i].type == 'partsAngle' && partsAngleDisplayFlug == true && parts[array[i].partsType].width != 0 && parts[array[i].partsType].height != 0) { //点がパーツアングルであれば
            var img = new Image();
            img.src = "PicSource/rotate.png";
            // 画像を描画
            ctx.beginPath();
            ctx.save();
            ctx.translate(array[i].x, array[i].y);
            ctx.rotate(Number(array[i - 1].angle) * Math.PI / 180);
            ctx.drawImage(img, 0 - 10, 0 - 10, 20, 20);
            ctx.restore();
        }

        if (array[i].type == 'holePoint' && parts[array[i].partsType].hole[array[i].holeCount].holeType == true) { //点がholePointであれば
            // holeを描画
            ctx.beginPath();
            ctx.moveTo(array[i].x + parts[array[i].partsType].hole[array[i].holeCount].holeR, array[i].y);
            ctx.lineWidth = holeLineWidth;
            ctx.strokeStyle = lineColor;
            ctx.arc(array[i].x, array[i].y, parts[array[i].partsType].hole[array[i].holeCount].holeR, 0, Math.PI * 2, true);
            ctx.fillStyle = holeColor;
            ctx.fill();
            ctx.stroke();
        }
        if (array[i].type == 'snapPoint') { //点がsnapPointであれば

            ctx.beginPath();
            drawPoint(array[i].x, array[i].y, snapPointColor, snapPointSize, ctx);

            const samePoint = array.find(element =>
                element != array[i] &&
                element.x === array[i].x &&
                element.y === array[i].y
            );

            if (samePoint) {
                ctx.lineWidth = dentLineWidth;
                ctx.strokeStyle = lineColor;
                drawSquare(array[i].x, array[i].y, Number(parts[array[i].partsType].hole[array[i].snapCount].snapWidth), Number(parts[array[i].partsType].hole[array[i].snapCount].snapHeight), array[i - array[i].holeNum].angle, dentColor, ctx);
            }

            ctx.beginPath();
            ctx.moveTo(array[i - array[i].holeNum].x, array[i - array[i].holeNum].y); // ホールの座標へ移動
            ctx.lineWidth = lineWidth;
            ctx.strokeStyle = lineColor;
            ctx.lineTo(array[i].x, array[i].y);
            ctx.stroke();
            ctx.beginPath();

        }
    }

    //objectDataArrayで最後の点が最初の点と同じ座標のとき線形を閉じ面に色をつける
    if (array == objectDataArray && array[1] && array[array.length - 1].x == array[0].x && array[array.length - 1].y == array[0].y) {
        ctx.closePath();
        ctx.fillStyle = surfaceColor;
        ctx.fill();
        ctx.stroke();
    }

    //holeDataArrayで最後の点が最後のpenUpの次の点と同じ座標のときpenUpを挿入する。
    if (array == holeDataArray && array[array.length - 1] && array[penUpI + 1] && array.length - 1 != penUpI + 1 && array[array.length - 1].x == array[penUpI + 1].x && array[array.length - 1].y == array[penUpI + 1].y) {
        ctx.closePath();
        ctx.fillStyle = surfaceHoleColor;
        ctx.fill();
        ctx.stroke();
        array.push({ type: "penUp" });
        document.getElementById('move2').checked = true;
    }


    //現在のタブの点を再描画
    if (document.getElementById("tab1").checked) {
        reDrawPoint(ctx1, objectDataArray);
    }
    if (document.getElementById("tab2").checked) {
        reDrawPoint(ctx2, holeDataArray);
    }
    if (document.getElementById("tab3").checked) {
        reDrawPoint(ctx3, circuitDataArray);
    }

    //点を再描画
    function reDrawPoint(ctx, array) {
        ctx.beginPath();
        for (var i = 0; i < array.length; i++) {
            if (array[i].type != "penUp" && array[i].type != "holePoint" && array[i].type != "partsAngle" && array[i].type != "parts") {
                drawPoint(array[i].x, array[i].y, curvePointColor, curvePointSize, ctx);
            }

            if (array[i].cx && array[i].cy) {
                drawPoint(array[i].cx, array[i].cy, controlPointColor, controlPointSize, ctx);//制御点の点
            }
        }
    }

    //再描画されている配列が現在のタブと違う場合は白透明四角を描画したものの上に貼り付ける
    let [checkedTabNum, dataArray] = checkedTab();
    if ((array == objectDataArray && checkedTabNum == 2) || (array == holeDataArray && checkedTabNum == 3)) {
        console.log("test:" + ctx);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.fillRect(0, 0, document.getElementById("canvas" + checkedTabNum + "-area").width / scale, document.getElementById("canvas" + checkedTabNum + "-area").height / scale);
    }
    else {
        ctx.globalAlpha = 1;
    }

}

//最後の点からカーソルまでを描画する関数
function cursorDraw(x, y) {
    let [checkedTabNum, array] = checkedTab();
    ctx = document.getElementById("canvas" + checkedTabNum + "-area").getContext('2d');
    let controlx = "";
    let controly = "";
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = lineWidth;

    if (array[array.length - 1] && array[array.length - 1].x && array[array.length - 1].y) {

        if (document.getElementById('straight' + checkedTabNum).checked && array[array.length - 1].type != "penUp") {  //直線モードが選ばれているとき
            ctx.beginPath();
            ctx.moveTo(array[array.length - 1].x, array[array.length - 1].y); // 最後の座標点へ移動     

            ctx.lineTo(x, y);
            ctx.stroke();
        }

        if (document.getElementById('curve' + checkedTabNum).checked && array[array.length - 1].type != "penUp") {  //曲線モードが選ばれているとき
            ctx.beginPath();
            ctx.moveTo(array[array.length - 1].x, array[array.length - 1].y); // 最後の座標点へ移動      
            controlx = (x + array[array.length - 1].x) / 2;
            controly = (y + array[array.length - 1].y) / 2;
            ctx.lineWidth = lineWidth;
            ctx.strokeStyle = lineColor;
            curve(array[array.length - 1].x, array[array.length - 1].y, x, y, controlx, controly, ctx);
        }

        if (controlx && controly) {
            drawPoint(controlx, controly, controlPointColor, controlPointSize, ctx);//制御点の描画
        }
    }

}


//配列のデータの有無によって進むボタンと戻るボタンの表示を変える関数
function buttonCSS(array, savearray) {
    if (array[0]) {
        document.getElementById('button_back').disabled = false;
    }
    else {
        document.getElementById('button_back').disabled = true;
    }
    if (savearray[0]) {
        document.getElementById('button_next').disabled = false;
    }
    else {
        document.getElementById('button_next').disabled = true;
    }
}

//点の最大の横幅・縦幅を測定する関数
function sizeMeasure(array) {

    var maxX = maxY = null;
    var minX = minY = Infinity;

    for (point of array) {
        if (point.x !== undefined && point.y !== undefined) {
            if (point.x > maxX) {
                maxX = point.x;
            }
            if (point.cx && point.cx > maxX) {
                maxX = point.cx;
            }
            if (point.y > maxY) {
                maxY = point.y;
            }
            if (point.cy && point.cy > maxX) {
                maxY = point.cy;
            }

            if (point.x < minX) {
                minX = point.x;
            }
            if (point.cx && point.cx < minX) {
                minX = point.cx;
            }

            if (point.y < minY) {
                minY = point.y;
            }
            if (point.cy && point.cy < minY) {
                minY = point.cy;
            }
        }

    }

    var objectWidth = parseFloat((distancePoints(maxX, 0, minX, 0) / 10).toFixed(1));
    var objectHeight = parseFloat((distancePoints(0, maxY, 0, minY) / 10).toFixed(1));

    return [objectWidth, objectHeight];
}

function reloadSize() {
    [objectWidth, objectHeight] = sizeMeasure(objectDataArray);
    document.getElementById("sizeWidth").value = objectWidth;
    document.getElementById("sizeHeight").value = objectHeight;
}

//objectの大きさを変える関数
function changeObjectSize(chengedWidth, changedHeight) {
    [objectWidth, objectHeight] = sizeMeasure(objectDataArray);
    if (chengedWidth != objectWidth) {
        console.log("Width変更");
        changeRate = chengedWidth / objectWidth;
    }
    else if (changedHeight != objectHeight) {
        console.log("Height変更");
        changeRate = changedHeight / objectHeight;
    }
    else {
        changeRate = 1;
    }

    centerWidth = wrapperFirstWidth / 2;
    centerHeight = wrapperFirstHeight / 2;
    console.log(centerWidth, centerHeight);

    // 配列の各要素のxとyにchangeRateをかけて置き換える
    objectDataArray = objectDataArray.map(item => {
        return {
            ...item, // そのままの要素を保持
            x: ((item.x - centerWidth) * changeRate) + centerWidth,
            y: ((item.y - centerHeight) * changeRate) + centerHeight,
            cx: ((item.cx - centerWidth) * changeRate) + centerWidth,
            cy: ((item.cy - centerHeight) * changeRate) + centerHeight
        };
    });

    // 配列の各要素のxとyにchangeRateをかけて置き換える
    holeDataArray = holeDataArray.map(item => {
        return {
            ...item, // そのままの要素を保持
            x: ((item.x - centerWidth) * changeRate) + centerWidth,
            y: ((item.y - centerHeight) * changeRate) + centerHeight,
            cx: ((item.cx - centerWidth) * changeRate) + centerWidth,
            cy: ((item.cy - centerHeight) * changeRate) + centerHeight
        };
    });

    if (layerData) {
        imgLayerScale = imgLayerScale * changeRate;

        imgLayerW = imgLayerScale * imgLayer.width;
        imgLayerH = imgLayerScale * imgLayer.height;

        imgLayerWPosition = (wrapperFirstWidth / scale - imgLayerW) / 2;
        imgLayerHPosition = (wrapperFirstHeight / scale - imgLayerH) / 2;

        ctx0.clearRect(0, 0, canvas0.width / scale, canvas0.height / scale);
        ctx0.drawImage(imgLayer, imgLayerWPosition, imgLayerHPosition, imgLayerW, imgLayerH);
    }

    reDraw();

}


function rotatePoint(centerX, centerY, length, angle) {
    rotatedX = (length * Math.cos((angle) * (Math.PI / 180))) + centerX;
    rotatedY = (length * Math.sin((angle) * (Math.PI / 180))) + centerY;
    return [rotatedX, rotatedY];
}

// 部品を描画する関数
function drawParts(ctx, centerX, centerY, angle, parts) {

    function drawPartsPic() {
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(angle * Math.PI / 180);

        ctx.drawImage(images["img" + parts.type], - parts.width / 2, - parts.height / 2, parts.width, parts.height);

        ctx.stroke();
        ctx.restore();

    }
    // console.log(images[parts.type]);
    drawPartsPic();

    drawPoint(centerX, centerY, partsPointColor, partsPointSize, ctx);

}


//二点間の角度を求める
function calcAngle(x1, y1, x2, y2) {
    angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

    return angle;
}

//パーツとそのholePoint,snapPointを配列にpushする関数
function pushParts(array, x, y, parts) {
    array.push({ type: "parts", partsType: parts.type, x: x, y: y, angle: 0 });
    partsPlaceNum = array.length - 1;
    rotatePoint(x, y, 20 + parts.height / 2, array[partsPlaceNum].angle);
    array.push({ type: "partsAngle", partsType: parts.type, x: rotatedX, y: rotatedY });

    for (holeCount in parts.hole) {
        holeN = parts.hole[holeCount];
        rotatePoint(x, y, holeN.holeLength, holeN.holeAngle);
        circuitDataArray.push({ type: "holePoint", partsType: parts.type, x: rotatedX, y: rotatedY, angle: holeN.snapAngle, holeNum: Object.keys(parts.hole).length, holeCount: holeCount });
    }

    for (holeCount in parts.hole) {
        holeN = parts.hole[holeCount];
        rotatePoint(array[array.length - Object.keys(parts.hole).length].x, array[array.length - Object.keys(parts.hole).length].y, holeN.snapLength, array[partsPlaceNum].angle);
        circuitDataArray.push({ type: "snapPoint", partsType: parts.type, x: rotatedX, y: rotatedY, holeNum: Object.keys(parts.hole).length, snapCount: holeCount });
    }


}

//穴の位置を再設定する関数
function resetHoleSnap(array, i, parts) {
    [rotatedX, rotatedY] = [];
    [rotatedX, rotatedY] = rotatePoint(array[i].x, array[i].y, 15 + parts.height / 2, array[i].angle - 90);

    if (array[i + 1] && array[i + 1]) {
        array[i + 1].x = rotatedX;
        array[i + 1].y = rotatedY;
    }

    for (holeCount in parts.hole) {
        holeN = parts.hole[holeCount];
        [rotatedX, rotatedY] = rotatePoint(array[i].x, array[i].y, holeN.holeLength, array[i].angle + holeN.holeAngle);

        if (array[i + 1 + Number(holeCount) + Object.keys(parts.hole).length] && array[i + 1 + Number(holeCount) + Object.keys(parts.hole).length]) {
            array[i + 1 + Number(holeCount)].x = rotatedX;
            array[i + 1 + Number(holeCount)].y = rotatedY;
        }
    }

    for (holeCount in parts.hole) {
        holeN = parts.hole[holeCount];

        if (array[i + 1 + Number(holeCount)]) {
            angle = array[i + 1 + Number(holeCount)].angle;
            rotatePoint(array[i + 1 + Number(holeCount)].x, array[i + 1 + Number(holeCount)].y, holeN.snapLength, angle);
        }


        if (array[i + 1 + Number(holeCount) + Object.keys(parts.hole).length]) {

            if (selectedPointType != "rotateSnap") {
                for (let j = 0; j < array.length; j++) {
                    let overLapPoint = array[j];
                    if (overLapPoint.type != "snapPoint" && overLapPoint.x && overLapPoint.y
                        && array[i + 1 + Number(holeCount) + Object.keys(parts.hole).length].x == overLapPoint.x
                        && array[i + 1 + Number(holeCount) + Object.keys(parts.hole).length].y == overLapPoint.y) {
                        array[j].x = rotatedX;
                        array[j].y = rotatedY;
                    }
                }
            }

            array[i + 1 + Number(holeCount) + Object.keys(parts.hole).length].x = rotatedX;
            array[i + 1 + Number(holeCount) + Object.keys(parts.hole).length].y = rotatedY;


        }
    }

}


function convertLengthAngle(centerX, centerY, x, y) {
    let distance = distancePoints(centerX, centerY, x, y);
    calcAngle(centerX, centerY, x, y);
    return { distance: distance, angle: angle };
}

function drawSquare(x, y, width, height, angle, color, ctx) {
    // はんだ付けの溝を描画
    ctx.beginPath();
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle * Math.PI / 180);
    ctx.rect(0, - height / 2, -width, height);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();
    ctx.restore();
}

//カーソルがパーツ画像の上にあればパーツを縁取る
function markParts(x, y, point) {

    let partsWidth = parts[point.partsType].width;
    let partsHeight = parts[point.partsType].height;

    let [checkedTabNum, dataArray] = checkedTab();
    let canvas = document.getElementById("canvas" + checkedTabNum + "-area");
    let ctx = canvas.getContext('2d');

    if (x > point.x - (partsWidth / 2) &&
        x < point.x + (partsWidth / 2) &&
        y > point.y - (partsHeight / 2) &&
        y < point.y + (partsHeight / 2)) {

        drawPoint(point.x, point.y, markPointColor, markPointSize, ctx);
        canvas.style.cursor = 'grab';

    }

}