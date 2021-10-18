import { request } from 'https'
import { DefaultAWSRegions } from './constants'

export type RegionLatency = {
  nanoSeconds?: number
  region: string
  error?: any
}

export type Mode =
  | 'dns lookup'
  | 'tcp connection'
  | 'tls handshake'
  | 'first byte'
  | 'content transfer'

export async function checkLatency(region: string, mode: Mode = 'first byte'): Promise<number> {
  return doRequest(region, mode).then(Number)
}

export async function checkLatencies(
  regions?: string[],
  mode: Mode = 'first byte',
): Promise<Array<RegionLatency>> {
  if (!regions || regions.length === 0) regions = DefaultAWSRegions

  const latencies: Array<RegionLatency> = []

  for (const region of regions) {
    try {
      const result = await doRequest(region, mode)
      latencies.push({
        region,
        nanoSeconds: Number(result),
      })
    } catch (error) {
      latencies.push({
        region,
        error,
      })
    }
  }

  return latencies
}

function doRequest(region: string, mode: Mode): Promise<bigint> {
  return new Promise((accept, reject) => {
    const startTime = now()
    const elapsed = () => now() - startTime

    const req = request(
      {
        host: `ec2.${region}.amazonaws.com`,
        path: '/ping',
      },
      (res) => {
        res.once('readable', () => {
          if (mode === 'first byte') return accept(elapsed())
        })
        if (mode === 'content transfer') {
          res.on('data', () => {
            //do nothing
          })
          res.on('end', () => {
            return accept(elapsed())
          })
          res.on('error', (e) => reject(e))
        }
      },
    )

    req.on('error', (e) => reject(e))
    req.on('socket', (socket) => {
      socket.on('lookup', () => {
        if (mode === 'dns lookup') return accept(elapsed())
      })

      socket.on('connect', () => {
        if (mode === 'tcp connection') return accept(elapsed())
      })

      socket.on('secureConnect', () => {
        if (mode === 'tls handshake') return accept(elapsed())
      })
    })
    req.end()
  })
}

function now(): bigint {
  return process.hrtime.bigint()
}
