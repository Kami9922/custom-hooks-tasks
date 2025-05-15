import { useEffect } from 'react'

type EventListener = EventListenerOrEventListenerObject

export const useWindowEvent = (type: string, listener: EventListener) => {
	useEffect(() => {
		if (typeof window !== 'undefined') {
			window.addEventListener(type, listener)
			return () => window.removeEventListener(type, listener)
		}
	}, [type, listener])
}
