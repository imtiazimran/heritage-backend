
import mongoose from 'mongoose';
import app from './app';
import config from './config';


async function startServers() {
    try {
        await mongoose.connect(config.DB as unknown as string);
        console.log('Connected to MongoDB.');
        const PORT = config.port || 4000;
        const server = app.listen(PORT, () => {
            console.log(`HTTP server running on port ${PORT}`);
        });

    } catch (error) {
        console.error('Error starting servers:', error);
    }
}

startServers();
