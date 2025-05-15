import { useState, useRef, useEffect, Ref } from 'react'

type HoverReturnType<T extends HTMLElement> = {
	hovered: boolean
	ref: Ref<T>
}

export const useHover = <
	T extends HTMLElement = HTMLDivElement
>(): HoverReturnType<T> => {
	const [hovered, setHovered] = useState(false)
	const ref = useRef<T>(null)

	useEffect(() => {
		const refValue = ref.current
		if (!refValue) return

		const handleMouseEnter = () => setHovered(true)
		const handleMouseLeave = () => setHovered(false)

		refValue.addEventListener('mouseenter', handleMouseEnter)
		refValue.addEventListener('mouseleave', handleMouseLeave)

		return () => {
			refValue.removeEventListener('mouseenter', handleMouseEnter)
			refValue.removeEventListener('mouseleave', handleMouseLeave)
		}
	}, [])

	return { hovered, ref }
}
