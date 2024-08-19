/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ErrorMetric } from '@src/enums/error-metric';
import { MagickGeometry } from '@src/types/magick-geometry';
import { TestImages } from '@test/test-images';

describe('MagickImage#adaptiveResize', () => {
    it('should change the width of the image', () => {
        TestImages.Builtin.logo.use((image) => {
            image.adaptiveResize(400, 0);

            expect(image.width).toBe(400);
            expect(image.height).toBe(300);
        });
    });

    it('should change the height of the image', () => {
        TestImages.Builtin.logo.use((image) => {
            image.adaptiveResize(0, 400);

            expect(image.width).toBe(533);
            expect(image.height).toBe(400);
        });
    });

    it('with geometry should change the width of the image', () => {
        TestImages.Builtin.logo.use((image) => {
            image.adaptiveResize(new MagickGeometry(300, 0));

            expect(image.width).toBe(300);
            expect(image.height).toBe(225);
        });
    });

    it('with geometry should change the height of the image', () => {
        TestImages.Builtin.logo.use((image) => {
            image.adaptiveResize(new MagickGeometry(0, 300));

            expect(image.width).toBe(400);
            expect(image.height).toBe(300);

            TestImages.Builtin.logo.use((original) => {
                expect(image.compare(original, ErrorMetric.RootMeanSquared)).toBeCloseTo(0.31492);
            });
        });
    });
});
