import { useState, useEffect, useCallback } from 'react'

type LocalStorageActions = {
	setItem: (value: string) => void
	removeItem: () => void
}

export const useLocalStorage = (
	key: string
): [string | null, LocalStorageActions] => {
	const [storedValue, setStoredValue] = useState<string | null>(null)

	const setItem = useCallback(
		(value: string) => {
			try {
				window.localStorage.setItem(key, value)
				setStoredValue(value)
			} catch (error) {
				console.error(`Set item to localStorage error: ${error}`)
			}
		},
		[key]
	)

	const removeItem = useCallback(() => {
		try {
			window.localStorage.removeItem(key)
			setStoredValue(null)
		} catch (error) {
			console.error(`Remove localStorage's item error: ${error}`)
		}
	}, [key])

	useEffect(() => {
		try {
			const item = window.localStorage.getItem(key)
			setStoredValue(item)
		} catch (error) {
			console.error(`Get localStorage's item error: ${error}`)
		}
	}, [key])

	return [storedValue, { setItem, removeItem }]
}
