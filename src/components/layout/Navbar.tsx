import { NextFont } from 'next/dist/compiled/@next/font'
import React from 'react'

interface Props {
	fontFamily: NextFont
}

function Navbar({ fontFamily }: Props) {
	return <div className={fontFamily.className}>Navbar</div>
}

export default Navbar
