import mongoose from 'mongoose';
import { DB_URI } from '../config/env.js';

async function fixUserIndex() {
    try {
        await mongoose.connect(DB_URI);
        console.log('Connected to MongoDB');

        const db = mongoose.connection.db;
        const collections = await db.listCollections().toArray();
        
        if (collections.some(col => col.name === 'users')) {
            // Drop the id index if it exists
            await db.collection('users').dropIndex('id_1');
            console.log('Dropped id_1 index from users collection');
        }

        console.log('Index fix completed');
        process.exit(0);
    } catch (error) {
        console.error('Error fixing index:', error);
        process.exit(1);
    }
}

fixUserIndex(); 