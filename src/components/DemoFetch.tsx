import { useFetch } from '../hooks/useFetch'

interface Post {
	id: number
	title: string
}

export const DemoFetch = () => {
	const { data, isLoading, error, refetch } = useFetch<Post[]>(
		'https://jsonplaceholder.typicode.com/posts'
	)

	return (
		<div>
			<div>
				<button
					onClick={() =>
						refetch({
							params: {
								_limit: 3,
							},
						})
					}>
					Перезапросить
				</button>
			</div>
			{isLoading && 'Загрузка...'}
			{error && 'Произошла ошибка'}
			{data &&
				!isLoading &&
				data.map((item: Post) => <div key={item.id}>{item.title}</div>)}
		</div>
	)
}
