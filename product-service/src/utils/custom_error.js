//write code to extend Error class here

class CustomError extends Error {
  /**
   * Constructs a new CustomError instance.
   * @param {string} message - The error message.
   * @param {number} status - The HTTP status code associated with the error.
   */
  constructor(message, status) {
    super(message);
    this.status = status;
  }

  /**
   * Converts the CustomError instance to a JSON object.
   * @returns {Object} A JSON representation of the error, containing the message and status.
   */
  toJSON() {
    return {
      message: this.message,
      status: this.status,
      stack: this.stack,
    };
  }
}
export default CustomError;
