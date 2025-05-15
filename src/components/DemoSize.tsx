import { useViewportSize } from '../hooks/useViewportSize'

export const DemoSize = () => {
	const { height, width } = useViewportSize()

	return (
		<>
			Width: {width} Height: {height}
		</>
	)
}
