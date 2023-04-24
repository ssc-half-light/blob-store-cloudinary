# blob store ![tests](https://github.com/ssc-hermes/blob-store/actions/workflows/nodejs.yml/badge.svg)

Blob storage

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

```ts
// must have 
const store = BlobStore.Cloudinary()
```
