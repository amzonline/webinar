/*
export default class Util {
    isDev () {
        return process.env.NODE_ENV !== 'production';
    }
}
*/

const isDev = () => {
    return process.env.NODE_ENV !== 'production';
}

export {isDev}