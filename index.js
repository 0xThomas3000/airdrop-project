const {
  Connection,
  PublicKey,
  clusterApiUrl,
  Keypair, // Allow to create a new Wallet
  LAMPORTS_PER_SOL,
} = require("@solana/web3.js");

const wallet = new Keypair(); // Define a "wallet" obj of type "Keypair" into which we drop our Solana

const publicKey = new PublicKey(wallet._keypair.publicKey);
const secretKey = wallet._keypair.secretKey;

console.log(publicKey);
console.log(secretKey);
