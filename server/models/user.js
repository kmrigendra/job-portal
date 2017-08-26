// import bookshelf from '../bookshelf';
import mongoose from 'mongoose';
/*export default bookshelf.Model.extend({
  tableName: 'users'
});*/
let UserSchema = new mongoose.Schema({
    username : {type: String},
    email: {
    	type: String,
    	index: { unique: true }
    },
    password: { type: String },
    timezone: { type: String },

});
// export default UserSchema;
export default mongoose.model('User', UserSchema);

