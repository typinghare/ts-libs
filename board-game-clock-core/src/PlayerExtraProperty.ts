import { Setting } from '@typinghare/settings'

export type PlayerExtraPropertyProperties = {
    label: string
}

export class PlayerExtraProperty<T, P extends PlayerExtraPropertyProperties> extends Setting<T, P> {
}