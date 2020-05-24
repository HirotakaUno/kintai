import firebase from "firebase";

export interface Record {
  type?: string;
  date?: firebase.firestore.Timestamp;
}