'use strict';

/**
 * apply controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::apply.apply');
