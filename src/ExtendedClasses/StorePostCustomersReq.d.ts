// Assuming StorePostCustomersReq is imported from "@medusajs/medusa"
import { StorePostCustomersReq as MedusaStorePostCustomersReq } from "@medusajs/medusa";

// Define a new interface that extends StorePostCustomersReq
interface StorePostCustomersReq extends MedusaStorePostCustomersReq {
 licenseNumber: string; // Make it optional if it's not always required
}
