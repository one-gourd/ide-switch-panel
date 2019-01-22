import Router from 'ette-router';

import { IContext } from './helper';
import { createModel } from '../schema/util';
import { isExist } from '../../lib/util';

export const router = new Router();

// 创新新的 panels
router.post('panels', '/panels', function(ctx: IContext) {
  const { stores, request } = ctx;
  const { panels } = request.data;

  stores.setSwitchPanel(createModel({ panels }));
  ctx.response.status = 200;
});

// 在指定 index 处新增 panel
router.post('panels', '/panels/indexes/:index', function(ctx: IContext) {
  const { stores, params, request } = ctx;
  const { index } = params;
  const { panel } = request.data;

  const len = stores.switchPanel.panels.length;
  let targetIndex = len;
  // 确保 index 的合理范围，超过或者不传，默认是 append 操作
  if (isExist(index) && index >= 0 && index < len) {
    targetIndex = index;
  }
  const success = stores.switchPanel.addPanel(targetIndex, panel);

  ctx.response.body = {
    success,
    targetIndex
  };

  ctx.response.status = 200;
});
