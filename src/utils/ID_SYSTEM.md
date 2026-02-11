# Unique ID System Documentation

## 🎯 Overview
Centralized, sequential ID generation ensuring unique, non-random, traceable IDs for all entities.

## 🔧 How It Works
- **Location:** `/src/utils/idGenerator.js`
- **Pattern:** `[PREFIX][SEQUENTIAL_NUMBER]`
- **Storage:** localStorage for persistence
- **Scope:** Application-wide singleton

## 📋 ID Ranges & Prefixes

| Entity | Prefix | Range | Example |
|--------|--------|-------|---------|
| Store | `ST` | 1000+ | `ST1001` |
| Gig | `GI` | 2000+ | `GI2001` |
| Order | `OR` | 3000+ | `OR3001` |
| Delivery | `DL` | 4000+ | `DL4001` |
| Shift | `SH` | 5000+ | `SH5001` |
| Transaction | `TX` | 6000+ | `TX6001` |
| Document | `DC` | 7000+ | `DC7001` |
| User | `US` | 8000+ | `US8001` |
| Payment | `PY` | 9000+ | `PY9001` |

## 🚀 Usage
```javascript
import { generateStoreID, generateOrderID } from '../../utils/idGenerator';

const storeId = generateStoreID();      // "ST1001"
const orderId = generateOrderID();      // "OR3001"
const deliveryId = generateDeliveryID(); // "DL4001"
```

## ✅ Implementation Status

**Updated Components:**
- StoreOverview: Shift IDs `SH5001-SH5003`, Delivery IDs `DL4001-DL4003`
- GigActiveJob: Order ID `OR3001`, Delivery ID `DL4004`
- GigJobOffers: Order IDs `OR3002-OR3004`, Delivery IDs `DL4005-DL4007`
- GigShifts: Shift IDs `SH5004-SH5006`

## 🛡️ Benefits
- **Uniqueness:** Sequential numbering prevents duplicates
- **Traceability:** Prefix identifies entity type
- **Performance:** No random generation overhead
- **Persistence:** localStorage maintains state across sessions
- **Scalability:** Easy to add new entity types

## 🔒 Security
- Predictable but not guessable (starts at 1000+)
- No sensitive information in IDs
- Server-side validation recommended for production
