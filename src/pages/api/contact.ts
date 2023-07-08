import { NextApiRequest, NextApiResponse } from 'next'

const mailAPI = async (req: NextApiRequest, res: NextApiResponse) => {
	const nodemailer = require('nodemailer')
	const transporter = nodemailer.createTransport({
		port: process.env.NEXT_PUBLIC_MAIL_PORT,
		host: process.env.NEXT_PUBLIC_MAIL_HOST,
		auth: {
			user: process.env.NEXT_PUBLIC_MAIL_USER,
			pass: process.env.NEXT_PUBLIC_MAIL_PASS,
		},
		secure: false,
	})
	const mailData = {
		from: 'info@dalafisk.se',
		to: 'info@dalafisk.se',
		subject: `Meddelande från ${req.body.name} via Dalafisk.se`,
		text: `${req.body.message} | Skickat från: ${req.body.name} (${req.body.email} Telefon nr: ${req.body.phone})`,
		html: `<div>${req.body.message.replace(
			/\n/g,
			'<br />'
		)}</div><p>Skickat från:
    ${req.body.name} (${req.body.email} Telefon nr: ${req.body.phone})</p>`,
	}
	try {
		await transporter.sendMail(mailData)
		res.status(200)
		res.end()
	} catch (error: any) {
		console.error(error)
		res.status(error.response.status)
		res.end()
	}
}

export default mailAPI
