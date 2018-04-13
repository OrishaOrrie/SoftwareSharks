const Uppy = require('../../src/core')
const Dashboard = require('../../src/plugins/Dashboard')
const Transloadit = require('../../src/plugins/Transloadit')

const uppy = Uppy({ debug: true, autoProceed: false })
  .use(Dashboard, {
    inline: 'true',
    target: 'body'
  })
  .use(Transloadit, {
    params: {
      auth: { key: YOUR_TRANSLOADIT_KEY },
      steps: {
        'crop_thumbed': {
          use: [':original'],
          robot: '/image/resize',
          height: 100,
          resize_strategy: 'crop',
          width: 100
        }
      }
    },
    waitForEncoding: true
  })
  .run()

uppy.on('complete', (result) => {
  // console.log(result)
  if (result.failed.length === 0) {
    console.log('Upload successful 😀')
  } else {
    console.warn('Upload failed 😞')
  }
  console.log('successful files:', result.successful)
  console.log('failed files:', result.failed)
})
