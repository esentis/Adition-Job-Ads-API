var mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);
const adSchema = new mongoose.Schema({
    title: { type: String, minlength: [3, 'Minimum characters required 3'], required: [true, 'Title is required'], unique: true },
    author: { type: String, minlength: [3, 'Minimum characters required 3'], required: [true, 'Author is required'] },
    company: { type: String, minlength: [3, 'Minimum characters required 3'], required: [true, 'Company is required'] },
    contact: { type: String, minlength: [3, 'Minimum characters required 3'], required: [true, 'Contact information is required'] },
    salary: { type: Number, required: [true, 'Salary is required'] },
    location: { type: String, required: [true, 'Location is required'], uppercase: true },
    employmentType: { type: String, required: [true, 'Employment type is required'], enum: { values: ['FULL-TIME', 'PART-TIME', 'FREELANCE', 'INTERNSHIP'], message: 'Wrong value' }, uppercase: true },
    images: [String],
    currency: { type: String, default: 'EUR', enum: { values: ['EUR', 'USD'], message: 'Accepted currency is EUR and USD' }, uppercase: true, required: [true, 'Currency is required'] },
    postDate: { type: Date, default: Date.now },
    description: { type: String, minlength: [35, 'Minimum characters required 35'], required: [true, 'Description is required'] },
    sponsored: { type: Boolean, default: false },
});

adSchema.methods.toDto = function () {
    return {
        id: this.id,
        location: this.location,
        employmentType: this.employmentType,
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