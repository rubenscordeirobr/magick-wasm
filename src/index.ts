import MagickNative from '../lib/wasm/magick.js';
import { ImageMagick } from './magick/image-magick';

let loader: Promise<void>;
let api: ImageMagick;

export async function imageMagick() {
    if (api !== undefined)
        return api;

    if (loader === undefined) {
        loader = new Promise(resolve => {
            MagickNative().then((native) => {
                api = new ImageMagick(native);
                resolve();
            });
        });
    }

    await loader;
    return api;
}

imageMagick().then((im) => {
    console.log(im.magick.imageMagickVersion);
    console.log('Delegates:', im.magick.delegates);
    console.log('Features:', im.magick.features);
    console.log('Quantum:', im.quantum.depth);
});