import React from 'react'

import styles from '@/styles/ContactForm.module.scss'
import PageHeader from './PageHeader'
import Button from './Button'

const ContactForm = () => {
	return (
		<section className={styles.contact_section}>
			<div className={styles.contact_container}>
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
							required
						/>
					</div>
				</div>
				<div className={styles.form_container}>
					<Button primary>Skicka meddelande</Button>
				</div>
			</div>
		</section>
	)
}

export default ContactForm
