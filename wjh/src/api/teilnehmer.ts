import FetchUtils from './FetchUtils'

import { apiBaseUrl } from '@/constants'
import { GetCodeDto } from './generatedTypes'

export async function getCode(getCodeDto: GetCodeDto) {
  const response = await FetchUtils.fetchPOST(
    `${apiBaseUrl}/getCode`,
    getCodeDto,
    undefined,
    undefined
  )
  return response
}
