async function loadCourses() {
  const response = await fetch('/api/courses')
  const courses = await response.json()

  return courses
}

// or

const loadCoursesAlt = async () => {
  const response = await fetch('/api/courses')
  const courses = await response.json()

  return courses
}