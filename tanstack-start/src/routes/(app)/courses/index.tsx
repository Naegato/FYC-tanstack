import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Typography } from '@/components/ui/typography'
import { createFileRoute, Link } from '@tanstack/react-router'
import data from '@/data/data.json'

export const Route = createFileRoute('/(app)/courses/')({
  component: RouteComponent,
})

function RouteComponent() {
  const courses = data.courses;

  return <div className="p-10 lg:max-w-6xl mb-10 mx-auto px-5">
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Courses</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    <Typography type="h1">
      Liste des cours
    </Typography>

    <ul className="py-10">
      {courses.map((course) => (
        <li key={course.id} className="flex flex-col lg:flex-row max-w-full gap-5 ">
          <img loading="lazy" src={`https://picsum.photos/320/180?random=${course.id}`} alt={course.title} className="w-full lg:w-80 h-auto object-cover" />
          <div className="flex flex-col lg:flex-row gap-5 justify-between flex-1">
            <div>
              <Typography type="h2">
                {course.title}
              </Typography>
              <Typography type="p" className="line-clamp-4">
                {course.description}
              </Typography>
            </div>
            <Button asChild className="self-start lg:self-center mt-2 lg:mt-0">
              <Link to="/courses/$courseId" params={{ courseId: String(course.id) }} >
                Voir le cours
              </Link>
            </Button>
          </div>
        </li>
      ))}
    </ul>
  </div>
}
