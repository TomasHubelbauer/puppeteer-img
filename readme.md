# Puppeteer `img`

Turns out Puppeteer has no problem navigating to an image file directly using the
`file://` protocol. The resulting page will behave as if an HTML document was
opened which references the given image.

This is useful for quickly generating thumbs.

This won't work for navigating to a PDF, Chromium doesn't bundle PDF viewing
support, it is a native component in Chrome (unlike say Firefox with PDF.js).
It does of course support rendering to a PDF.
