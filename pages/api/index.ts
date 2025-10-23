// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import getConfig from 'next/config'

type Data = {
  name: string
  package_version: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { publicRuntimeConfig } = getConfig()

  res.status(200).json({
    name: 'JET Web API Service',
    package_version: publicRuntimeConfig?.version,
  })
}
