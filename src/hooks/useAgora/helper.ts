import { Effect } from "@banuba/webar"
import { RefObject } from "react"
import MakeUpIcon from 'assets/make-up.svg';
import FaceIcon from 'assets/face.svg';
import SmileIcon from 'assets/smile.svg';


export const getEffectAssetsUrl = (name: string) => `https://pemhub.s3.amazonaws.com/contributor/effects/` + name

export const BanubaModules = [
  'background',
  'body',
  'eyes',
  'face_tracker',
  'hair',
  'hands',
  'lips',
  'skin',
]

export enum FaceFilterTempNames {
  default = 'default',
  makeup = 'makeup',
  // normal = 'normal',
  funny = 'funny',
}

export const FaceFilterTempList = [
  {
    name: FaceFilterTempNames.default,
    icon: FaceIcon,
  },
  {
    name: FaceFilterTempNames.makeup,
    icon: MakeUpIcon,
  },
  {
    name: FaceFilterTempNames.funny,
    icon: SmileIcon
  }
]

export interface IEffectConfig {
  name?: string
  params?: string[]
  arg?: string
  direction?: number
  value?: string | number,
}

export type IFaces = 'facemorphing' | 'nose' | 'eye' | 'lips' | 'skin' | 'eye_whitening' | 'tooth_whitening' | 'glasses_try_on'

interface IFaceFilterTempEffect {
  name: string
  filters?: Partial<Record<IFaces, IEffectConfig[]>>
}

export const FaceFilterTempEffects: Record<FaceFilterTempNames, IFaceFilterTempEffect> = {
  // default: {
  //   name: getEffectAssetsUrl('dialect.zip'),
  // },
  makeup: {
    name: getEffectAssetsUrl('WhooshBeautyFemale.zip'),
  },
  default: {
    name: getEffectAssetsUrl('Morphings_1.7.0.zip'),
    filters: {
      facemorphing: [
        {
          params: ['FaceMorph.face'],
          arg: 'narrowing',
          direction: 1,
          value: 8,
        },
      ],
      nose: [
        {
          params: ['FaceMorph.nose'],
          arg: 'width',
          direction: 1,
          value: -8,
        }
      ],
      eye: [
        {
          params: ['FaceMorph.eyes'],
          arg: 'rounding',
          value: 5,
        },
        {
          params: ['FaceMorph.eyes'],
          arg: 'enlargement',
          direction: 1,
          value: 8,
        }
      ],
      lips: [
        {
          params: ['FaceMorph.lips'],
          direction: 1,
          value: 2,
          arg: 'smile',
        },
        {
          params: ['Lips.color'],
          direction: 1,
          value: '1 0 0.49 1',
        }
      ],
      skin: [
        {
          params: ['Skin.softening'], 
          value: 76, 
          direction: 1
        },
      ],
      eye_whitening: [
        {
          name: getEffectAssetsUrl('EyesWitening_Toggle.zip'), 
          params: ['onDataUpdate'],
          value: 2
        }
      ],
      tooth_whitening: [
        {
          name: getEffectAssetsUrl('TeethWitening_Toggle.zip'), 
          params: ['onDataUpdate'],
          value: 2
        }
      ],
    }
  },
  funny: {
    name: getEffectAssetsUrl('glasses_RayBan4165_Dark.zip'),
    // name: getEffectAssetsUrl('Morphings_1.7.0.zip'),
    // filters: {
    //   facemorphing: [
    //     {
    //       params: ['FaceMorph.face'],
    //       arg: 'narrowing',
    //       direction: 1,
    //       value: 8,
    //     },
    //   ],
    //   nose: [
    //     {
    //       params: ['FaceMorph.nose'],
    //       arg: 'width',
    //       direction: 1,
    //       value: -8,
    //     }
    //   ],
    //   eye: [
    //     {
    //       params: ['FaceMorph.eyes'],
    //       arg: 'enlargement',
    //       direction: 1,
    //       value: 8,
    //     }
    //   ],
    //   lips: [
    //     {
    //       params: ['FaceMorph.lips'],
    //       direction: 1,
    //       value: 10,
    //       arg: 'smile',
    //     }
    //   ],
    //   skin: [
    //     {
    //       params: ['Skin.softening'], 
    //       value: 80, 
    //       direction: 1
    //     },
    //   ],
    //   eye_whitening: [
    //     {
    //       name: getEffectAssetsUrl('EyesWitening_Toggle.zip'), 
    //       params: ['onDataUpdate'],
    //       value: 2
    //     }
    //   ],
    //   tooth_whitening: [
    //     {
    //       name: getEffectAssetsUrl('TeethWitening_Toggle.zip'), 
    //       params: ['onDataUpdate'],
    //       value: 2
    //     }
    //   ],
    // }

  }
}

export const getEffectParamValues = (effect: IEffectConfig) => {
  const { params, arg, direction = 1, value = 1 } = effect
  let finalParamValue = value
  if (typeof value === 'number') {
    finalParamValue = value * direction / 10
  }
  return params?.map(param => arg ? `${param}({${arg}:${finalParamValue}})` : `${param}(${value})`)
}

let currentEffectMap = new Map()
export const applyTempEffect = async (temp: FaceFilterTempNames, playerRef: RefObject<any>) => {
  const { name, filters } = FaceFilterTempEffects[temp]
  const effect = new Effect(name)
  currentEffectMap.set(name, effect)
  await playerRef.current.applyEffect(currentEffectMap.get(name))
  if (filters) {
    Object.keys(filters)?.forEach(async (key) => {
      const effectConfigs = filters[key as IFaces] as IEffectConfig[]
      effectConfigs.forEach(async (effectConfig) => {
        const { name: effectName, ...rest } = effectConfig
        if (effectName && !currentEffectMap.has(effectName)) {
          const effect = new Effect(effectName)
          currentEffectMap.set(effectName, effect)
          await playerRef.current.applyEffect(currentEffectMap.get(effectName))
        }

        if (!rest) {
          return
        }
        const values = getEffectParamValues(rest)
        if (!values) {
          return
        }
        await Promise.all(values.map(value => {
          const effect = currentEffectMap.get(effectName || name)
          return effect.evalJs(value)
        }))
      })
    })
  }
  

}