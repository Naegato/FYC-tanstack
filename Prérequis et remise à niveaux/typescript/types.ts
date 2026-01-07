type Course = {
  id: number
  title: string
  published: boolean
}

function getCourseTitle(course: Course): string {
  return course.title
}