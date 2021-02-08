import multer from "multer";
import AWS from "aws-sdk";
import multerS3 from "multer-s3";

export const config = {
    api: {
        bodyParser: false,
    },
};

function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            console.log(result);
            if (result instanceof Error) {
                return reject(result);
            }

            return resolve(result);
        });
    });
}

export default async function handler(req, res) {
    try {
        const spacesEndpoint = new AWS.Endpoint(
            "https://ams3.digitaloceanspaces.com"
        );
        const s3 = new AWS.S3({
            endpoint: spacesEndpoint,
            secretAccessKey: process.env.AWS_SECRET_KEY,
            accessKeyId: process.env.AWS_ACCESS_KEY,
        });

        const upload = multer({
            storage: multerS3({
                s3: s3,
                bucket: "michalantczak",
                acl: "private",
                key: function (req, file, cb) {
                    cb(null, Date.now().toString());
                },
            }),
        }).array("file", 1);

        await runMiddleware(req, res, upload);

        console.log("here 3: ", req.body, req.files[0].key);

        res.status(200).json({ data: req.body });
    } catch (e) {
        console.log(e);
    }
}
