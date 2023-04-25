# blob store ![tests](https://github.com/ssc-hermes/blob-store/actions/workflows/nodejs.yml/badge.svg)

Blob storage

Use this for storage of *public* blobs -- anything publicly visible.

## install

```bash
npm i -S @ssc-hermes/blob-store
```

## examples

### create
```ts
// pass in params for `cloudinary`
const store = BlobStore.Cloudinary({
    cloudName: process.env.CLOUDINARY_CLOUD_NAME as string,
    apiKey: process.env.CLOUDINARY_API_KEY as string,
    apiSecret: process.env.CLOUDINARY_API_SECRET as string
})
```



### get a URL
```ts
test('read the file we just wrote', async t => {
    const url = (store.cld
        .image(hash)
        .resize(scale().width(100))
        .toURL())

    t.ok(url.includes('https'), 'should return an https URL')
    t.ok(url.includes(hash), 'url should include the right filename')
})
```
