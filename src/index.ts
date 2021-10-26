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

export type Implementation = 'axios' | 'https'

export async function doRequest(
  region: string,
  mode: Mode = 'content transfer',
  implementation: Implementation = 'axios',
): Promise<bigint> {
  switch (implementation) {
    case 'https':
      const httpRequest = await import('./https-request')
      return httpRequest.default(region, mode)
    default:
      const axiosRequest = await import('./axios-request')
      return axiosRequest.default(region, mode)
  }
}

/**
 *
 *
 * @export
 * @param {string} region
 * @param {Mode} [mode='first byte']
 * @return {*}  {Promise<number>}
 */
export async function checkLatency(region: string, mode: Mode = 'first byte'): Promise<number> {
  return doRequest(region, mode).then(Number)
}

/**
 *
 *
 * @export
 * @param {string[]} [regions]
 * @param {Mode} [mode='first byte']
 * @return {*}  {Promise<Array<RegionLatency>>}
 */
export async function checkLatencies(
  regions?: string[],
  mode: Mode = 'content transfer',
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
