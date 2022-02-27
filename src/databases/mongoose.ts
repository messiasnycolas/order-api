import mongoose from 'mongoose';

    function connect() {
        const connectionString = process.env.DB_CONN_STRING
        if (connectionString) return mongoose.connect(connectionString);
    }

export { connect };