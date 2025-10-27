import { compare, hash } from 'bcrypt'

// Use for generating new hashes
export async function hashPassword(plain: string) {
  const hashResult = await hash(plain, 10)
  return hashResult
}

// Use for comparing plain password with hash
export async function isSamePassword(data: {
  hash: string;
  password: string;
}) {
  return await compare(data.password, data.hash)
}
