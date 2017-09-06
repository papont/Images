// коэффициент размытия
var blur = 5;

//список картинок
var imgList = [
    'img/1.png',
    'img/2.png',
    'img/3.png'
];

function loadImage(url) {
    return new Promise(function(resolve, reject) {

        var img = new Image();
        img.onload = function () {
            return resolve(img);
        };

        img.onerror = function () {
            return reject(url);
        };

        img.src = url;
    });
}

function loadImg2Canvas(images, count) {
    var imgSrc = images.shift();
    if (!imgSrc) return;

    return loadImage(imgSrc)
        .then(function(img)
        {
            var div = document.createElement('div');
            div.id="container";

            var canvas = document.createElement('canvas');
            canvas.id = "_canvas" + count;
            var context = canvas.getContext('2d');
            context.drawImage(img, 0, 0, canvas.width, canvas.height);
            div.appendChild(canvas);
            document.body.appendChild(div);

            var canvas = document.createElement('canvas');
            canvas.id = "canvas" + count;
            var context = canvas.getContext('2d');
            context.drawImage(img, 0, 0, canvas.width, canvas.height);
            div.appendChild(canvas);
            stackBlurCanvas(0, 0, canvas.width, canvas.height, blur, context );
            document.body.appendChild(div);

            return loadImg2Canvas(images, count + 1); //рекурсия
        })
        .catch(function(url)
        {
            //если какое-то из изображений не загрузилось, переходим к следующему изображению
            console.log('не удалось загрузить изображение по указанному пути: ', url);
            return loadImg2Canvas(images, count + 1); //рекурсия
        });

}

loadImg2Canvas(imgList, 1);
