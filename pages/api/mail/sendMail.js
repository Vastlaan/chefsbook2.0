import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SG_API_KEY);

export default async function handler(req, res) {
    const { recipients, title, body } = req.body;

    const message = {
        to: recipients,
        from: "noreply@chefsbook.com",
        subject: title,
        text: body,
    };

    try {
        await sgMail.send(message);
        res.status(200).json({ data: "Success" });
    } catch (e) {
        console.error(e);
        res.status(400).json({
            error: "Something went wrong. Could not send an e-mail.",
        });
    }
}
