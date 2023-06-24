import { DecoratorGenerator, Zone } from '@typinghare/ts-reflect'

export const zone = Zone.new('json-equivalence')
export const decoratorGenerator = new DecoratorGenerator(zone)