// // Create a socket instance
// var socket = new WebSocket('{%= Application.extendedSubclass.static["WebSocket"].url %}');

// // Open the socket
// socket.onopen = function(event) {
//     console.log('☕ WebSocket connected.')
    
//     // Send an initial message
//     // socket.send('I am the client and I\'m listening!');
    
//     // Listen for messages
//     socket.onmessage = function(event) {
//         console.log('Client received a message',event);
//     };
    
//     // Listen for socket closes
//     socket.onclose = function(event) {
//         console.log('Client notified socket has closed', event);
//     };
    
//     // To close the socket....
//     //socket.close()
    
// };
    