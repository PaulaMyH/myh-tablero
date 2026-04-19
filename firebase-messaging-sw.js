importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyBoYrfIEy_0fUipt12GIGffWPaIguuXvWk",
  authDomain: "myh-arquitectos.firebaseapp.com",
  projectId: "myh-arquitectos",
  storageBucket: "myh-arquitectos.firebasestorage.app",
  messagingSenderId: "635426083940",
  appId: "1:635426083940:web:754e169bc59f0c44b83b71",
  databaseURL: "https://myh-arquitectos-default-rtdb.firebaseio.com"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  const { title, body } = payload.notification || {};
  self.registration.showNotification(title || "MyH Tablero", {
    body: body || "Hay cambios en el tablero",
    icon: "/icon-192.png",
    badge: "/icon-192.png",
    vibrate: [200, 100, 200],
    tag: "myh-update",
    data: payload.data
  });
});

self.addEventListener("message", function(event) {
  if (event.data && event.data.type === "CAMBIO") {
    self.registration.showNotification("MyH Tablero", {
      body: event.data.descripcion || "El equipo hizo cambios en el tablero",
      icon: "/icon-192.png",
      vibrate: [200, 100, 200],
      tag: "myh-update"
    });
  }
});
