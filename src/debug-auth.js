// Debug authentication state
console.log('=== AUTH DEBUG ===');
console.log('Token:', localStorage.getItem('token'));
console.log('User:', localStorage.getItem('user'));
console.log('Is Authenticated:', !!localStorage.getItem('token'));

// Test if we can manually set auth state
if (!localStorage.getItem('token')) {
  console.log('No token found, you need to login first');
} else {
  console.log('Token found, you should be authenticated');
}
