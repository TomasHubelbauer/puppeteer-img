# Puppeteer `img`

Turns out Puppeteer has no problem navigating to an image file directly using the
`file://` protocol. The resulting page will behave as if an HTML document was
opened which references the given image.

This is useful for quickly generating thumbs.

The same is true for video files. VP9 and WebM is supported out of the box by
Chromium. MP4 is not. There is a Chromium build which bundles codecs necessary
for MP4 support here: https://chromium.woolyss.com/

An NPM package is available which instruments Puppeteer with this version of
Chromium: `talmobi/chromium-all-codecs-bin`. With it, Puppeteer can be used to
generate posters even for MP4 videos.

This won't work for navigating to a PDF, Chromium doesn't bundle PDF viewing
support, it is a native component in Chrome (unlike say Firefox with PDF.js).
It does of course support rendering to a PDF.
