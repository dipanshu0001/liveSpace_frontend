import {database} from '../Functions/FireBase-config'
import {collection} from "firebase/firestore"; 



export const userRef=collection(database,'user-details');
export const agentRef=collection(database,'agent-details');
export const purchaseRef=collection(database,'purchase-details');
export const listingRef=collection(database,'listing-details');