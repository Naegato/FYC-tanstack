const getCourses = async () => {
  // ...
}


export const loader = async () => {
  const courses = await getCourses()
  return { courses }
}