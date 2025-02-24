const StorageManager = {
  saveUser(user) {
    try {
      localStorage.setItem('user', JSON.stringify(user));
      this.broadcastChanges('user', user);
      this._triggerStorageEvent('user');
    } catch (error) {
      console.error('Error saving user:', error);
    }
  },
  
  getUser() {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error retrieving user:', error);
      return null;
    }
  },

  saveGlobalState(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      this.broadcastChanges(key, data);
      this._triggerStorageEvent(key);
    } catch (error) {
      console.error(`Error saving ${key}:`, error);
    }
  },

  getGlobalState(key) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error(`Error retrieving ${key}:`, error);
      return null;
    }
  },

  _triggerStorageEvent(key) {
    const event = new CustomEvent('global-storage-change', { 
      detail: { key, timestamp: Date.now() }
    });
    window.dispatchEvent(event);
  },

  setupGlobalSync(updateCallbacks) {
    // Cross-window and cross-tab synchronization
    window.addEventListener('storage', (event) => {
      if (event.key && !event.key.startsWith('broadcast_')) {
        Object.keys(updateCallbacks).forEach(callbackKey => {
          if (event.key === callbackKey) {
            try {
              const data = JSON.parse(event.newValue);
              updateCallbacks[callbackKey](data);
            } catch (error) {
              console.error('Sync error:', error);
            }
          }
        });
      }
    });

    // Same-window synchronization
    window.addEventListener('global-storage-change', (event) => {
      const { key } = event.detail;
      
      Object.keys(updateCallbacks).forEach(callbackKey => {
        if (key === callbackKey) {
          const data = this.getGlobalState(key);
          updateCallbacks[callbackKey](data);
        }
      });
    });
  },

  saveUsedGiftCards(usedCodes) {
    try {
      localStorage.setItem('usedGiftCards', JSON.stringify(usedCodes));
      this._triggerStorageEvent('usedGiftCards');
    } catch (error) {
      console.error('Error saving used gift cards:', error);
    }
  },

  getUsedGiftCards() {
    try {
      const usedCards = localStorage.getItem('usedGiftCards');
      return usedCards ? JSON.parse(usedCards) : [];
    } catch (error) {
      console.error('Error retrieving used gift cards:', error);
      return [];
    }
  },

  saveRedemptionCodes(codes) {
    try {
      localStorage.setItem('redemptionCodes', JSON.stringify(codes));
      this._triggerStorageEvent('redemptionCodes');
    } catch (error) {
      console.error('Error saving redemption codes:', error);
    }
  },

  getRedemptionCodes() {
    try {
      const codes = localStorage.getItem('redemptionCodes');
      return codes ? JSON.parse(codes) : [];
    } catch (error) {
      console.error('Error retrieving redemption codes:', error);
      return [];
    }
  },

  saveRedemptionCode(code) {
    try {
      const codes = this.getRedemptionCodes();
      const existingCodeIndex = codes.findIndex(c => c.code === code.code);
      
      if (existingCodeIndex !== -1) {
        codes[existingCodeIndex] = { ...code };
      } else {
        codes.push({ ...code });
      }
      
      localStorage.setItem('redemptionCodes', JSON.stringify(codes));
      this._triggerStorageEvent('redemptionCodes');
      this.broadcastChanges('redemptionCodes', codes);
    } catch (error) {
      console.error('Error saving individual redemption code:', error);
    }
  },

  clearUser() {
    try {
      localStorage.removeItem('user');
      this._triggerStorageEvent('user');
    } catch (error) {
      console.error('Error clearing user:', error);
    }
  },

  saveGiftCards(giftCards) {
    try {
      localStorage.setItem('giftCards', JSON.stringify(giftCards));
      this._triggerStorageEvent('giftCards');
    } catch (error) {
      console.error('Error saving gift cards:', error);
    }
  },

  saveGiftCardConfigs(giftCardConfigs) {
    try {
      localStorage.setItem('giftCardConfigs', JSON.stringify(giftCardConfigs));
      this._triggerStorageEvent('giftCardConfigs');
      this.broadcastChanges('giftCardConfigs', giftCardConfigs);
    } catch (error) {
      console.error('Error saving gift card configs:', error);
    }
  },

  getGiftCardConfigs() {
    try {
      const configs = localStorage.getItem('giftCardConfigs');
      return configs ? JSON.parse(configs) : [];
    } catch (error) {
      console.error('Error retrieving gift card configs:', error);
      return [];
    }
  },

  saveFruits(fruits) {
    try {
      const processedFruits = fruits.map(fruit => ({
        ...fruit,
        id: Number(fruit.id),
        price: Number(fruit.price),
        stock: Number(fruit.stock)
      }));
      
      // Ensure global broadcast and local storage
      localStorage.setItem('fruits', JSON.stringify(processedFruits));
      this.broadcastChanges('fruits', processedFruits);
      this._triggerStorageEvent('fruits');
    } catch (error) {
      console.error('Error saving fruits:', error);
    }
  },

  getFruits() {
    try {
      const storedFruits = localStorage.getItem('fruits');
      return storedFruits ? JSON.parse(storedFruits) : [];
    } catch (error) {
      console.error('Error retrieving fruits:', error);
      return [];
    }
  },

  broadcastChanges(key, data) {
    try {
      localStorage.setItem(`broadcast_${key}`, JSON.stringify({
        timestamp: Date.now(),
        data: data
      }));
    } catch (error) {
      console.error('Broadcast error:', error);
    }
  },

  setupGlobalBroadcastSync(updateCallbacks) {
    window.addEventListener('storage', (event) => {
      if (event.key && event.key.startsWith('broadcast_')) {
        const key = event.key.replace('broadcast_', '');
        
        try {
          const broadcastData = JSON.parse(event.newValue);
          
          if (updateCallbacks[key]) {
            updateCallbacks[key](broadcastData.data);
          }
        } catch (error) {
          console.error('Error processing broadcast:', error);
        }
      }
    });
  },
  
  saveCouponCodes(couponCodes) {},
  getCouponCodes() {
    return [];
  }
};