import React, { useEffect, useState } from 'react';
import { auth } from '../middleware/firebase';
import { onAuthStateChanged } from "firebase/auth";

function PrintToken() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                setUser(firebaseUser);
            } else {
                setUser(null);
                console.log("No user is currently signed in.");
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (user) {
            user.getIdToken(true)
                .then((token) => {
                    console.log("Token:", token);
                })
                .catch((error) => console.error("Error getting token:", error));
        }
    }, [user]);

    return null;
}

export default PrintToken;
