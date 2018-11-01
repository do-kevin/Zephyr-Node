/**
 * Utility Helper
 */

// Utilities ---------------------------------------- /

// Get update object
const getUpdateObject = (obj) => {
    for (const key in obj) {
        if (obj.hasOwnProperty(key) && !obj[key]) delete obj[key];
    }
};

// Export Utilities ---------------------------------------- /

module.exports = {
    getUpdateObject
};
