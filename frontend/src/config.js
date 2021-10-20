const Config = () => {
    if (process.env.NODE_ENV === 'test') {
        return {
            env: {
                uploadUrl: '/api/uploads',
            }
        }
    } else if (process.env.NODE_ENV === 'development') {
        return {
            env: {
                uploadUrl: '/api/uploads',
            }
        }
    } else if (process.env.NODE_ENV === 'production') {
        return {
            env: {
                uploadUrl: '/api/uploads/s3',
            }
        }
    }
}
export const { env } = Config()