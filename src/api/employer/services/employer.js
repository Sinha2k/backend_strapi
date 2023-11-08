'use strict';

/**
 * employer service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::employer.employer');
