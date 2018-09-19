export * from 'nuxt-property-decorator'

export const symbolApiPrefix = Symbol('prefix')
export const symbolApiContext = Symbol('ctx')

export const Controller = (prefix = ''): ClassDecorator => {
    return target => {
        target.prototype[symbolApiPrefix] = prefix
    }
}
