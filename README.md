# Welcome to @posterboy/aws-region-latency-checker 👋
![Version](https://img.shields.io/badge/version-0.0.1-blue.svg?cacheSeconds=2592000)
[![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](https://github.com/Technogi/aws-region-latency-checker#readme)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/Technogi/aws-region-latency-checker/graphs/commit-activity)
[![License: MIT](https://img.shields.io/github/license/Technogi/@posterboy/aws-region-latency-checker)](https://github.com/Technogi/aws-region-latency-checker/blob/master/LICENSE)

> Library for checking AWS regions latency. Based on super cool post https://blog.risingstack.com/measuring-http-timings-node-js/

### 🏠 [Homepage](https://github.com/Technogi/aws-region-latency-checker#readme)

## Description

Library for checking AWS regions latency. Based on super cool post https://blog.risingstack.com/measuring-http-timings-node-js/

## Install

```sh
npm install @posterboy/aws-region-latency-checker 
```

## Usage

Just import the library and select the mode for latency:

### Modes:
- 'dns lookup'
- 'tcp connection'
- 'tls handshake'
- 'first byte'
- 'content transfer'

### Example

```typescript
import {checkLatencies,checkLatency} from '@posterboy/aws-region-latency-checker'

const results = await checkLatencies()

const results = await checkLatencies(['us-west-2','us-east-1'],'dns-lookup')

const results = await checkLatency('us-east-1','dns-lookup')

```


## Author

👤 **Carlos H**

* Website: http://www.technogi.com.mx
* Github: [@Technogi](https://github.com/Technogi)
* Email: carlos@technogi.com.mx

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

Feel free to check [issues page](https://github.com/Technogi/aws-region-latency-checker/issues). You can also take a look at the [contributing guide](https://github.com/Technogi/aws-region-latency-checker/blob/master/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!


## 📝 License

Copyright © 2021 [carlos@technogi.com.mx](https://github.com/Technogi).

This project is [MIT](https://github.com/Technogi/aws-region-latency-checker/blob/master/LICENSE.md) licensed.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_