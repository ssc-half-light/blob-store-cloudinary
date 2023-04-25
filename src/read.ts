import { Cloudinary } from '@cloudinary/url-gen'

export function read ({ cloudName }) {
    const cld = new Cloudinary({
        cloud: { cloudName },
        url: { secure: true }
    })

    return cld
}
