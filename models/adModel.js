var mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
    title: { type: String, minlength: 3, required: true },
    author: { type: String, minlength: 3, required: true },
    company: { type: String, minlength: 3, required: true },
    contact: { type: String, minlength: 3, required: true },
    salary: { type: Number, required: true },
    images: [String],
    currency: { type: String, default: 'EUR', enum: ['EUR', 'USD'], uppercase: true, required: true },
    postDate: { type: Date, default: Date.now },
    description: { type: String, minlength: 35, required: true, },
    sponsored: { type: Boolean, default: false },
});

adSchema.methods.toDto = function () {
    return {
        id: this.id,
        contact: this.contact,
        currency: this.currency,
        images: this.images,
        author: this.author,
        salary: this.salary,
        company: this.company,
        title: this.title,
        description: this.description,
        postDate: this.postDate,
        sponsored: this.sponsored,
    }
}
const Ad = mongoose.model('Ad', adSchema);

module.exports = Ad;