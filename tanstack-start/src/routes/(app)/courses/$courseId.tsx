import { Typography } from '@/components/ui/typography.tsx'
import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import data from '@/data/data.json'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

export const Route = createFileRoute('/(app)/courses/$courseId')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const course = data.courses.find(
      (course) => String(course.id) === params.courseId,
    )
    if (!course) {
      throw notFound()
    }
    return { course }
  },
})

function RouteComponent() {
  const course = Route.useLoaderData().course

  return (
    <div className="flex flex-col p-10 gap-10 max-w-7xl mx-auto">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/courses">Courses</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{course.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-col lg:flex-row items-center">
        <div className="w-full md:w-3/4 lg:w-1/3">
          <img
            loading="lazy"
            src={`https://picsum.photos/320/180?random=${course.id}`}
            alt={course.title}
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>
        <div className="w-full lg:w-2/3 py-10 md:px-10">
          <Typography type="h1">{course.title}</Typography>
          <Typography type="p">{course.description}</Typography>
        </div>
      </div>
      {course.chapters.map((chapter) => {
        return (
          <div key={chapter.id}>
            <Typography type="h2">
              Chapitre {chapter.id}: {chapter.title}
            </Typography>
            <Typography type="p">{chapter.content}</Typography>
            {/*{chapter.lessons.map((lesson) => {*/}
            {/*  return <div key={lesson.id} className="mb-5 ml-5">*/}
            {/*    <Typography type="h3" className="mb-2">Leçon {lesson.id}: {lesson.title}</Typography>*/}
            {/*    <Typography type="p">{lesson.content}</Typography>*/}
            {/*  </div>*/}
            {/*})}*/}
          </div>
        )
      })}
    </div>
  )
}
