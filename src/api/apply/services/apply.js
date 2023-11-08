'use strict';

/**
 * apply service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::apply.apply');
