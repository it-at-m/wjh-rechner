import FetchUtils from './FetchUtils'

import { todoVariable } from '@/constants'
import { GetCodeDto } from './generatedTypes'

export async function getCode(getCodeDto: GetCodeDto) {
  const response = await FetchUtils.fetchPOST(
    `${todoVariable}/getCode`,
    getCodeDto,
    undefined,
    undefined
  )
  return response
}
