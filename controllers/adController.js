var express = require('express');
var router = express.Router();
var Ad = require('../models/adModel.js');

router.get('/', async function (req, res) {

    // destructure page and limit and set default values if not provided
    const { page = 1, limit = 10 } = req.body;
    // get total documents in the Ads collection 
    const count = await Ad.countDocuments();
    var totalpages = Math.ceil(count / limit);

    if (req.body.page != undefined) {
        if (req.body.page > totalpages) {
            res.status(404).json({ success: false, msg: `Page ${req.body.page} doesn't exist` }).end();
        } else {
            const ads = await Ad.find().limit(limit * 1).skip((page - 1) * limit).exec();
            res.json({
                ads,
                totalPages: totalpages,
                currentPage: page
            });
        }
    } else {
        const ads = await Ad.find().limit(limit * 1).skip((page - 1) * limit).exec();
        res.json({
            ads,
            totalPages: totalpages,
            currentPage: page
        });
    }


    // return response with posts, total pages, and current page

});

router.get('/latest', function (req, res) {
    Ad.findOne().sort({ postDate: -1 }).exec(function (err, ad) {
        if (err) res.status(400).json({ success: false, msg: `${err}` });
        if (!ad) return res.status(404).json({ success: false, msg: 'No ads found' })
        res.send(ad.toDto());
    });
});

router.get('/:id', function (req, res) {
    Ad.findOne({ _id: req.params.id }).exec(function (err, ad) {
        if (err) return res.status(400).json({ success: false, msg: `${err}` });
        if (!ad) {
            return res.status(404).json({ success: false, msg: 'No ads found' })
        } else {

            res.send(ad.toDto());
        }

    });
});

router.get('/search/:term', function (req, res) {
    const term = req.params.term;
    if (term.length < 4) {
        res.status(400).json({ success: false, msg: 'At least 4 characters are needed' });
    } else {
        Ad.find({
            title: { "$regex": `${term}`, "$options": "i" }
        })
            .exec(function (err, found) {
                if (err) res.status(400).json({ succes: false, msg: `${err}` });
                if (!found) {
                    res.status(404).json({ succes: false, msg: `Not found` });
                } else {
                    res.send(found);
                }
            })
    }
})

router.post('/add', function (req, res) {

    const newAdd = new Ad({
        title: req.body.title,
        description: req.body.description,
        company: req.body.company,
        salary: req.body.payroll,
        currency: req.body.currency,
        contact: req.body.contact,
        author: req.body.author,
        images: req.body.images,
        sponsored: req.body.sponsored,
    })
    newAdd.save(function (err, newAdd) {
        if (err) return res.status(400).json({ success: false, msg: `${err}` });
        res.status(201).json({ success: true, createdAt: (req.get('host') + req.baseUrl + '/' + newAdd._id) });

    });
});

router.delete('/delete/:id', function (req, res) {

    Ad.findOneAndDelete({ _id: req.params.id })
        .exec(function (err, ad) {
            if (err) res.status(400).json({ success: false, msg: 'Cannot remove item' });
            if (!ad) {
                res.status(404).json({ success: false, msg: 'Ad not found' });
            } else {
                res.json({ success: true, msg: `Ad with ID ${req.params.id} deleted` });
            }

        });
});

router.put('/update/:id/description', function (req, res) {
    Ad.updateOne(
        { _id: req.params.id },
        { $set: { description: req.body.description } },
        { runValidators: true })
        .exec(function (err) {
            if (err) {
                res.status(400).json({ msg: `${err}` });
            } else {
                res.json({ success: true, msg: `Document ${req.params.id} description updated` })
            }
        })
})

router.put('/update/:id/currency', function (req, res) {
    Ad.updateOne(
        { _id: req.params.id },
        { $set: { currency: req.body.currency } },
        { runValidators: true })
        .exec(function (err) {
            if (err) {
                res.status(400).json({ msg: `${err}` });
            } else {
                res.json({ success: true, msg: `Document ${req.params.id} currency updated` });
            }
        })
})

router.put('/update/:id/salary', function (req, res) {
    Ad.updateOne(
        { _id: req.params.id },
        { $set: { salary: req.body.salary } },
        { runValidators: true })
        .exec(function (err) {
            if (err) {
                res.status(400).json({ msg: `${err}` });
            } else {
                res.json({ success: true, msg: `Document ${req.params.id} salary updated` });
            }
        })
})

router.put('/update/:id/company', function (req, res) {
    Ad.updateOne(
        { _id: req.params.id },
        { $set: { company: req.body.company } },
        { runValidators: true })
        .exec(function (err) {
            if (err) {
                res.status(400).json({ msg: `${err}` });
            } else {
                res.json({ success: true, msg: `Document ${req.params.id} company updated` });
            }
        })
})

router.put('/update/:id/contact', function (req, res) {
    Ad.updateOne(
        { _id: req.params.id },
        { $set: { contact: req.body.contact } },
        { runValidators: true })
        .exec(function (err) {
            if (err) {
                res.status(400).json({ msg: `${err}` });
            } else {
                res.json({ success: true, msg: `Document ${req.params.id} contact info updated` });
            }
        })
})

module.exports = router;
