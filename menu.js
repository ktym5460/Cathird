document.querySelector('body').addEventListener('click', function (event) {
    // クリックされた要素のクラス名を取得

    displaySubmenu("sub-menu1", "sub-menu1", "menu1");
    displaySubmenu("sub-menu2", "sub-menu2", "menu2");

    function displaySubmenu(subId, subClass, menuClass) {
        const clickedElementClasses = event.target.classList;
        if (document.getElementById(subId) && !clickedElementClasses.contains(subClass) && !clickedElementClasses.contains(menuClass)) {
            document.getElementById(subId).style.display = 'none';
        }
        if (document.getElementById(subId) && clickedElementClasses.contains(menuClass)) {
            if (window.getComputedStyle(document.getElementById(subId)).display === "block") {
                document.getElementById(subId).style.display = 'none';
            }
            else {
                document.getElementById(subId).style.display = 'block';
            }

        }
    }


});

function arrayExport() {
    console.log(objectDataArray);
    console.log(circuitDataArray);
    if (objectDataArray.length == 0 && holeDataArray == 0 && circuitDataArray.length == 1) {
        window.alert('保存するデータがありません。');
    }
    else {
        const data = JSON.stringify({ objectDataArray, holeDataArray, circuitDataArray }, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const date = new Date().toLocaleDateString("ja-JP", {
            year: "numeric", month: "2-digit",
            day: "2-digit"
        }).replaceAll('/', '-');

        const downloadFile = () => {
            const filename = window.prompt('保存するファイル名を入力してください:', date);
            if (filename === null) {
                return;
            }
            if (filename.trim() !== "") {
                const a = document.createElement('a');
                a.href = url;
                a.download = filename;

                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            } else {
                window.alert('無効なファイル名が入力されました。');
            }
        };


        downloadFile();
    }

}

function arrayImport() {
    if (objectDataArray.length != 0 || holeDataArray != 0 || circuitDataArray.length != 1) {
        if (window.confirm("データを読み込んだ場合、現在の保存していないデータは削除されますが、よろしいですか。") == false) {
            return;
        }
    }
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json';
    fileInput.addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (event) {
                const contents = event.target.result;
                const jsonData = JSON.parse(contents);
                console.log(jsonData); // JSONデータをコンソールに表示
                objectDataArray = jsonData["objectDataArray"];
                holeDataArray = jsonData["holeDataArray"];
                circuitDataArray = jsonData["circuitDataArray"];
                reDraw();
                window.alert('保存したデータを読み込みました。');
            };
            reader.readAsText(file);
        } else {
            console.error('ファイルが選択されていません。');
        }
    });
    fileInput.click();

}

// Ctrl+◯のショートカットを設定
document.addEventListener('keydown', function (event) {
    if (event.ctrlKey && event.key === 'z') {
        back();
    }
    if (event.ctrlKey && event.key === 'z') {
        next();
    }
});