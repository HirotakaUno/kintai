import firebase from "firebase";

export interface Record {
  id?: string;
  type?: string;
  date?: firebase.firestore.Timestamp;
}