export interface AuthUser {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    emailVerified: boolean;
    metadata : { 
        creationTime : string, 
        lastSignInTime : string 
    }
}


