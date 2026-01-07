type CourseCardProps = {
  title: string
}

function CourseCard({ title }: CourseCardProps) {
  return <h2>{title}</h2>
}

// or

const CourseCardAlt = ({ title }: { title: string }) => {
  return <h2>{title}</h2>
}