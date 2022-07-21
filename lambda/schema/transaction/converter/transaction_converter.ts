import { Transaction } from "../entities/transaction";


export function convertTimestamp(oldTransaction: Transaction): Transaction{
    const newTransaction = oldTransaction;
    newTransaction.timestamp = new Date(newTransaction.timestamp).toLocaleString('en-US', { timeZone: 'America/La_Paz' });
    return newTransaction;
}