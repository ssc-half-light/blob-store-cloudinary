import { test } from 'tapzero'
import { BlobStore } from '@ssc-hermes/blob-store'
import * as dotenv from 'dotenv'
dotenv.config()

// cloud_name: params.cloudName,
// api_key: params.apiKey,
// api_secret: params.apiSecret

test('create cloudinary blob store without passing params', t => {
    const store = BlobStore.Cloudinary()
    t.ok(store, 'create a store')
})

test('create a blob store with params', t => {
    const store = BlobStore.Cloudinary({
        cloudName: process.env.CLOUDINARY_CLOUD_NAME as string,
        apiKey: process.env.CLOUDINARY_API_KEY as string,
        apiSecret: process.env.CLOUDINARY_API_SECRET as string
    })
    t.ok(store, 'create a store')
})
