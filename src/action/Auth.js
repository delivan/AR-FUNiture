import { ref, firebaseAuth } from '../config/firebase'


/*--------------------------

Login, Logout, Register Function


----------------------------*/


export function register (email, pw, phone) {
    return firebaseAuth().createUserWithEmailAndPassword(email, pw).then((user)=>{
        saveUser(user, phone);
    });
    
}

export function saveUser (user, phone) {
    return ref.child(`users/${user.uid}/info`).set({
            email: user.email,
            uid: user.uid,
            phone: phone
        }).then(() => user)
}


export function login(email, pw){
    return firebaseAuth().signInWithEmailAndPassword(email, pw)
}

export function logout () {
    return firebaseAuth().signOut()
}