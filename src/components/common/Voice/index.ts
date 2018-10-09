/**
 * @desc Voice
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-10-09 01:37:54
 */

import Base from '@/base'
import { Component } from '@/utils/decorators'
import { namespace } from 'vuex-class'

const { Getter } = namespace('app')

@Component({
  name: 'Voice',
})
export default class Voice extends Base {
  @Getter('voice') private data!: WebApi.AgentModule.voice.Res['data']
}
