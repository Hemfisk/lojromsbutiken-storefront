import { NextFont } from 'next/dist/compiled/@next/font'
import React from 'react'

interface Props {
	fontFamily: NextFont
}

const Footer = ({ fontFamily }: Props) => {
	return <div className={fontFamily.className}>Footer</div>
}

export default Footer
