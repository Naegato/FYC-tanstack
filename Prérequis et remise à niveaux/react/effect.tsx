import {
  useEffect,
  useState,
} from 'react'

function Courses() {
  const [courses, setCourses] = useState<string[]>([])

  useEffect(() => {
    fetch('/api/courses')
    .then(res => res.json())
    .then(setCourses)
  }, [])

  return <pre>{JSON.stringify(courses, null, 2)}</pre>
}