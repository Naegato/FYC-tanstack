import { useState } from 'react'

const [email, setEmail] = useState('')
const [error, setError] = useState<string | null>(null)