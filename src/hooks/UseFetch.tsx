import { useState, useEffect, useCallback } from 'react'

interface FetchOptions {
	params?: Record<string, any>
}

interface FetchResult<T> {
	data: T | null
	isLoading: boolean
	error: string | null
	refetch: (options?: FetchOptions) => void
}

export const useFetch = <T = unknown,>(url: string): FetchResult<T> => {
	const [data, setData] = useState<T | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)
	const [options, setOptions] = useState<FetchOptions | null>(null)

	const fetchData = useCallback(async () => {
		setIsLoading(true)
		setError(null)

		try {
			const queryParams = options?.params
				? new URLSearchParams(options.params).toString()
				: ''
			const fullUrl = queryParams ? `${url}?${queryParams}` : url

			const response = await fetch(fullUrl)

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`)
			}

			const result = await response.json()
			setData(result)
		} catch (err) {
			setError(err instanceof Error ? err.message : 'An unknown error occurred')
		} finally {
			setIsLoading(false)
		}
	}, [url, options])

	const refetch = useCallback((newOptions?: FetchOptions) => {
		setOptions((prev) => ({ ...prev, ...newOptions }))
	}, [])

	useEffect(() => {
		fetchData()
	}, [fetchData])

	return { data, isLoading, error, refetch }
}
