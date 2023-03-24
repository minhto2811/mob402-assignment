module.exports = {
    getArrayObjects: function (mongoose) {
        return mongoose.map(mongoose => mongoose.toObject());
    },

    getSingleObject: function (mongoose) {
        return mongoose ? mongoose.toObject() : mongoose;
    },

}