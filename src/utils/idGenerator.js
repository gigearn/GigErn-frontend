// Centralized ID Generator for all entities
// Generates sequential, non-random, unique IDs (non-persistent)

class IDGenerator {
  constructor() {
    // Initialize counters without localStorage (fresh start each session)
    this.counters = {
      store: 1000,
      gig: 2000,
      order: 3000,
      delivery: 4000,
      shift: 5000,
      transaction: 6000,
      document: 7000,
      user: 8000,
      payment: 9000
    };
  }

  generate(type, prefix = null) {
    if (!this.counters[type]) {
      throw new Error(`Unknown ID type: ${type}`);
    }

    // Increment counter (only in memory, not persisted)
    this.counters[type]++;

    // Generate ID with prefix
    const id = this.counters[type];
    const idPrefix = prefix || this.getDefaultPrefix(type);
    
    return `${idPrefix}${id}`;
  }

  getDefaultPrefix(type) {
    const prefixes = {
      store: 'ST',
      gig: 'GI',
      order: 'OR',
      delivery: 'DL',
      shift: 'SH',
      transaction: 'TX',
      document: 'DC',
      user: 'US',
      payment: 'PY'
    };
    return prefixes[type] || 'ID';
  }

  // Batch generate multiple IDs
  generateMultiple(type, count, prefix = null) {
    const ids = [];
    for (let i = 0; i < count; i++) {
      ids.push(this.generate(type, prefix));
    }
    return ids;
  }

  // Get current counter value (next ID will be this + 1)
  getCurrentCounter(type) {
    return this.counters[type] || 0;
  }

  // Reset counter (for testing purposes)
  resetCounter(type) {
    if (this.counters[type]) {
      this.counters[type] = this.getDefaultStartValue(type);
    }
  }

  getDefaultStartValue(type) {
    const startValues = {
      store: 1000,
      gig: 2000,
      order: 3000,
      delivery: 4000,
      shift: 5000,
      transaction: 6000,
      document: 7000,
      user: 8000,
      payment: 9000
    };
    return startValues[type] || 1;
  }

  // Validate ID format
  validateID(id, type) {
    const prefix = this.getDefaultPrefix(type);
    const pattern = new RegExp(`^${prefix}\\d+$`);
    return pattern.test(id);
  }

  // Extract numeric part from ID
  extractNumber(id) {
    const match = id.match(/\d+/);
    return match ? parseInt(match[0]) : null;
  }
}

// Create singleton instance
const idGenerator = new IDGenerator();

// Export convenience functions
export const generateStoreID = () => idGenerator.generate('store');
export const generateGigID = () => idGenerator.generate('gig');
export const generateOrderID = () => idGenerator.generate('order');
export const generateDeliveryID = () => idGenerator.generate('delivery');
export const generateShiftID = () => idGenerator.generate('shift');
export const generateTransactionID = () => idGenerator.generate('transaction');
export const generateDocumentID = () => idGenerator.generate('document');
export const generateUserID = () => idGenerator.generate('user');
export const generatePaymentID = () => idGenerator.generate('payment');

// Export the generator instance for advanced usage
export default idGenerator;
