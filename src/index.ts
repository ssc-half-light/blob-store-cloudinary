import { webcrypto } from 'one-webcrypto'
import { toString } from 'uint8arrays/to-string'
import _cloudinary, { UploadApiResponse } from 'cloudinary'
import { Cloudinary } from '@cloudinary/url-gen'
const cloudinary = _cloudinary.v2

interface cloudinaryParams {
    cloudName:string,
    apiKey:string,
    apiSecret:string
}

interface WriteResponse {
    hash:string,
    slug:string,
    response:UploadApiResponse
}

export class BlobStore {
    cloudinary
    cld

    static Cloudinary (params?:cloudinaryParams) {
        const config = (params ? ({
            cloud_name: params.cloudName,
            api_key: params.apiKey,
            api_secret: params.apiSecret
        }) : ({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
            api_key: process.env.CLOUDINARY_API_KEY as string,
            api_secret: process.env.CLOUDINARY_API_SECRET as string
        }))

        return new BlobStore(config)
    }

    /* eslint-disable camelcase */
    constructor (config:{cloud_name:string, api_key:string, api_secret:string}) {
        cloudinary.config(config)
        this.cloudinary = cloudinary
        this.cld = new Cloudinary({
            cloud: { cloudName: config.cloud_name },
            url: { secure: true }
        })
    }

    /**
     * Write a file to cloudinary, using a base64 version of it's hash as a
     * filename
     * @param file {Uint8Array} The file to write. Must be a base64 string
     * @returns {({ hash:string, slug:string, response:UploadApiResponse })}
     */
    async write (file:string):Promise<WriteResponse> {
        const hash = await getHash(file)
        const slugifiedHash = encodeURIComponent(hash)

        return new Promise<WriteResponse>((resolve, reject) => {
            this.cloudinary.uploader.upload(file, {
                public_id: slugifiedHash
            }, (err, res) => {
                if (err) return reject(err)
                resolve({ hash: hash, slug: slugifiedHash, response: res })
            })
        })
    }
}

// data should be Uint8Array
export async function getHash (data:string|Uint8Array) {
    let _data = data
    if (typeof data === 'string') {
        const te = new TextEncoder()
        _data = te.encode(data)
    }

    const buf = await webcrypto.subtle.digest('SHA-256', _data as Uint8Array)
    return toString(new Uint8Array(buf), 'base64url')
}
