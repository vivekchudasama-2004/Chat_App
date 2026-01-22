const { collection, getDocs, setDoc, doc } = require('firebase/firestore');
const { db } = require('../config/firebase');

const getAllUsers = async () => {
    if (!db) return [];
    try {
        const snapshot = await getDocs(collection(db, 'users'));
        const users = [];
        snapshot.forEach(doc => users.push(doc.data()));
        return users;
    } catch (e) {
        throw e;
    }
};

const seedUsers = async () => {
    if (!db) return;
    try {
        const usersRef = collection(db, 'users');
        const snapshot = await getDocs(usersRef);
        if (snapshot.empty) {
            console.log("Seeding users...");
            const users = [
                { uid: 'user1', username: 'vivek', profile_image: 'https://via.placeholder.com/150?text=V' },
                { uid: 'user2', username: 'mihir', profile_image: 'https://via.placeholder.com/150?text=M' }
            ];
            for (const user of users) {
                await setDoc(doc(db, 'users', user.uid), user);
            }
            console.log("Users seeded.");
        }
    } catch (e) {
        console.error("Error seeding users:", e);
    }
}

module.exports = { getAllUsers, seedUsers };
