var solidPoints = [];
var wirePoints = [];
var partsPoints = [];
var outPutCode;

function outPut() {
    outPutCode = "";
    solidCode = "";
    grooveCode = "";
    partsCode = "";
    snapDepth = 0.8;
    partsBaseThin = 1;
    t = document.getElementById('sizeThickness').value;
    console.log(t);

    setUpCode =
        `t =` + t + `;
        snapDepth =` + snapDepth + `;
        partsBaseThin=` + partsBaseThin + `;
        $fs=0.1;
            grooveFaces = [
                [0,1,3,2],
                [2,3,7,6],
                [6,7,4,5],
                [5,4,1,0],
                [0,2,6,5],
                [1,4,7,3]
            ];
        module makeGroove(x1,y1,x2,y2,t){
        
            A = 90 + atan2(y2 - y1, x2 - x1);
            
           points = [
            [ x1,  y1,  t-1.3],  //0
            [ x2,  y2,  t-1.3],  //1
          
            [ x1 + 0.71 * cos(A),  y1 + 0.71 * sin(A),   t-0.59 ],  //2
            [ x2 + 0.71 * cos(A),  y2 + 0.71 * sin(A),   t-0.59 ],  //3
            [ x2 - 0.71 * cos(A),  y2 - 0.71 * sin(A),   t-0.59 ],  //4
            [ x1 - 0.71 * cos(A),  y1 - 0.71 * sin(A),   t-0.59 ],  //5
          
            [ x1,  y1,  t+0.11 ],  //6
            [ x2,  y2,  t+0.11 ] //7
           ];
        
            polyhedron( points, grooveFaces );
        }
        `


    if (objectDataArray) {
        makeSolidDots(objectDataArray);
        makeSolid(solidPoints, 0, 0, 0);
    }
    if (holeDataArray) {
        makeHoleDots(holeDataArray);
        makeHole(holePoints, 0, 0, 0);
    }
    if (circuitDataArray) {
        [wirePoints, partsPoints] = makeCircuitDots(circuitDataArray);
        makeGroove(wirePoints, 0, 0, 0);
        makeParts(partsPoints, 0, 0, 0);
    }
    outPutCode =
        setUpCode
        + "difference() {"
        + solidCode
        + grooveCode
        + holeCode
        + partsCode
        + "};";

    translateSCD(outPutCode);

}

function makeSolidDots(dataArray) {
    solidPoints = [];
    for (i = 0; i < dataArray.length; i++) {
        if (dataArray[i].type == "straight") {
            solidPoints.push([
                parseFloat((dataArray[i].x / 10).toFixed(1)),
                parseFloat((dataArray[i].y / 10).toFixed(1))
            ]);
        }
        if (i != 0 && dataArray[i - 1] && dataArray[i - 1].x && dataArray[i - 1].y && dataArray[i].cx && dataArray[i].cy && dataArray[i].type == "curve") {
            for (var t = 0; t < 1; t = t + 0.1) {
                var xt = (1 - t) ** 2 * dataArray[i - 1].x + 2 * (1 - t) * t * dataArray[i].cx + t ** 2 * dataArray[i].x;
                var yt = (1 - t) ** 2 * dataArray[i - 1].y + 2 * (1 - t) * t * dataArray[i].cy + t ** 2 * dataArray[i].y;
                solidPoints.push([
                    parseFloat((xt / 10).toFixed(1)),
                    parseFloat((yt / 10).toFixed(1))
                ]);
            }
            solidPoints.push([
                parseFloat((dataArray[i].x / 10).toFixed(1)),
                parseFloat((dataArray[i].y / 10).toFixed(1))
            ]);
        }
    }

    return solidPoints;


}

function makeSolid(points, outX, outY, outZ) {
    solidCode =
        "translate([" + outX + "," + outY + "," + outZ + `]){
        linear_extrude(height = t ){
            polygon([`


    solidCode = solidCode + points.map(sublist => '[' + sublist.join(',') + ']').join(',') + "\]);}}";

    return solidCode;

}

function makeHoleDots(dataArray) {
    holePoints = [];
    holeSectionPoints = [];
    for (i = 0; i < dataArray.length; i++) {
        if (dataArray[i].type == "straight") {
            holeSectionPoints.push([
                parseFloat((dataArray[i].x / 10).toFixed(1)),
                parseFloat((dataArray[i].y / 10).toFixed(1))
            ]);
        }
        if (i != 0 && dataArray[i - 1] && dataArray[i - 1].x && dataArray[i - 1].y && dataArray[i].cx && dataArray[i].cy && dataArray[i].type == "curve") {
            for (var t = 0; t < 1; t = t + 0.1) {
                var xt = (1 - t) ** 2 * dataArray[i - 1].x + 2 * (1 - t) * t * dataArray[i].cx + t ** 2 * dataArray[i].x;
                var yt = (1 - t) ** 2 * dataArray[i - 1].y + 2 * (1 - t) * t * dataArray[i].cy + t ** 2 * dataArray[i].y;
                holeSectionPoints.push([
                    parseFloat((xt / 10).toFixed(1)),
                    parseFloat((yt / 10).toFixed(1))
                ]);
            }
            holeSectionPoints.push([
                parseFloat((dataArray[i].x / 10).toFixed(1)),
                parseFloat((dataArray[i].y / 10).toFixed(1))
            ]);
            console.log("HoleSection" + holeSectionPoints);
        }
        if (i != 0 && dataArray[i].type == "penUp") {
            holePoints.push(holeSectionPoints);
            holeSectionPoints = [];
        }
    }

    console.log(holePoints);
    return holePoints;
}


function makeHole(points, outX, outY, outZ) {
    holeCode = "";

    for (i = 0; i < points.length; i++) {
        holeCode = holeCode + "translate([" + outX + "," + outY + "," + outZ + `]){
            linear_extrude(height = t ){
                polygon([`
        holeCode = holeCode + points[i].map(sublist => '[' + sublist.join(',') + ']').join(',') + "\]);}}";
    }

    return holeCode;
}



function makeCircuitDots(dataArray) {
    wirePoints = [];
    partsPoints = [];
    for (i = 0; i < dataArray.length; i++) {
        if (dataArray[i].type && dataArray[i].type == "straight") {
            wirePoints.push({
                // 1/10にし, 小数第一位で整数化
                type: "wire",
                x: parseFloat((dataArray[i].x / 10).toFixed(1)),
                y: parseFloat((dataArray[i].y / 10).toFixed(1))
            });
        }
        if (dataArray[i].type && dataArray[i - 1] && dataArray[i - 1].x && dataArray[i - 1].y && dataArray[i].cx && dataArray[i].cy && dataArray[i].type == "curve") {
            for (var t = 0.01; t < 1; t = t + 0.1) {
                var xt = (1 - t) ** 2 * dataArray[i - 1].x + 2 * (1 - t) * t * dataArray[i].cx + t ** 2 * dataArray[i].x;
                var yt = (1 - t) ** 2 * dataArray[i - 1].y + 2 * (1 - t) * t * dataArray[i].cy + t ** 2 * dataArray[i].y;
                wirePoints.push({
                    type: "wire",
                    // 1/10にし, 小数第2位で整数化
                    x: parseFloat((xt / 10).toFixed(2)),
                    y: parseFloat((yt / 10).toFixed(2))
                });
            }

            wirePoints.push({
                type: "wire",
                // 1/10にし, 小数第2位で整数化
                x: parseFloat((dataArray[i].x / 10).toFixed(2)),
                y: parseFloat((dataArray[i].y / 10).toFixed(2))
            });
        }
        if (dataArray[i].type && dataArray[i].type == "penUp") {
            wirePoints.push(dataArray[i]);
        }
        if (dataArray[i].type && dataArray[i].type == "holePoint" || dataArray[i].type == "snapPoint" || dataArray[i].type == "parts") {
            partsPoints.push(dataArray[i]);
        }
    }

    return [wirePoints, partsPoints];
}



function makeGroove(points, outX, outY, outZ) {
    console.log(points);
    grooveCode = "";
    groovePoints = [];

    for (i = 0; i < points.length - 1; i++) {
        if (points[i].type && points[i].type == "wire" && points[i + 1] && points[i + 1].type == "wire") {
            groovePoints.push([points[i].x, points[i].y, points[i + 1].x, points[i + 1].y, "t"]);
        }
    }

    if (Number(groovePoints.length) > 0) {
        grooveCode = `
            groovePoints = [`;
        grooveCode = grooveCode + groovePoints.map(sublist => '[' + sublist.join(',') + ']').join(',') + "];"
        grooveCode = grooveCode +
            `
            for (i = [0 : ` + Number(groovePoints.length - 1) + `]){
                makeGroove(
                    groovePoints[i][0],
                    groovePoints[i][1],
                    groovePoints[i][2],
                    groovePoints[i][3],
                    groovePoints[i][4]
                );
                translate([groovePoints[i][0],groovePoints[i][1],groovePoints[i][4]-1.3])
                    rotate_extrude($fn=10)
                        polygon( 
                            points=[[0, 0], [0.71, 0.71],[0,1.41]] );
                translate([groovePoints[i][2],groovePoints[i][3],groovePoints[i][4]-1.3])
                    rotate_extrude($fn=10)
                        polygon( 
                            points=[[0, 0], [0.71, 0.71],[0,1.41]] );
            }`
    }


    return grooveCode;
}

function makeParts(points, outX, outY, outZ) {
    partsCode = "";
    // console.log(parts);
    console.log(points);
    for (i = 0; i < points.length; i++) {
        if (points[i].type == "holePoint" && parts[points[i].partsType].hole[points[i].holeCount].holeType != false) {
            partsCode =
                partsCode
                + "translate([" + parseFloat((points[i].x / 10).toFixed(1)) + ", " + parseFloat((points[i].y / 10).toFixed(1)) + `, -0.1])
                cylinder(h= t + 0.1 , r=` + parseFloat((parts[points[i].partsType].hole[points[i].holeCount].holeR / 10).toFixed(1)) + ");";

        }
        if (points[i].type == "snapPoint") {
            snapHalfHeight = parseFloat(((parts[points[i].partsType].hole[points[i].snapCount].snapHeight / 10) / 2).toFixed(1));
            snapWidth = parseFloat((parts[points[i].partsType].hole[points[i].snapCount].snapWidth / 10).toFixed(1));


            partsCode =
                partsCode
                + "translate([" + parseFloat((points[i].x / 10).toFixed(1)) + "," + parseFloat((points[i].y / 10).toFixed(1)) + `, + t - snapDepth  ])
            rotate([0,0,`+ Number(parseFloat((points[i - points[i].holeNum].angle + 180).toFixed(1))) + `])
            linear_extrude(height =snapDepth + 0.1 )
            polygon([[0,`+ snapHalfHeight + `],[` + snapWidth + "," + snapHalfHeight + "],[" + snapWidth + "," + -snapHalfHeight + "],[0," + -snapHalfHeight + "]]);"
                ;
            partsCode = partsCode +
                "makeGroove(" +
                parseFloat((points[i - points[i].holeNum].x / 10).toFixed(1)) + ", " + parseFloat((points[i - points[i].holeNum].y / 10).toFixed(1)) + ", "
                + parseFloat((points[i].x / 10).toFixed(1)) + ", " + parseFloat((points[i].y / 10).toFixed(1)) + ", t );"

        }
        if (points[i].type == "parts" && parts[points[i].partsType].modelSource) {
            partsCode = partsCode + "translate([" + parseFloat((points[i].x / 10).toFixed(1)) + "," + parseFloat((points[i].y / 10).toFixed(1)) + `, t - partsBaseThin  ])
            rotate([0,0,`+ points[i].angle + "])" + parts[points[i].partsType].modelSource;
        }
    }
    return partsCode;
}



function translateSCD(code) {
    // コードをBlob化
    const blob = new Blob([code], { type: 'text/plain' });

    const date = new Date().toLocaleDateString("ja-JP", {
        year: "numeric", month: "2-digit",
        day: "2-digit"
    }).replaceAll('/', '-');

    // ダウンロード用のaタグ生成

    const fileName = window.prompt('保存するファイル名を入力してください:', date);

    if (fileName === null) {
        return;
    }
    if (fileName.trim() !== "") {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = fileName + '.scad';
        a.click();
    }
    else {
        window.alert('無効なファイル名が入力されました。');
    }
}