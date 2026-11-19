// Firebase SDK CDN Modular
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-analytics.js";

// Firebase Configuration của ứng dụng
const firebaseConfig = {
  apiKey: "AIzaSyBeIvoqB0AVGyliZ0xd4SH4zfQU3Ag8mxw",
  authDomain: "hieuhoang-a01aa.firebaseapp.com",
  projectId: "hieuhoang-a01aa",
  storageBucket: "hieuhoang-a01aa.firebasestorage.app",
  messagingSenderId: "870555969823",
  appId: "1:870555969823:web:7d6d3cf4c8ff38e8b2282a",
  measurementId: "G-XZ6725504R"
};

// Khởi tạo Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

console.log("Firebase initialized successfully:", app.name);
