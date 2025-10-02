import i18n from '@/i18n'
import { ModelRangeType } from '@types'


export const rangeTypeTranslations: Record<ModelRangeType, string> = {
  [ModelRangeType.Top]: i18n.t('choices.model.rangeType.top'),
  [ModelRangeType.Vip]: i18n.t('choices.model.rangeType.vip'),
  [ModelRangeType.Regular]: i18n.t('choices.model.rangeType.regular'),
}