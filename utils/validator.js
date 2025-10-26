exports.validateReviewInput = (data) => {
    const errors = {};

    if (!data.productId) {
        errors.productId = 'Product ID is required';
    }

    if (!data.rating) {
        errors.rating = 'Rating is required';
    } else if (data.rating < 1 || data.rating > 5) {
        errors.rating = 'Rating must be between 1 and 5';
    }

    if (!data.comment || data.comment.trim() === '') {
        errors.comment = 'Comment is required';
    }

    return Object.keys(errors).length > 0 ? errors : null;
};

exports.validateRegistrationInput = (data) => {
    const errors = {};

    if (!data.username || data.username.trim() === '') {
        errors.username = 'Username is required';
    }

    if (!data.password) {
        errors.password = 'Password is required';
    } else if (data.password.length < 6) {
        errors.password = 'Password must be at least 6 characters long';
    }

    return Object.keys(errors).length > 0 ? errors : null;
};
