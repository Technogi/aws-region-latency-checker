import axios from 'axios'
import { Mode } from '.'

export default async function doRequest(
  region: string,
  mode: Mode = 'content transfer',
): Promise<bigint> {
  const start = now()
  switch (mode) {
    case 'content transfer':
      await axios.get(`https://ec2.${region}.amazonaws.com/ping`)
      return now() - start
    case 'first byte':
    case 'dns lookup':
    case 'tcp connection':
    case 'tls handshake':
    default:
      throw new Error(`${mode} not implemented. Only 'content transfer is implemented in axios'`)
  }
}

function now(): bigint {
  return BigInt(Date.now())
}
