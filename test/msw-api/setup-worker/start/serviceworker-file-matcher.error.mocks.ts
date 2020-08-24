import { setupWorker, rest } from 'msw'

const worker = setupWorker(
  rest.get('/user', (req, res, ctx) => {
    return res(ctx.status(200))
  }),
)

// @ts-ignore
window.__MSW_REGISTRATION__ = worker
  .start({
    serviceWorkerFileMatcher: (scriptUrl) =>
      scriptUrl.includes('some-bad-filename-that-does-not-exist.js'),
  })
  .then((reg) => {
    console.log('Registration Promise resolved')
    return reg.constructor.name // This will throw as as there is no instance returned with a non-matching worker name
  })
  .catch((error) => {
    console.error('Error - no worker instance after starting', error)
  })
