import { useState } from 'react'
import { useWindowEvent } from './useWindowEvent' // Предполагаем, что этот хук уже реализован

interface ViewportSize {
	width: number
	height: number
}

export const useViewportSize = (): ViewportSize => {
	const [size, setSize] = useState<ViewportSize>({
		width: typeof window !== 'undefined' ? window.innerWidth : 0,
		height: typeof window !== 'undefined' ? window.innerHeight : 0,
	})

	const handleResize = () => {
		setSize({
			width: window.innerWidth,
			height: window.innerHeight,
		})
	}

	useWindowEvent('resize', handleResize)

	return size
}
