const courses = [
  { id: 1, title: 'React', published: true },
  { id: 2, title: 'TypeScript', published: false },
]

const publishedCourses = courses
  .filter(course => course.published)
  .map(course => course.title)
