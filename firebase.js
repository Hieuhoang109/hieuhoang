// Firebase SDK CDN Modular
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-analytics.js";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  serverTimestamp 
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

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
export const db = getFirestore(app);

console.log("Firebase & Firestore initialized successfully:", app.name);

// Hàm lưu thông tin donate vào Firestore
export async function saveDonation(amount, donorName = "Ẩn danh", message = "") {
  try {
    const docRef = await addDoc(collection(db, "donations"), {
      amount: Number(amount),
      donorName: donorName.trim() || "Ẩn danh",
      message: message.trim() || "",
      status: "pending",
      createdAt: serverTimestamp(),
      clientTimestamp: new Date().toISOString()
    });
    console.log("Đã lưu thông tin donate vào Firebase với ID:", docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Lỗi khi lưu thông tin donate vào Firebase:", error);
    return { success: false, error };
  }
}

// Gắn vào window để gọi từ script.js
window.saveDonation = saveDonation;
window.db = db;
