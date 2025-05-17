import { useState, useRef, useEffect, Ref, useCallback } from 'react'

type HoverReturnType<T extends HTMLElement> = {
	hovered: boolean
	ref: Ref<T>
}

export const useHover = <
	T extends HTMLElement = HTMLDivElement
>(): HoverReturnType<T> => {
	const [hovered, setHovered] = useState(false)
	const ref = useRef<T>(null)

	const onMouseEnter = useCallback(() => setHovered(true), [])
	const onMouseLeave = useCallback(() => setHovered(false), [])

	useEffect(() => {
		const refValue = ref.current
		if (!refValue) return

		refValue.addEventListener('mouseenter', onMouseEnter)
		refValue.addEventListener('mouseleave', onMouseLeave)

		return () => {
			refValue.removeEventListener('mouseenter', onMouseEnter)
			refValue.removeEventListener('mouseleave', onMouseLeave)
		}
	}, [])

	return { hovered, ref }
}
