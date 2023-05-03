const mongoose = require('mongoose');


mongoose.set('useFindAndModify', false );
mongoose.set('useCreateIndex', true)
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.MONGODB_URI, (err) => {
    if (!err) { console.log('MongoDB connection succeeded.'); }
    else { console.log('Error in MongoDB connection : ' + JSON.stringify(err, undefined, 2)); }
});

require('./user.model'); 
require('./contact.model');
require('./holiday.model');
require('./notes.model');
require('./leave.model'); 
require('./timesheet.model'); 
require('./projects.model');   
require('./empMonth.model');
require('./tasks.model'); 
require('./points.model');   
require('./approve_timesheet.model'); 