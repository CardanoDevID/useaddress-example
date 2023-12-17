/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { useAddress, useWallet, useWalletList } from "@meshsdk/react";
import Image from "next/image";

export default function Home() {
  const wallets = useWalletList();
  const { connect, disconnect, connected } = useWallet();
  const address = useAddress();

  const handleGetAddress = async (walletName: string) => {
    console.log(`${walletName} clicked!`);
    await connect(walletName);
  };

  return (
    <>
      {/* example-2 */}
      {!connected ? (
        <div className="bg-black text-white h-screen flex justify-center items-center">
          <div className="border border-white rounded-2xl w-60 h-48">
            <h1 className="text-center text-2xl font-bold m-4">Wallet List:</h1>
            <div className="flex justify-center items-center">
              {wallets.map((wallet, i) => {
                return (
                  <div
                    key={i}
                    className="bg-slate-700 border border-transparent hover:border-white rounded-xl text-center font-bold m-2 p-2"
                    // Trial-1
                    // onClick={handleGetAddress}

                    // Trial-2
                    onClick={() => handleGetAddress(wallet.name)}
                  >
                    <Image
                      src={wallet.icon}
                      alt="wallet icon"
                      width={50}
                      height={50}
                    />
                    <p className="text-sm">{wallet.name}</p>
                    <p className="text-xs">{wallet.version}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-black text-white h-screen flex justify-center items-center">
          <div className="border border-white rounded-2xl h-48 px-4">
            <h1 className="text-2xl font-bold">Get Address:</h1>
            <p>{address}</p>
            <button
              className="bg-blue-500 hover:bg-blue-700 rounded-xl p-2 font-bold"
              onClick={() => {
                disconnect();
              }}
            >
              Disconnect
            </button>
          </div>
        </div>
      )}
    </>
  );
}
