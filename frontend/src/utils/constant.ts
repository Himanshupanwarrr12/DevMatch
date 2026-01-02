// constant.js
export const baseUrl = import.meta.env.VITE_API_URL;

// Add comprehensive debugging
console.log("🔧 ENVIRONMENT DEBUG:");
console.log("1. VITE_API_URL:", import.meta.env.VITE_API_URL);
console.log("2. MODE:", import.meta.env.MODE);
console.log("3. PROD:", import.meta.env.PROD);
console.log("4. DEV:", import.meta.env.DEV);
console.log("5. Base URL being used:", baseUrl);
console.log("6. Frontend URL:", window.location.origin);
console.log("7. Backend expected at:", baseUrl);