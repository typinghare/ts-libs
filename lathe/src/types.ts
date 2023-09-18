import { Lathe } from './Lathe'

export type InitialDrawing<R, P, M = any> = (raw: R, material: M) => P | void | undefined

export type IntermediateDrawing<B, P, R, M = any> = (blank: B, raw: R, material: M) => P | void | undefined

export type FinalDrawing<B, P, R, M = any> = IntermediateDrawing<B, P, R, M>

export type IndefiniteLathe = Lathe<any, any, any>