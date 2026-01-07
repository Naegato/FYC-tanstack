import { useQuery } from '@tanstack/react-query'

const fetchCourses = async () => {
  // ...
}

const { data, isLoading, error } = useQuery({
  queryKey: ['courses'],
  queryFn: fetchCourses,
})
