import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import styles from '@/styles/ContactForm.module.scss'
import PageHeader from './PageHeader'
import Button from './Button'

const ContactForm = () => {
	const [mailData, setMailData] = useState({
		name: '',
		phone: '',
		email: '',
		message: '',
		sent: false,
		sending: false,
		buttonText: 'Skicka meddelande',
	})

	const notification = (message: string) => {
		if (message === 'success') {
			toast.success(
				'Tack för ditt meddelande, vi återkommer till dig så snart som möjligt.',
				{
					position: toast.POSITION.BOTTOM_CENTER,
				}
			)
		} else if (message === 'fail') {
			toast.error('Åh nej! Något gick fel, var vänlig försök igen.', {
				position: toast.POSITION.BOTTOM_CENTER,
			})
		}
	}

	const resetForm = () => {
		setMailData({
			name: '',
			phone: '',
			email: '',
			message: '',
			sent: false,
			sending: false,
			buttonText: 'Skicka meddelande',
		})
	}

	const submitForm = (e: React.FormEvent) => {
		e.preventDefault()
		setMailData((mailData) => ({
			...mailData,
			buttonText: 'Skickar...',
			sending: true,
		}))

		const data = {
			name: mailData.name,
			phone: mailData.phone,
			email: mailData.email,
			message: mailData.message,
		}

		axios
			.post('/api/contact', data)
			.then((res) => {
				if (res.status === 200) {
					setMailData((mailData) => ({ ...mailData, sent: true }))
					notification('success')
					resetForm()
				} else {
					setMailData((mailData) => ({
						...mailData,
						sending: false,
						buttonText: 'Skicka meddelande',
					}))
					notification('fail')
					console.error('Message not sent')
					console.error(e)
				}
			})
			.catch((e) => {
				setMailData((mailData) => ({
					...mailData,
					sending: false,
					buttonText: 'Skicka meddelande',
				}))
				notification('fail')
				console.error('Message not sent')
				console.error(e)
			})
	}

	return (
		<section className={styles.contact_section}>
			<form
				className={styles.contact_container}
				autoComplete='off'
				onSubmit={(e) => submitForm(e)}
			>
				<PageHeader noPadding heading='h2'>
					Kontakta oss
				</PageHeader>
				<div className={styles.form_container}>
					<div className={styles.input_container}>
						<label htmlFor='name'>Namn</label>
						<input
							type='text'
							name='name'
							id='name'
							placeholder='Ditt namn'
							value={mailData.name}
							onChange={(e) =>
								setMailData((mailData) => ({
									...mailData,
									name: e.target.value,
								}))
							}
							required
						/>
					</div>
					<div className={styles.input_container}>
						<label htmlFor='phone'>Telefonnummer</label>
						<input
							type='number'
							name='phone'
							id='phone'
							placeholder='Ditt telefonnummer'
							value={mailData.phone}
							onChange={(e) =>
								setMailData((mailData) => ({
									...mailData,
									phone: e.target.value,
								}))
							}
							required
						/>
					</div>
					<div className={styles.input_container}>
						<label htmlFor='email'>E-post</label>
						<input
							type='email'
							name='email'
							id='email'
							placeholder='Din e-postadress'
							value={mailData.email}
							onChange={(e) =>
								setMailData((mailData) => ({
									...mailData,
									email: e.target.value,
								}))
							}
							required
						/>
					</div>
				</div>
				<div className={styles.form_container}>
					<div className={styles.input_container}>
						<label htmlFor='message'>Meddelande</label>
						<textarea
							name='message'
							id='message'
							placeholder='Ditt meddelande'
							value={mailData.message}
							onChange={(e) =>
								setMailData((mailData) => ({
									...mailData,
									message: e.target.value,
								}))
							}
							required
						/>
					</div>
				</div>
				<div className={styles.form_container}>
					<Button primary type='submit' disabled={mailData.sending}>
						{mailData.buttonText}
					</Button>
				</div>
			</form>
		</section>
	)
}

export default ContactForm
