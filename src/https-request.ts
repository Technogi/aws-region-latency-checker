import { request } from 'https'
import { Mode } from '.'

function now(): bigint {
  return process.hrtime.bigint()
}

/**
 *
 *
 * @param {string} region
 * @param {Mode} mode
 * @return {*}  {Promise<bigint>}
 */
export default function doRequest(region: string, mode: Mode): Promise<bigint> {
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
