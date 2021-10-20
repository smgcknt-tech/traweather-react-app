const Config = () => {
    if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') {
        return {
            env: {

            }
        }
    } else if (process.env.NODE_ENV === 'production') {
        return {
            env: {

            }
        }
    }
}
export const {env} = Config()