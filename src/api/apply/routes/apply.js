'use strict';

/**
 * apply router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::apply.apply');
