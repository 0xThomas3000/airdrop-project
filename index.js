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

const getWalletBalance = async () => {
  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const walletBalance = await connection.getBalance(publicKey);
    console.log(`Your wallet balance is: ${walletBalance}`);
  } catch (err) {
    console.error(err);
  }
};

const airDropSol = async () => {
  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    // Send 2 Sol into the wallet
    const fromAirDropSignature = await connection.requestAirdrop(
      publicKey,
      2 * LAMPORTS_PER_SOL
    );

    const latestBlockHash = await connection.getLatestBlockhash();

    await connection.confirmTransaction({
      blockhash: latestBlockHash.blockhash,
      lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      signature: fromAirDropSignature,
    });
  } catch (err) {
    console.error(err);
  }
};

const main = async () => {
  await getWalletBalance();
  await airDropSol();
  await getWalletBalance(); // Will see the balance value but not in "SOL" instead in "Lamports"
};

main();
