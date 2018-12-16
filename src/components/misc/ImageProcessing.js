import Jimp from 'jimp/es';

export const scale = (imageFile) => {

  return Jimp.read(imageFile)
    .then(image => {
      return image.scaleToFit( 1280, 960)
        .quality(70)
        .getBufferAsync(Jimp.MIME_JPEG); // save// scale the image to the largest size that fits inside the given width and height
    })
    .catch(err => {
      console.log(err)
    });
}

export const thumbnail = (imageFile) => {

  return Jimp.read(imageFile)
    .then(image => {
      return image.scaleToFit( 480, 360)
        .quality(70)
        .getBufferAsync(Jimp.MIME_JPEG); // save// scale the image to the largest size that fits inside the given width and height
    })
    .catch(err => {
      console.log(err)
    });
}