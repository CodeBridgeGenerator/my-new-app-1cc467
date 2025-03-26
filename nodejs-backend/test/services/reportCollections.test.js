const assert = require('assert');
const app = require('../../src/app');

describe('\'reportCollections\' service', () => {
  it('registered the service', () => {
    const service = app.service('reportCollections');

    assert.ok(service, 'Registered the service (reportCollections)');
  });
});
