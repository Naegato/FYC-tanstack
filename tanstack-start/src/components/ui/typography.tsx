import { cn } from '@/lib/utils.ts'
import { Slot } from '@radix-ui/react-slot'
import { FC, ReactNode } from 'react'

type TypographyProps = {
  children: ReactNode
  asChild?: boolean
  className?: HTMLHeadElement['className']
}

type TypographyTableProps<T extends PropertyKey = string> = {
  column: T[]
  row: Record<T, ReactNode>[]
}

type TypographyListProps = {
  children: ReactNode[]
}

type TypographyKey =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'p'
  | 'blockquote'
  | 'table'
  | 'list'
  | 'inlineCode'
  | 'lead'
  | 'large'
  | 'small'
  | 'muted'

type TypographyComponent<T = TypographyKey> = FC<
  {
    type: T
  } & (T extends 'table'
    ? TypographyTableProps
    : T extends 'list'
      ? TypographyListProps
      : TypographyProps)
>

type TypographyComponentMapping<T = TypographyKey> = Record<
  TypographyKey,
  T extends 'table'
    ? FC<TypographyTableProps>
    : T extends 'list'
      ? FC<TypographyListProps>
      : FC<TypographyProps>
>

export const Typography: TypographyComponent = ({ type, ...props }) => {
  const mapping: TypographyComponentMapping = {
    h1: TypographyH1,
    h2: TypographyH2,
    h3: TypographyH3,
    h4: TypographyH4,
    p: TypographyP,
    blockquote: TypographyBlockquote,
    table: TypographyTable,
    list: TypographyList,
    inlineCode: TypographyInlineCode,
    lead: TypographyLead,
    large: TypographyLarge,
    small: TypographySmall,
    muted: TypographyMuted,
  }

  if (type === 'table') {
    const Component = mapping[type] as FC<TypographyTableProps>

    return <Component {...(props as TypographyTableProps)} />
  }

  if (type === 'list') {
    const Component = mapping[type] as FC<TypographyListProps>
    return <Component {...(props as TypographyListProps)} />
  }

  const Component = mapping[type] as FC<TypographyProps>
  return <Component {...(props as TypographyProps)} />
}

const TypographyH1: FC<TypographyProps> = ({
  children,
  asChild = false,
  className,
}) => {
  const Comp = asChild ? Slot : 'h1'

  return (
    <Comp
      className={cn(
        'scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance',
        className,
      )}
    >
      {children}
    </Comp>
  )
}

const TypographyH2: FC<TypographyProps> = ({
  children,
  asChild = false,
  className,
}) => {
  const Comp = asChild ? Slot : 'h2'

  return (
    <Comp
      className={cn(
        'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
        className,
      )}
    >
      {children}
    </Comp>
  )
}

const TypographyH3: FC<TypographyProps> = ({
  children,
  asChild = false,
  className,
}) => {
  const Comp = asChild ? Slot : 'h3'

  return (
    <Comp
      className={cn(
        'scroll-m-20 text-2xl font-semibold tracking-tight',
        className,
      )}
    >
      {children}
    </Comp>
  )
}

const TypographyH4: FC<TypographyProps> = ({
  children,
  asChild = false,
  className,
}) => {
  const Comp = asChild ? Slot : 'h4'

  return (
    <Comp
      className={cn(
        'scroll-m-20 text-xl font-semibold tracking-tight',
        className,
      )}
    >
      {children}
    </Comp>
  )
}

const TypographyP: FC<TypographyProps> = ({
  children,
  asChild = false,
  className,
}) => {
  const Comp = asChild ? Slot : 'p'

  return (
    <Comp className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}>
      {children}
    </Comp>
  )
}

const TypographyBlockquote: FC<TypographyProps> = ({
  children,
  asChild = false,
  className,
}) => {
  const Comp = asChild ? Slot : 'blockquote'

  return (
    <Comp className={cn('mt-6 border-l-2 pl-6 italic', className)}>
      {children}
    </Comp>
  )
}

const TypographyTable: FC<TypographyTableProps> = ({ row, column }) => {
  return (
    <div className="my-6 w-full overflow-y-auto">
      <table className="w-full">
        <thead>
          <tr className="even:bg-muted m-0 border-t p-0">
            {column.map((c, key) => {
              return (
                <th
                  key={key}
                  className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right"
                >
                  {c}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {column.map((c, key) => {
            return (
              <tr key={key} className="even:bg-muted m-0 border-t p-0">
                {row.map((r, key) => {
                  return (
                    <td
                      key={key}
                      className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
                    >
                      {r[c]}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

const TypographyList: FC<TypographyListProps> = ({ children }) => {
  return (
    <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
      {children.map((child, index) => {
        return <li key={index}>{child}</li>
      })}
    </ul>
  )
}

const TypographyInlineCode: FC<TypographyProps> = ({
  children,
  asChild = false,
  className,
}) => {
  const Comp = asChild ? Slot : 'code'

  return (
    <Comp
      className={cn(
        'bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
        className,
      )}
    >
      {children}
    </Comp>
  )
}

const TypographyLead: FC<TypographyProps> = ({
  children,
  asChild = false,
  className,
}) => {
  const Comp = asChild ? Slot : 'p'

  return (
    <Comp className={cn('text-muted-foreground text-xl', className)}>
      {children}
    </Comp>
  )
}

const TypographyLarge: FC<TypographyProps> = ({
  children,
  asChild = false,
  className,
}) => {
  const Comp = asChild ? Slot : 'div'

  return (
    <Comp className={cn('text-lg font-semibold', className)}>{children}</Comp>
  )
}

const TypographySmall: FC<TypographyProps> = ({
  children,
  asChild = false,
  className,
}) => {
  const Comp = asChild ? Slot : 'small'

  return (
    <Comp className={cn('text-sm leading-none font-medium', className)}>
      {children}
    </Comp>
  )
}

const TypographyMuted: FC<TypographyProps> = ({
  children,
  asChild = false,
  className,
}) => {
  const Comp = asChild ? Slot : 'p'

  return (
    <Comp className={cn('text-muted-foreground text-sm', className)}>
      {children}
    </Comp>
  )
}
