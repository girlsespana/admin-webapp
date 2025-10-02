import i18n from '@/i18n'
import { AccountType } from '@types'


export const accountTypeTranslations: Record<AccountType, string> = {
  [AccountType.Agency]: i18n.t('choices.model.accountType.agency'),
  [AccountType.Independent]: i18n.t('choices.model.accountType.independent'),
}