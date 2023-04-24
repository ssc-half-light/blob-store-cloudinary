import { webcrypto } from 'one-webcrypto'
import { toString } from 'uint8arrays/to-string'
import _cloudinary from 'cloudinary'
const cloudinary = _cloudinary.v2

interface cloudinaryParams {
    cloudName:string,
    apiKey:string,
    apiSecret:string
}

export class BlobStore {
    cloudinary

    static Cloudinary (params?:cloudinaryParams) {
        const config = (params ? ({
            cloud_name: params.cloudName,
            api_key: params.apiKey,
            api_secret: params.apiSecret
        }) : ({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        }))

        return new BlobStore(config)
    }

    constructor (config) {
        cloudinary.config(config)
        this.cloudinary = cloudinary
    }

    async write (file) {
        const hash = await getHash(file)
        const slugifiedHash = encodeURIComponent(hash)

        return new Promise((resolve, reject) => {
            this.cloudinary.uploader.upload(file, {
                public_id: slugifiedHash
            }, function (err, res) {
                if (err) return reject(err)
                resolve({ hash: hash, slug: slugifiedHash, response: res })
            })
        })
    }
}

// data should be Uint8Array
export function getHash (data) {
    let _data = data
    if (typeof data === 'string') {
        const te = new TextEncoder()
        _data = te.encode(data)
    }

    return webcrypto.subtle.digest('SHA-256', _data).then(buf => {
        return toString(new Uint8Array(buf), 'base64url')
    })
}

