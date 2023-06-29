import Resizer from "react-image-file-resizer";

export const IMG = {
    //helper function to resize image and create base64 from image
    resizeFile: function (file) {
        return new Promise((resolve) => {
            Resizer.imageFileResizer(
                file,
                800,
                800,
                "JPEG",
                100,
                0,
                (uri) => {
                    resolve(uri);
                },
                "base64"
            );
        });
    },
    base64ToImage: function (base64String) {
        return new Promise((resolve, reject) => {
            const byteString = atob(base64String.split(',')[1]);
            const mimeString = base64String.split(',')[0].split(':')[1].split(';')[0];
            const arrayBuffer = new ArrayBuffer(byteString.length);
            const uintArray = new Uint8Array(arrayBuffer);

            for (let i = 0; i < byteString.length; i++) {
                uintArray[i] = byteString.charCodeAt(i);
            }

            const blob = new Blob([arrayBuffer], {type: mimeString});
            const file = new File([blob], 'tmp.png', {type: mimeString});

            resolve(file);
        });
    },

}