import { ModelAttributes } from '@types'

export const getAttributesTranslations = (t: (t: string) => string): Record<ModelAttributes, string> => ({
  [ModelAttributes.Masseuse]: t('model.details.attributes.MASSEUSE'),
  [ModelAttributes.PornStar]: t('model.details.attributes.PORN_STAR'),
  [ModelAttributes.UniversityStudent]: t('model.details.attributes.UNIVERSITY_STUDENT'),
})