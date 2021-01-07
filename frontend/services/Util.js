/*
export default class Util {
    isDev () {
        return process.env.NODE_ENV !== 'production';
    }
}
*/

const isDev = () => {
    console.log('isDev:' + process.env.NODE_ENV !== 'production')
    return process.env.NODE_ENV !== 'production'
}

export {isDev}