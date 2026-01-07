function wrapInArray<T>(value: T): T[] {
  return [value]
}

wrapInArray('React')
wrapInArray<number>(42)