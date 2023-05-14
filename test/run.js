const icofetch = require('../index.js')
const assert = require('assert')
const os = require('os')
const dir = os.tmpdir()
const { exist, read } = require('extras')

// Add credentials to test uploads:
// const settings = read('test/aws.yml')
// console.log({ settings })

async function run() {
  console.log('TEST local download')
  let result = await icofetch('eldoy.com', { dir })
  assert.ok(result.path == `${dir}/eldoy-favicon.png`)
  assert.ok(exist(result.path))

  // Add credentials to test uploads:
  // console.log('TEST upload download')
  // result = await icofetch('eldoy.com', { dir, settings })
  // assert.ok(!!result)
}

run()
