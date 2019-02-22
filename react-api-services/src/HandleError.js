// handleError.js - Common Error Handler Function
export default (error) => {
    const { status, message } = error;
    switch (status) {
      case 401:
       return alert(message);
        // do something when you're unauthenticated
      case 403:
        // do something when you're unauthorized to access a resource
        return alert(message);
      case 500:
        // do something when your server exploded
        return alert(message);
      default:
        // handle normal errors with some alert or whatever
    }
    return message; // I like to get my error message back
  }