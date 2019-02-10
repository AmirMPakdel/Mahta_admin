const mongoose = require('mongoose');
const consts = require('./consts');
const errHandler = require('./errHandler');
const config = require('../config/config');

// Requiring models
let Student = require('../models/student');
let Purchase = require('../models/purchase');


async function commitPurchase(req, res, next) {

    let params = req.body;
    let issue = false;

    let purchase = new Purchase({});
    let inviterId;

    // find student
    await Student.findOne({ code: params.code }, function(err, student) {

        if (err) {
            errHandler(err, res);

        } else if (!student) { // if no student found

            issue = true;
            res.status(consts.NOT_FOUND_CODE)
                .json({
                    error: consts.INCORRECT_MAHTA_ID
                });

        } else { // if student was found

            // if had an inviter
            if (student.inviter) inviterId = student.inviter;

            purchase._id = new mongoose.Types.ObjectId();
            purchase.owner = student._id;
            purchase.price = params.price;
            purchase.percent = params.percent;
            purchase.info = params.info;

            student.purchases.push(purchase);

            // save student
            student.save((err => {
                if (err) {
                    // issue = true;
                    errHandler(err, res);
                }
            }));

            // save purchase
            purchase.save((err => {
                if (err) {
                    // issue = true;
                    errHandler(err, res);
                }
            }));
        }
    });

    if (issue) return;

    // sending student list
    next();

    // NOTE: headers are sent, client would not know if there was an err increasing inviter's credit

    if (inviterId) { // if student does have a inviter

        // find inviter
        await Student.findOne({ _id: inviterId }, function(err, student) {

            if (err) {
                errHandler(err);

            } else if (!student) { // if no inviter found

                res.status(consts.NOT_FOUND_CODE)
                    .json({
                        error: consts.INCORRECT_INVITER_ID
                    });

            } else { // if inviter was found

                student.credit += purchase.price * purchase.percent / 100;

                // saving inviter
                student.save((err => {
                    if (err) errHandler(err, res);
                }));

            }
        });
    }

}

module.exports = {commitPurchase};


