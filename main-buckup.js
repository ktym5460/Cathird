var w = $('.wrapper').width();
var h = $('.wrapper').height();
$('#canvas1-area').attr('width', w);
$('#canvas1-area').attr('height', h);

var w2 = $('.wrapper').width();
var h2 = $('.wrapper').height();
$('#canvas2-area').attr('width', w2);
$('#canvas2-area').attr('height', h2);
var w3 = $('.wrapper').width();
var h3 = $('.wrapper').height();
$('#canvas3-area').attr('width', w3);
$('#canvas3-area').attr('height', h3);
var w4 = $('.wrapper').width();
var h4 = $('.wrapper').height();
$('#canvas4-area').attr('width', w4);
$('#canvas4-area').attr('height', h4);

//初期化
var objectDataArray = [];
var objectTempSaveArray = [];
var selectedPoint = null; // 選択された点
var selectedPointType = null;

var circuitDataArray = [];
circuitDataArray.push({ type: "penUp" });
var circuitTempSaveArray = [];


modeMove = document.getElementById('move');
modeStraight = document.getElementById('straight');
modeCurve = document.getElementById('curve');
modePicture = document.getElementById('picture');
modeParts = null;

modeMove3 = document.getElementById('move3');
modeWireStraight = document.getElementById('wireStraight');
modeWireCurve = document.getElementById('wireCurve');





//キャンバスエリアの設定
var canvas1 = document.getElementById("canvas1-area");
var ctx1 = canvas1.getContext('2d');
var canvas2 = document.getElementById("canvas2-area");
var ctx2 = canvas2.getContext('2d');
var canvas3 = document.getElementById("canvas3-area");
var ctx3 = canvas3.getContext('2d');
var canvas4 = document.getElementById("canvas4-area");
var ctx4 = canvas4.getContext('2d');

ctx1.lineWidth = 2;
ctx4.lineWidth = 2;

cursorColor = "#2c2300";
CursorSize = "8";

controlPointColor = "#326EFF";
controlPointSize = "8";


surfaceColor = "#FFD13180"
holeColor = "#7E630080"

markPointColor = "red";
markPointSize = "10";

lineColor = "#2c2300";
lineWidth = "2";

straightPointColor = "#2c2300";
straightPointSize = "8";

curvePointColor = "#2c2300";
curvePointSize = "8";

partsPointColor = "#2c2300";
partsPointSize = "8";

holePointColor = "#2c2300";
holePointSize = "8";


var parts = {
    resistance: {
        type: "resistance",
        picSource: "parts/resistance.png",
        width: 70,
        height: 20,
        hole: {
            1: {
                holeX: -35,
                holeY: 0,
                holeR: 10
            },
            2: {
                holeX: 35,
                holeY: 0,
                holeR: 10
            }
        }
    },
    led: {
        type: "led",
        picSource: "parts/led.png",
        width: 40,
        height: 40,
        hole: {
            1: {
                holeX: -20,
                holeY: 0,
                holeR: 10
            },
            2: {
                holeX: 20,
                holeY: 0,
                holeR: 10
            }
        }
    },
    tactSwitch: {
        type: "tactSwitch",
        picSource: "parts/tactSwitch.png",
        width: 60,
        height: 60,
        hole: {
            1: {
                holeX: -30,
                holeY: 0,
                holeR: 10
            },
            2: {
                holeX: 30,
                holeY: 0,
                holeR: 10
            }
        }
    }

}




//ページがロードされたとき動く
window.onload = function () {
    tabChange("tab1");
    toolsDraw();
    buttonCSS(objectDataArray, objectTempSaveArray);
};

//タブが押された場合動く
function tabChange(tabNumber) {
    document.getElementById("tab1tools").style.display = "none";
    document.getElementById("tab2tools").style.display = "none";
    document.getElementById("tab3tools").style.display = "none";
    document.getElementById(tabNumber + "tools").style.display = "block";

    // すべてのCanvasを非表示にする
    canvas1.style.display = "none";
    canvas2.style.display = "none";
    canvas3.style.display = "none";
    canvas4.style.display = "none";

    if (tabNumber == "tab1") {
        canvas1.style.display = "block";
        ctx1.globalAlpha = 1; // Canvas1の透明度を設定

        modeMove.checked = true;
    }

    //タブ2が選択されていたらキャンバス1,2を描画しオブジェクトの幅、高さをinputに入れる
    if (tabNumber == "tab2") {
        canvas1.style.display = "block";
        ctx1.globalAlpha = 0.5; // Canvas1の透明度を設定
        canvas2.style.display = "block";

        if (objectDataArray[0]) {
            let [objectWidth, objectHeight] = sizeMeasure(objectDataArray);

            document.getElementById("sizeHeight").value = objectHeight;
            document.getElementById("sizeWidth").value = objectWidth;
        }

    }

    if (tabNumber == "tab3") {
        modeMove3.checked = true;


        canvas1.style.display = "block";
        ctx1.globalAlpha = 0.5; // Canvas1の透明度を設定

        canvas2.style.display = "block";
        ctx2.globalAlpha = 0.5; // Canvas2の透明度を設定

        canvas3.style.display = "block";
        ctx3.globalAlpha = 0.5; // Canvas3の透明度を設定

        canvas4.style.display = "block";
        ctx4.globalAlpha = 1; // Canvas4の透明度を設定
    }

    if (objectDataArray[0]) {
        makeDots(objectDataArray);
        makeSolid(Points, 1.6, 0, 0, 0);
        console.log(outPutCode);
    }
}

//picture_displayが押されたら動く
function picture_display() {
    if (document.getElementById("picture_display").checked) {
        document.getElementById("pictureDraw").style.visibility = "hidden";

    }
    else {
        document.getElementById("pictureDraw").style.visibility = "visible";

    }

}

// 画像選択後に呼ばれるイベント
$("#picture").on("change", function (e) {
    // 2. 画像ファイルの読み込みクラス
    var reader = new FileReader();

    // 3. 準備が終わったら、id=sample1のsrc属性に選択した画像ファイルの情報を設定
    reader.onload = function (e) {
        $("#pictureDraw").attr("src", e.target.result);
    }

    // 4. 読み込んだ画像ファイルをURLに変換
    reader.readAsDataURL(e.target.files[0]);
    console.log("画像出力");
    document.getElementById("picture_display").checked = false;

});




//ゴミ箱ボタンが押されたら動く
function allClear() {
    if (document.getElementById("tab1").checked) {
        canvas = canvas1;
        ctx = ctx1;
        array = objectDataArray;
    }
    if (document.getElementById("tab3").checked) {
        canvas = canvas4;
        ctx = ctx4;
        array = circuitDataArray;
    }

    var clearConfirmAns = window.confirm('このボタンを実行するとこのエリアに描いたすべてのデータが削除されます。\n本当に削除しますか？');

    if (array && clearConfirmAns) {
        array.splice(0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

//戻るボタンが押されたら動く
function back() {
    if (document.getElementById("tab1").checked) {
        if (objectDataArray[1]) {
            objectTempSaveArray.push(objectDataArray.slice());
            objectDataArray.pop();
            ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
            reDraw(ctx1, objectDataArray);
        }
        buttonCSS(objectDataArray, objectTempSaveArray);
    }

    if (document.getElementById("tab3").checked) {
        if (circuitDataArray[1]) {
            circuitTempSaveArray.push(circuitDataArray.slice());
            if (circuitDataArray[circuitDataArray.length - 1].type == "penUp") {
                circuitDataArray.pop();
            }
            if (circuitDataArray[circuitDataArray.length - 1].type == "holePoint") {
                circuitDataArray.splice(circuitDataArray.length - circuitDataArray[circuitDataArray.length - 1].holeNum, circuitDataArray[circuitDataArray.length - 1].holeNum);
            }
            circuitDataArray.pop();
            console.log(circuitDataArray);
            ctx4.clearRect(0, 0, canvas4.width, canvas4.height);
            reDraw(ctx4, circuitDataArray);
        }
        buttonCSS(circuitDataArray, circuitTempSaveArray);
    }

}

//進むボタンが押されたら動く
function next() {
    if (document.getElementById("tab1").checked) {

        if (objectTempSaveArray[0]) {
            objectDataArray = objectTempSaveArray.pop();
            ctx1.clearRect(0, 0, canvas1.width, canvas1.height);

        }
        reDraw(ctx1, objectDataArray);
        buttonCSS(objectDataArray, objectTempSaveArray);
    }
    if (document.getElementById("tab3").checked) {
        if (circuitTempSaveArray[0]) {
            circuitDataArray = circuitTempSaveArray.pop();
            ctx4.clearRect(0, 0, canvas4.width, canvas4.height);

        }
        reDraw(ctx4, circuitDataArray);
        buttonCSS(circuitDataArray, circuitTempSaveArray);
    }

}






function toolsDraw(partsId) {  //toolsが押された場合場合動く

    // 点の初期位置   
    let x = canvas1.width / 2; let y = canvas1.height / 2;

    if (modeMove.checked) { //移動が選択されたとき
        console.log("移動モード開始");
    }
    if (modeStraight.checked) { //直線が選択されたとき     
        console.log("直線モード開始");
    }
    if (modeCurve.checked) { //曲線が選択されたとき     
        console.log("曲線モード開始");
    }
    if (modePicture.checked) { //画像が選択されたとき     

    }

    if (modeMove3.checked) { //移動が選択されたとき
        console.log("移動モード3開始");
        modeParts = null;
    }
    if (modeWireStraight.checked) { //導線直線が選択されたとき     
        console.log("導線直線モード開始");
        modeParts = null;

    }
    if (modeWireCurve.checked) { //導線曲線選択されたとき     
        console.log("導線曲線モード開始");
        modeParts = null;
    }

    if (partsId) {
        modeParts = document.getElementById(partsId);
        partsData = parts[partsId];
        console.log(partsData);
    }
}

// Canvas1マウスが動いているとき   
canvas1.addEventListener('mousemove', (event) => {

    canvas1.style.cursor = 'default';//カーソルを変更
    // マウスの位置を取得     
    x = event.clientX - canvas1.getBoundingClientRect().left;
    y = event.clientY - canvas1.getBoundingClientRect().top;

    // Canvasをクリアして新しい点を描画     
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);

    if (modeMove.checked) {
        canvas1.style.cursor = 'grab';
    }
    else {
        //マウスの位置に点を表示     
        drawPoint(x, y, cursorColor, CursorSize, ctx1);
    }

    //objectDataArrayにデータがあるとき再描画     
    if (objectDataArray[0]) {
        //保存されているobjectDataArrayより再描画
        reDraw(ctx1, objectDataArray);
        cursorDraw(x, y, ctx1, objectDataArray);

    }

    //selectedPointにデータがあるとき座標を置き換える
    if (selectedPoint) {
        canvas1.style.cursor = 'grabbing';//カーソルを変更
        if (selectedPointType) {
            selectedPoint.cx = x;
            selectedPoint.cy = y;
        }
        else {
            selectedPoint.x = x;
            selectedPoint.y = y;
        }
    }

    //カーソルが最初の点に近いとき最初の点の色を変える
    if (objectDataArray[1]) {
        distancePoints(x, y, objectDataArray[0].x, objectDataArray[0].y);
        if (distance < 20) {
            drawPoint(objectDataArray[0].x, objectDataArray[0].y, markPointColor, markPointSize, ctx1);
        }
    }

    //modeモードでカーソルが点に近いとき点の色を変える
    if (objectDataArray[1] && modeMove.checked) {
        for (point of objectDataArray) {
            distancePoints(x, y, point.x, point.y);
            if (distance < 20) {

                drawPoint(point.x, point.y, markPointColor, markPointSize, ctx1);
            }
            if (point.type == "curve") {
                distancePoints(x, y, point.cx, point.cy);
                if (distance < 20) {
                    drawPoint(point.cx, point.cy, markPointColor, markPointSize, ctx1);


                    ctx1.strokeStyle = controlPointColor;
                    ctx1.lineWidth = lineWidth;
                    ctx1.beginPath();
                    curve(pointPrevious.x, pointPrevious.y, point.x, point.y, point.cx, point.cy, ctx1);

                }
            }
            pointPrevious = point;
        }
    }

});

// Canvas4マウスが動いているとき 
canvas4.addEventListener('mousemove', (event) => {
    canvas4.style.cursor = 'default';//カーソルを変更

    // マウスの位置を取得     
    x = event.clientX - canvas4.getBoundingClientRect().left;
    y = event.clientY - canvas4.getBoundingClientRect().top;

    // Canvasをクリアして新しい点を描画     
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
    ctx4.clearRect(0, 0, canvas4.width, canvas4.height);

    if (modeMove3.checked) {
        canvas4.style.cursor = 'grab';
    }

    //Partsが選択されているとき
    else if (modeParts && modeParts.checked) {

        drawParts(ctx4, x, y, 0, partsData);

    }
    else {
        //マウスの位置に点を表示     
        drawPoint(x, y, cursorColor, CursorSize, ctx4);

    }

    //objectDataArrayにデータがあるとき再描画    
    if (objectDataArray[0]) {
        reDraw(ctx1, objectDataArray);
    }

    //circuitDataArrayにデータがあるとき再描画     
    if (circuitDataArray[0]) {
        //保存されているobjectDataArrayより再描画
        reDraw(ctx4, circuitDataArray);

        cursorDraw(x, y, ctx4, circuitDataArray);

    }


    //カーソルが点に近いとき点の色を変える
    if (circuitDataArray[1]) {
        for (point of circuitDataArray) {
            if (circuitDataArray[circuitDataArray.length - 1].type == "penUp" || modeMove3) {//ペンupされているとき、またはmoveモードのとき
                distancePoints(x, y, point.x, point.y);

                if (distance < 20) {
                    drawPoint(point.x, point.y, markPointColor, markPointSize, ctx4);
                }

                if (point.type == "wireCurve") {
                    distancePoints(x, y, point.cx, point.cy);

                    if (distance < 20) {
                        drawPoint(point.cx, point.cy, markPointColor, markPointSize, ctx4);
                        ctx4.strokeStyle = controlPointColor;
                        ctx4.lineWidth = lineWidth;
                        ctx4.beginPath();
                        curve(pointPrevious.x, pointPrevious.y, point.x, point.y, point.cx, point.cy, ctx4);

                    }
                }

            }

            else if (point.x != circuitDataArray[circuitDataArray.length - 1].x && point.y != circuitDataArray[circuitDataArray.length - 1].y) {
                distancePoints(x, y, point.x, point.y);
                if (distance < 20) {
                    drawPoint(point.x, point.y, markPointColor, markPointSize, ctx4);
                }
            }
            pointPrevious = point;
        }
    }

    //selectedPointにデータがあるとき座標を置き換える
    if (selectedPoint) {
        canvas4.style.cursor = 'grabbing';//カーソルを変更

        if (selectedPointType == "Control") {
            selectedPoint.cx = x;
            selectedPoint.cy = y;
        }
        else if (selectedPointType == "Rotate") {
            selectedPoint.angle = calcAngle(x, y, selectedPoint.x, selectedPoint.y);
        }

        else {
            selectedPoint.x = x;
            selectedPoint.y = y;
        }
    }

});

// マウスダウンしたときの処理
canvas1.addEventListener('mousedown', (event) => {
    if (modeMove.checked) {
        selectedPoint = findNearestPoint(x, y, objectDataArray);
    }

});

canvas4.addEventListener('mousedown', (event) => {
    if (modeMove3.checked) {

        selectedPoint = findNearestPoint(x, y, circuitDataArray);

    }

});



// マウスアップしてドラッグが終了したときの処理
canvas1.addEventListener('mouseup', () => {
    if (modeMove.checked) {
        if (objectDataArray[1]) {
            distancePoints(objectDataArray[objectDataArray.length - 1].x, objectDataArray[objectDataArray.length - 1].y, objectDataArray[0].x, objectDataArray[0].y);
            if (distance < 20) {
                objectDataArray[0].x = objectDataArray[objectDataArray.length - 1].x;
                objectDataArray[0].y = objectDataArray[objectDataArray.length - 1].y;
            }
        }

        selectedPoint = null;

    }
});

canvas4.addEventListener('mouseup', () => {
    //Move3でマウスが上がったとき座標が近い点があれば座標をを置き換える
    if (modeMove3.checked) {
        if (circuitDataArray[1]) {
            for (point of circuitDataArray) {
                if (point.type != "penUp") {

                    distancePoints(x, y, point.x, point.y);
                    if (distance < 20 && selectedPointType != "Rotate") {
                        selectedPoint.x = point.x;
                        selectedPoint.y = point.y;
                    }
                }

            }
        }
        selectedPoint = null;

    }
});



// マウスが左クリックされたとき
canvas1.addEventListener('click', (event) => {

    if (modeStraight.checked) {
        objectDataArray.push({ type: "straight", x: x, y: y });
    }
    if (modeCurve.checked) {
        if (objectDataArray[0]) {
            var controlx = (x + objectDataArray[objectDataArray.length - 1].x) / 2;
            var controly = (y + objectDataArray[objectDataArray.length - 1].y) / 2;
        }

        objectDataArray.push({ type: "curve", x: x, y: y, cx: controlx, cy: controly });

    }


    //最後の点と最初の点の距離が20以下だと最後の点の座標を最初の点のものに置き換える。
    if (objectDataArray[1] && x != objectDataArray[0].x && y != objectDataArray[0].y) {
        distancePoints(x, y, objectDataArray[0].x, objectDataArray[0].y);
        if (distance < 20) {
            objectDataArray[objectDataArray.length - 1].x = objectDataArray[0].x;
            objectDataArray[objectDataArray.length - 1].y = objectDataArray[0].y;
            modeMove.checked = true;
        }
    }

    //SaveTempDataを消す
    if (objectTempSaveArray) {
        objectTempSaveArray.splice(0);
        buttonCSS(objectDataArray, objectTempSaveArray);
    }



});

// Canvas4マウスが左クリックされたとき
canvas4.addEventListener('click', (event) => {

    if (modeWireStraight.checked) {
        circuitDataArray.push({ type: "wireStraight", x: x, y: y });
    }
    if (modeWireCurve.checked) {
        if (circuitDataArray[0]) {
            var controlx = (x + circuitDataArray[circuitDataArray.length - 1].x) / 2;
            var controly = (y + circuitDataArray[circuitDataArray.length - 1].y) / 2;
        }

        circuitDataArray.push({ type: "wireCurve", x: x, y: y, cx: controlx, cy: controly });

    }

    if (modeParts && modeParts.checked) {
        pushParts(circuitDataArray, x, y, partsData);
        console.log(circuitDataArray);
    }


    //クリック点がcircuitDataArray内の点と近いとき最後の値をその値に置き換える
    if (circuitDataArray[1] && modeMove3.checked != true) {
        for (point of circuitDataArray) {
            distancePoints(x, y, point.x, point.y);
            if (distance < 20) {
                circuitDataArray[circuitDataArray.length - 1].x = point.x;
                circuitDataArray[circuitDataArray.length - 1].y = point.y;
            }
        }
    }




    //SaveTempDataを消す
    if (circuitTempSaveArray) {
        circuitTempSaveArray.splice(0);
        buttonCSS(circuitDataArray, circuitTempSaveArray);
    }

});


// マウスが右クリックされたとき
canvas1.addEventListener('contextmenu', (event) => {
    console.log("右クリック！！");
    modeMove.checked = true;
});

// canvas4マウスが右クリックされたとき
canvas4.addEventListener('contextmenu', (event) => {
    console.log("右クリック！！");

    if (circuitDataArray[circuitDataArray.length - 1].type != "penUp") {
        circuitDataArray.push({ type: "penUp" });
    }

    modeMove3.checked = true;
});



//点描画する関数
function drawPoint(x, y, pointColor, pointSize, ctx) {
    ctx.fillStyle = pointColor;
    ctx.fillRect(x - pointSize / 2, y - pointSize / 2, pointSize, pointSize);
}

//二次ベジェ曲線を描画する関数
function curve(x0, y0, x1, y1, x_c, y_c, ctx) {

    for (var t = 0; t < 1; t = t + 0.002) {
        var xt = (1 - t) ** 2 * x0 + 2 * (1 - t) * t * x_c + t ** 2 * x1;
        var yt = (1 - t) ** 2 * y0 + 2 * (1 - t) * t * y_c + t ** 2 * y1;

        ctx.lineTo(xt, yt);
    }
    ctx.stroke();
}


// キャンバス上のクリック位置から最も近い点を探す関数
function findNearestPoint(x, y, array) {
    let minDistance = Infinity;
    let nearestPoint = null;

    for (var i = 0; i < array.length; i++) {
        distancePoints(x, y, array[i].x, array[i].y);

        if (distance < minDistance) {
            minDistance = distance;
            nearestPoint = array[i];
            selectedPointType = null;
        }

        if (array[i].type == "curve" || array[i].type == "wireCurve") {
            distancePoints(x, y, array[i].cx, array[i].cy);
            if (distance < minDistance) {
                minDistance = distance;
                nearestPoint = array[i];
                selectedPointType = "Control";
            }
        }

        if (nearestPoint && nearestPoint.type == "holePoint") {
            selectedPointType = "Rotate";
            nearestPoint = array[i - nearestPoint.holeNum];

        }



    }

    return nearestPoint;
}

// 与えられた二点間の距離を返す関数
function distancePoints(x1, y1, x2, y2) {
    distance = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
    return distance;
}




//保存されている配列を描画する関数
function reDraw(ctx, array) {
    ctx.beginPath();
    ctx.moveTo(array[0].x, array[0].y); // 最初の座標点へ移動       

    for (var i = 0; i < array.length; i++) {
        if (array[i].type == 'straight') { //点が直線であれば
            ctx.lineTo(array[i].x, array[i].y);
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = lineWidth;
            ctx.stroke();
            drawPoint(array[i].x, array[i].y, straightPointColor, straightPointSize, ctx1);
        }

        if (array[i].type == 'curve') { //点が曲線であれば

            ctx.strokeStyle = lineColor;
            ctx.lineWidth = lineWidth;
            drawPoint(array[i].x, array[i].y, curvePointColor, curvePointSize, ctx1);
            drawPoint(array[i].cx, array[i].cy, controlPointColor, controlPointSize, ctx1);//制御点の点

            if (i != 0) {
                moveTo(array[i].x, array[i].y);
                curve(array[i - 1].x, array[i - 1].y, array[i].x, array[i].y, array[i].cx, array[i].cy, ctx);
            }
        }

        if (array[i].type == 'penUp' && array[i + 1]) { //点がpenUpであれば
            ctx.moveTo(array[i + 1].x, array[i + 1].y);
        }


        if (array[i].type == 'wireStraight') { //点が直線であれば
            ctx.lineTo(array[i].x, array[i].y);
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = lineWidth;
            ctx.stroke();
            drawPoint(array[i].x, array[i].y, straightPointColor, straightPointSize, ctx4);
        }
        if (array[i].type == 'wireCurve') { //点が曲線であれば

            ctx.strokeStyle = lineColor;
            ctx.lineWidth = lineWidth;
            drawPoint(array[i].x, array[i].y, curvePointColor, curvePointSize, ctx4);
            drawPoint(array[i].cx, array[i].cy, controlPointColor, controlPointSize, ctx4);//制御点の点

            if (i != 0) {
                moveTo(array[i].x, array[i].y);
                curve(array[i - 1].x, array[i - 1].y, array[i].x, array[i].y, array[i].cx, array[i].cy, ctx);
            }
        }
        if (array[i].type == 'parts') { //点がパーツであれば
            drawParts(ctx, array[i].x, array[i].y, array[i].angle, parts[array[i].partsType]);
            resetHole(array, i, parts[array[i].partsType]);
        }
        if (array[i].type == 'holePoint') { //点がholePointであれば
            drawPoint(array[i].x, array[i].y, holePointColor, holePointSize, ctx);
        }
    }
    //最後の点が最初の点と同じ座標のとき線形を閉じ面に色をつける
    if (array == objectDataArray && array[1] && array[array.length - 1].x == array[0].x && array[array.length - 1].y == array[0].y) {
        ctx1.closePath();
        ctx1.fillStyle = surfaceColor;
        ctx1.fill();
    }


}

//最後の点からカーソルまでを描画する関数
function cursorDraw(x, y, ctx, array) {
    if (modeStraight.checked) {
        ctx.beginPath();
        ctx.moveTo(array[array.length - 1].x, array[array.length - 1].y); // 最後の座標点へ移動         
        ctx.lineTo(x, y);
        ctx.stroke();
    }
    if (modeCurve.checked) {
        ctx.beginPath();
        ctx.moveTo(array[array.length - 1].x, array[array.length - 1].y); // 最後の座標点へ移動      
        var controlx = (x + array[array.length - 1].x) / 2;
        var controly = (y + array[array.length - 1].y) / 2;
        drawPoint(controlx, controly, controlPointColor, controlPointSize, ctx1);//制御点の描画
        curve(array[array.length - 1].x, array[array.length - 1].y, x, y, controlx, controly, ctx);
    }

    if (modeWireStraight.checked && array[array.length - 1].type != "penUp") {
        ctx.beginPath();
        ctx.moveTo(array[array.length - 1].x, array[array.length - 1].y); // 最後の座標点へ移動         
        ctx.lineTo(x, y);
        ctx.stroke();
    }
    if (modeWireCurve.checked && array[array.length - 1].type != "penUp") {
        ctx.beginPath();
        ctx.moveTo(array[array.length - 1].x, array[array.length - 1].y); // 最後の座標点へ移動      
        var controlx = (x + array[array.length - 1].x) / 2;
        var controly = (y + array[array.length - 1].y) / 2;
        drawPoint(controlx, controly, controlPointColor, controlPointSize, ctx1);//制御点の描画
        curve(array[array.length - 1].x, array[array.length - 1].y, x, y, controlx, controly, ctx);
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

//点から最大の横幅・縦幅を測定する関数
function sizeMeasure(array) {
    var maxX = maxY = null;
    var minX = minY = Infinity;

    for (point of array) {
        if (point.x !== undefined && point.y !== undefined) {
            if (point.x > maxX) {
                maxX = point.x;
            }
            if (point.y > maxY) {
                maxY = point.y;
            }
            if (point.x < minX) {
                minX = point.x;
            }
            if (point.y < minY) {
                minY = point.y;
            }
        }

    }

    var objectWidth = distancePoints(maxX, 0, minX, 0);;
    var objectHeight = distancePoints(0, maxY, 0, minY);

    return [objectWidth, objectHeight];
}




function rotatePoint(centerX, centerY, x, y, angle) {
    rotatedX = (x * Math.cos((angle) * (Math.PI / 180))) - (y * Math.sin((angle) * (Math.PI / 180))) + centerX;
    rotatedY = (x * Math.sin((angle) * (Math.PI / 180))) - (y * Math.cos((angle) * (Math.PI / 180))) + centerY;
}

//部品を描画する関数
function drawParts(ctx, centerX, centerY, angle, parts) {

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(angle * Math.PI / 180);

    // holeを描画
    ctx.beginPath();

    for (holeNum in parts.hole) {
        holeN = parts.hole[holeNum];
        ctx.moveTo(holeN.holeX + holeN.holeR, holeN.holeY);
        ctx.arc(holeN.holeX, holeN.holeY, holeN.holeR, 0, Math.PI * 2, true);
    }

    ctx.fillStyle = holeColor;
    ctx.fill();

    ctx.stroke();

    var img = new Image();
    img.src = parts.picSource;
    // 画像を描画
    ctx.drawImage(img, - parts.width / 2, - parts.height / 2, parts.width, parts.height);
    ctx.restore();
    drawPoint(centerX, centerY, partsPointColor, partsPointSize, ctx);
}

//二点間の角度を求める
function calcAngle(x1, y1, x2, y2) {
    angle = Math.atan((y2 - y1) / (x2 - x1)) * 180 / Math.PI;
    return angle;
}

//パーツとそのholePointを配列にpushする関数
function pushParts(array, x, y, parts) {

    array.push({ type: "parts", partsType: parts.type, x: x, y: y, angle: 0 });

    partsPlaceNum = array.length - 1;
    for (holeNum in parts.hole) {
        holeN = parts.hole[holeNum];

        rotatePoint(x, y, holeN.holeX, holeN.holeY, array[partsPlaceNum].angle);

        circuitDataArray.push({ type: "holePoint", x: rotatedX, y: rotatedY, holeNum: holeNum });
    }

}

//穴の位置を再設定する関数
function resetHole(array, i, parts) {
    for (holeNum in parts.hole) {
        holeN = parts.hole[holeNum];
        rotatePoint(array[i].x, array[i].y, holeN.holeX, holeN.holeY, array[i].angle);
        array[i + Number(holeNum)].x = rotatedX;
        array[i + Number(holeNum)].y = rotatedY;
    }
}




// //はんだづけの位置を設定する関数
// function soldpoint(ctx, x, y, angle, parts) {


// }
