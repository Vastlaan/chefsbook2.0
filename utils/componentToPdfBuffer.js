import { renderToStaticMarkup, renderToString } from "react-dom/server";
import { ServerStyleSheet } from "styled-components";
import pdf from "html-pdf";

export default function componentToPdfBuffer(component) {
    return new Promise((resolve, reject) => {
        const sheet = new ServerStyleSheet();

        const body = renderToString(sheet.collectStyles(component));
        const css = sheet.getStyleTags();
        const html = `<html>
            <head>
                <meta charSet="utf-8" />
                <meta httpEquiv="x-ua-compatible" content="ie=edge" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, shrink-to-fit=yes"
                />
            </head>
            ${css}
            <body>${body}</body>
        </html>`;

        const options = {
            format: "A4",
            orientation: "landscape",
            border: "5mm",
            footer: {
                height: "5mm",
            },
            type: "pdf",
            timeout: 30000,
        };

        const buffer = pdf.create(html, options).toBuffer((err, buffer) => {
            if (err) {
                return reject(err);
            }
            return resolve(buffer);
        });
    });
}
